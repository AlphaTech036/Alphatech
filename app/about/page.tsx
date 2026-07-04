// app/about/page.tsx
export const dynamic = "force-dynamic";

import { getAllSettings } from "@/lib/site-settings";
import { ShieldCheck, Cpu, Users, Award } from "lucide-react";
import Link from "next/link";

const VALUES = [
  { icon: ShieldCheck, title: "Integrity", desc: "We give honest diagnoses and fair prices. No hidden charges, no unnecessary repairs." },
  { icon: Cpu, title: "Technical Excellence", desc: "Our engineers stay current with the latest hardware, software and networking technologies." },
  { icon: Users, title: "Customer First", desc: "Every decision we make starts with what's best for the customer — not the bottom line." },
  { icon: Award, title: "Quality Assurance", desc: "Every repair is tested before handover. Every product sold carries a warranty." },
];

export default async function AboutPage() {
  const s = await getAllSettings();

  const headline = s["about.headline"] || "Southwest Nigeria's trusted computer engineering company";
  const intro = s["about.intro"] || "Since 2019, Alphatech has been diagnosing, repairing and building computers for individuals, students and businesses across Osun and Ondo states.";
  const mission = s["about.mission"] || "To provide every customer with fast, honest, high-quality technology services at fair prices.";
  const vision = s["about.vision"] || "To build the most trusted computer engineering brand in Nigeria.";

  return (
    <main>
      {/* Hero */}
      <section className="bg-slate-950 py-20">
        <div className="max-w-4xl mx-auto px-5 lg:px-8 text-center">
          <p className="font-mono text-xs text-sky-400 tracking-widest">ABOUT US</p>
          <h1 className="font-display font-bold text-3xl lg:text-5xl text-white mt-3 leading-tight">
            {headline}
          </h1>
          <p className="font-body text-slate-400 text-lg mt-5 max-w-2xl mx-auto">{intro}</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-5 lg:px-8 grid md:grid-cols-2 gap-10">
          <div className="bg-blue-700 rounded-2xl p-8 text-white">
            <p className="font-mono text-xs tracking-widest opacity-70 mb-3">OUR MISSION</p>
            <h2 className="font-display font-bold text-2xl mb-4">Reliable solutions. Technology that works.</h2>
            <p className="font-body text-blue-100 leading-relaxed">{mission}</p>
          </div>
          <div className="bg-slate-950 rounded-2xl p-8 text-white">
            <p className="font-mono text-xs tracking-widest text-slate-400 mb-3">OUR VISION</p>
            <h2 className="font-display font-bold text-2xl mb-4">The go-to tech partner for Southwest Nigeria.</h2>
            <p className="font-body text-slate-300 leading-relaxed">{vision}</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <p className="font-mono text-xs text-blue-700 tracking-widest text-center">WHAT DRIVES US</p>
          <h2 className="font-display font-bold text-3xl text-slate-900 mt-2 text-center">Our values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                  <v.icon className="h-5 w-5 text-blue-700" />
                </div>
                <h3 className="font-display font-semibold text-slate-900">{v.title}</h3>
                <p className="font-body text-sm text-slate-500 mt-2 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder quote */}
      <section className="bg-blue-700 py-20">
        <div className="max-w-3xl mx-auto px-5 lg:px-8 text-center">
          <div className="text-6xl text-blue-400 font-serif leading-none mb-6">&ldquo;</div>
          <blockquote className="font-display font-semibold text-2xl lg:text-3xl text-white leading-relaxed">
            Technology should never be a barrier. Our job is to make sure every device works, every network runs, and every customer walks away with a solution — not a problem.
          </blockquote>
          <div className="mt-8">
            <div className="h-px w-16 bg-blue-400 mx-auto mb-5" />
            <p className="font-body font-semibold text-white">Abdullateef Raji</p>
            <p className="font-mono text-xs text-blue-200 tracking-widest mt-1">FOUNDER, ALPHATECH COMPUTER ENGINEERING & TECHNOLOGIES</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-950 py-16">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <h2 className="font-display font-bold text-2xl lg:text-3xl text-white">Ready to work with us?</h2>
          <p className="font-body text-slate-400 mt-3">Book a repair, shop our store, or get in touch.</p>
          <div className="flex flex-wrap gap-4 justify-center mt-6">
            <Link href="/book-repair" className="bg-orange-500 hover:bg-orange-600 text-white font-body font-semibold px-6 py-3 rounded-xl transition-colors">
              Book a repair
            </Link>
            <Link href="/contact" className="border border-slate-700 hover:border-slate-500 text-white font-body font-semibold px-6 py-3 rounded-xl transition-colors">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
