/**
 * /topical-carnosine-gel-australia
 *
 * Dedicated landing page targeting:
 * - "topical carnosine gel australia"
 * - "topical carnosine gel"
 * - "carnosine gel australia"
 *
 * Copy is TGA-compliant: performance-support framing, no therapeutic claims.
 * References the published 2025 rugby sevens study and Informed Sport certification.
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
          <a href="#what-is" className="hover:text-[#3DC8D4] transition-colors">What Is It</a>
          <a href="#how-it-works" className="hover:text-[#3DC8D4] transition-colors">How It Works</a>
          <a href="#research" className="hover:text-[#3DC8D4] transition-colors">Research</a>
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
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#3DC8D4]/6 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#3DC8D4]/30 bg-[#3DC8D4]/8 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-[#3DC8D4] animate-pulse" />
          <span className="text-xs text-[#3DC8D4] font-medium tracking-widest uppercase">
            Informed Sport Certified · Peer-Reviewed Research · Available in Australia
          </span>
        </div>

        {/* H1 — exact keyword target */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6"
          style={{ color: "var(--foreground)" }}
        >
          Topical carnosine gel{" "}
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

        {/* Subheadline */}
        <p
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: "var(--muted-foreground)" }}
        >
          LactiGo is the world's only patented topical carnosine-based gel — applied directly
          to the skin over working muscles. Backed by published research. Informed Sport certified.
          Used by 16,500+ professional athletes worldwide.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href={LINKS.purchaseAU}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-10 py-4 rounded bg-[#3DC8D4] text-white font-bold text-base hover:bg-[#5FD8E2] transition-colors"
          >
            Order in Australia →
          </a>
          <a
            href="#research"
            className="w-full sm:w-auto px-8 py-4 rounded border font-medium text-base transition-colors hover:border-[#3DC8D4]/50 hover:text-[#3DC8D4]"
            style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
          >
            See the Research ↓
          </a>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { value: "16,500+", label: "Professional Athletes" },
            { value: "NHL · NFL · NBA", label: "Pro Leagues Using It" },
            { value: "Informed Sport", label: "Every Batch Tested" },
            { value: "2025 Study", label: "Peer-Reviewed Evidence" },
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

// ─── What Is Topical Carnosine ────────────────────────────────────────────────

function WhatIsIt() {
  return (
    <section id="what-is" className="py-24" style={{ backgroundColor: "var(--card)", borderTop: "1px solid var(--border)" }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2
            className="text-3xl sm:text-4xl font-black tracking-tight mb-4"
            style={{ color: "var(--foreground)" }}
          >
            What is topical carnosine gel?
          </h2>
          <p className="text-base max-w-2xl mx-auto" style={{ color: "var(--muted-foreground)" }}>
            Carnosine is a dipeptide (beta-alanine + histidine) naturally present in skeletal
            muscle and the brain. It's associated with intracellular pH buffering, antioxidant
            activity, and supporting muscle function during high-intensity exercise — and has been
            studied extensively for over 40 years.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Oral problem */}
          <div
            className="rounded-2xl p-8"
            style={{ border: "1px solid var(--border)", backgroundColor: "var(--background)" }}
          >
            <div className="text-2xl mb-4">⚠️</div>
            <h3 className="text-lg font-bold mb-3" style={{ color: "var(--foreground)" }}>
              The problem with oral carnosine
            </h3>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--muted-foreground)" }}>
              Oral carnosine breaks down rapidly in the bloodstream before it can reach muscle
              tissue. Beta-alanine (the precursor) requires weeks to months of daily loading to
              raise muscle carnosine levels — and causes skin tingling in most users.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              Studies show approximately 97% of oral beta-alanine is directed to other pathways,
              not carnosine synthesis.
            </p>
          </div>

          {/* Topical solution */}
          <div
            className="rounded-2xl p-8 border border-[#3DC8D4]/30"
            style={{ backgroundColor: "rgba(61,200,212,0.05)" }}
          >
            <div className="text-2xl mb-4">✓</div>
            <h3 className="text-lg font-bold mb-3 text-[#3DC8D4]">
              The topical delivery approach
            </h3>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--muted-foreground)" }}>
              LactiGo uses a patented carnosine + magnesium formulation designed to penetrate
              the skin directly over the target muscle group. A 2018 study using a 3D human skin
              model confirmed enhanced transepidermal penetration with this specific formulation.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              Applied to clean, dry skin 30–45 minutes before activity. Absorbs in under a minute.
              No tingling. No loading phase.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Apply to the target area",
      body: "Rub the gel into clean, dry skin over the muscle groups you're about to train — quads, hamstrings, calves, chest, shoulders. Takes 30–45 seconds to absorb.",
    },
    {
      num: "02",
      title: "Wait 30–45 minutes",
      body: "Allow time for the carnosine to penetrate the dermal vascular bed before activity begins. Most athletes apply during warm-up prep or before getting changed.",
    },
    {
      num: "03",
      title: "Train and observe",
      body: "Note perceived effort, late-session output, and how you feel in repeated bouts. Track your benchmarks — don't rely on feel alone. Let your own data tell the story.",
    },
    {
      num: "04",
      title: "Re-apply post-activity",
      body: "Apply again after training as part of a cool-down routine to support recovery. This is the standard application protocol used in published research.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24" style={{ backgroundColor: "var(--background)" }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2
            className="text-3xl sm:text-4xl font-black tracking-tight mb-4"
            style={{ color: "var(--foreground)" }}
          >
            How to use it
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--muted-foreground)" }}>
            Simple protocol. No loading phase. No side effects.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="rounded-2xl p-8"
              style={{ border: "1px solid var(--border)", backgroundColor: "var(--card)" }}
            >
              <div className="text-3xl font-black text-[#3DC8D4]/40 mb-3">{step.num}</div>
              <h3 className="text-base font-bold mb-2" style={{ color: "var(--foreground)" }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                {step.body}
              </p>
            </div>
          ))}
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
            The research behind it
          </h2>
          <p className="text-base max-w-2xl mx-auto" style={{ color: "var(--muted-foreground)" }}>
            Carnosine has 40+ years of peer-reviewed research. The topical delivery approach
            is more recent — here's what's been published.
          </p>
        </div>

        <div className="space-y-6">
          {/* Study 1 — Rugby sevens */}
          <div
            className="rounded-2xl p-8"
            style={{ border: "1px solid var(--border)", backgroundColor: "var(--background)" }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#3DC8D4]/15 flex items-center justify-center">
                <span className="text-[#3DC8D4] font-bold text-sm">1</span>
              </div>
              <div>
                <div className="text-xs font-semibold text-[#3DC8D4] uppercase tracking-widest mb-1">
                  2025 — Peer-Reviewed Sports Performance Study
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: "var(--foreground)" }}>
                  Topical carnosine gel and repeated high-intensity exercise performance
                </h3>
                <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--muted-foreground)" }}>
                  A 2025 peer-reviewed study examined the effects of topical carnosine gel on
                  performance in world-class rugby sevens players — an elite population performing
                  repeated bouts of high-intensity exercise. The study found that topical application
                  may support performance during repeated high-intensity efforts.
                </p>
                <p className="text-xs italic" style={{ color: "var(--muted-foreground)", opacity: 0.7 }}>
                  Rugby sevens requires repeated short maximal bursts with incomplete recovery — the exact
                  metabolic environment where muscle buffering capacity is most relevant.
                </p>
              </div>
            </div>
          </div>

          {/* Study 2 — Skin penetration */}
          <div
            className="rounded-2xl p-8"
            style={{ border: "1px solid var(--border)", backgroundColor: "var(--background)" }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#3DC8D4]/15 flex items-center justify-center">
                <span className="text-[#3DC8D4] font-bold text-sm">2</span>
              </div>
              <div>
                <div className="text-xs font-semibold text-[#3DC8D4] uppercase tracking-widest mb-1">
                  2018 — Transepidermal Penetration Research
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: "var(--foreground)" }}>
                  Enhanced skin penetration via carnosine + magnesium complex
                </h3>
                <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--muted-foreground)" }}>
                  Using a validated 3D human skin model, researchers demonstrated that the specific
                  carnosine + magnesium formulation used in LactiGo produced enhanced transepidermal
                  penetration compared to controls. This establishes the scientific plausibility of
                  the topical delivery mechanism.
                </p>
                <p className="text-xs italic" style={{ color: "var(--muted-foreground)", opacity: 0.7 }}>
                  The patented formulation ratio matters — competing products tested in similar models
                  showed insufficient penetration without this specific complex.
                </p>
              </div>
            </div>
          </div>

          {/* ANZCTR */}
          <div
            className="rounded-2xl p-8"
            style={{ border: "1px solid var(--border)", backgroundColor: "var(--background)" }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#3DC8D4]/15 flex items-center justify-center">
                <span className="text-[#3DC8D4] font-bold text-sm">3</span>
              </div>
              <div>
                <div className="text-xs font-semibold text-[#3DC8D4] uppercase tracking-widest mb-1">
                  ANZCTR Registered Trial
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: "var(--foreground)" }}>
                  Ongoing research registered with the Australian clinical trials registry
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                  LactiGo research is registered with the Australian New Zealand Clinical Trials Registry
                  (ANZCTR), reflecting an ongoing commitment to properly designed, independently verified
                  human research. This is not a category where most sports supplements invest.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Carnosine research context */}
        <div className="mt-10 p-6 rounded-2xl border border-[#3DC8D4]/20 bg-[#3DC8D4]/5">
          <p className="text-sm text-center leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
            <span className="text-[#3DC8D4] font-semibold">40+ years of carnosine research</span> —
            carnosine has been studied extensively for its role in intracellular pH buffering,
            antioxidant activity, and anti-glycation. The topical delivery research sits on top
            of this established scientific foundation, not in place of it.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Who Is It For ────────────────────────────────────────────────────────────

function WhoIsItFor() {
  const groups = [
    {
      icon: "🏉",
      title: "Team sport athletes",
      body: "Rugby union, rugby league, AFL, soccer — repeated sprint sports where fatigue accumulates across the game. Applied pre-match and at half-time.",
    },
    {
      icon: "🏋️",
      title: "Gym & CrossFit athletes",
      body: "High-rep work, AMRAPs, metcons, and strength-endurance sessions where late-set output matters. Apply to target muscle groups before training.",
    },
    {
      icon: "🏊",
      title: "Endurance athletes",
      body: "Cyclists, triathletes, swimmers and runners competing in efforts where sustained tolerance to metabolic demand is a factor.",
    },
    {
      icon: "🥊",
      title: "Combat sports athletes",
      body: "Boxing, MMA, grappling — sports with rounds and brief recovery. Tested by multiple UFC champions.",
    },
    {
      icon: "🎓",
      title: "Drug-tested athletes",
      body: "Informed Sport certified — every batch independently tested for WADA-prohibited substances. Safe for Sport Integrity Australia.",
    },
    {
      icon: "👴",
      title: "Active adults & masters",
      body: "Carnosine declines with age. Active adults using LactiGo as part of a training and recovery routine to support continued performance.",
    },
  ];

  return (
    <section className="py-24" style={{ backgroundColor: "var(--background)" }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2
            className="text-3xl sm:text-4xl font-black tracking-tight mb-4"
            style={{ color: "var(--foreground)" }}
          >
            Who uses topical carnosine gel?
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--muted-foreground)" }}>
            LactiGo is used across a wide range of sports and activity levels.
            The application protocol adapts to the sport.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {groups.map((g) => (
            <div
              key={g.title}
              className="rounded-2xl p-6"
              style={{ border: "1px solid var(--border)", backgroundColor: "var(--card)" }}
            >
              <div className="text-2xl mb-3">{g.icon}</div>
              <h3 className="text-sm font-bold mb-2" style={{ color: "var(--foreground)" }}>
                {g.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                {g.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Informed Sport ───────────────────────────────────────────────────────────

function InformedSport() {
  return (
    <section
      className="py-20"
      style={{ backgroundColor: "var(--card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="rounded-2xl p-8 md:p-12 border border-[#3DC8D4]/25 bg-[#3DC8D4]/5">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0 text-5xl">🏅</div>
            <div>
              <div className="text-xs font-semibold text-[#3DC8D4] uppercase tracking-widest mb-2">
                Informed Sport Certified
              </div>
              <h2 className="text-2xl font-black mb-4" style={{ color: "var(--foreground)" }}>
                Every batch independently tested
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted-foreground)" }}>
                LactiGo carries Informed Sport certification — meaning every production batch is
                independently tested by LGC Group for over 250 WADA-prohibited substances before
                it reaches athletes. This is not a one-time certification. Every batch. Every time.
              </p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--muted-foreground)" }}>
                For Australian athletes competing under Sport Integrity Australia (SIA) — NRL, AFL,
                Swimming Australia, Athletics Australia, Cycling Australia, or any other WADA-compliant
                body — Informed Sport certification is one of the most practical risk-reduction steps
                available when selecting a sports supplement.
              </p>
              <div className="flex flex-wrap gap-3 text-xs">
                {["Every Batch Tested", "250+ Prohibited Substances", "WADA-Compliant", "Sport Integrity Australia Safe"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full border border-[#3DC8D4]/30 text-[#3DC8D4]"
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

// ─── Australia CTA ────────────────────────────────────────────────────────────

function OrderAustralia() {
  return (
    <section id="order" className="py-24" style={{ backgroundColor: "var(--background)" }}>
      <div className="max-w-3xl mx-auto px-6 text-center">
        {/* Glow */}
        <div className="absolute left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#3DC8D4]/8 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#3DC8D4]/30 bg-[#3DC8D4]/8 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[#3DC8D4]" />
            <span className="text-xs text-[#3DC8D4] font-medium tracking-widest uppercase">
              Available in Australia
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6"
            style={{ color: "var(--foreground)" }}
          >
            Order topical carnosine gel in Australia
          </h2>
          <p className="text-base mb-10 leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
            LactiGo is available to Australian athletes now. Order direct, or book a call to talk
            through the product, the research, and whether it makes sense for your training.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href={LINKS.purchaseAU}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 rounded bg-[#3DC8D4] text-white font-bold text-base hover:bg-[#5FD8E2] transition-colors"
            >
              Order Now — Australia →
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

          {/* Reassurances */}
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
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

function FAQ() {
  const faqs = [
    {
      q: "What is topical carnosine gel?",
      a: "Topical carnosine gel is a skin-applied product containing carnosine — a dipeptide found naturally in muscle and brain tissue — formulated for transdermal delivery. LactiGo is the only patented version with published peer-reviewed research supporting its sports performance application.",
    },
    {
      q: "Is it legal for drug-tested athletes in Australia?",
      a: "Yes. LactiGo is Informed Sport certified — every batch is independently tested for 250+ WADA-prohibited substances. It is safe to use for athletes under Sport Integrity Australia and any WADA-compliant testing regime.",
    },
    {
      q: "How is it different from oral beta-alanine?",
      a: "Beta-alanine is an oral precursor that requires weeks to months of daily loading to raise muscle carnosine levels, and causes skin tingling in most users. LactiGo is applied topically, has no loading phase, and doesn't cause tingling. The formulations are entirely different in their delivery mechanism.",
    },
    {
      q: "Where do I apply it?",
      a: "Apply to clean, dry skin directly over the target muscle group — quads, hamstrings, calves, chest, shoulders. Rub in for 30–45 seconds until absorbed. Apply 30–45 minutes before activity and again post-activity as part of a cool-down routine.",
    },
    {
      q: "Is it available in Australia?",
      a: "Yes. Order direct through our Australian link. If you have questions about the product, research, or application protocol, book a call and we can walk through it.",
    },
    {
      q: "What evidence supports it?",
      a: "A 2025 peer-reviewed study with world-class rugby sevens players found that topical carnosine gel may support performance during repeated high-intensity exercise bouts. A 2018 study confirmed enhanced transepidermal penetration of the carnosine + magnesium formulation in a 3D human skin model. Ongoing research is registered with the ANZCTR.",
    },
  ];

  return (
    <section
      className="py-24"
      style={{ backgroundColor: "var(--card)", borderTop: "1px solid var(--border)" }}
    >
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
              style={{ border: "1px solid var(--border)", backgroundColor: "var(--background)" }}
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

export function TopicalCarnosineGelPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      <Nav />
      <Hero />
      <WhatIsIt />
      <HowItWorks />
      <Research />
      <WhoIsItFor />
      <InformedSport />
      <OrderAustralia />
      <FAQ />
      <Footer />
    </div>
  );
}
