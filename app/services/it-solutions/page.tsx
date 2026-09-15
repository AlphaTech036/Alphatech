// app/services/it-solutions/page.tsx
import { Network } from "lucide-react";
import ServiceDetailPage from "@/components/services/ServiceDetailPage";

export const metadata = {
  title: "Networking & Business IT | Alphatech Computer Engineering & Technologies",
  description: "Office network setup, LAN cabling, Wi-Fi optimization and ongoing business IT support contracts for SMEs in Nigeria.",
};

export default function ITSolutionsPage() {
  return (
    <ServiceDetailPage
      icon={Network}
      title="Networking & Business IT"
      tagline="IT Solutions"
      image="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80"
      description="From a single office Wi-Fi setup to a complete network overhaul with ongoing support, we keep your business's technology reliable — so you can focus on running your business, not fixing it."
      price="Custom quote"
      turnaround="1–2 days"
      included={[
        "Office and home network setup",
        "Router and switch configuration",
        "LAN cabling and structured wiring",
        "Wi-Fi coverage optimization",
        "Network troubleshooting and diagnostics",
        "Monthly business IT support contracts available",
        "Printer and shared device network setup",
        "Remote support for minor issues",
      ]}
      faq={[
        { q: "Do you offer ongoing support contracts?", a: "Yes — we offer monthly business IT support plans that cover your computers, network and printers, so problems get resolved quickly without a per-visit charge." },
        { q: "Can you set up a network for a new office?", a: "Absolutely. We handle everything from cabling to router configuration for new office spaces of any size." },
      ]}
    />
  );
}
