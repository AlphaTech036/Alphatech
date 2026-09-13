// components/layout/Footer.tsx
import Link from "next/link";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

type Props = { settings: Record<string, string> };

function TwitterX() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
    </svg>
  );
}

export default function Footer({ settings }: Props) {
  const s = settings;
  const logoUrl = s["site.logo_url"];
  const siteName = s["site.name"] ?? "Alphatech Computer Engineering & Technologies";
  const tagline = s["site.tagline"] ?? "Reliable solutions. Technology that works.";
  const phone1 = s["contact.phone1"] ?? "";
  const phone2 = s["contact.phone2"] ?? "";
  const email = s["contact.email"] ?? "";
  const whatsapp = s["contact.whatsapp"] ?? "#";
  const location1 = s["contact.location1"] ?? "";
  const location2 = s["contact.location2"] ?? "";
  const facebook = s["social.facebook"] ?? "";
  const instagram = s["social.instagram"] ?? "";
  const twitter = s["social.twitter"] ?? "";
  const tiktok = s["social.tiktok"] ?? "";

  const SOCIAL_LINKS = [
    { href: facebook, icon: FacebookIcon, label: "Facebook" },
    { href: instagram, icon: InstagramIcon, label: "Instagram" },
    { href: twitter, icon: TwitterX, label: "Twitter/X" },
    { href: tiktok, icon: TikTokIcon, label: "TikTok" },
  ].filter(s => s.href);

  return (
    <footer className="bg-[#0c1a2e]">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 pt-12 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full border-2 border-sky-400 bg-sky-950 flex items-center justify-center overflow-hidden">
                {logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logoUrl} alt="Logo" className="h-full w-full object-cover rounded-full" />
                ) : (
                  <svg viewBox="0 0 44 44" className="h-8 w-8">
                    <circle cx="22" cy="22" r="20" fill="none" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="3 2"/>
                    <text x="22" y="27" textAnchor="middle" fill="#0ea5e9" fontSize="16" fontWeight="700" fontFamily="Poppins">A</text>
                  </svg>
                )}
              </div>
              <div>
                <p className="font-bold text-white text-sm tracking-wide">ALPHATECH</p>
                <p className="text-[9px] text-sky-400 tracking-widest">COMPUTER ENGINEERING & TECH</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">{tagline}</p>

            {/* Social links */}
            {SOCIAL_LINKS.length > 0 && (
              <div className="flex items-center gap-2 mt-5">
                {SOCIAL_LINKS.map((social) => (
                  <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                    className="h-8 w-8 rounded-lg bg-slate-800 hover:bg-sky-500 text-slate-400 hover:text-white flex items-center justify-center transition-all"
                    aria-label={social.label}>
                    <social.icon />
                  </a>
                ))}
              </div>
            )}

            {/* WhatsApp */}
            <a href={whatsapp} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-4 py-2 rounded-lg mt-4 transition-colors">
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </div>

          {/* Company links */}
          <div>
            <p className="font-bold text-white text-sm mb-4">Company</p>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Store", href: "/store" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-400 hover:text-sky-400 text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="font-bold text-white text-sm mb-4">Support</p>
            <ul className="space-y-2.5">
              {[
                { label: "Book a Repair", href: "/book-repair" },
                { label: "Track Order/Repair", href: "/track-order" },
                { label: "FAQ", href: "/faq" },
                { label: "My Account", href: "/account" },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-400 hover:text-sky-400 text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-bold text-white text-sm mb-4">Contact Us</p>
            <ul className="space-y-3">
              {location1 && (
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                  <span className="text-slate-400 text-sm">{location1}</span>
                </li>
              )}
              {location2 && (
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                  <span className="text-slate-400 text-sm">{location2}</span>
                </li>
              )}
              {(phone1 || phone2) && (
                <li className="flex items-start gap-2">
                  <Phone className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    {phone1 && <a href={`tel:${phone1}`} className="block text-slate-400 hover:text-sky-400 text-sm transition-colors">{phone1}</a>}
                    {phone2 && <a href={`tel:${phone2}`} className="block text-slate-400 hover:text-sky-400 text-sm transition-colors">{phone2}</a>}
                  </div>
                </li>
              )}
              {email && (
                <li className="flex items-start gap-2">
                  <Mail className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                  <a href={`mailto:${email}`} className="text-slate-400 hover:text-sky-400 text-sm break-all transition-colors">
                    {email}
                  </a>
                </li>
              )}
            </ul>

            {/* Social in contact section */}
            <div className="mt-5">
              <p className="text-slate-500 text-xs font-semibold tracking-widest uppercase mb-3">Follow us</p>
              <div className="flex items-center gap-2 flex-wrap">
                {facebook && (
                  <a href={facebook} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors">
                    <FacebookIcon /> Facebook
                  </a>
                )}
                {instagram && (
                  <a href={instagram} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors">
                    <InstagramIcon /> Instagram
                  </a>
                )}
                {twitter && (
                  <a href={twitter} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-black hover:bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors border border-slate-700">
                    <TwitterX /> X
                  </a>
                )}
                {tiktok && (
                  <a href={tiktok} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-black hover:bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors border border-slate-700">
                    <TikTokIcon /> TikTok
                  </a>
                )}
                {SOCIAL_LINKS.length === 0 && (
                  <p className="text-slate-600 text-xs">Add social links in Admin → Site Settings</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-xs text-center">
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {["PAYSTACK", "FLUTTERWAVE", "BANK TRANSFER"].map(p => (
              <span key={p} className="border border-slate-700 text-slate-500 text-[9px] font-mono px-2 py-1 rounded">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
