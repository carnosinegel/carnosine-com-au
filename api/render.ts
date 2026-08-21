/**
 * SEO meta-tag injection — Vercel Serverless Function.
 *
 * Why this exists (v2): the site is a client-side-only React/Vite SPA (no
 * SSR). useSEO.ts sets correct per-page <title>/description/canonical, but
 * only after JS runs client-side, so Googlebot's raw-HTML crawl pass always
 * sees the homepage's default meta tags on every route. That's why nothing
 * but "/" ever got indexed.
 *
 * v1 of this fix used Vercel Edge Middleware (middleware.ts, commit
 * 0e41287). It was never invoked in production for 3 weeks — likely because
 * this project uses "framework": null + a custom buildCommand in
 * vercel.json, and Edge Middleware auto-detection appears tied to
 * framework-aware builds (e.g. Next.js) rather than plain static/Vite
 * projects. Never confirmed via build log (no dashboard/API access), so
 * this is inference, not a diagnosed root cause.
 *
 * v2 (this file) uses a plain Vercel Serverless Function under /api instead.
 * Serverless Functions are framework-agnostic and detected purely by file
 * location, regardless of the "framework" or buildCommand settings — this
 * is the same mechanism things like Next.js API routes and every
 * "vanilla" Vercel + Express/Node backend rely on, so it should not depend
 * on the same auto-detection path that Edge Middleware apparently needs.
 *
 * vercel.json rewrites specific routes (/blog, /blog/:slug,
 * /lactigo-australia, /topical-carnosine-gel-australia) to
 * /api/render?path=<original path> BEFORE the general SPA catch-all
 * rewrite, so this function only ever runs for the 4 known route patterns.
 * It fetches the site's own homepage shell (which is the same built
 * index.html file served for every route in this SPA) at request time,
 * injects the right meta tags for the requested path, and returns that.
 * Fails open on any error — serves the unmodified shell rather than risk
 * breaking the page for a real visitor.
 *
 * middleware.ts is left in place (harmless, not invoked) as a reference for
 * whoever eventually gets Vercel dashboard access to diagnose why Edge
 * Middleware wasn't picked up — worth revisiting once someone can read a
 * build log, but not blocking anything as of this fix.
 */

const SITE = "https://www.carnosine.com.au";
const CONVEX_QUERY_URL = "https://woozy-bass-459.convex.cloud/api/query";

interface Meta {
  title: string;
  description: string;
  canonical: string;
  ogType?: string;
  schema?: Record<string, unknown>;
}

const STATIC_META: Record<string, Meta> = {
  "/blog": {
    title: "Carnosine Science Journal | Research & Athlete Guides — Carnosine Advantage",
    description:
      "Research breakdowns, mechanism explainers, and athlete case studies. The science behind carnosine, muscle performance, and topical delivery — explained clearly.",
    canonical: `${SITE}/blog`,
    ogType: "website",
    schema: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Carnosine Science Journal",
      description: "Science-first articles on carnosine, muscle performance, recovery, and topical delivery.",
      url: `${SITE}/blog`,
      publisher: {
        "@type": "Organization",
        name: "Carnosine Performance",
        url: SITE,
      },
    },
  },
  "/lactigo-australia": {
    title: "LactiGo Australia | Topical Carnosine Gel — Informed Sport Certified",
    description:
      "LactiGo is the world's only patented topical carnosine gel — applied to the skin over working muscles. Peer-reviewed, Informed Sport certified, trusted by 16,500+ professional athletes across the NHL, NFL, NBA and beyond. Now available in Australia.",
    canonical: `${SITE}/lactigo-australia`,
    ogType: "website",
  },
  "/topical-carnosine-gel-australia": {
    title: "Topical Carnosine Gel Australia | LactiGo — Peer-Reviewed, Certified",
    description:
      "LactiGo is the world's only patented topical carnosine-based gel, applied directly to the skin over working muscles. Backed by published research, Informed Sport certified, used by 16,500+ professional athletes worldwide. Now available in Australia.",
    canonical: `${SITE}/topical-carnosine-gel-australia`,
    ogType: "website",
  },
};

async function getBlogPostMeta(slug: string): Promise<Meta | null> {
  try {
    const res = await fetch(CONVEX_QUERY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: "blog:getBySlug", args: { slug }, format: "json" }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { status: string; value: unknown };
    if (data.status !== "success" || !data.value) return null;
    const post = data.value as {
      title: string;
      excerpt: string;
      slug: string;
      publishedAt: number;
      category: string;
      readingTimeMinutes: number;
    };
    const canonical = `${SITE}/blog/${post.slug}`;
    return {
      title: `${post.title} | Carnosine Performance`,
      description: post.excerpt,
      canonical,
      ogType: "article",
      schema: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        url: canonical,
        datePublished: new Date(post.publishedAt).toISOString(),
        author: { "@type": "Organization", name: "Carnosine Performance", url: SITE },
        publisher: {
          "@type": "Organization",
          name: "Carnosine Performance",
          url: SITE,
          logo: { "@type": "ImageObject", url: `${SITE}/favicon.png` },
        },
        articleSection: post.category,
        timeRequired: `PT${post.readingTimeMinutes}M`,
      },
    };
  } catch {
    return null;
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function injectMeta(html: string, meta: Meta): string {
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const canonical = escapeHtml(meta.canonical);

  let out = html;
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
  out = out.replace(
    /<meta name="description" content="[^"]*"\s*\/>/,
    `<meta name="description" content="${description}" />`,
  );
  out = out.replace(
    /<link rel="canonical" href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${canonical}" />`,
  );
  out = out.replace(
    /<meta property="og:title" content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${title}" />`,
  );
  out = out.replace(
    /<meta property="og:description" content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${description}" />`,
  );
  out = out.replace(
    /<meta property="og:url" content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${canonical}" />`,
  );
  if (meta.ogType) {
    out = out.replace(
      /<meta property="og:type" content="[^"]*"\s*\/>/,
      `<meta property="og:type" content="${meta.ogType}" />`,
    );
  }
  out = out.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${title}" />`,
  );
  out = out.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${description}" />`,
  );

  if (meta.schema) {
    const schemaTag = `<script type="application/ld+json">${JSON.stringify(meta.schema)}</script>`;
    out = out.replace("</head>", `${schemaTag}</head>`);
  }

  return out;
}

async function resolveMeta(path: string): Promise<Meta | null> {
  if (path.startsWith("/blog/") && path !== "/blog/") {
    const slug = path.slice("/blog/".length);
    return getBlogPostMeta(slug);
  }
  return STATIC_META[path] ?? null;
}

export default async function handler(req: any, res: any) {
  const proto = (req.headers["x-forwarded-proto"] as string) || "https";
  const host = req.headers.host as string;
  const origin = `${proto}://${host}`;
  const rawPath = (typeof req.query.path === "string" ? req.query.path : "/") || "/";

  try {
    // Fetch the site's own built shell (same index.html served for every
    // SPA route) from "/", which is never rewritten to this function.
    const shellResp = await fetch(`${origin}/`);
    let html = await shellResp.text();

    const meta = await resolveMeta(rawPath);
    if (meta) {
      html = injectMeta(html, meta);
    }

    res.setHeader("content-type", "text/html; charset=utf-8");
    res.status(200).send(html);
  } catch {
    // Fail open: best effort to still serve something rather than error out.
    try {
      const shellResp = await fetch(`${origin}/`);
      const html = await shellResp.text();
      res.setHeader("content-type", "text/html; charset=utf-8");
      res.status(200).send(html);
    } catch {
      res.status(502).send("Upstream fetch failed");
    }
  }
}
