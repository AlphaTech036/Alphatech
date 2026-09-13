// components/home/Services.tsx
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const SERVICES = [
  {
    title: "Laptop Repair",
    desc: "Screens, keyboards, batteries, hinges.",
    price: "From ₦8,000",
    href: "/services/laptop-repair",
    image: "https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=400&q=80",
  },
  {
    title: "Desktop & Workstation",
    desc: "Power issues, upgrades, diagnostics.",
    price: "From ₦6,000",
    href: "/services/desktop-repair",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&q=80",
  },
  {
    title: "Data Recovery",
    desc: "Recover files from failed drives.",
    price: "From ₦15,000",
    href: "/services/data-recovery",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80",
  },
  {
    title: "Software & OS Installation",
    desc: "Windows 10/11, Linux, Mac OS installation, driver setup, software configuration.",
    price: "From ₦5,000",
    href: "/services/software",
    image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&q=80",
  },
  {
    title: "Networking & Business IT",
    desc: "Office setup, support contracts.",
    price: "Custom quote",
    href: "/services/it-solutions",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80",
  },
  {
    title: "Virus & Malware Removal",
    desc: "Deep clean and security hardening.",
    price: "From ₦7,000",
    href: "/services/virus-removal",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&q=80",
  },
];

export default function Services() {
  return (
    <section className="bg-white py-14">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-sky-500 text-xs font-bold tracking-widest uppercase mb-1">WHAT WE DO</p>
            <h2 className="font-bold text-2xl lg:text-3xl text-slate-900">Core services</h2>
          </div>
          <Link href="/services" className="hidden sm:flex items-center gap-1 text-sky-500 font-semibold text-sm hover:text-sky-700">
            View all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s) => (
            <div key={s.title}
              className="group border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white">
              {/* Service image */}
              <div className="relative h-44 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="bg-sky-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                    {s.price}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-slate-900 mb-1">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                <Link href={s.href}
                  className="mt-3 inline-flex items-center gap-1 text-sky-500 font-semibold text-sm hover:text-sky-700 group-hover:gap-2 transition-all">
                  Request service <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6 sm:hidden">
          <Link href="/services" className="text-sky-500 font-semibold text-sm">
            View all services →
          </Link>
        </div>
      </div>
    </section>
  );
}
