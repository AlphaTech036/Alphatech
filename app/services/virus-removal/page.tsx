// app/services/virus-removal/page.tsx
import { Bug } from "lucide-react";
import ServiceDetailPage from "@/components/services/ServiceDetailPage";

export const metadata = {
  title: "Virus & Malware Removal | Alphatech Computer Engineering & Technologies",
  description: "Deep clean and security hardening for infected computers. Remove viruses, malware and unwanted programs safely.",
};

export default function VirusRemovalPage() {
  return (
    <ServiceDetailPage
      icon={Bug}
      title="Virus & Malware Removal"
      tagline="Repair Services"
      image="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1200&q=80"
      description="A slow, popup-filled or suspicious computer is often a sign of infection. We run a deep clean, remove every trace of malware, and harden your system against future attacks — without touching your personal files."
      price="From ₦7,000"
      turnaround="Same day"
      included={[
        "Full system malware and virus scan",
        "Removal of viruses, trojans, spyware and adware",
        "Unwanted browser extensions and toolbars removed",
        "Startup program cleanup",
        "Security software installation and configuration",
        "System restore point creation before cleanup",
        "Your personal files preserved throughout",
        "Security recommendations to prevent reinfection",
      ]}
      faq={[
        { q: "Will removing the virus delete my files?", a: "No — the cleanup targets malicious software specifically. Your personal files, photos and documents are preserved." },
        { q: "How do I know if my computer is infected?", a: "Common signs: unexpected popups, slow performance, browser redirects, programs you didn't install, or your antivirus getting disabled on its own. Bring it in for a free check." },
      ]}
    />
  );
}
