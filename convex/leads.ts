import { action, internalMutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

declare const process: { env: Record<string, string | undefined> };

const NOTIFY_EMAIL = "info@carnosine.com.au";

async function sendLeadNotificationEmail(lead: {
  name?: string;
  email: string;
  phone?: string;
  interest: string;
  message?: string;
  source: string;
  market: string;
}) {
  const apiUrl = process.env.VIKTOR_SPACES_API_URL;
  const projectName = process.env.VIKTOR_SPACES_PROJECT_NAME;
  const projectSecret = process.env.VIKTOR_SPACES_PROJECT_SECRET;

  if (!apiUrl || !projectName || !projectSecret) return;

  const interestLabel: Record<string, string> = {
    product: "Product",
    opportunity: "Business Opportunity",
    practitioner: "Practitioner",
    general: "General Enquiry",
  };

  const htmlContent = `
    <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; padding: 24px; background: #f9f9f9;">
      <div style="background: #0A0A0C; padding: 20px 24px; border-radius: 8px 8px 0 0;">
        <h2 style="color: #C8972A; margin: 0; font-size: 18px;">New Lead — carnosine.com.au</h2>
      </div>
      <div style="background: #fff; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #eee;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #888; width: 120px; font-size: 14px;">Name</td><td style="padding: 8px 0; font-size: 14px; font-weight: 600;">${lead.name || "—"}</td></tr>
          <tr><td style="padding: 8px 0; color: #888; font-size: 14px;">Email</td><td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${lead.email}" style="color: #C8972A;">${lead.email}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #888; font-size: 14px;">Phone</td><td style="padding: 8px 0; font-size: 14px;">${lead.phone || "—"}</td></tr>
          <tr><td style="padding: 8px 0; color: #888; font-size: 14px;">Interested in</td><td style="padding: 8px 0; font-size: 14px;">${interestLabel[lead.interest] ?? lead.interest}</td></tr>
          <tr><td style="padding: 8px 0; color: #888; font-size: 14px;">Market</td><td style="padding: 8px 0; font-size: 14px;">${lead.market.toUpperCase()}</td></tr>
          ${lead.message ? `<tr><td style="padding: 8px 0; color: #888; font-size: 14px; vertical-align: top;">Message</td><td style="padding: 8px 0; font-size: 14px;">${lead.message}</td></tr>` : ""}
        </table>
        <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #eee; font-size: 12px; color: #aaa;">
          Submitted via ${lead.source}
        </div>
      </div>
    </div>
  `;

  const textContent = [
    "New Lead — carnosine.com.au",
    "",
    `Name: ${lead.name || "—"}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone || "—"}`,
    `Interested in: ${interestLabel[lead.interest] ?? lead.interest}`,
    `Market: ${lead.market.toUpperCase()}`,
    lead.message ? `Message: ${lead.message}` : null,
    "",
    `Submitted via ${lead.source}`,
  ]
    .filter((l) => l !== null)
    .join("\n");

  await fetch(`${apiUrl}/api/viktor-spaces/send-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      project_name: projectName,
      project_secret: projectSecret,
      to_email: NOTIFY_EMAIL,
      subject: `New lead from carnosine.com.au — ${lead.name || lead.email}`,
      html_content: htmlContent,
      text_content: textContent,
      email_type: "notification",
    }),
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

    // Send notification email (don't block on failure)
    try {
      await sendLeadNotificationEmail(args);
    } catch (e) {
      console.error("Failed to send lead notification email:", e);
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
