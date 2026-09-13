// app/layout.tsx
export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthProvider from "@/components/providers/AuthProvider";
import { getAllSettings } from "@/lib/site-settings";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const s = await getAllSettings();
  return {
    title: `${s["site.name"]} | Computer Repairs, Sales & IT Solutions in Nigeria`,
    description: `${s["site.name"]} offers professional computer repair, sales and IT solutions in ${s["contact.location1"]} and ${s["contact.location2"]}.`,
    keywords: ["computer repair Nigeria", "laptop repair Osogbo", "computer repair Akure", "buy laptops Nigeria", "IT solutions Nigeria", "Alphatech"],
    openGraph: {
      title: s["site.name"],
      description: s["site.tagline"],
      locale: "en_NG",
      type: "website",
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getAllSettings();

  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body style={{ fontFamily: "'Poppins', sans-serif" }}>
        <AuthProvider>
          <Navbar
            logoUrl={settings["site.logo_url"] || undefined}
            siteName={settings["site.name"]?.split(" ")[0] ?? "ALPHATECH"}
          />
          {children}
          <Footer settings={settings} />
        </AuthProvider>
      </body>
    </html>
  );
}
