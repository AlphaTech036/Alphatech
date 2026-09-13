// components/home/Hero.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Check } from "lucide-react";

const SLIDES = [
  {
    badge: "CERTIFIED ENGINEERS · OSUN & ONDO",
    headline: "Technology that works.",
    highlight: "Engineered to last.",
    sub: "From a cracked laptop screen to a full office network — our engineers diagnose fast, repair it right, and back every job with a warranty.",
    cta: "Book a Repair",
    ctaHref: "/book-repair",
    secondary: "Shop Computers",
    secondaryHref: "/store",
    image: "https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=800&q=80",
    category: "REPAIR SERVICES",
  },
  {
    badge: "NEW & REFURBISHED COMPUTERS",
    headline: "Premium computers",
    highlight: "at the best prices.",
    sub: "New laptops, desktops, custom builds and quality-tested refurbished computers. Every device checked and warrantied before it reaches you.",
    cta: "Shop Now",
    ctaHref: "/store?category=laptops",
    secondary: "View All Products",
    secondaryHref: "/store",
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80",
    category: "COMPUTERS & LAPTOPS",
  },
  {
    badge: "ACCESSORIES & GADGETS",
    headline: "Everything you need",
    highlight: "in one place.",
    sub: "Adapters, batteries, SSDs, RAM, keyboards, MiFi & more in stock. Genuine products, competitive prices, fast delivery.",
    cta: "Shop Accessories",
    ctaHref: "/store?category=accessories",
    secondary: "Book a Repair",
    secondaryHref: "/book-repair",
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800&q=80",
    category: "ACCESSORIES",
  },
  {
    badge: "BUSINESS IT SOLUTIONS",
    headline: "Complete IT support",
    highlight: "for your business.",
    sub: "Networking setup, business IT contracts, cybersecurity, maintenance and more. We keep your business technology running smoothly.",
    cta: "Get a Quote",
    ctaHref: "/contact",
    secondary: "Our Services",
    secondaryHref: "/services",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    category: "IT SOLUTIONS",
  },
];

const TICKET_STEPS = [
  { label: "Device received", done: true },
  { label: "Diagnosis complete", done: true },
  { label: "Repairing", done: false, active: true },
  { label: "Ready for pickup", done: false },
];

const TRUST_BADGES = [
  { label: "Swift Delivery", sub: "Nationwide delivery", emoji: "🚚" },
  { label: "Low Price Guarantee", sub: "Very competitive prices", emoji: "💰" },
  { label: "Satisfaction Guaranteed", sub: "Products & services", emoji: "✅" },
  { label: "Secure Payment", sub: "Paystack, transfer & more", emoji: "🔒" },
];

export default function Hero({
  headline1, headline2, subheadline, ctaPrimary, ctaSecondary,
}: {
  headline1?: string; headline2?: string; subheadline?: string;
  ctaPrimary?: string; ctaSecondary?: string;
}) {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => goTo((current + 1) % SLIDES.length), 5000);
    return () => clearInterval(timer);
  }, [current]);

  function goTo(index: number) {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(index);
    setTimeout(() => setIsAnimating(false), 600);
  }

  const slide = SLIDES[current];

  return (
    <>
      {/* Main Hero Slideshow */}
      <section className="relative bg-[#0c1a2e] overflow-hidden min-h-[500px]">
        {/* Background image */}
        <div className="absolute inset-0 transition-all duration-700">
          <img
            src={slide.image}
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c1a2e] via-[#0c1a2e]/90 to-[#0c1a2e]/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-12 lg:py-16 grid lg:grid-cols-2 gap-8 items-center">
          {/* Left content */}
          <div className={`transition-all duration-500 ${isAnimating ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"}`}>
            <span className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-500/40 text-sky-400 text-[10px] font-semibold px-3 py-1.5 rounded-full tracking-widest mb-4">
              <span className="h-1.5 w-1.5 bg-sky-400 rounded-full animate-pulse" />
              {slide.badge}
            </span>

            <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
              {headline1 || slide.headline}
              <br />
              <span className="text-sky-400">{headline2 || slide.highlight}</span>
            </h1>

            <p className="text-slate-300 text-base mt-4 max-w-lg leading-relaxed">
              {subheadline || slide.sub}
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <Link href={slide.ctaHref}
                className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-sky-500/30 text-sm">
                {ctaPrimary || slide.cta} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={slide.secondaryHref}
                className="border border-sky-500/50 hover:border-sky-400 text-sky-300 hover:text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm">
                {ctaSecondary || slide.secondary}
              </Link>
            </div>

            {/* Slide indicators */}
            <div className="flex items-center gap-2 mt-8">
              {SLIDES.map((_, i) => (
                <button key={i} onClick={() => goTo(i)}
                  className={`transition-all rounded-full ${i === current ? "w-6 h-2 bg-sky-400" : "w-2 h-2 bg-slate-600 hover:bg-slate-400"}`}
                />
              ))}
            </div>
          </div>

          {/* Right — repair ticket card */}
          <div className="relative hidden lg:block">
            <div className="bg-white/5 backdrop-blur border border-sky-500/20 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <p className="text-slate-400 text-xs font-semibold tracking-widest">REPAIR TICKET</p>
                <p className="font-mono text-xs text-sky-400 bg-sky-500/10 px-2 py-1 rounded">ALP-RP-2026-0341</p>
              </div>
              <div className="space-y-3">
                {TICKET_STEPS.map((s) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 text-xs ${
                      s.done ? "bg-sky-500 text-white"
                      : s.active ? "bg-orange-500 text-white"
                      : "bg-slate-800 border border-slate-600 text-slate-600"
                    }`}>
                      {s.done ? <Check className="h-3.5 w-3.5" /> : s.active ? "3" : "4"}
                    </div>
                    <p className={`text-sm font-medium ${s.done || s.active ? "text-white" : "text-slate-500"}`}>
                      {s.label}
                    </p>
                    {s.active && <span className="ml-auto text-[10px] text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full">In progress</span>}
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-700">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Device: HP Pavilion 15</span>
                  <span>Est. 24hrs</span>
                </div>
              </div>
            </div>

            {/* Slide prev/next buttons */}
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex flex-col gap-2">
              <button onClick={() => goTo((current - 1 + SLIDES.length) % SLIDES.length)}
                className="h-8 w-8 rounded-full bg-white/10 hover:bg-sky-500 text-white flex items-center justify-center transition-all">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button onClick={() => goTo((current + 1) % SLIDES.length)}
                className="h-8 w-8 rounded-full bg-white/10 hover:bg-sky-500 text-white flex items-center justify-center transition-all">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges bar */}
      <section className="bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {TRUST_BADGES.map((b) => (
              <div key={b.label} className="flex items-center gap-2.5">
                <span className="text-xl">{b.emoji}</span>
                <div>
                  <p className="text-xs font-bold text-slate-900 leading-tight">{b.label}</p>
                  <p className="text-[10px] text-slate-500">{b.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
