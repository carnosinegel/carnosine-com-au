import { useState } from "react";
import { useAction } from "convex/react";
import { Link } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import { LINKS, CONTACT } from "@/lib/constants";
import { useTheme } from "@/context/ThemeContext";

// ─── Theme Toggle ────────────────────────────────────────────────────────────

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle light/dark mode"
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-200"
      style={{
        borderColor: "var(--border)",
        color: "var(--muted-foreground)",
        backgroundColor: "var(--muted)",
      }}
    >
      {theme === "dark" ? (
        <>
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
          Light
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
          Dark
        </>
      )}
    </button>
  );
}

// ─── Nav ────────────────────────────────────────────────────────────────────

function Nav() {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const logoSrc = theme === "dark" ? "/logo-dark.png" : "/logo-light.png";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{
        borderBottom: "1px solid var(--border)",
        backgroundColor: theme === "dark" ? "rgba(10,10,12,0.92)" : "rgba(247,246,242,0.92)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <img
            src={logoSrc}
            alt="The Carnosine Advantage"
            className="logo-img object-contain"
            style={{ height: "36px", maxWidth: "200px" }}
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: "var(--muted-foreground)" }}>
          <a href="#science" className="hover:text-[#C8972A] transition-colors">Science</a>
          <a href="#product" className="hover:text-[#C8972A] transition-colors">Product</a>
          <a href="#practitioners" className="hover:text-[#C8972A] transition-colors">Practitioners</a>
          <a href="#opportunity" className="hover:text-[#C8972A] transition-colors">Join Us</a>
          <Link to="/blog" className="hover:text-[#C8972A] transition-colors">Blog</Link>
          <a href="#order" className="text-[#C8972A] font-semibold hover:text-[#E8B84B] transition-colors">Order</a>
        </div>

        {/* CTA + Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <a
            href={LINKS.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-2 rounded border border-[#C8972A] text-[#C8972A] hover:bg-[#C8972A]/10 transition-colors"
          >
            Book a Call
          </a>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            style={{ color: "var(--muted-foreground)" }}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-6 py-4 flex flex-col gap-4 text-sm"
          style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--card)", color: "var(--muted-foreground)" }}
        >
          {["#science", "#product", "#practitioners", "#opportunity", "#order"].map((href) => (
            <a key={href} href={href} className="hover:text-[#C8972A] transition-colors capitalize" onClick={() => setOpen(false)}>
              {href.slice(1)}
            </a>
          ))}
          <Link to="/blog" className="hover:text-[#C8972A] transition-colors" onClick={() => setOpen(false)}>Blog</Link>
          <a
            href={LINKS.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-center py-2 rounded border border-[#C8972A] text-[#C8972A]"
            onClick={() => setOpen(false)}
          >
            Book a Call
          </a>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  const { theme } = useTheme();
  return (
    <section
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* No grid background */}
      {/* Amber glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#C8972A]/6 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">

        {/* Hero logo */}
        <div className="flex justify-center mb-10">
          <img
            src={theme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
            alt="The Carnosine Advantage"
            className="logo-img object-contain"
            style={{ height: "100px", maxWidth: "420px" }}
          />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C8972A]/30 bg-[#C8972A]/8 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-[#C8972A] animate-pulse" />
          <span className="text-xs text-[#C8972A] font-medium tracking-widest uppercase">
            Informed Sport Certified · World's Only Topical Carnosine
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6"
          style={{ color: "var(--foreground)" }}
        >
          The molecule elite<br />
          athletes rely on.{" "}
          <span
            className="inline-block"
            style={{
              background: "linear-gradient(135deg, #C8972A 0%, #E8B84B 50%, #C8972A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Now topical.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
          The world's only topical carnosine gel — peer-reviewed science,
          applied directly to muscle. No pills. No gut load. No waiting.
          Used by 16,500+ athletes across the NHL, NFL, NBA and Olympic programmes.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#order"
            className="w-full sm:w-auto px-10 py-4 rounded bg-[#C8972A] text-white font-bold text-base hover:bg-[#E8B84B] transition-colors shadow-[0_0_30px_rgba(200,151,42,0.3)]"
          >
            Order Now →
          </a>
          <a
            href="#science"
            className="w-full sm:w-auto px-8 py-4 rounded border font-medium text-base transition-colors hover:border-[#C8972A]/50 hover:text-[#C8972A]"
            style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
          >
            See the Science ↓
          </a>
        </div>

        {/* Social proof bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { value: "16,500+", label: "Elite Athletes" },
            { value: "NHL · NFL · NBA", label: "Pro Leagues" },
            { value: "Informed Sport", label: "Certified Safe" },
            { value: "40+ Years", label: "Peer-Reviewed Research" },
          ].map((stat) => (
            <div key={stat.label} className="py-4 px-3 rounded-xl" style={{ border: "1px solid var(--border)", backgroundColor: "var(--card)" }}>
              <div className="text-sm sm:text-base font-black text-[#C8972A] leading-tight mb-1">{stat.value}</div>
              <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Science Strip ───────────────────────────────────────────────────────────

function ScienceStrip() {
  return (
    <section id="science" className="py-20 bg-[#0C0C0E] border-t border-[#1A1A1E]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="text-xs text-[#C8972A] font-medium tracking-widest uppercase mb-4">The Science</div>
          <h2 className="text-4xl font-black text-[#F0EFE8] mb-4 leading-tight">
            What is carnosine<br />and why does it matter?
          </h2>
          <p className="text-[#888880] max-w-2xl mx-auto leading-relaxed">
            Carnosine is a dipeptide found naturally in human muscle. As you push harder, hydrogen ions
            accumulate — carnosine neutralises them, delaying the burn and extending your output.
            The problem: oral supplements are destroyed before reaching muscle. Topical carnosine
            solves that — straight through the skin, direct to the tissue.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: "⚡",
              title: "Delay the Burn",
              desc: "Supports hydrogen ion buffering during high-intensity effort — helping sustain output in the moments that matter most.",
              stat: "300% more carnosine delivery vs oral",
            },
            {
              icon: "🎯",
              title: "Direct to Muscle",
              desc: "Applied to the skin over the working muscle. Bypasses digestion, no gut issues, no loading phase. Active in 30 minutes. Science-backed transdermal absorption.",
              stat: "50–100% increase in muscle carnosine",
            },
            {
              icon: "🏆",
              title: "Proven at the Highest Level",
              desc: "Used by Olympic athletes, NHL teams, NFL players and NBA franchises. Informed Sport certified — every batch tested for banned substances.",
              stat: "16,500+ elite athletes worldwide",
            },
          ].map((card) => (
            <div key={card.title} className="p-8 rounded-xl border border-[#2A2A2E] bg-[#121214] hover:border-[#C8972A]/30 transition-all group">
              <div className="text-3xl mb-4">{card.icon}</div>
              <h3 className="text-lg font-bold text-[#F0EFE8] mb-3 group-hover:text-[#C8972A] transition-colors">{card.title}</h3>
              <p className="text-[#888880] text-sm leading-relaxed mb-4">{card.desc}</p>
              <div className="text-xs text-[#C8972A] font-semibold border-t border-[#2A2A2E] pt-3">📊 {card.stat}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={LINKS.carnosinelab}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#C8972A] text-sm font-medium hover:text-[#E8B84B] transition-colors"
          >
            Deep-dive into the peer-reviewed research at The Carnosine Lab
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Product ─────────────────────────────────────────────────────────────────

function Product() {
  return (
    <section id="product" className="py-24 bg-[#0A0A0C]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-xs text-[#C8972A] font-medium tracking-widest uppercase mb-4">The Product</div>
          <h2 className="text-4xl font-black text-[#F0EFE8] mb-4">
            The performance gel.
          </h2>
          <p className="text-[#888880] max-w-xl mx-auto">
            Apply to working muscles before training or competition. No pills, no gut load, no waiting.
            Informed Sport certified — safe for competitive athletes.
          </p>
        </div>

        {/* Informed Sport trust badge */}
        <div className="mb-12 max-w-2xl mx-auto rounded-2xl border border-[#00C2CB]/20 bg-[#00C2CB]/5 p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="text-4xl">🏅</div>
          <div>
            <div className="text-sm font-bold text-[#F0EFE8] mb-1">Informed Sport Certified</div>
            <p className="text-xs text-[#888880] leading-relaxed">
              Every batch is independently tested for banned substances under the Informed Sport programme —
              the global standard for athlete-safe supplementation. WADA compliant.
            </p>
          </div>
        </div>

        {/* Who it's for */}
        <div className="rounded-2xl border border-[#C8972A]/20 bg-[#C8972A]/5 p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-black text-[#F0EFE8]">Who uses it?</h3>
          </div>
          <div className="space-y-6">
            <div>
              <div className="text-xs text-[#C8972A] font-medium tracking-widest uppercase text-center mb-3">Athletes</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                {["Combat Sports", "Cyclists & Runners", "Team Sport Athletes", "Coaches & Trainers"].map((who) => (
                  <div key={who} className="py-4 px-3 rounded-lg bg-[#0A0A0C] border border-[#2A2A2E]">
                    <span className="text-sm text-[#F0EFE8] font-medium">{who}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs text-[#C8972A] font-medium tracking-widest uppercase text-center mb-3">Practitioners</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                {["Physiotherapists", "Sports Medicine", "Exercise Physiologists", "Allied Health"].map((who) => (
                  <div key={who} className="py-4 px-3 rounded-lg bg-[#0A0A0C] border border-[#C8972A]/20">
                    <span className="text-sm text-[#C8972A] font-medium">{who}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs text-[#888880] font-medium tracking-widest uppercase text-center mb-3">General</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                {["Active Adults", "Weekend Warriors", "Healthy Ageing", "Recovery & Wellbeing"].map((who) => (
                  <div key={who} className="py-4 px-3 rounded-lg bg-[#0A0A0C] border border-[#2A2A2E]">
                    <span className="text-sm text-[#888880] font-medium">{who}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <a href="#order" className="inline-block px-8 py-3 rounded bg-[#C8972A] text-[#0A0A0C] font-bold text-sm hover:bg-[#E8B84B] transition-colors">
              Order Now →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Social Proof ────────────────────────────────────────────────────────────

function SocialProof() {
  return (
    <section className="py-16 bg-[#0C0C0E] border-y border-[#1A1A1E]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-xs text-[#555550] font-medium tracking-widest uppercase mb-2">Trusted by elite sport</p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-[#888880] font-bold text-lg">
            {["NHL", "NFL", "NBA", "Olympic Athletes", "16,500+ Athletes Worldwide"].map((league, i) => (
              <span key={league} className="flex items-center gap-4">
                {i > 0 && <span className="hidden sm:inline text-[#2A2A2E] font-light">|</span>}
                <span className="hover:text-[#C8972A] transition-colors">{league}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Key claims */}
        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              number: "300%",
              claim: "More carnosine delivered to muscle vs oral in published research",
              source: "Peer-reviewed transdermal delivery study — see Science page",
            },
            {
              number: "50–100%",
              claim: "Increase in muscle carnosine after a single application",
              source: "Human biopsy studies",
            },
            {
              number: "40+",
              claim: "Years of peer-reviewed research behind the science of carnosine",
              source: "Published clinical literature",
            },
          ].map((item) => (
            <div key={item.number} className="text-center p-6 rounded-xl border border-[#2A2A2E] bg-[#121214]">
              <div className="text-4xl font-black text-[#C8972A] mb-2">{item.number}</div>
              <p className="text-sm text-[#F0EFE8] font-medium mb-2 leading-snug">{item.claim}</p>
              <p className="text-xs text-[#555550]">{item.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Practitioners ───────────────────────────────────────────────────────────

function Practitioners() {
  return (
    <section id="practitioners" className="py-24 bg-[#0C0C0E]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-xs text-[#C8972A] font-medium tracking-widest uppercase mb-4">For Practitioners</div>
          <h2 className="text-4xl font-black text-[#F0EFE8] mb-4 leading-tight">
            Built for performance.<br />Relevant to practice.
          </h2>
          <p className="text-[#888880] max-w-2xl mx-auto leading-relaxed">
            Carnosine isn't just a sports compound — it's one of the most researched dipeptides in
            human physiology. Relevant across fatigue, recovery, healthy ageing, and cellular protection.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {[
            { icon: "🔬", title: "Fatigue & Recovery", desc: "pH buffering support for athletes and active people in structured training, rehab, or recovery programmes." },
            { icon: "🦴", title: "Rehab & Return to Play", desc: "Topical application to specific muscle groups — no systemic load, no gut issues, targeted support where it's needed." },
            { icon: "🧠", title: "Neuromuscular Research", desc: "Carnosine is one of the most researched dipeptides in human physiology — with published links to neuromuscular signalling and antioxidant activity." },
            { icon: "⏳", title: "Healthy Ageing", desc: "Anti-glycation and antioxidant properties make carnosine biologically relevant to active ageing and long-term muscle health." },
          ].map((card) => (
            <div key={card.title} className="p-7 rounded-xl border border-[#2A2A2E] bg-[#121214] hover:border-[#C8972A]/30 transition-colors group">
              <div className="text-3xl mb-4">{card.icon}</div>
              <h3 className="text-base font-bold text-[#F0EFE8] mb-3 group-hover:text-[#C8972A] transition-colors">{card.title}</h3>
              <p className="text-[#888880] text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-black text-[#F0EFE8] mb-3">Who's already using it?</h3>
            <div className="grid grid-cols-2 gap-3 mt-6">
              {[
                { icon: "🏥", label: "GPs & Sports Medicine" },
                { icon: "💪", label: "Physiotherapists" },
                { icon: "🏃", label: "Exercise Physiologists" },
                { icon: "🌿", label: "Naturopaths" },
                { icon: "🦶", label: "Podiatrists" },
                { icon: "🩺", label: "Allied Health Professionals" },
                { icon: "🏋️", label: "Strength & Conditioning" },
                { icon: "🔭", label: "Research & Academia" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 p-3 rounded-lg border border-[#2A2A2E] bg-[#0A0A0C]">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-xs text-[#A8A89C] font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-[#C8972A]/20 bg-[#C8972A]/5 p-8">
            <div className="text-xs text-[#C8972A] font-medium tracking-widest uppercase mb-4">Practitioner Enquiry</div>
            <h3 className="text-2xl font-black text-[#F0EFE8] mb-4 leading-snug">
              Are you a practitioner?<br />Let's talk.
            </h3>
            <p className="text-[#888880] text-sm leading-relaxed mb-6">
              We have a dedicated pathway for health professionals — product access, clinical education,
              and a practitioner partnership programme for clinics wanting to recommend or stock topical carnosine.
            </p>
            <div className="space-y-3">
              <a href="#contact" className="flex items-center justify-between w-full px-6 py-3 rounded bg-[#C8972A] text-[#0A0A0C] font-bold text-sm hover:bg-[#E8B84B] transition-colors">
                <span>Practitioner Enquiry →</span>
              </a>
              <a href={LINKS.carnosinelab} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full px-6 py-3 rounded border border-[#2A2A2E] text-[#888880] font-medium text-sm hover:border-[#C8972A]/50 hover:text-[#F0EFE8] transition-colors">
                <span>Explore the Research</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Opportunity ─────────────────────────────────────────────────────────────

function Opportunity() {
  return (
    <section id="opportunity" className="py-24 bg-[#0A0A0C]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-xs text-[#C8972A] font-medium tracking-widest uppercase mb-4">The Opportunity</div>
            <h2 className="text-4xl font-black text-[#F0EFE8] mb-6 leading-tight">
              Join the team.<br />Own the market.
            </h2>
            <p className="text-[#888880] leading-relaxed mb-8">
              The Australian carnosine market is wide open. We're building a team who understand
              performance and physiology, trust the science, and want to build something real.
              This isn't a side hustle pitch — it's an early position in a growing market.
            </p>
            <div className="space-y-4 mb-10">
              {[
                "Direct commission on every sale through your link",
                "Full product access and education resources",
                "Build your own network of athletes, coaches, and practitioners",
                "Dedicated practitioner partnership pathway for clinics",
                "Support from The Carnosine Lab worldwide team",
                "Ground floor in the Australian market",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full border border-[#C8972A] flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-[#C8972A]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[#A8A89C] text-sm">{point}</span>
                </div>
              ))}
            </div>
            <a
              href={LINKS.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded bg-[#C8972A] text-[#0A0A0C] font-bold text-sm hover:bg-[#E8B84B] transition-colors inline-block"
            >
              Talk to the Team
            </a>
          </div>

          <div className="rounded-2xl border border-[#2A2A2E] bg-[#121214] p-8">
            <div className="text-4xl mb-4 text-[#C8972A]">"</div>
            <p className="text-[#F0EFE8] text-lg font-medium leading-relaxed mb-6">
              The science is 40 years deep. The delivery is new. The Australian market is
              open. We're at the start of something — and we're looking for people who
              see it before everyone else does.
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-[#2A2A2E]">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C8972A] to-[#E8B84B] flex items-center justify-center">
                <span className="text-[#0A0A0C] font-black text-sm">V</span>
              </div>
              <div>
                <div className="text-[#F0EFE8] text-sm font-semibold">Viktor</div>
                <div className="text-[#555550] text-xs">Carnosine Performance · Australia</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Order ───────────────────────────────────────────────────────────────────

function Order() {
  return (
    <section id="order" className="py-24 bg-[#0C0C0E]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="text-xs text-[#C8972A] font-medium tracking-widest uppercase mb-4">Get the Gel</div>
        <h2 className="text-4xl font-black text-[#F0EFE8] mb-4 leading-tight">
          Ready to order?
        </h2>
        <p className="text-[#888880] max-w-xl mx-auto mb-12 leading-relaxed">
          Australian orders go direct through us. USA and Canada orders ship from The Carnosine Lab via our affiliate link.
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <a
            href={LINKS.purchaseAU}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-8 rounded-2xl border border-[#C8972A]/30 bg-[#C8972A]/5 hover:bg-[#C8972A]/10 hover:border-[#C8972A]/60 transition-all text-left"
          >
            <div className="text-4xl mb-4">🇦🇺</div>
            <h3 className="text-xl font-bold text-[#F0EFE8] mb-2 group-hover:text-[#E8B84B] transition-colors">Australia</h3>
            <p className="text-[#888880] text-sm leading-relaxed mb-6">
              Secure checkout via PayPal. Ships from Australia. Direct from Carnosine Performance.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#C8972A] text-[#0A0A0C] font-bold text-sm group-hover:bg-[#E8B84B] transition-colors">
              Buy Now — AU
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </a>

          <a
            href={LINKS.purchaseUSCA}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-8 rounded-2xl border border-[#2A2A2E] bg-[#121214] hover:border-[#C8972A]/30 hover:bg-[#C8972A]/5 transition-all text-left"
          >
            <div className="text-4xl mb-4">🇺🇸🇨🇦</div>
            <h3 className="text-xl font-bold text-[#F0EFE8] mb-2 group-hover:text-[#E8B84B] transition-colors">USA &amp; Canada</h3>
            <p className="text-[#888880] text-sm leading-relaxed mb-6">
              Ships direct from The Carnosine Lab. Same product, same science — via our affiliate link.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded border border-[#C8972A]/40 text-[#C8972A] font-bold text-sm group-hover:border-[#C8972A] transition-colors">
              Buy Now — US/CA
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </a>
        </div>

        <p className="mt-8 text-xs text-[#555550]">
          Somewhere else? <a href="#contact" className="text-[#C8972A] hover:text-[#E8B84B] transition-colors">Get in touch</a> — we'll sort you out.
        </p>
      </div>
    </section>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────

function Contact() {
  const submitLead = useAction(api.leads.submitLead);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", interest: "general" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email) return;
    setStatus("sending");
    try {
      await submitLead({
        name: form.name || undefined,
        email: form.email,
        phone: form.phone || undefined,
        message: form.message || undefined,
        interest: form.interest,
        market: "au",
        source: "carnosine.com.au",
      });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0A0A0C]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <div className="text-xs text-[#C8972A] font-medium tracking-widest uppercase mb-4">Get in Touch</div>
            <h2 className="text-4xl font-black text-[#F0EFE8] mb-6 leading-tight">
              Ready to talk?
            </h2>
            <p className="text-[#888880] leading-relaxed mb-8">
              Whether you want to try the product, explore the opportunity, or have questions —
              reach out. Real conversations, real people.
            </p>
            <div className="space-y-4 mb-8">
              <a
                href={LINKS.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-[#2A2A2E] bg-[#121214] hover:border-[#C8972A]/40 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#C8972A]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#C8972A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[#F0EFE8] text-sm font-semibold group-hover:text-[#C8972A] transition-colors">Book a 30min Call</div>
                  <div className="text-[#555550] text-xs">Zoom · calendly.com/carnosine</div>
                </div>
                <svg className="w-4 h-4 text-[#555550] ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-4 p-4 rounded-xl border border-[#2A2A2E] bg-[#121214] hover:border-[#C8972A]/40 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#C8972A]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#C8972A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[#F0EFE8] text-sm font-semibold group-hover:text-[#C8972A] transition-colors">Email Us</div>
                  <div className="text-[#555550] text-xs">{CONTACT.email}</div>
                </div>
                <svg className="w-4 h-4 text-[#555550] ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href={LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-[#2A2A2E] bg-[#121214] hover:border-[#C8972A]/40 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#C8972A]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#C8972A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                  </svg>
                </div>
                <div>
                  <div className="text-[#F0EFE8] text-sm font-semibold group-hover:text-[#C8972A] transition-colors">Follow on Instagram</div>
                  <div className="text-[#555550] text-xs">@thecarnosineadvantage</div>
                </div>
                <svg className="w-4 h-4 text-[#555550] ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right: form */}
          <div className="rounded-2xl border border-[#2A2A2E] bg-[#121214] p-8">
            <h3 className="text-xl font-bold text-[#F0EFE8] mb-6">Send us a message</h3>
            {status === "done" ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">✅</div>
                <p className="text-[#F0EFE8] font-semibold mb-2">Got it — we'll be in touch soon.</p>
                <p className="text-[#888880] text-sm">Expect a reply within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs text-[#888880] font-medium mb-1.5 uppercase tracking-wider">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#0A0A0C] border border-[#2A2A2E] text-[#F0EFE8] placeholder-[#555550] text-sm focus:outline-none focus:border-[#C8972A]/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#888880] font-medium mb-1.5 uppercase tracking-wider">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#0A0A0C] border border-[#2A2A2E] text-[#F0EFE8] placeholder-[#555550] text-sm focus:outline-none focus:border-[#C8972A]/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#888880] font-medium mb-1.5 uppercase tracking-wider">Phone</label>
                  <input
                    type="tel"
                    placeholder="+61 4xx xxx xxx"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#0A0A0C] border border-[#2A2A2E] text-[#F0EFE8] placeholder-[#555550] text-sm focus:outline-none focus:border-[#C8972A]/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#888880] font-medium mb-1.5 uppercase tracking-wider">I'm interested in</label>
                  <select
                    value={form.interest}
                    onChange={(e) => setForm({ ...form, interest: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#0A0A0C] border border-[#2A2A2E] text-[#F0EFE8] text-sm focus:outline-none focus:border-[#C8972A]/50 transition-colors"
                  >
                    <option value="general">Trying the product</option>
                    <option value="practitioner">Practitioner partnership</option>
                    <option value="distributor">Distribution opportunity</option>
                    <option value="wholesale">Wholesale / bulk order</option>
                    <option value="athlete">Athlete programme</option>
                    <option value="other">Something else</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-[#888880] font-medium mb-1.5 uppercase tracking-wider">Message</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us a bit about yourself..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#0A0A0C] border border-[#2A2A2E] text-[#F0EFE8] placeholder-[#555550] text-sm focus:outline-none focus:border-[#C8972A]/50 transition-colors resize-none"
                  />
                </div>
                {status === "error" && (
                  <p className="text-red-400 text-xs">Something went wrong. Try emailing us directly at {CONTACT.email}</p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-3 rounded bg-[#C8972A] text-[#0A0A0C] font-bold text-sm hover:bg-[#E8B84B] transition-colors disabled:opacity-50"
                >
                  {status === "sending" ? "Sending..." : "Send Message →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  const { theme } = useTheme();
  return (
    <footer className="py-12" style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--card)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src={theme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
              alt="The Carnosine Advantage"
              className="logo-img object-contain"
              style={{ height: "32px", maxWidth: "160px" }}
            />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs" style={{ color: "var(--muted-foreground)" }}>
            <Link to="/blog" className="hover:text-[#C8972A] transition-colors">Blog</Link>
            <a href={LINKS.carnosinelab} target="_blank" rel="noopener noreferrer" className="hover:text-[#C8972A] transition-colors">The Carnosine Lab</a>
            <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#C8972A] transition-colors">Instagram</a>
            <a href={`mailto:${CONTACT.email}`} className="hover:text-[#C8972A] transition-colors">{CONTACT.email}</a>
          </div>
        </div>
        <div className="mt-8 pt-6 text-center" style={{ borderTop: "1px solid var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--muted-foreground)", opacity: 0.5 }}>
            © {new Date().getFullYear()} Carnosine Performance Pty Ltd · Australia
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export function LandingPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      <Nav />
      <Hero />
      <ScienceStrip />
      <SocialProof />
      <Product />
      <Practitioners />
      <Opportunity />
      <Order />
      <Contact />
      <Footer />
    </div>
  );
}
