// app/services/laptop-repair/page.tsx
import { Laptop } from "lucide-react";
import ServiceDetailPage from "@/components/services/ServiceDetailPage";

export const metadata = {
  title: "Laptop Repair | Alphatech Computer Engineering & Technologies",
  description: "Professional laptop repair — screens, keyboards, batteries, hinges and more. Certified engineers, genuine parts, 90-day warranty.",
};

export default function LaptopRepairPage() {
  return (
    <ServiceDetailPage
      icon={Laptop}
      title="Laptop Repair"
      tagline="Repair Services"
      image="https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=1200&q=80"
      description="From a cracked screen to a laptop that won't power on, our certified engineers diagnose the fault fast and repair it right — using genuine parts, never counterfeits."
      price="From ₦8,000"
      turnaround="24–48 hours"
      included={[
        "Free diagnostic assessment before any work begins",
        "Screen replacement — all major brands and sizes",
        "Keyboard repair or full replacement",
        "Battery replacement with genuine cells",
        "Hinge and chassis repair",
        "Charging port repair",
        "Motherboard-level diagnosis and repair",
        "Full functional test before handover",
      ]}
      faq={[
        { q: "How long does a screen replacement take?", a: "Most screen replacements are completed within 24 hours if the part is in stock. We'll confirm timing after diagnosis." },
        { q: "Will I lose my files?", a: "Hardware repairs like screens, keyboards and batteries don't touch your data. We take extra care and back up your data before any repair that could affect storage." },
        { q: "Do you work on all laptop brands?", a: "Yes — HP, Dell, Lenovo, Asus, Acer, Apple MacBooks and more." },
      ]}
    />
  );
}
