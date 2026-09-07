/**
 * /industry-partner
 *
 * B2B lead-capture funnel for Fitness Expo QR-code traffic: gym owners,
 * recovery centres, clinics, health practitioners, coaches, distributors
 * and multisite operators.
 *
 * Deliberately its own visual identity — "The Carnosine Lab" sub-brand
 * (deep navy/black + electric blue #1e9de3 + orange #f2611a molecular
 * accents) rather than the main site's cyan/gold consumer look, to match
 * the printed B2B collateral handed out at the same expos.
 *
 * No new backend: reuses the already-deployed `api.leads.submitLead`
 * action (same one every other lead form on this site calls). The extra
 * qualification fields (business type, locations, city/state, main
 * interest, preferred contact) are packed into the existing free-text
 * `message` field since the Convex `leads` schema stores it unrestricted
 * — this keeps the existing real-time Slack lead notification to VK fully
 * populated with zero backend changes.
 *
 * Copy is TGA-compliant: performance-support framing, no therapeutic claims.
 */

import { useAction } from "convex/react";
import { useEffect, useRef, useState } from "react";
import { CONTACT, LINKS } from "@/lib/constants";
import { api } from "../../convex/_generated/api";

const BLUE = "#1e9de3";
const LIGHTBLUE = "#5ec2f7";
const ORANGE = "#f2611a";
const NAVY = "#060d1a";
const PANEL = "#0b1626";

function useNoIndexSEO() {
  useEffect(() => {
    document.title = "Become a Carnosine Industry Partner | The Carnosine Lab";
    const setMeta = (
      name: string,
      content: string,
      attr: "name" | "property" = "name",
    ) => {
      let el = document.querySelector(
        `meta[${attr}="${name}"]`,
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta(
      "description",
      "Bring patented topical carnosine technology to your clients, members or athletes. Wholesale pricing, retail margins, commissions and implementation support for gyms, clinics, practitioners and multisite operators.",
    );
    setMeta("robots", "noindex, nofollow");
    return () => {
      document.title = "Carnosine Performance";
    };
  }, []);
}

// Molecular motif — reused line/node styling from the Carnosine Lab print collateral
function MoleculeMotif({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="86"
        cy="18"
        r="10"
        fill="none"
        stroke={ORANGE}
        strokeWidth="3"
      />
      <circle
        cx="26"
        cy="46"
        r="6"
        fill="none"
        stroke={ORANGE}
        strokeWidth="3"
      />
      <circle cx="14" cy="86" r="6" fill={ORANGE} />
      <circle
        cx="60"
        cy="104"
        r="9"
        fill="none"
        stroke={ORANGE}
        strokeWidth="3"
      />
      <line x1="86" y1="28" x2="60" y2="66" stroke={BLUE} strokeWidth="2" />
      <line x1="26" y1="52" x2="60" y2="66" stroke={BLUE} strokeWidth="2" />
      <line x1="14" y1="80" x2="55" y2="70" stroke={BLUE} strokeWidth="2" />
      <line x1="60" y1="66" x2="60" y2="94" stroke={BLUE} strokeWidth="2" />
      <circle cx="60" cy="66" r="4" fill={BLUE} />
    </svg>
  );
}

const BUSINESS_TYPES = [
  "Gym",
  "Recovery Centre",
  "Clinic",
  "Practitioner",
  "Coach",
  "Distributor",
  "Other",
];

const MAIN_INTERESTS = [
  "Stocking the product",
  "Client referral commissions",
  "Staff and athlete use",
  "Multisite partnership",
  "Not sure yet",
];

const CONTACT_METHODS = ["Phone", "Email", "WhatsApp"];

interface FormState {
  fullName: string;
  businessName: string;
  mobile: string;
  email: string;
  businessType: string;
  locations: string;
  cityState: string;
  mainInterest: string;
  contactMethod: string;
}

const initialForm: FormState = {
  fullName: "",
  businessName: "",
  mobile: "",
  email: "",
  businessType: BUSINESS_TYPES[0],
  locations: "1",
  cityState: "",
  mainInterest: MAIN_INTERESTS[0],
  contactMethod: CONTACT_METHODS[0],
};

function packMessage(f: FormState): string {
  return [
    `Business name: ${f.businessName || "—"}`,
    `Business type: ${f.businessType}`,
    `Locations: ${f.locations || "—"}`,
    `City / State: ${f.cityState || "—"}`,
    `Main interest: ${f.mainInterest}`,
    `Preferred contact method: ${f.contactMethod}`,
  ].join("\n");
}

export function IndustryPartnerPage() {
  useNoIndexSEO();
  const submitLead = useAction(api.leads.submitLead);
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.businessName || !form.mobile || !form.email)
      return;
    setStatus("sending");
    try {
      await submitLead({
        name: form.fullName,
        email: form.email,
        phone: form.mobile,
        interest: "industry-partner",
        market: "au",
        source: "carnosine.com.au/industry-partner",
        message: packMessage(form),
      });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div style={{ background: NAVY, minHeight: "100vh", color: "#eaf2fb" }}>
      {/* Minimal header — no nav distractions, just the mark */}
      <header className="px-6 pt-6 pb-2 flex items-center justify-center">
        <img
          src="/logo-dark.png"
          alt="The Carnosine Advantage"
          className="object-contain"
          style={{ height: "34px" }}
        />
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-10 pb-14 md:pt-16 md:pb-20">
        <MoleculeMotif className="hidden md:block absolute -top-4 right-4 w-40 h-40 opacity-70" />
        <MoleculeMotif className="md:hidden absolute -top-2 right-2 w-24 h-24 opacity-60" />
        <div className="max-w-3xl mx-auto text-center relative">
          <div
            className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase mb-5 px-3 py-1.5 rounded-full"
            style={{
              color: LIGHTBLUE,
              border: `1px solid ${BLUE}55`,
              background: `${BLUE}14`,
            }}
          >
            The Carnosine Lab · Industry Partnerships
          </div>
          <h1
            className="font-black leading-[1.08] mb-5"
            style={{
              fontSize: "clamp(1.9rem, 6.2vw, 2.9rem)",
              letterSpacing: "-0.01em",
            }}
          >
            BECOME A CARNOSINE
            <br />
            INDUSTRY PARTNER
          </h1>
          <p
            className="font-semibold mb-4"
            style={{
              fontSize: "clamp(1.05rem, 3.4vw, 1.3rem)",
              color: LIGHTBLUE,
            }}
          >
            Bring patented topical carnosine technology to your clients, members
            or athletes.
          </p>
          <p
            className="leading-relaxed mb-8 mx-auto"
            style={{ color: "#a9bdd6", maxWidth: "38rem" }}
          >
            Access wholesale pricing, attractive retail margins, online customer
            commissions, staff education and implementation support.
          </p>
          <button
            onClick={scrollToForm}
            className="w-full sm:w-auto px-8 py-4 rounded-lg font-black text-sm tracking-wide uppercase transition-transform active:scale-[0.98]"
            style={{
              background: ORANGE,
              color: "#fff",
              boxShadow: `0 8px 24px ${ORANGE}40`,
            }}
          >
            Explore the Partnership
          </button>

          {/* Authority strip — established, verifiable credibility signals */}
          <div className="mt-10 grid grid-cols-3 gap-3 max-w-xl mx-auto">
            {[
              { value: "16,500+", label: "Athletes Using LactiGo" },
              { value: "Patented", label: "Carnosine Formulation" },
              { value: "Informed Sport", label: "Every Batch Tested" },
            ].map(s => (
              <div
                key={s.label}
                className="rounded-xl px-2 py-4"
                style={{ background: PANEL, border: "1px solid #17263d" }}
              >
                <div
                  className="font-black"
                  style={{ color: BLUE, fontSize: "1.05rem" }}
                >
                  {s.value}
                </div>
                <div
                  className="text-[10px] uppercase tracking-wide mt-1"
                  style={{ color: "#7e93ad" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section ref={formRef} className="px-6 pb-16">
        <div
          className="max-w-lg mx-auto rounded-2xl p-6 md:p-8"
          style={{ background: PANEL, border: `1px solid #17263d` }}
        >
          {status === "done" ? (
            <div className="text-center py-10">
              <div
                className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center"
                style={{
                  background: `${BLUE}1a`,
                  border: `1px solid ${BLUE}55`,
                }}
              >
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke={BLUE}
                  viewBox="0 0 24 24"
                  role="img"
                  aria-label="Success"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="font-black text-lg mb-3">
                Thank you—your enquiry has been received.
              </p>
              <p className="leading-relaxed mb-8" style={{ color: "#a9bdd6" }}>
                One of our industry support team members will contact you
                shortly to learn about your business and discuss the most
                suitable partnership option.
              </p>
              <a
                href={LINKS.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full px-6 py-3.5 rounded-lg font-bold text-sm text-center transition-colors"
                style={{ border: `1px solid ${BLUE}`, color: LIGHTBLUE }}
              >
                Book a Short Introductory Call
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="font-black text-xl mb-1">
                Request Partner Information
              </h2>
              <p className="text-sm mb-5" style={{ color: "#7e93ad" }}>
                Two minutes. We'll come back with the option that actually fits
                your business.
              </p>

              <Field label="Full name *">
                <input
                  required
                  type="text"
                  value={form.fullName}
                  onChange={e => setForm({ ...form, fullName: e.target.value })}
                  className={inputClass}
                />
              </Field>

              <Field label="Business name *">
                <input
                  required
                  type="text"
                  value={form.businessName}
                  onChange={e =>
                    setForm({ ...form, businessName: e.target.value })
                  }
                  className={inputClass}
                />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Mobile number *">
                  <input
                    required
                    type="tel"
                    placeholder="+61 4xx xxx xxx"
                    value={form.mobile}
                    onChange={e => setForm({ ...form, mobile: e.target.value })}
                    className={inputClass}
                  />
                </Field>
                <Field label="Email address *">
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className={inputClass}
                  />
                </Field>
              </div>

              <Field label="Business type">
                <select
                  value={form.businessType}
                  onChange={e =>
                    setForm({ ...form, businessType: e.target.value })
                  }
                  className={inputClass}
                >
                  {BUSINESS_TYPES.map(t => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Number of locations">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={form.locations}
                    onChange={e =>
                      setForm({ ...form, locations: e.target.value })
                    }
                    className={inputClass}
                  />
                </Field>
                <Field label="City and state">
                  <input
                    type="text"
                    placeholder="e.g. Gold Coast, QLD"
                    value={form.cityState}
                    onChange={e =>
                      setForm({ ...form, cityState: e.target.value })
                    }
                    className={inputClass}
                  />
                </Field>
              </div>

              <Field label="Main interest">
                <select
                  value={form.mainInterest}
                  onChange={e =>
                    setForm({ ...form, mainInterest: e.target.value })
                  }
                  className={inputClass}
                >
                  {MAIN_INTERESTS.map(t => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Preferred contact method">
                <div className="flex gap-2">
                  {CONTACT_METHODS.map(m => (
                    <button
                      type="button"
                      key={m}
                      onClick={() => setForm({ ...form, contactMethod: m })}
                      className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                      style={
                        form.contactMethod === m
                          ? { background: BLUE, color: "#fff" }
                          : {
                              background: "#0e1c30",
                              color: "#a9bdd6",
                              border: "1px solid #1c2f49",
                            }
                      }
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </Field>

              <p
                className="text-xs text-center pt-1"
                style={{ color: "#7e93ad" }}
              >
                No commitment required. Let's first see whether the partnership
                fits your business.
              </p>

              {status === "error" && (
                <p className="text-xs text-center" style={{ color: "#ff8a80" }}>
                  Something went wrong — try again, or email {CONTACT.email}{" "}
                  directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-4 rounded-lg font-black text-sm tracking-wide uppercase transition-transform active:scale-[0.98] disabled:opacity-50"
                style={{
                  background: ORANGE,
                  color: "#fff",
                  boxShadow: `0 8px 24px ${ORANGE}40`,
                }}
              >
                {status === "sending"
                  ? "Sending..."
                  : "Request Partner Information"}
              </button>
            </form>
          )}
        </div>

        {status !== "done" && (
          <div className="max-w-lg mx-auto mt-4 text-center">
            <a
              href={LINKS.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold"
              style={{ color: LIGHTBLUE }}
            >
              Prefer to talk first? Book a Short Introductory Call →
            </a>
          </div>
        )}
      </section>

      <footer className="px-6 pb-8 text-center">
        <p className="text-xs" style={{ color: "#4c5f78" }}>
          The Carnosine Lab is the industry partnership arm of Carnosine
          Advantage. Educational content only — not a substitute for
          professional medical advice.
        </p>
      </footer>
    </div>
  );
}

const inputClass =
  "w-full px-4 py-3 rounded-lg bg-[#0e1c30] border border-[#1c2f49] text-[#eaf2fb] placeholder-[#5a6f89] text-sm focus:outline-none focus:border-[#1e9de3] transition-colors";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span
        className="block text-xs font-medium mb-1.5 uppercase tracking-wider"
        style={{ color: "#7e93ad" }}
      >
        {label}
      </span>
      {children}
    </div>
  );
}
