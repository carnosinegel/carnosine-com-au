/**
 * /carnosine-gel-australia
 *
 * Dedicated landing page targeting the shorter, higher-intent phrasing:
 * - "carnosine gel australia" (this is the exact-match target — GSC data
 *   showed this query converting real clicks at ~position 1.6 in week 11,
 *   which is why this page exists as its own URL rather than relying on
 *   /topical-carnosine-gel-australia to rank for both phrasings)
 * - "carnosine gel" (broader, high-volume, currently ranking ~pos 8 with 0 CTR)
 * - "where to buy carnosine gel in australia" (buyer-intent long-tail)
 *
 * Framing is deliberately "buy it" / product-and-availability first, rather
 * than the "what is it / how it works" education angle already owned by
 * /topical-carnosine-gel-australia — avoids the two pages cannibalizing
 * each other for the same searcher intent.
 *
 * Copy is TGA-compliant: performance-support framing, no therapeutic claims.
 */

import { Link } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { LINKS, CONTACT } from "@/lib/constants";

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav() {
  const { theme } = useTheme();
  const logoSrc = theme === "dark" ? "/logo-dark.png" : "/logo-light.png";
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{
        borderBottom: "1px solid var(--border)",
        backgroundColor:
          theme === "dark" ? "rgba(10,10,12,0.92)" : "rgba(247,246,242,0.92)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logoSrc}
            alt="The Carnosine Advantage"
            className="logo-img object-contain"
            style={{ height: "36px", maxWidth: "200px" }}
          />
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: "var(--muted-foreground)" }}>
          <a href="#buy" className="hover:text-[#3DC8D4] transition-colors">Where to Buy</a>
          <a href="#pricing" className="hover:text-[#3DC8D4] transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-[#3DC8D4] transition-colors">FAQ</a>
          <Link to="/topical-carnosine-gel-australia" className="hover:text-[#3DC8D4] transition-colors">The Science</Link>
          <Link to="/blog" className="hover:text-[#3DC8D4] transition-colors">Blog</Link>
        </div>
        <a
          href={LINKS.purchaseAU}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block text-sm px-4 py-2 rounded bg-[#3DC8D4] text-white font-bold hover:bg-[#5FD8E2] transition-colors"
        >
          Buy Now →
        </a>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#3DC8D4]/6 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#3DC8D4]/30 bg-[#3DC8D4]/8 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-[#3DC8D4] animate-pulse" />
          <span className="text-xs text-[#3DC8D4] font-medium tracking-widest uppercase">
            Ships Australia-Wide · Informed Sport Certified
          </span>
        </div>

        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6"
          style={{ color: "var(--foreground)" }}
        >
          Carnosine gel{" "}
          <span
            className="inline-block"
            style={{
              background: "linear-gradient(135deg, #3DC8D4 0%, #5FD8E2 50%, #3DC8D4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            in Australia.
          </span>
        </h1>

        <p
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: "var(--muted-foreground)" }}
        >
          LactiGo is the only patented carnosine gel available to Australian athletes — order
          direct, ships nationwide, no prescription needed. Informed Sport certified, backed by
          published research, trusted by 16,500+ professional athletes worldwide.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href={LINKS.purchaseAU}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-10 py-4 rounded bg-[#3DC8D4] text-white font-bold text-base hover:bg-[#5FD8E2] transition-colors"
          >
            Buy Carnosine Gel — Australia →
          </a>
          <a
            href="#buy"
            className="w-full sm:w-auto px-8 py-4 rounded border font-medium text-base transition-colors hover:border-[#3DC8D4]/50 hover:text-[#3DC8D4]"
            style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
          >
            Where & How to Buy ↓
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { value: "Ships AU-Wide", label: "Direct to Your Door" },
            { value: "16,500+", label: "Professional Athletes" },
            { value: "Informed Sport", label: "Every Batch Tested" },
            { value: "No Prescription", label: "Order Today" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="py-4 px-3 rounded-xl"
              style={{ border: "1px solid var(--border)", backgroundColor: "var(--card)" }}
            >
              <div className="text-sm sm:text-base font-black text-[#3DC8D4] leading-tight mb-1">
                {stat.value}
              </div>
              <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── What Is It (short) ───────────────────────────────────────────────────────

function WhatIsIt() {
  return (
    <section className="py-24" style={{ backgroundColor: "var(--card)", borderTop: "1px solid var(--border)" }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2
            className="text-3xl sm:text-4xl font-black tracking-tight mb-4"
            style={{ color: "var(--foreground)" }}
          >
            What is carnosine gel?
          </h2>
          <p className="text-base max-w-2xl mx-auto" style={{ color: "var(--muted-foreground)" }}>
            Carnosine gel is a skin-applied product containing carnosine — a naturally occurring
            dipeptide found in skeletal muscle — formulated for topical (through-the-skin) delivery
            rather than oral supplementation. LactiGo is the only version with a patented formulation
            and published, peer-reviewed research behind it.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: "🧪",
              title: "Patented formulation",
              body: "A carnosine + magnesium complex shown in a 2018 skin-model study to penetrate the dermal barrier more effectively than plain carnosine.",
            },
            {
              icon: "🏉",
              title: "Peer-reviewed evidence",
              body: "A 2025 published study in world-class rugby sevens players examined its effect on repeated high-intensity exercise performance.",
            },
            {
              icon: "🏅",
              title: "Certified for drug-tested sport",
              body: "Informed Sport certified — every batch independently tested for 250+ WADA-prohibited substances before it ships.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl p-6"
              style={{ border: "1px solid var(--border)", backgroundColor: "var(--background)" }}
            >
              <div className="text-2xl mb-3">{item.icon}</div>
              <h3 className="text-sm font-bold mb-2" style={{ color: "var(--foreground)" }}>
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/topical-carnosine-gel-australia"
            className="text-sm text-[#3DC8D4] font-semibold hover:text-[#5FD8E2] transition-colors"
          >
            Read the full research breakdown →
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Where To Buy ──────────────────────────────────────────────────────────────

function WhereToBuy() {
  return (
    <section id="buy" className="py-24" style={{ backgroundColor: "var(--background)" }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2
            className="text-3xl sm:text-4xl font-black tracking-tight mb-4"
            style={{ color: "var(--foreground)" }}
          >
            Where to buy carnosine gel in Australia
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--muted-foreground)" }}>
            LactiGo ships direct to Australian addresses — no in-store availability yet,
            no pharmacy or prescription needed.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { num: "01", title: "Order online", body: "Buy direct through the official Australian shop link — the only authorised way to buy LactiGo in AU right now." },
            { num: "02", title: "Ships nationwide", body: "Delivered to any Australian address. No pharmacy, no prescription, no in-person pickup required." },
            { num: "03", title: "Apply before training", body: "Arrives ready to use — apply to clean, dry skin 30–45 minutes before activity." },
          ].map((step) => (
            <div
              key={step.num}
              className="rounded-2xl p-6 text-center"
              style={{ border: "1px solid var(--border)", backgroundColor: "var(--card)" }}
            >
              <div className="text-2xl font-black text-[#3DC8D4]/40 mb-2">{step.num}</div>
              <h3 className="text-sm font-bold mb-2" style={{ color: "var(--foreground)" }}>
                {step.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={LINKS.purchaseAU}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 rounded bg-[#3DC8D4] text-white font-bold text-base hover:bg-[#5FD8E2] transition-colors"
          >
            Buy Carnosine Gel Now →
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Pricing / What You Get ────────────────────────────────────────────────────

function Pricing() {
  return (
    <section
      id="pricing"
      className="py-24"
      style={{ backgroundColor: "var(--card)", borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2
          className="text-3xl sm:text-4xl font-black tracking-tight mb-6"
          style={{ color: "var(--foreground)" }}
        >
          What you get
        </h2>
        <p className="text-base max-w-2xl mx-auto mb-10" style={{ color: "var(--muted-foreground)" }}>
          Current pricing, bundle options, and shipping are shown on the official order page —
          we keep this current there rather than duplicating numbers here that can go stale.
        </p>
        <div className="grid sm:grid-cols-3 gap-5 mb-10">
          {[
            { icon: "🚚", title: "Ships to Australia", body: "Direct delivery, no import hassle." },
            { icon: "🔒", title: "Secure checkout", body: "Order direct via the official LactiGo shop." },
            { icon: "💬", title: "Questions first?", body: "Book a call before you buy." },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl p-6"
              style={{ border: "1px solid var(--border)", backgroundColor: "var(--background)" }}
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="text-sm font-bold mb-1" style={{ color: "var(--foreground)" }}>{item.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{item.body}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={LINKS.purchaseAU}
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 rounded bg-[#3DC8D4] text-white font-bold text-base hover:bg-[#5FD8E2] transition-colors"
          >
            See Current Pricing →
          </a>
          <a
            href={LINKS.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded border font-medium text-base transition-colors hover:border-[#3DC8D4]/50 hover:text-[#3DC8D4]"
            style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
          >
            Book a Call First
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

function FAQ() {
  const faqs = [
    {
      q: "Where can I buy carnosine gel in Australia?",
      a: "LactiGo — the only patented topical carnosine gel — ships direct to Australian addresses through the official shop link. There's currently no in-store or pharmacy availability.",
    },
    {
      q: "Is carnosine gel the same as beta-alanine?",
      a: "No. Beta-alanine is an oral supplement that requires weeks of daily loading and causes skin tingling. Carnosine gel is applied topically, has no loading phase, and works differently — through direct skin delivery rather than the bloodstream.",
    },
    {
      q: "Do I need a prescription?",
      a: "No. LactiGo is a topical sports performance product, not a prescription medicine — order direct online.",
    },
    {
      q: "Is it legal for drug-tested athletes?",
      a: "Yes. LactiGo is Informed Sport certified — every batch is independently tested for 250+ WADA-prohibited substances, so it's safe for athletes under Sport Integrity Australia or any WADA-compliant testing regime.",
    },
    {
      q: "How much does carnosine gel cost in Australia?",
      a: "Current pricing and any bundle discounts are shown on the official order page — check there for the latest, since we don't want to quote a number here that goes out of date.",
    },
    {
      q: "How long does shipping take?",
      a: "Shipping times to Australian addresses are shown at checkout on the official order page.",
    },
  ];

  return (
    <section id="faq" className="py-24" style={{ backgroundColor: "var(--background)" }}>
      <div className="max-w-3xl mx-auto px-6">
        <h2
          className="text-3xl sm:text-4xl font-black tracking-tight mb-12 text-center"
          style={{ color: "var(--foreground)" }}
        >
          Common questions
        </h2>
        <div className="space-y-5">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="rounded-2xl p-6"
              style={{ border: "1px solid var(--border)", backgroundColor: "var(--card)" }}
            >
              <h3 className="text-sm font-bold mb-2" style={{ color: "var(--foreground)" }}>
                {faq.q}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const { theme } = useTheme();
  return (
    <footer
      className="py-12"
      style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--card)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <img
            src={theme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
            alt="The Carnosine Advantage"
            className="logo-img object-contain"
            style={{ height: "32px", maxWidth: "160px" }}
          />
          <div
            className="flex flex-wrap items-center justify-center gap-6 text-xs"
            style={{ color: "var(--muted-foreground)" }}
          >
            <Link to="/" className="hover:text-[#3DC8D4] transition-colors">Home</Link>
            <Link to="/topical-carnosine-gel-australia" className="hover:text-[#3DC8D4] transition-colors">The Science</Link>
            <Link to="/blog" className="hover:text-[#3DC8D4] transition-colors">Blog</Link>
            <a href={LINKS.carnosinelab} target="_blank" rel="noopener noreferrer" className="hover:text-[#3DC8D4] transition-colors">The Carnosine Lab</a>
            <a href={`mailto:${CONTACT.email}`} className="hover:text-[#3DC8D4] transition-colors">{CONTACT.email}</a>
          </div>
        </div>
        <div className="mt-8 pt-6 text-center" style={{ borderTop: "1px solid var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--muted-foreground)", opacity: 0.5 }}>
            © {new Date().getFullYear()} Carnosine Performance Pty Ltd · Australia
          </p>
          <p className="text-xs mt-2" style={{ color: "var(--muted-foreground)", opacity: 0.4 }}>
            This product is intended to support athletic performance and recovery routines.
            It is not intended to diagnose, treat, cure, or prevent any medical condition.
            Always consult a healthcare professional before commencing any supplementation programme.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function CarnosineGelAustraliaPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      <Nav />
      <Hero />
      <WhatIsIt />
      <WhereToBuy />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}
