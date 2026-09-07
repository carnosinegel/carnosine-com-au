import { action, internalMutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

declare const process: { env: Record<string, string | undefined> };

async function callViktorTool<T>(role: string, args: Record<string, unknown> = {}): Promise<T> {
  const apiUrl = process.env.VIKTOR_SPACES_API_URL;
  const projectName = process.env.VIKTOR_SPACES_PROJECT_NAME;
  const projectSecret = process.env.VIKTOR_SPACES_PROJECT_SECRET;

  if (!apiUrl || !projectName || !projectSecret) {
    throw new Error("Viktor Spaces env vars not configured");
  }

  const response = await fetch(`${apiUrl}/api/viktor-spaces/tools/call`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      project_name: projectName,
      project_secret: projectSecret,
      role,
      arguments: args,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${await response.text()}`);
  }

  const json = await response.json() as { success: boolean; result?: T; error?: string };
  if (!json.success) {
    throw new Error(json.error ?? "Tool call failed");
  }
  return json.result as T;
}

async function sendLeadNotification(lead: {
  name?: string;
  email: string;
  phone?: string;
  interest: string;
  message?: string;
  source: string;
  market: string;
}) {
  const interestLabel: Record<string, string> = {
    product: "Product",
    opportunity: "Business Opportunity",
    practitioner: "Practitioner",
    general: "General Enquiry",
  };

  const lines = [
    `*🔔 New lead — carnosine.com.au*`,
    ``,
    `*Name:* ${lead.name || "—"}`,
    `*Email:* ${lead.email}`,
    `*Phone:* ${lead.phone || "—"}`,
    `*Interested in:* ${interestLabel[lead.interest] ?? lead.interest}`,
    `*Market:* ${lead.market.toUpperCase()}`,
    lead.message ? `*Message:* ${lead.message}` : null,
    ``,
    `_Source: ${lead.source}_`,
  ].filter((l) => l !== null).join("\n");

  // Notify via Slack DM to VK
  await callViktorTool("coworker_send_slack_message", {
    channel_id: "D0B60NZKTG8",
    blocks: [{ type: "markdown", text: lines }],
    do_send: true,
  });
}

// Emails the full lead details to the internal inbox (info@carnosine.com.au)
// so leads land in email too, not just Slack.
async function sendInternalLeadEmail(lead: {
  name?: string;
  email: string;
  phone?: string;
  interest: string;
  message?: string;
  source: string;
  market: string;
}) {
  const interestLabel: Record<string, string> = {
    product: "Product",
    opportunity: "Business Opportunity",
    practitioner: "Practitioner",
    general: "General Enquiry",
    "industry-partner": "Industry Partner",
  };

  const lines = [
    `Name: ${lead.name || "—"}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone || "—"}`,
    `Interested in: ${interestLabel[lead.interest] ?? lead.interest}`,
    `Market: ${lead.market.toUpperCase()}`,
    lead.message ? `Details:\n${lead.message}` : null,
    ``,
    `Source: ${lead.source}`,
  ].filter((l) => l !== null).join("\n");

  await callViktorTool("coworker_send_email", {
    to: [INTERNAL_EMAIL],
    subject: `New lead — ${lead.name || lead.email} (carnosine.com.au)`,
    body: lines,
  });
}

const CALENDLY_URL = "https://calendly.com/carnosine/30min";
const INTERNAL_EMAIL = "info@carnosine.com.au";

// Sends the applicant a confirmation email with their submitted details.
// Only fires for the /industry-partner funnel (identified by `source`),
// per the original brief — not for the general homepage contact form.
async function sendApplicantConfirmationEmail(lead: {
  name?: string;
  email: string;
  message?: string;
  source: string;
}) {
  if (!lead.source.includes("industry-partner")) return;

  const displayName = lead.name && lead.name !== "—" ? lead.name : "there";
  const detailsBlock = lead.message ? lead.message : "";

  const body = `Hi ${displayName},

Thank you—your enquiry has been received.

One of our industry support team members will contact you shortly to learn about your business and discuss the most suitable partnership option.

**Your submitted details:**

${detailsBlock}

Prefer to talk sooner? Book a short introductory call: ${CALENDLY_URL}

Talk soon,
The Carnosine Advantage Industry Partnerships Team
${INTERNAL_EMAIL}`;

  await callViktorTool("coworker_send_email", {
    to: [lead.email],
    cc: [INTERNAL_EMAIL],
    subject: "Your Carnosine Industry Partner enquiry — received",
    body,
  });
}

// Internal mutation to write the lead to the DB (called from the action)
export const insertLead = internalMutation({
  args: {
    name: v.optional(v.string()),
    email: v.string(),
    phone: v.optional(v.string()),
    market: v.string(),
    interest: v.string(),
    message: v.optional(v.string()),
    source: v.string(),
  },
  returns: v.object({ success: v.boolean(), message: v.string() }),
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("leads")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      return { success: true, message: "already_registered" };
    }

    await ctx.db.insert("leads", {
      ...args,
      createdAt: Date.now(),
    });

    return { success: true, message: "registered" };
  },
});

// Public action: saves lead + sends email notification
export const submitLead = action({
  args: {
    name: v.optional(v.string()),
    email: v.string(),
    phone: v.optional(v.string()),
    market: v.string(),
    interest: v.string(),
    message: v.optional(v.string()),
    source: v.string(),
  },
  returns: v.object({ success: v.boolean(), message: v.string() }),
  handler: async (ctx, args): Promise<{ success: boolean; message: string }> => {
    const result: { success: boolean; message: string } = await ctx.runMutation(internal.leads.insertLead, args);

    // Send Slack notification (don't block on failure)
    try {
      await sendLeadNotification(args);
    } catch (e) {
      console.error("Failed to send lead notification:", e);
    }

    // Email the full lead details to the internal inbox too (don't block on failure)
    if (result.message !== "already_registered") {
      try {
        await sendInternalLeadEmail(args);
      } catch (e) {
        console.error("Failed to send internal lead email:", e);
      }
    }

    // Send applicant confirmation email for industry-partner submissions
    // (don't block on failure, and don't resend for already-registered leads)
    if (result.message !== "already_registered") {
      try {
        await sendApplicantConfirmationEmail(args);
      } catch (e) {
        console.error("Failed to send applicant confirmation email:", e);
      }
    }

    return result;
  },
});

export const getLeads = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("leads"),
      _creationTime: v.number(),
      name: v.optional(v.string()),
      email: v.string(),
      phone: v.optional(v.string()),
      market: v.string(),
      interest: v.string(),
      message: v.optional(v.string()),
      source: v.string(),
      createdAt: v.number(),
    })
  ),
  handler: async (ctx) => {
    return await ctx.db.query("leads").order("desc").collect();
  },
});
