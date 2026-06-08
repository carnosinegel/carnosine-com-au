import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { LINKS, CONTACT } from "@/lib/constants";

// ─── Sub-components ────────────────────────────────────────────────────────

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0A0A0C]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded bg-[#C8972A] flex items-center justify-center">
            <span className="text-[#0A0A0C] font-black text-sm tracking-tighter">CP</span>
          </div>
          <span className="font-semibold text-[#F0EFE8] text-sm tracking-wide hidden sm:inline">
            Carnosine Performance
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 text-sm text-[#888880]">
          <a href="#about" className="hover:text-[#F0EFE8] transition-colors">About</a>
          <a href="#product" className="hover:text-[#F0EFE8] transition-colors">Product</a>
          <a href="#practitioners" className="hover:text-[#F0EFE8] transition-colors">Practitioners</a>
          <a href="#opportunity" className="hover:text-[#F0EFE8] transition-colors">Opportunity</a>
          <a href="#team" className="hover:text-[#F0EFE8] transition-colors">Team</a>
          <a href="#contact" className="hover:text-[#F0EFE8] transition-colors">Contact</a>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={LINKS.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-2 rounded border border-[#C8972A] text-[#C8972A] hover:bg-[#C8972A]/10 transition-colors"
          >
            Book a Call
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#888880] hover:text-[#F0EFE8]"
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

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/5 bg-[#0E0E10] px-6 py-4 flex flex-col gap-4 text-sm text-[#888880]">
          {["#about", "#product", "#practitioners", "#opportunity", "#team", "#contact"].map((href) => (
            <a key={href} href={href} className="hover:text-[#F0EFE8] transition-colors capitalize" onClick={() => setOpen(false)}>
              {href.slice(1)}
            </a>
          ))}
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

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-grid pt-16 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#C8972A]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C8972A]/30 bg-[#C8972A]/8 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-[#C8972A] animate-pulse" />
          <span className="text-xs text-[#C8972A] font-medium tracking-widest uppercase">
            Australian Distributor · Topical Carnosine
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#F0EFE8] leading-[1.05] mb-6">
          Performance is{" "}
          <span className="text-gold-gradient">chemistry.</span>
          <br />
          Now you can use it.
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-[#888880] max-w-2xl mx-auto mb-12 leading-relaxed">
          Carnosine Performance is the Australian home of topical carnosine — the world's only
          topical carnosine gel backed by peer-reviewed science and trusted by elite athletes,
          coaches, health practitioners, and everyday people who take recovery seriously.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 rounded bg-[#C8972A] text-[#0A0A0C] font-bold text-base hover:bg-[#E8B84B] transition-colors glow-gold"
          >
            Register Interest →
          </a>
          <a
            href="#about"
            className="w-full sm:w-auto px-8 py-4 rounded border border-[#2A2A2E] text-[#888880] font-medium text-base hover:border-[#C8972A]/50 hover:text-[#F0EFE8] transition-colors"
          >
            Learn More
          </a>
        </div>

        {/* Trust badges */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-xs text-[#555550]">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#C8972A]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Used by Olympic athletes</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#C8972A]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Peer-reviewed science</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#C8972A]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Trusted by health practitioners</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 bg-[#0C0C0E]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <div className="text-xs text-[#C8972A] font-medium tracking-widest uppercase mb-4">About Us</div>
            <h2 className="text-4xl font-black text-[#F0EFE8] mb-6 leading-tight">
              The Australian home<br />of carnosine science.
            </h2>
            <p className="text-[#888880] leading-relaxed mb-6">
              We are the Australian distributor and promoters of the world's most advanced topical
              carnosine delivery system. Our mission is to bring the science of carnosine
              to Australian athletes, coaches, health practitioners, and everyday people who want
              more from their physiology.
            </p>
            <p className="text-[#888880] leading-relaxed mb-8">
              Carnosine is one of the most studied molecules in human physiology — not just sport.
              It buffers lactic acid, delays muscle fatigue, supports neuromuscular function, and has
              documented antioxidant and anti-glycation properties relevant across clinical practice.
              The gel delivers it directly through the skin — where it works, without gut issues or
              loading periods.
            </p>
            <a
              href={LINKS.carnosinelab}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#C8972A] text-sm font-medium hover:text-[#E8B84B] transition-colors"
            >
              Deep-dive into the science at The Carnosine Lab
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "40+", label: "Years of research", sub: "across sport & clinical science" },
              { value: "1st", label: "Topical delivery", sub: "direct to muscle tissue" },
              { value: "100%", label: "Natural compound", sub: "found in human muscle" },
              { value: "AU", label: "Exclusive distribution", sub: "via Carnosine Performance" },
            ].map((stat) => (
              <div key={stat.label} className="p-6 rounded-xl border border-[#2A2A2E] bg-[#121214]">
                <div className="text-3xl font-black text-[#C8972A] mb-1">{stat.value}</div>
                <div className="text-sm font-semibold text-[#F0EFE8] mb-1">{stat.label}</div>
                <div className="text-xs text-[#555550]">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Product() {
  return (
    <section id="product" className="py-24 bg-[#0A0A0C] bg-grid">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-xs text-[#C8972A] font-medium tracking-widest uppercase mb-4">The Product</div>
          <h2 className="text-4xl font-black text-[#F0EFE8] mb-4">
            Topical Carnosine. The performance gel.
          </h2>
          <p className="text-[#888880] max-w-xl mx-auto">
            Applied directly to working muscles before training or competition. No pills, no gut load, no waiting.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: "⚡",
              title: "Buffer Lactic Acid",
              desc: "Carnosine neutralises hydrogen ions that accumulate during intense effort — the 'burn' that forces you to stop. More buffer means more output, faster recovery, and less fatigue accumulation.",
            },
            {
              icon: "🧬",
              title: "Topical Delivery",
              desc: "Applied directly to the target muscle group. The gel bypasses digestion entirely — no loading period, no gut discomfort, immediate local concentration. Practical for athletes and patients alike.",
            },
            {
              icon: "🏆",
              title: "Science-Backed",
              desc: "40+ years of published research across sports science, clinical nutrition, and physiology. Used by Olympic athletes and referenced by practitioners across multiple health disciplines.",
            },
          ].map((card) => (
            <div key={card.title} className="p-8 rounded-xl border border-[#2A2A2E] bg-[#121214] hover:border-[#C8972A]/30 transition-colors group">
              <div className="text-3xl mb-4">{card.icon}</div>
              <h3 className="text-lg font-bold text-[#F0EFE8] mb-3 group-hover:text-[#C8972A] transition-colors">{card.title}</h3>
              <p className="text-[#888880] text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Who it's for */}
        <div className="rounded-2xl border border-[#C8972A]/20 bg-[#C8972A]/5 p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-black text-[#F0EFE8]">Who uses it?</h3>
          </div>
          <div className="mb-4">
            <div className="text-xs text-[#C8972A] font-medium tracking-widest uppercase text-center mb-3">Athletes</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              {["Combat Athletes", "Cyclists & Runners", "Team Sport Athletes", "Coaches & Trainers"].map((who) => (
                <div key={who} className="py-4 px-3 rounded-lg bg-[#0A0A0C] border border-[#2A2A2E]">
                  <span className="text-sm text-[#F0EFE8] font-medium">{who}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <div className="text-xs text-[#C8972A] font-medium tracking-widest uppercase text-center mb-3">Practitioners</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              {["Physiotherapists", "Sports Medicine", "Exercise Physiologists", "Allied Health"].map((who) => (
                <div key={who} className="py-4 px-3 rounded-lg bg-[#0A0A0C] border border-[#C8972A]/20">
                  <span className="text-sm text-[#C8972A] font-medium">{who}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-8">
            <div className="text-xs text-[#888880] font-medium tracking-widest uppercase text-center mb-3">General Public</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              {["Active Adults", "Weekend Warriors", "Healthy Ageing", "Recovery & Wellbeing"].map((who) => (
                <div key={who} className="py-4 px-3 rounded-lg bg-[#0A0A0C] border border-[#2A2A2E]">
                  <span className="text-sm text-[#888880] font-medium">{who}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center">
            <a
              href="#contact"
              className="inline-block px-8 py-3 rounded bg-[#C8972A] text-[#0A0A0C] font-bold text-sm hover:bg-[#E8B84B] transition-colors"
            >
              Register Interest →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Practitioners() {
  return (
    <section id="practitioners" className="py-24 bg-[#0C0C0E]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-xs text-[#C8972A] font-medium tracking-widest uppercase mb-4">For Practitioners</div>
          <h2 className="text-4xl font-black text-[#F0EFE8] mb-4 leading-tight">
            Built for performance.<br />Relevant to practice.
          </h2>
          <p className="text-[#888880] max-w-2xl mx-auto leading-relaxed">
            Carnosine isn't just a sports compound — it's one of the most researched dipeptides in human physiology.
            The science spans fatigue, neuromuscular function, recovery, healthy ageing, and cellular protection,
            making it clinically relevant far beyond the gym.
          </p>
        </div>

        {/* Clinical use cases */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {[
            {
              icon: "🔬",
              title: "Fatigue Management",
              desc: "Carnosine buffers intramuscular pH during effort — relevant for patients with chronic fatigue, post-viral conditions, or those in structured rehab programs.",
            },
            {
              icon: "🦴",
              title: "Rehab & Recovery",
              desc: "Topical application to specific muscle groups supports post-injury and post-surgical recovery protocols — faster return to function with no systemic load.",
            },
            {
              icon: "🧠",
              title: "Neuromuscular Support",
              desc: "Research links carnosine to neuromuscular signalling and protection against oxidative stress — relevant to neurological rehab and functional movement goals.",
            },
            {
              icon: "⏳",
              title: "Healthy Ageing",
              desc: "Carnosine levels decline with age. The anti-glycation and antioxidant properties have documented relevance for sarcopenia management and metabolic health.",
            },
          ].map((card) => (
            <div key={card.title} className="p-7 rounded-xl border border-[#2A2A2E] bg-[#121214] hover:border-[#C8972A]/30 transition-colors group">
              <div className="text-3xl mb-4">{card.icon}</div>
              <h3 className="text-base font-bold text-[#F0EFE8] mb-3 group-hover:text-[#C8972A] transition-colors">{card.title}</h3>
              <p className="text-[#888880] text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Practitioner types + CTA */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: disciplines */}
          <div>
            <h3 className="text-2xl font-black text-[#F0EFE8] mb-3">Who's already using it?</h3>
            <p className="text-[#888880] text-sm leading-relaxed mb-6">
              Topical carnosine is being used by practitioners across a range of disciplines who want a
              science-backed, non-invasive tool to support patient outcomes.
            </p>
            <div className="grid grid-cols-2 gap-3">
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

          {/* Right: practitioner CTA box */}
          <div className="rounded-2xl border border-[#C8972A]/20 bg-[#C8972A]/5 p-8">
            <div className="text-xs text-[#C8972A] font-medium tracking-widest uppercase mb-4">Practitioner Enquiry</div>
            <h3 className="text-2xl font-black text-[#F0EFE8] mb-4 leading-snug">
              Are you a practitioner?<br />Let's talk.
            </h3>
            <p className="text-[#888880] text-sm leading-relaxed mb-6">
              We have a dedicated pathway for health professionals — including product access,
              clinical education resources, and a practitioner partnership programme for those
              who want to recommend or distribute topical carnosine through their clinic.
            </p>
            <div className="space-y-3">
              <a
                href="#contact"
                className="flex items-center justify-between w-full px-6 py-3 rounded bg-[#C8972A] text-[#0A0A0C] font-bold text-sm hover:bg-[#E8B84B] transition-colors"
              >
                <span>Practitioner Enquiry →</span>
              </a>
              <a
                href="https://thecarnosinelab.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full px-6 py-3 rounded border border-[#2A2A2E] text-[#888880] font-medium text-sm hover:border-[#C8972A]/50 hover:text-[#F0EFE8] transition-colors"
              >
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

function Opportunity() {
  return (
    <section id="opportunity" className="py-24 bg-[#0C0C0E]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: points */}
          <div>
            <div className="text-xs text-[#C8972A] font-medium tracking-widest uppercase mb-4">The Opportunity</div>
            <h2 className="text-4xl font-black text-[#F0EFE8] mb-6 leading-tight">
              Join the team.<br />Own the market.
            </h2>
            <p className="text-[#888880] leading-relaxed mb-8">
              The Australian carnosine market is wide open. We're building a team of people who
              understand performance and physiology, trust the science, and want to build something real —
              whether you come from sport, clinical practice, or both.
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
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={LINKS.affiliate}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded bg-[#C8972A] text-[#0A0A0C] font-bold text-sm hover:bg-[#E8B84B] transition-colors text-center"
              >
                Enrol as a Partner
              </a>
              <a
                href={LINKS.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded border border-[#2A2A2E] text-[#888880] font-medium text-sm hover:border-[#C8972A]/50 hover:text-[#F0EFE8] transition-colors text-center"
              >
                Talk to the Team
              </a>
            </div>
          </div>

          {/* Right: quote box */}
          <div className="rounded-2xl border border-[#2A2A2E] bg-[#121214] p-8">
            <div className="text-4xl mb-4 text-[#C8972A]">"</div>
            <p className="text-[#A8A89C] text-lg leading-relaxed mb-6">
              The people winning in this market right now are the ones who moved before it was obvious.
              That's what we're building — a team of people who see the science, understand the edge,
              and are willing to put it in front of the right people.
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-[#2A2A2E]">
              <div className="w-10 h-10 rounded-full bg-[#C8972A]/20 border border-[#C8972A]/30 flex items-center justify-center">
                <span className="text-[#C8972A] font-bold text-sm">V</span>
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

function Team() {
  return (
    <section id="team" className="py-24 bg-[#0A0A0C]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-xs text-[#C8972A] font-medium tracking-widest uppercase mb-4">The Team</div>
          <h2 className="text-4xl font-black text-[#F0EFE8] mb-4">
            People behind the mission.
          </h2>
          <p className="text-[#888880] max-w-lg mx-auto">
            Our Australian team is backed by the worldwide Carnosine Lab network, led globally by Joe Rogister.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          {/* Team member card */}
          <div className="rounded-2xl border border-[#2A2A2E] bg-[#121214] p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C8972A] to-[#E8B84B] mx-auto mb-6 flex items-center justify-center">
              <span className="text-[#0A0A0C] font-black text-2xl">V</span>
            </div>
            <h3 className="text-xl font-bold text-[#F0EFE8] mb-1">Viktor</h3>
            <div className="text-[#C8972A] text-sm font-medium mb-4">Founder · Carnosine Performance AU</div>
            <p className="text-[#888880] text-sm leading-relaxed mb-6">
              Builder, operator, and performance enthusiast. Bringing the science and the opportunity of
              topical carnosine to the Australian market — building a team of athletes, coaches, and distributors
              who understand edge.
            </p>
            <div className="flex items-center justify-center gap-3">
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-2 text-xs text-[#555550] hover:text-[#C8972A] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {CONTACT.email}
              </a>
            </div>
          </div>
        </div>

        {/* Worldwide network note */}
        <div className="mt-12 text-center p-6 rounded-xl border border-[#2A2A2E] bg-[#121214] max-w-2xl mx-auto">
          <p className="text-[#555550] text-sm">
            Part of the worldwide{" "}
            <a href={LINKS.carnosinelab} target="_blank" rel="noopener noreferrer" className="text-[#C8972A] hover:text-[#E8B84B] transition-colors">
              Carnosine Lab
            </a>{" "}
            network. Distributed across multiple markets with support from a global team dedicated to advancing carnosine science.
          </p>
        </div>
      </div>
    </section>
  );
}

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
    <section id="contact" className="py-24 bg-[#0C0C0E]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <div className="text-xs text-[#C8972A] font-medium tracking-widest uppercase mb-4">Get in Touch</div>
            <h2 className="text-4xl font-black text-[#F0EFE8] mb-6 leading-tight">
              Ready to talk?
            </h2>
            <p className="text-[#888880] leading-relaxed mb-8">
              Whether you want to try the product, explore the opportunity, or just have questions —
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
                  <svg className="w-5 h-5 text-[#C8972A]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-[#F0EFE8] text-sm font-semibold group-hover:text-[#C8972A] transition-colors">Follow @muscle.capacity</div>
                  <div className="text-[#555550] text-xs">Content, athletes, science on Instagram</div>
                </div>
                <svg className="w-4 h-4 text-[#555550] ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right: contact form */}
          <div className="rounded-2xl border border-[#2A2A2E] bg-[#121214] p-8">
            {status === "done" ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-[#C8972A]/10 border border-[#C8972A]/30 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#C8972A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#F0EFE8] mb-2">Got it.</h3>
                <p className="text-[#888880] text-sm">We'll be in touch shortly. If it's urgent, book a call directly.</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-[#F0EFE8] mb-6">Send a message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs text-[#555550] mb-1.5 uppercase tracking-wider">Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-lg bg-[#1A1A1E] border border-[#2A2A2E] text-[#F0EFE8] text-sm placeholder:text-[#555550] focus:outline-none focus:border-[#C8972A]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#555550] mb-1.5 uppercase tracking-wider">Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@email.com"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-[#1A1A1E] border border-[#2A2A2E] text-[#F0EFE8] text-sm placeholder:text-[#555550] focus:outline-none focus:border-[#C8972A]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#555550] mb-1.5 uppercase tracking-wider">I'm interested in</label>
                    <select
                      value={form.interest}
                      onChange={(e) => setForm({ ...form, interest: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-[#1A1A1E] border border-[#2A2A2E] text-[#F0EFE8] text-sm focus:outline-none focus:border-[#C8972A]/50"
                    >
                      <option value="product">Trying the product</option>
                      <option value="practitioner">Practitioner / Clinic enquiry</option>
                      <option value="opportunity">The business opportunity</option>
                      <option value="public">General public / Personal use</option>
                      <option value="general">General enquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-[#555550] mb-1.5 uppercase tracking-wider">Message</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="What's on your mind?"
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg bg-[#1A1A1E] border border-[#2A2A2E] text-[#F0EFE8] text-sm placeholder:text-[#555550] focus:outline-none focus:border-[#C8972A]/50 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "sending" || !form.email}
                    className="w-full py-3 rounded-lg bg-[#C8972A] text-[#0A0A0C] font-bold text-sm hover:bg-[#E8B84B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </button>
                  {status === "error" && (
                    <p className="text-xs text-red-400 text-center">Something went wrong. Email us directly.</p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 border-t border-[#2A2A2E] bg-[#0A0A0C]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-[#C8972A] flex items-center justify-center">
              <span className="text-[#0A0A0C] font-black text-xs">CP</span>
            </div>
            <span className="text-[#555550] text-sm">Carnosine Performance · Australia</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-[#555550]">
            <a href={LINKS.carnosinelab} target="_blank" rel="noopener noreferrer" className="hover:text-[#C8972A] transition-colors">
              The Carnosine Lab
            </a>
            <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#C8972A] transition-colors">
              Instagram
            </a>
            <a href={`mailto:${CONTACT.email}`} className="hover:text-[#C8972A] transition-colors">
              {CONTACT.email}
            </a>
          </div>
          <div className="text-xs text-[#333330]">
            © {new Date().getFullYear()} Carnosine Performance
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Export ────────────────────────────────────────────────────────────

export function LandingPage() {
  return (
    <div className="bg-[#0A0A0C]">
      <Nav />
      <Hero />
      <About />
      <Product />
      <Practitioners />
      <Opportunity />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
}
