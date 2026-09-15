// components/services/ServiceDetailPage.tsx
import Link from "next/link";
import { Check, Clock, DollarSign, ArrowRight, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  title: string;
  tagline: string;
  image: string;
  description: string;
  price: string;
  turnaround: string;
  included: string[];
  faq?: { q: string; a: string }[];
};

export default function ServiceDetailPage({
  icon: Icon, title, tagline, image, description,
  price, turnaround, included, faq,
}: Props) {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-[#0a1628] overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/95 to-[#0a1628]/70" />
        </div>

        <div className="relative max-w-5xl mx-auto px-5 lg:px-8 py-16 lg:py-20">
          <div className="h-14 w-14 rounded-2xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center mb-5">
            <Icon className="h-6 w-6 text-sky-400" />
          </div>
          <p className="text-sky-400 text-xs font-bold tracking-widest uppercase mb-2">{tagline}</p>
          <h1 className="font-bold text-3xl lg:text-4xl text-white max-w-xl leading-tight">{title}</h1>
          <p className="text-slate-300 mt-4 max-w-lg leading-relaxed">{description}</p>

          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
              <DollarSign className="h-4 w-4 text-sky-400" />
              <span className="text-white text-sm font-semibold">{price}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
              <Clock className="h-4 w-4 text-sky-400" />
              <span className="text-white text-sm font-semibold">{turnaround}</span>
            </div>
          </div>

          <Link href="/book-repair"
            className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3.5 rounded-xl mt-7 transition-all shadow-lg shadow-sky-500/20">
            Request this service <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-white py-14">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <h2 className="font-bold text-2xl text-slate-900 mb-6">What's included</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {included.map((item) => (
              <div key={item} className="flex items-start gap-3 bg-slate-50 border border-slate-100 rounded-xl p-4">
                <div className="h-6 w-6 rounded-full bg-sky-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 text-sky-600" />
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warranty banner */}
      <section className="bg-sky-50 py-10">
        <div className="max-w-5xl mx-auto px-5 lg:px-8 flex items-center gap-4">
          <ShieldCheck className="h-9 w-9 text-sky-600 shrink-0" />
          <div>
            <p className="font-bold text-slate-900">Backed by our 90-day warranty</p>
            <p className="text-slate-600 text-sm">Every repair is tested before handover and covered against related issues.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faq && faq.length > 0 && (
        <section className="bg-white py-14">
          <div className="max-w-3xl mx-auto px-5 lg:px-8">
            <h2 className="font-bold text-2xl text-slate-900 mb-6">Common questions</h2>
            <div className="space-y-4">
              {faq.map((item) => (
                <div key={item.q} className="border border-slate-200 rounded-xl p-5">
                  <p className="font-semibold text-slate-900 mb-1.5">{item.q}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#0a1628] py-14">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <h2 className="font-bold text-2xl lg:text-3xl text-white">Ready to get started?</h2>
          <p className="text-slate-400 mt-2">Book online in under 2 minutes — we'll confirm by phone.</p>
          <div className="flex flex-wrap gap-3 justify-center mt-6">
            <Link href="/book-repair" className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              Book a Repair
            </Link>
            <Link href="/services" className="border border-slate-700 hover:border-sky-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              View all services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
