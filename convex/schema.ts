import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,

  // Lead capture for pre-launch / contact enquiries
  leads: defineTable({
    name: v.optional(v.string()),
    email: v.string(),
    phone: v.optional(v.string()),
    market: v.string(), // "au", "nz", "us", "eu", "other"
    interest: v.string(), // "product", "opportunity", "general"
    message: v.optional(v.string()),
    source: v.string(), // which site captured this lead
    createdAt: v.number(),
  }).index("by_email", ["email"]).index("by_market", ["market"]),
});

export default schema;
export const APP_NAME = "Carnosine Performance";
