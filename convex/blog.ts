import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// List all published posts, newest first
export const list = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db
      .query("blogPosts")
      .withIndex("by_publishedAt")
      .order("desc")
      .filter((q) => q.eq(q.field("published"), true))
      .collect();
    return posts;
  },
});

// Get single post by slug
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const post = await ctx.db
      .query("blogPosts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();
    return post ?? null;
  },
});

// Upsert a blog post (used by seeding script / weekly cron)
export const upsert = mutation({
  args: {
    slug: v.string(),
    title: v.string(),
    excerpt: v.string(),
    content: v.string(),
    category: v.string(),
    readingTimeMinutes: v.number(),
    publishedAt: v.number(),
    published: v.boolean(),
    coverEmoji: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("blogPosts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    if (existing) {
      await ctx.db.patch(existing._id, args);
      return existing._id;
    }
    return await ctx.db.insert("blogPosts", args);
  },
});
