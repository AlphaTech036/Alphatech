// components/layout/Navbar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  Menu, X, Search, ShoppingCart, User, LogIn,
  UserPlus, ChevronDown, Laptop, Monitor, Cpu,
  Wifi, HardDrive, Smartphone, Printer, Package,
  Home, Wrench
} from "lucide-react";
import CartIcon from "./CartIcon";

type Props = { logoUrl?: string; siteName?: string };

const CATEGORIES = [
  { label: "Start Shopping", href: "/store", icon: Home, highlight: true },
  { label: "Computer & Laptops", href: "/store?category=laptops", icon: Laptop },
  { label: "Computer Accessories", href: "/store?category=accessories", icon: Package },
  { label: "Storage Devices", href: "/store?category=storage", icon: HardDrive },
  { label: "Networking", href: "/store?category=networking", icon: Wifi },
  { label: "Components", href: "/store?category=components", icon: Cpu },
  { label: "Gadgets", href: "/store?category=gadgets", icon: Smartphone },
];

export default function Navbar({ logoUrl, siteName = "Alphatech" }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  return (
    <>
      {/* Top navbar */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-lg" : ""}`}>
        {/* Main nav bar */}
        <div className="bg-[#0c1a2e] border-b border-sky-900/30">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-3">
            {/* Circle Logo Terminal */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <div className="relative">
                <div className="h-11 w-11 rounded-full border-2 border-sky-400 bg-sky-950 flex items-center justify-center overflow-hidden shadow-lg shadow-sky-500/20">
                  {logoUrl ? (
                    <img src={logoUrl} alt={siteName} className="h-full w-full object-cover rounded-full" />
                  ) : (
                    <svg viewBox="0 0 44 44" className="h-8 w-8">
                      <circle cx="22" cy="22" r="20" fill="none" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="3 2"/>
                      <text x="22" y="27" textAnchor="middle" fill="#0ea5e9" fontSize="16" fontWeight="700" fontFamily="Poppins">A</text>
                    </svg>
                  )}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-400 rounded-full border-2 border-[#0c1a2e]"/>
              </div>
              <div>
                <p className="font-bold text-white text-sm leading-tight tracking-wide">
                  {siteName.toUpperCase()}
                </p>
                <p className="text-[9px] text-sky-400 tracking-widest leading-tight">
                  COMPUTER ENGINEERING & TECHNOLOGIES
                </p>
              </div>
            </Link>

            {/* Search bar */}
            <div className="flex-1 max-w-xl mx-4 hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search laptops, phones, accessories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      window.location.href = `/store?search=${encodeURIComponent(searchQuery.trim())}`;
                    }
                  }}
                  className="w-full bg-white/10 border border-sky-800/50 text-white placeholder-slate-400 rounded-lg pl-4 pr-12 py-2.5 text-sm focus:outline-none focus:border-sky-400 focus:bg-white/15 transition-all"
                />
                <button
                  onClick={() => {
                    if (searchQuery.trim()) window.location.href = `/store?search=${encodeURIComponent(searchQuery.trim())}`;
                  }}
                  className="absolute right-0 top-0 h-full px-4 bg-sky-500 hover:bg-sky-600 rounded-r-lg text-white transition-colors flex items-center"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Mobile search */}
              <button className="md:hidden text-slate-300 hover:text-sky-400 p-1.5" onClick={() => setSearchOpen(!searchOpen)}>
                <Search className="h-5 w-5" />
              </button>

              {/* Repairs link */}
              <Link href="/book-repair"
                className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-sky-400 text-sm font-medium transition-colors">
                <Wrench className="h-4 w-4" />
                <span>Repairs</span>
              </Link>

              {/* Auth buttons */}
              {session ? (
                <Link href="/account"
                  className="flex items-center gap-1.5 border border-sky-500 text-sky-400 hover:bg-sky-500 hover:text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Account</span>
                </Link>
              ) : (
                <>
                  <Link href="/login"
                    className="flex items-center gap-1.5 text-slate-300 hover:text-sky-400 border border-slate-700 hover:border-sky-500 px-3 py-1.5 rounded-lg text-sm font-medium transition-all">
                    <LogIn className="h-4 w-4" />
                    <span className="hidden sm:inline">Login</span>
                  </Link>
                  <Link href="/register"
                    className="flex items-center gap-1.5 bg-sky-500 hover:bg-sky-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all">
                    <UserPlus className="h-4 w-4" />
                    <span className="hidden sm:inline">Sign Up</span>
                  </Link>
                </>
              )}

              {/* Cart */}
              <CartIcon />

              {/* Mobile menu */}
              <button className="md:hidden text-slate-300 hover:text-white p-1.5 ml-1" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile search bar */}
          {searchOpen && (
            <div className="md:hidden px-4 pb-3">
              <div className="relative">
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      window.location.href = `/store?search=${encodeURIComponent(searchQuery.trim())}`;
                    }
                  }}
                  className="w-full bg-white/10 border border-sky-800/50 text-white placeholder-slate-400 rounded-lg pl-4 pr-12 py-2.5 text-sm focus:outline-none focus:border-sky-400"
                />
                <button
                  onClick={() => {
                    if (searchQuery.trim()) window.location.href = `/store?search=${encodeURIComponent(searchQuery.trim())}`;
                  }}
                  className="absolute right-0 top-0 h-full px-4 bg-sky-500 rounded-r-lg text-white"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Category nav bar */}
        <div className="bg-sky-600 hidden md:block">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center overflow-x-auto scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-all hover:bg-sky-700 ${
                    cat.highlight ? "bg-sky-800 text-yellow-300" : "text-white"
                  }`}
                >
                  <cat.icon className="h-3.5 w-3.5" />
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#0c1a2e] pt-16 overflow-y-auto">
          <div className="px-5 py-6 space-y-4">
            <p className="text-sky-400 text-xs font-semibold tracking-widest uppercase">Categories</p>
            {CATEGORIES.map((cat) => (
              <Link key={cat.href} href={cat.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 text-white py-2 border-b border-slate-800 text-sm font-medium">
                <cat.icon className="h-4 w-4 text-sky-400" />
                {cat.label}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              <Link href="/book-repair" onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 text-white py-2 text-sm font-medium">
                <Wrench className="h-4 w-4 text-sky-400" /> Repairs
              </Link>
              <Link href="/about" onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 text-white py-2 text-sm font-medium">
                About
              </Link>
              <Link href="/contact" onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 text-white py-2 text-sm font-medium">
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
