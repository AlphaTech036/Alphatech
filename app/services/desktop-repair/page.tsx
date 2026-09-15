// app/services/desktop-repair/page.tsx
import { Monitor } from "lucide-react";
import ServiceDetailPage from "@/components/services/ServiceDetailPage";

export const metadata = {
  title: "Desktop & Workstation Repair | Alphatech Computer Engineering & Technologies",
  description: "Power issues, upgrades and full diagnostics for desktop computers and workstations. Certified engineers, genuine parts, 90-day warranty.",
};

export default function DesktopRepairPage() {
  return (
    <ServiceDetailPage
      icon={Monitor}
      title="Desktop & Workstation Repair"
      tagline="Repair Services"
      image="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=1200&q=80"
      description="Power supply failures, boot problems, overheating or a machine that's simply slowed down — our engineers get to the root cause and fix it properly, not just patch symptoms."
      price="From ₦6,000"
      turnaround="24–48 hours"
      included={[
        "Full hardware diagnostic scan",
        "Power supply unit testing and replacement",
        "Boot failure and BIOS-level troubleshooting",
        "RAM and GPU fault diagnosis",
        "Overheating fixes — thermal paste, fan replacement, dust removal",
        "Hardware upgrades — RAM, storage, graphics cards",
        "Cable and connector repair",
        "Post-repair stress test before handover",
      ]}
      faq={[
        { q: "My desktop won't turn on at all — what could it be?", a: "Usually the power supply, a loose connection, or a motherboard fault. Bring it in for a free diagnosis before any work begins." },
        { q: "Can you upgrade my workstation for better performance?", a: "Yes — we advise on the most cost-effective upgrade path, whether that's more RAM, an SSD swap, or a graphics card upgrade." },
      ]}
    />
  );
}
