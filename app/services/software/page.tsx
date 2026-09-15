// app/services/software/page.tsx
import { Settings } from "lucide-react";
import ServiceDetailPage from "@/components/services/ServiceDetailPage";

export const metadata = {
  title: "Software & OS Installation | Alphatech Computer Engineering & Technologies",
  description: "Windows 10/11, Linux and macOS installation, driver setup, software configuration and system optimization.",
};

export default function SoftwarePage() {
  return (
    <ServiceDetailPage
      icon={Settings}
      title="Software & OS Installation"
      tagline="Repair Services"
      image="https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=1200&q=80"
      description="Whether you need a clean Windows install, a Linux setup, or your current system optimized and decluttered, we configure it properly the first time — drivers, updates and essential software included."
      price="From ₦5,000"
      turnaround="Same day"
      included={[
        "Windows 10 / 11 clean installation and activation",
        "Linux and macOS installation and setup",
        "Driver installation for all hardware components",
        "Essential software installation (Office, browsers, PDF tools)",
        "System updates and security patches",
        "Performance optimization and startup cleanup",
        "Data backup before any OS reinstall",
        "Basic user account and settings configuration",
      ]}
      faq={[
        { q: "Will I lose my files during an OS reinstall?", a: "We back up your important files before any reinstall as standard practice, but we recommend having your own backup too for critical data." },
        { q: "Can you install specific software I need for work or school?", a: "Yes — let us know what you need during booking and we'll include it in the setup." },
      ]}
    />
  );
}
