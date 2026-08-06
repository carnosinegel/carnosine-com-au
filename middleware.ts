import { next } from "@vercel/edge";

/**
 * Edge Middleware — SEO meta tag injection.
 *
 * Why this exists: this is a client-side-only React/Vite SPA (no SSR). The
 * app sets correct per-page <title>/description/canonical via useSEO.ts,
 * but only AFTER JS runs in the browser. Googlebot's first crawl pass reads
 * the raw HTML, which always ships the homepage's default title/meta/canonical
 * baked into index.html — so every route looked like a duplicate of the
 * homepage to Google. That's the actual reason nothing but "/" got indexed
 * for weeks despite sitemap resubmission + Indexing API calls.
 *
 * This middleware intercepts requests for known routes, fetches the static
 * HTML from the origin (via `next()`, which bypasses re-running middleware),
 * and rewrites the <title>, meta description, canonical link, and OG/Twitter
 * tags to the correct per-route values before the HTML reaches the crawler.
 *
 * Blog post metadata is fetched live from Convex per-request (title/excerpt
 * come from the CMS, not a static file) so this never goes stale when new
 * posts are published. If that fetch fails for any reason, we fail open and
 * serve the original (unmodified) HTML rather than risk breaking the page.
 *
 * Static entries below (landing pages, /blog listing) previously had ZERO
 * per-page SEO tags, even client-side — LactigoAustraliaPage.tsx and
 * TopicalCarnosineGelPage.tsx never called useSEO() at all. Written here.
 */

export const config = {
  matcher: ["/blog", "/blog/:slug", "/lactigo-australia", "/topical-carnosine-gel-australia"],
};

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

export default async function middleware(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname;

  let meta: Meta | null = null;
  if (path.startsWith("/blog/") && path !== "/blog/") {
    const slug = path.slice("/blog/".length);
    meta = await getBlogPostMeta(slug);
  } else {
    meta = STATIC_META[path] ?? null;
  }

  // Fail open: no meta found (unknown route, or Convex fetch failed) — serve
  // the site exactly as it would have been served without this middleware.
  if (!meta) {
    return next();
  }

  try {
    const originResponse = await next();
    const html = await originResponse.text();
    const modified = injectMeta(html, meta);
    const headers = new Headers(originResponse.headers);
    headers.set("content-type", "text/html; charset=utf-8");
    return new Response(modified, {
      status: originResponse.status,
      headers,
    });
  } catch {
    // Any unexpected failure: fail open, never break the page for users.
    return next();
  }
}
