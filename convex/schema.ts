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

  // Blog posts
  blogPosts: defineTable({
    slug: v.string(),
    title: v.string(),
    excerpt: v.string(),
    content: v.string(), // HTML content
    category: v.string(),
    readingTimeMinutes: v.number(),
    publishedAt: v.number(),
    published: v.boolean(),
    coverEmoji: v.optional(v.string()),
  })
    .index("by_slug", ["slug"])
    .index("by_published", ["published"])
    .index("by_publishedAt", ["publishedAt"]),
});

export default schema;
export const APP_NAME = "Carnosine Performance";
