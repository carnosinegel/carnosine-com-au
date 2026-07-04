import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link, useParams } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0A0A0C]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded bg-[#C8972A] flex items-center justify-center">
            <span className="text-[#0A0A0C] font-black text-sm tracking-tighter">CP</span>
          </div>
          <span className="font-semibold text-[#F0EFE8] text-sm tracking-wide hidden sm:inline">
            Carnosine Performance
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-[#888880]">
          <Link to="/" className="hover:text-[#F0EFE8] transition-colors">Home</Link>
          <Link to="/blog" className="text-[#C8972A] hover:text-[#E8B84B] transition-colors font-medium">Blog</Link>
          <Link to="/#contact" className="hover:text-[#F0EFE8] transition-colors">Contact</Link>
        </div>

        <a
          href="https://calendly.com/carnosine/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm px-4 py-2 rounded border border-[#C8972A] text-[#C8972A] hover:bg-[#C8972A]/10 transition-colors"
        >
          Book a Call
        </a>
      </div>
    </nav>
  );
}

function BlogPostSEO({ post }: { post: { title: string; excerpt: string; slug: string; publishedAt: number; category: string; readingTimeMinutes: number } }) {
  const canonical = `https://www.carnosine.com.au/blog/${post.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "url": canonical,
    "datePublished": new Date(post.publishedAt).toISOString(),
    "author": {
      "@type": "Organization",
      "name": "Carnosine Performance",
      "url": "https://www.carnosine.com.au",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Carnosine Performance",
      "url": "https://www.carnosine.com.au",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.carnosine.com.au/favicon.png",
      },
    },
    "articleSection": post.category,
    "timeRequired": `PT${post.readingTimeMinutes}M`,
  };

  useSEO({
    title: `${post.title} | Carnosine Performance`,
    description: post.excerpt,
    canonical,
    ogType: "article",
    schema,
  });

  return null;
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = useQuery(api.blog.getBySlug, { slug: slug ?? "" });

  if (post === undefined) {
    return (
      <div className="min-h-screen bg-[#0A0A0C] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C8972A]/30 border-t-[#C8972A] rounded-full animate-spin" />
      </div>
    );
  }

  if (post === null) {
    return (
      <div className="min-h-screen bg-[#0A0A0C] text-[#F0EFE8] flex flex-col items-center justify-center gap-4">
        <p className="text-[#888880]">Post not found.</p>
        <Link to="/blog" className="text-[#C8972A] hover:underline">← Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#F0EFE8]">
      <BlogPostSEO post={post} />
      <Nav />

      <article className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#555550] mb-8">
          <Link to="/blog" className="hover:text-[#C8972A] transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-[#888880] truncate">{post.category}</span>
        </div>

        {/* Header */}
        <header className="mb-12">
          {post.coverEmoji && (
            <div className="text-5xl mb-6">{post.coverEmoji}</div>
          )}

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-xs text-[#C8972A] font-medium tracking-widest uppercase border border-[#C8972A]/30 bg-[#C8972A]/8 px-2.5 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-xs text-[#444440]">{post.readingTimeMinutes} min read</span>
            <span className="text-xs text-[#444440]">{formatDate(post.publishedAt)}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#F0EFE8] leading-tight mb-4">
            {post.title}
          </h1>

          <p className="text-lg text-[#888880] leading-relaxed border-l-2 border-[#C8972A]/40 pl-4">
            {post.excerpt}
          </p>
        </header>

        {/* Divider */}
        <div className="border-t border-white/5 mb-12" />

        {/* Content */}
        <div
          className="prose-carnosine"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Footer CTA */}
        <div className="mt-16 p-8 rounded-2xl border border-[#C8972A]/20 bg-[#C8972A]/5">
          <h3 className="text-xl font-bold text-[#F0EFE8] mb-2">Ready to test it properly?</h3>
          <p className="text-[#888880] mb-6 text-sm">
            Don't judge it from reading. Judge it from proper use. Book a call with the team or order directly.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://calendly.com/carnosine/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg bg-[#C8972A] text-[#0A0A0C] font-semibold text-sm hover:bg-[#E8B84B] transition-colors"
            >
              Book a Call
            </a>
            <a
              href="https://shop.lactigo.com/?refcode=carnosineaustralia"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg border border-[#C8972A] text-[#C8972A] font-semibold text-sm hover:bg-[#C8972A]/10 transition-colors"
            >
              Order LactiGo
            </a>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#555550] hover:text-[#C8972A] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to all posts
          </Link>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-[#2A2A2E] bg-[#0A0A0C] py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-[#C8972A] flex items-center justify-center">
              <span className="text-[#0A0A0C] font-black text-xs">CP</span>
            </div>
            <span className="text-[#555550] text-sm">Carnosine Performance · Australia</span>
          </div>
          <div className="text-xs text-[#333330]">© 2026 Carnosine Performance</div>
        </div>
      </footer>
    </div>
  );
}
