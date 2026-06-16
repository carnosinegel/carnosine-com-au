import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link } from "react-router-dom";
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
          <Link to="/#about" className="hover:text-[#F0EFE8] transition-colors">About</Link>
          <Link to="/#product" className="hover:text-[#F0EFE8] transition-colors">Product</Link>
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

function CategoryPill({ category }: { category: string }) {
  const colours: Record<string, string> = {
    Science: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Research: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    Athletes: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Recovery: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Comparison: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  };
  const cls = colours[category] ?? "bg-white/5 text-[#888880] border-white/10";
  return (
    <span className={`inline-block text-xs px-2.5 py-0.5 rounded-full border font-medium ${cls}`}>
      {category}
    </span>
  );
}

export function BlogPage() {
  const posts = useQuery(api.blog.list);

  useSEO({
    title: "Carnosine Science Blog | Carnosine Performance",
    description:
      "Research breakdowns, mechanism explainers, and athlete case studies. The science behind carnosine, muscle performance, and topical delivery — explained clearly.",
    canonical: "https://www.carnosine.com.au/blog",
    ogType: "website",
    schema: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Carnosine Science Journal",
      "description": "Science-first articles on carnosine, muscle performance, recovery, and topical delivery.",
      "url": "https://www.carnosine.com.au/blog",
      "publisher": {
        "@type": "Organization",
        "name": "Carnosine Performance",
        "url": "https://www.carnosine.com.au",
      },
    },
  });

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#F0EFE8]">
      <Nav />

      {/* Header */}
      <section className="pt-32 pb-16 px-6 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C8972A]/30 bg-[#C8972A]/8 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-[#C8972A]" />
          <span className="text-xs text-[#C8972A] font-medium tracking-widest uppercase">
            The Science Journal
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#F0EFE8] mb-4">
          Carnosine Science, Explained.
        </h1>
        <p className="text-lg text-[#888880] max-w-2xl mx-auto">
          No hype. No marketing spin. Just the science behind carnosine, muscle performance, and why the evidence matters.
        </p>
      </section>

      {/* Posts grid */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        {posts === undefined ? (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 border-2 border-[#C8972A]/30 border-t-[#C8972A] rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-24 text-[#555550]">
            No posts yet. Check back soon.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Link
                key={post._id}
                to={`/blog/${post.slug}`}
                className={`group relative block rounded-2xl border border-white/5 bg-[#0E0E10] p-6 hover:border-[#C8972A]/30 hover:bg-[#121212] transition-all duration-200 ${i === 0 ? "md:col-span-2 lg:col-span-3" : ""}`}
              >
                {/* Featured badge */}
                {i === 0 && (
                  <div className="mb-4">
                    <span className="text-xs text-[#C8972A] font-medium tracking-widest uppercase border border-[#C8972A]/30 bg-[#C8972A]/8 px-2.5 py-1 rounded-full">
                      Latest Post
                    </span>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  {post.coverEmoji && (
                    <span className={`text-3xl ${i === 0 ? "text-4xl" : ""} flex-shrink-0`}>
                      {post.coverEmoji}
                    </span>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <CategoryPill category={post.category} />
                      <span className="text-xs text-[#444440]">{post.readingTimeMinutes} min read</span>
                    </div>
                    <h2 className={`font-bold text-[#F0EFE8] group-hover:text-[#C8972A] transition-colors leading-snug mb-2 ${i === 0 ? "text-2xl" : "text-lg"}`}>
                      {post.title}
                    </h2>
                    <p className={`text-[#666660] leading-relaxed ${i === 0 ? "text-base" : "text-sm"}`}>
                      {post.excerpt}
                    </p>
                    <p className="mt-3 text-xs text-[#444440]">{formatDate(post.publishedAt)}</p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="absolute bottom-5 right-5 text-[#333330] group-hover:text-[#C8972A] transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

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
