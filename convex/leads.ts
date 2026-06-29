import { action, internalMutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

declare const process: { env: Record<string, string | undefined> };

const NOTIFY_EMAIL = "info@carnosine.com.au";

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
