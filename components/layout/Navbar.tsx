// components/layout/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Menu, X, Search, User, LogIn, UserPlus,
  PackageSearch, Home
} from "lucide-react";
import CartIcon from "./CartIcon";

type Props = { logoUrl?: string; siteName?: string };

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Store", href: "/store" },
  { label: "Repair", href: "/book-repair" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({ logoUrl, siteName = "Alphatech" }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/store?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  }

  return (
    <>
      <header className={`sticky top-0 z-50 bg-[#0c1a2e]/90 backdrop-blur-xl border-b border-sky-900/20 transition-shadow ${scrolled ? "shadow-lg shadow-black/20" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-3">
          {/* Logo — light/blurred glass circle, no status dot */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="h-11 w-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center overflow-hidden shadow-lg">
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoUrl} alt={siteName} className="h-full w-full object-cover rounded-full opacity-90" />
              ) : (
                <svg viewBox="0 0 44 44" className="h-8 w-8">
                  <circle cx="22" cy="22" r="19" fill="none" stroke="#7dd3fc" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.7"/>
                  <text x="22" y="27" textAnchor="middle" fill="#7dd3fc" fontSize="16" fontWeight="700" fontFamily="Poppins" opacity="0.9">A</text>
                </svg>
              )}
            </div>
            <div className="hidden xs:block">
              <p className="font-bold text-white text-sm leading-tight tracking-wide">
                {siteName.toUpperCase()}
              </p>
              <p className="text-[9px] text-sky-300/80 tracking-widest leading-tight">
                COMPUTER ENGINEERING & TECHNOLOGIES
              </p>
            </div>
          </Link>

          {/* Desktop nav links (replaces search bar) */}
          <nav className="hidden lg:flex items-center gap-1 mx-auto">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    active
                      ? "text-white bg-white/10"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-sky-400" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 ml-auto lg:ml-0">
            {/* Search icon (search bar removed, icon kept) */}
            <button
              className="text-slate-300 hover:text-sky-300 p-2 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>

            {/* Track order/repair */}
            <Link href="/track-order"
              className="hidden md:flex items-center gap-1.5 text-slate-300 hover:text-sky-300 text-sm font-medium px-2 py-2 rounded-lg hover:bg-white/5 transition-colors">
              <PackageSearch className="h-4 w-4" />
              <span className="hidden xl:inline">Track</span>
            </Link>

            {/* Auth buttons */}
            {session ? (
              <Link href="/account"
                className="flex items-center gap-1.5 border border-sky-500/60 text-sky-300 hover:bg-sky-500 hover:text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Account</span>
              </Link>
            ) : (
              <>
                <Link href="/login"
                  className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-white border border-white/15 hover:border-sky-400/60 px-3 py-1.5 rounded-lg text-sm font-medium transition-all">
                  <LogIn className="h-3.5 w-3.5" />
                  Login
                </Link>
                <Link href="/register"
                  className="flex items-center gap-1.5 bg-sky-500 hover:bg-sky-400 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all shadow-md shadow-sky-500/20">
                  <UserPlus className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Sign Up</span>
                </Link>
              </>
            )}

            <CartIcon />

            <button className="lg:hidden text-slate-300 hover:text-white p-2 rounded-lg hover:bg-white/5" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Expandable search bar */}
        {searchOpen && (
          <div className="border-t border-white/10 px-4 py-3 bg-[#0c1a2e]/95">
            <form onSubmit={submitSearch} className="max-w-2xl mx-auto relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                autoFocus
                type="text"
                placeholder="Search laptops, accessories, repairs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/15 text-white placeholder-slate-400 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-sky-400 focus:bg-white/10 transition-all"
              />
            </form>
          </div>
        )}
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#0c1a2e] pt-16 overflow-y-auto lg:hidden">
          <div className="px-5 py-6 space-y-1">
            <Link href="/" onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 text-white py-3 border-b border-slate-800 text-sm font-medium">
              <Home className="h-4 w-4 text-sky-400" /> Home
            </Link>
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 text-white py-3 border-b border-slate-800 text-sm font-medium">
                {link.label}
              </Link>
            ))}
            <Link href="/track-order" onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 text-white py-3 border-b border-slate-800 text-sm font-medium">
              <PackageSearch className="h-4 w-4 text-sky-400" /> Track Order/Repair
            </Link>
            {!session && (
              <div className="pt-4 flex gap-3">
                <Link href="/login" onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center border border-slate-700 text-white py-2.5 rounded-lg text-sm font-medium">
                  Login
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center bg-sky-500 text-white py-2.5 rounded-lg text-sm font-medium">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
