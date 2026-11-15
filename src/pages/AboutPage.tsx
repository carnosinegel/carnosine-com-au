/**
 * /about — who runs the site, where claims come from, editorial standards.
 * Trust page for Google (E-E-A-T) and AI engines. Facts here must match published claims only.
 */

import { Link } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { useSEO } from "@/hooks/useSEO";
import { CONTACT, LINKS } from "@/lib/constants";

export const ABOUT_TITLE = "About Carnosine Advantage | Australian LactiGo Distributor";
export const ABOUT_DESC =
  "Carnosine Advantage (Carnosine Performance Pty Ltd) is the Australian distributor and promoter of LactiGo topical carnosine gel. Who we are, where our claims come from, and how we write.";

const SOURCES: [string, string][] = [
  ["Rugby sevens study (2025)", "A peer-reviewed study of topical carnosine gel in world-class rugby sevens players."],
  ["Skin penetration study (2018)", "A 3D human skin model study of a carnosine and magnesium gel and its penetration through the skin."],
  ["Informed Sport certification", "LactiGo is batch tested for substances prohibited in sport."],
  ["ANZCTR registered trial", "A registered Australian and New Zealand clinical trial on file."],
];

export function AboutPage() {
  const { theme } = useTheme();
  useSEO({
    title: ABOUT_TITLE,
    description: ABOUT_DESC,
    canonical: "https://www.carnosine.com.au/about",
    schema: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About Carnosine Advantage",
      url: "https://www.carnosine.com.au/about",
      mainEntity: { "@id": "https://www.carnosine.com.au/#organization" },
    },
  });
  const logo = theme === "dark" ? "/logo-dark.png" : "/logo-light.png";
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
      <nav className="backdrop-blur-md" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16">
          <Link to="/"><img src={logo} alt="The Carnosine Advantage" style={{ height: "36px", maxWidth: "200px" }} className="object-contain" /></Link>
          <div className="flex gap-6 text-sm" style={{ color: "var(--muted-foreground)" }}>
            <Link to="/blog" className="hover:text-[#3DC8D4]">Blog</Link>
            <Link to="/carnosine-gel-australia" className="hover:text-[#3DC8D4]">Carnosine gel</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16 leading-relaxed">
        <div className="text-xs text-[#3DC8D4] font-medium tracking-widest uppercase mb-4">About</div>
        <h1 className="text-4xl md:text-5xl font-black mb-6">About Carnosine Advantage</h1>
        <p className="mb-6" style={{ color: "var(--muted-foreground)" }}>
          Carnosine Advantage, trading as Carnosine Performance Pty Ltd, is an Australian distributor and promoter of LactiGo, a topical carnosine gel for athletes and active people. We sell directly and through a network of affiliates, practitioners, gyms and clubs.
        </p>

        <h2 className="text-2xl font-bold mt-12 mb-3">What we do</h2>
        <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
          We bring LactiGo to Australian customers, explain the research behind it in plain language, and support the coaches, clinicians and clubs who want to offer it. LactiGo is made by its US developer; we are the Australian distribution and education arm, not the manufacturer.
        </p>
        <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
          Learn more on our pages about <Link to="/carnosine-gel-australia" className="text-[#3DC8D4] hover:underline">carnosine gel in Australia</Link>, <Link to="/lactigo-australia" className="text-[#3DC8D4] hover:underline">LactiGo Australia</Link> and <Link to="/topical-carnosine-gel-australia" className="text-[#3DC8D4] hover:underline">how topical carnosine gel works</Link>.
        </p>

        <h2 className="text-2xl font-bold mt-12 mb-3">Where our claims come from</h2>
        <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
          We only repeat what the published evidence and certification support. These are the main sources behind what we say about LactiGo:
        </p>
        <ul className="space-y-3 mb-4">
          {SOURCES.map(([t, d]) => (
            <li key={t}><strong>{t}.</strong> <span style={{ color: "var(--muted-foreground)" }}>{d}</span></li>
          ))}
        </ul>
        <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
          LactiGo has been used by more than 16,500 athletes, including professionals in the NHL, NFL, NBA, MLB and NCAA Division I, and in European football.
        </p>

        <h2 className="text-2xl font-bold mt-12 mb-3">How we write</h2>
        <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
          Articles in our <Link to="/blog" className="text-[#3DC8D4] hover:underline">Science Journal</Link> summarise published research on carnosine, beta-alanine and muscle performance. We explain what a study did and found, and where it has limits. We write about supporting performance and recovery. We do not claim to treat, cure or prevent any condition.
        </p>
        <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
          Our content is general information, not medical advice. If you have a medical condition, are pregnant, or take medication, talk to your doctor or pharmacist before using any new product.
        </p>

        <h2 className="text-2xl font-bold mt-12 mb-3">Contact</h2>
        <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
          Questions, partnership enquiries or corrections: <a href={`mailto:${CONTACT.email}`} className="text-[#3DC8D4] hover:underline">{CONTACT.email}</a>. Practitioners, gyms and clubs can see our <Link to="/industry-partner" className="text-[#3DC8D4] hover:underline">partner program</Link>. Ready to buy? <a href={LINKS.purchaseAU} target="_blank" rel="noopener noreferrer" className="text-[#3DC8D4] hover:underline">Order through the official LactiGo shop</a>.
        </p>
      </main>

      <footer className="py-8 text-center text-xs" style={{ borderTop: "1px solid var(--border)", color: "var(--muted-foreground)" }}>
        © {new Date().getFullYear()} Carnosine Performance Pty Ltd · Australia
      </footer>
    </div>
  );
}
