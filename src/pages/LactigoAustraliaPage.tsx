/**
 * /lactigo-australia
 *
 * Dedicated landing page targeting:
 * - "lactigo australia"
 * - "lactigo gel australia"
 * - "buy lactigo australia"
 *
 * TGA-compliant: performance-support framing, no therapeutic claims.
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
          <a href="#what-is-lactigo" className="hover:text-[#3DC8D4] transition-colors">What Is LactiGo</a>
          <a href="#research" className="hover:text-[#3DC8D4] transition-colors">Research</a>
          <a href="#certified" className="hover:text-[#3DC8D4] transition-colors">Certified</a>
          <a href="#order" className="text-[#3DC8D4] font-semibold hover:text-[#5FD8E2] transition-colors">Order in Australia</a>
          <Link to="/blog" className="hover:text-[#3DC8D4] transition-colors">Blog</Link>
        </div>
        <a
          href={LINKS.purchaseAU}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block text-sm px-4 py-2 rounded bg-[#3DC8D4] text-white font-bold hover:bg-[#5FD8E2] transition-colors"
        >
          Order Now →
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
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#3DC8D4]/30 bg-[#3DC8D4]/8 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-[#3DC8D4] animate-pulse" />
          <span className="text-xs text-[#3DC8D4] font-medium tracking-widest uppercase">
            Now Available in Australia · Informed Sport Certified
          </span>
        </div>

        {/* H1 */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6"
          style={{ color: "var(--foreground)" }}
        >
          LactiGo{" "}
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
          The world's only patented topical carnosine gel — applied to the skin over working muscles.
          Peer-reviewed. Informed Sport certified. Trusted by 16,500+ professional athletes
          across the NHL, NFL, NBA and beyond. Now available to Australian athletes.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href={LINKS.purchaseAU}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-10 py-4 rounded bg-[#3DC8D4] text-white font-bold text-base hover:bg-[#5FD8E2] transition-colors"
          >
            Buy LactiGo in Australia →
          </a>
          <a
            href="#what-is-lactigo"
            className="w-full sm:w-auto px-8 py-4 rounded border font-medium text-base transition-colors hover:border-[#3DC8D4]/50 hover:text-[#3DC8D4]"
            style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
          >
            Learn More ↓
          </a>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { value: "16,500+", label: "Professional Athletes" },
            { value: "NHL · NFL · NBA", label: "Pro Leagues" },
            { value: "Informed Sport", label: "Every Batch Tested" },
            { value: "🇦🇺 AU", label: "Available in Australia" },
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

// ─── What Is LactiGo ──────────────────────────────────────────────────────────

function WhatIsLactiGo() {
  return (
    <section
      id="what-is-lactigo"
      className="py-24"
      style={{ backgroundColor: "var(--card)", borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2
            className="text-3xl sm:text-4xl font-black tracking-tight mb-4"
            style={{ color: "var(--foreground)" }}
          >
            What is LactiGo?
          </h2>
          <p className="text-base max-w-2xl mx-auto" style={{ color: "var(--muted-foreground)" }}>
            LactiGo is a topical carnosine-based performance and recovery-support gel. It contains
            carnosine, magnesium sulfate, and is applied directly to the skin over the muscle groups
            you're about to train — rather than taken orally.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {[
            {
              icon: "🔬",
              title: "Patented formulation",
              body: "The specific carnosine + magnesium complex is patented. The ratio matters — too much or too little and the gel either won't deliver or won't penetrate. Competitors have attempted to replicate it; none have published peer-reviewed evidence of efficacy.",
            },
            {
              icon: "💧",
              title: "Topical, not oral",
              body: "Applied to clean, dry skin 30–45 minutes before activity. Absorbs in under a minute. No pills. No mixing. No tingling. No loading period. Re-apply post-activity as part of a cool-down routine.",
            },
            {
              icon: "🏅",
              title: "Informed Sport certified",
              body: "Every batch independently tested by LGC Group for 250+ WADA-prohibited substances. Safe for drug-tested athletes in Australia under Sport Integrity Australia.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-2xl p-7"
              style={{ border: "1px solid var(--border)", backgroundColor: "var(--background)" }}
            >
              <div className="text-2xl mb-3">{card.icon}</div>
              <h3 className="text-sm font-bold mb-2" style={{ color: "var(--foreground)" }}>
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>

        {/* Carnosine science brief */}
        <div
          className="rounded-2xl p-8 border border-[#3DC8D4]/20 bg-[#3DC8D4]/5"
        >
          <h3 className="text-base font-bold mb-3 text-[#3DC8D4]">About carnosine</h3>
          <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--muted-foreground)" }}>
            Carnosine (beta-alanyl-L-histidine) is a dipeptide found naturally in high concentrations
            in skeletal muscle and brain tissue. It has been studied for over 40 years across more than
            3,000 peer-reviewed publications — for its role in intracellular pH buffering, antioxidant
            activity, anti-glycation, and support of muscle function during high-intensity exercise.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
            Carnosine levels in muscle decline with age and are depleted during intense training.
            LactiGo is designed to support topical delivery of carnosine directly to the target area,
            working around the bioavailability limitations of oral carnosine formulations.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Who Uses It ──────────────────────────────────────────────────────────────

function WhoUsesIt() {
  const sports = [
    { icon: "🏒", name: "NHL" },
    { icon: "🏈", name: "NFL" },
    { icon: "🏀", name: "NBA" },
    { icon: "⚾", name: "MLB" },
    { icon: "🎓", name: "NCAA D1" },
    { icon: "⚽", name: "European Football" },
    { icon: "🥊", name: "UFC" },
    { icon: "🏉", name: "Rugby Union" },
    { icon: "🏊", name: "Swimming" },
    { icon: "🚴", name: "Cycling" },
    { icon: "🏃", name: "Athletics" },
    { icon: "🏋️", name: "CrossFit" },
  ];

  return (
    <section className="py-24" style={{ backgroundColor: "var(--background)" }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2
            className="text-3xl sm:text-4xl font-black tracking-tight mb-4"
            style={{ color: "var(--foreground)" }}
          >
            Trusted by professional athletes worldwide
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--muted-foreground)" }}>
            16,500+ athletes across professional leagues and elite programmes use LactiGo
            as part of their training and recovery routine.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {sports.map((s) => (
            <div
              key={s.name}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
              style={{ border: "1px solid var(--border)", backgroundColor: "var(--card)", color: "var(--foreground)" }}
            >
              <span>{s.icon}</span>
              <span>{s.name}</span>
            </div>
          ))}
        </div>

        {/* Athlete quote block */}
        <div
          className="rounded-2xl p-8 md:p-10 border border-[#3DC8D4]/20"
          style={{ backgroundColor: "var(--card)" }}
        >
          <div className="text-3xl text-[#3DC8D4]/40 mb-3 font-serif">"</div>
          <p className="text-base italic leading-relaxed mb-4" style={{ color: "var(--foreground)" }}>
            The product is Informed Sport certified, peer-reviewed, and has been in the hands of
            professional athletes across North American and European leagues for years before
            becoming available to the broader Australian market.
          </p>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            Carnosine Advantage — Australian distributor for LactiGo
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Research ─────────────────────────────────────────────────────────────────

function Research() {
  return (
    <section
      id="research"
      className="py-24"
      style={{ backgroundColor: "var(--card)", borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2
            className="text-3xl sm:text-4xl font-black tracking-tight mb-4"
            style={{ color: "var(--foreground)" }}
          >
            Backed by published research
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--muted-foreground)" }}>
            LactiGo is not marketing copy dressed up as science.
            The research has been done and published.
          </p>
        </div>

        <div className="space-y-5">
          {[
            {
              year: "2025",
              label: "Sports Performance — Peer-Reviewed",
              title: "Rugby sevens study: topical carnosine gel and repeated high-intensity performance",
              body: "A peer-reviewed study with world-class rugby sevens players found that topical application of LactiGo may support performance during repeated bouts of high-intensity exercise. Rugby sevens — short maximal efforts, brief recovery — is one of the most metabolically demanding team sports in the world.",
            },
            {
              year: "2018",
              label: "Delivery Mechanism — Human Skin Model",
              title: "Transepidermal penetration study: carnosine + magnesium complex",
              body: "Researchers using a 3D human skin model confirmed enhanced transepidermal penetration with the patented carnosine + magnesium formulation. This establishes the scientific basis for topical delivery — the product can actually get through the skin, unlike most alternatives tested in similar conditions.",
            },
            {
              year: "Ongoing",
              label: "ANZCTR Registered Trial",
              title: "Australian New Zealand Clinical Trials Registry",
              body: "LactiGo research is formally registered with the ANZCTR — reflecting a commitment to properly designed, independently verified human research. Most sports supplements never make it to this level of scrutiny.",
            },
          ].map((study) => (
            <div
              key={study.year}
              className="rounded-2xl p-7"
              style={{ border: "1px solid var(--border)", backgroundColor: "var(--background)" }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-bold border border-[#3DC8D4]/40 text-[#3DC8D4]">
                  {study.year}
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#3DC8D4] uppercase tracking-widest mb-1">
                    {study.label}
                  </div>
                  <h3 className="text-sm font-bold mb-2" style={{ color: "var(--foreground)" }}>
                    {study.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                    {study.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Informed Sport ───────────────────────────────────────────────────────────

function Certified() {
  return (
    <section id="certified" className="py-20" style={{ backgroundColor: "var(--background)" }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="rounded-2xl p-8 md:p-12 border border-[#3DC8D4]/25 bg-[#3DC8D4]/5">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0 text-5xl">🏅</div>
            <div>
              <div className="text-xs font-semibold text-[#3DC8D4] uppercase tracking-widest mb-2">
                Informed Sport Certified — Every Batch
              </div>
              <h2 className="text-2xl font-black mb-4" style={{ color: "var(--foreground)" }}>
                Safe for drug-tested athletes in Australia
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted-foreground)" }}>
                LactiGo carries Informed Sport certification from LGC Group — meaning every
                production batch is independently screened for over 250 substances on the WADA
                prohibited list before it reaches athletes.
              </p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--muted-foreground)" }}>
                Australian athletes competing under Sport Integrity Australia (SIA) — NRL, AFL,
                Swimming Australia, Cycling Australia, Athletics Australia, Rugby Australia, or
                any other WADA-compliant body — can use LactiGo with confidence.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "Every Batch Tested",
                  "250+ Prohibited Substances",
                  "WADA Prohibited List",
                  "Sport Integrity Australia Safe",
                  "Independently Verified",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full border border-[#3DC8D4]/30 text-[#3DC8D4] text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Order ────────────────────────────────────────────────────────────────────

function Order() {
  return (
    <section
      id="order"
      className="py-24"
      style={{ backgroundColor: "var(--card)", borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#3DC8D4]/30 bg-[#3DC8D4]/8 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-[#3DC8D4]" />
          <span className="text-xs text-[#3DC8D4] font-medium tracking-widest uppercase">
            Order LactiGo in Australia
          </span>
        </div>

        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6"
          style={{ color: "var(--foreground)" }}
        >
          Ready to try it?
        </h2>
        <p className="text-base mb-10 leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
          Order LactiGo direct to Australia, or book a call to discuss the product,
          the research, and the right application protocol for your sport.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <a
            href={LINKS.purchaseAU}
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 rounded bg-[#3DC8D4] text-white font-bold text-base hover:bg-[#5FD8E2] transition-colors"
          >
            Buy LactiGo in Australia →
          </a>
          <a
            href={LINKS.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded border font-medium text-base transition-colors hover:border-[#3DC8D4]/50 hover:text-[#3DC8D4]"
            style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
          >
            Book a Call
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-xs" style={{ color: "var(--muted-foreground)" }}>
          {[
            "🏅 Informed Sport Certified",
            "🔬 Peer-Reviewed Research",
            "🇦🇺 Ships to Australia",
            "✉️ " + CONTACT.email,
          ].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

function FAQ() {
  const faqs = [
    {
      q: "Is LactiGo available in Australia?",
      a: "Yes. LactiGo is available to Australian athletes through Carnosine Advantage, the authorised Australian distributor. Order directly or get in touch to discuss.",
    },
    {
      q: "What is LactiGo?",
      a: "LactiGo is the world's only patented topical carnosine gel — a skin-applied product formulated to deliver carnosine directly over the target muscle group. It's backed by published peer-reviewed research and Informed Sport certified.",
    },
    {
      q: "Is it safe for drug-tested athletes?",
      a: "Yes. LactiGo is Informed Sport certified — every batch is independently tested for 250+ WADA-prohibited substances. Australian athletes competing under Sport Integrity Australia can use it without concern.",
    },
    {
      q: "How is LactiGo different from beta-alanine?",
      a: "Beta-alanine is an oral supplement that requires weeks to months of loading to raise muscle carnosine levels and causes skin tingling in most users. LactiGo is applied topically, has no loading phase, no tingling, and delivers carnosine directly to the target area rather than via the oral pathway.",
    },
    {
      q: "What sports is it used in?",
      a: "LactiGo is used across NHL, NFL, NBA, MLB, NCAA Division 1, European football, UFC, and a range of other elite programmes. In Australia it's relevant across rugby union, rugby league, AFL, swimming, cycling, athletics, CrossFit, and any sport involving repeated high-intensity effort.",
    },
    {
      q: "How do I use it?",
      a: "Apply to clean, dry skin over the target muscle group 30–45 minutes before activity. Rub in until absorbed (30–45 seconds). Re-apply post-activity as part of cool-down. That's the standard protocol used in published research.",
    },
  ];

  return (
    <section
      className="py-24"
      style={{ backgroundColor: "var(--background)", borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-3xl mx-auto px-6">
        <h2
          className="text-3xl sm:text-4xl font-black tracking-tight mb-12 text-center"
          style={{ color: "var(--foreground)" }}
        >
          Questions about LactiGo in Australia
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
            <Link to="/blog" className="hover:text-[#3DC8D4] transition-colors">Blog</Link>
            <Link to="/topical-carnosine-gel-australia" className="hover:text-[#3DC8D4] transition-colors">Topical Carnosine Gel</Link>
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

export function LactigoAustraliaPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      <Nav />
      <Hero />
      <WhatIsLactiGo />
      <WhoUsesIt />
      <Research />
      <Certified />
      <Order />
      <FAQ />
      <Footer />
    </div>
  );
}
