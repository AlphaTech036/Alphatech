// app/services/data-recovery/page.tsx
import { HardDrive } from "lucide-react";
import ServiceDetailPage from "@/components/services/ServiceDetailPage";

export const metadata = {
  title: "Data Recovery | Alphatech Computer Engineering & Technologies",
  description: "Recover files from failed hard drives, SSDs, USB drives and memory cards. Professional data recovery in Osogbo and Akure, Nigeria.",
};

export default function DataRecoveryPage() {
  return (
    <ServiceDetailPage
      icon={HardDrive}
      title="Data Recovery"
      tagline="Repair Services"
      image="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80"
      description="Lost years of photos, documents or business files to a failed drive? We recover data from logical failures, accidental deletion and physically damaged drives — with a no-recovery, no-charge policy on diagnosis."
      price="From ₦15,000"
      turnaround="2–5 days"
      included={[
        "Free initial assessment of drive condition",
        "Recovery from accidental deletion and formatting",
        "Recovery from failed HDDs and SSDs",
        "USB drive and memory card recovery",
        "Recovery from corrupted file systems",
        "Secure handling — your data is never shared or copied elsewhere",
        "Recovered files delivered on a drive of your choice",
        "No-recovery, no-charge on diagnosis",
      ]}
      faq={[
        { q: "What are my chances of recovery?", a: "It depends on the type of failure. Logical failures (accidental deletion, corruption) have high success rates. Physical damage varies — we'll give you an honest assessment after diagnosis, before any charge." },
        { q: "Is my data safe and private during recovery?", a: "Yes. We handle every drive with strict confidentiality and never access files beyond what's needed for recovery." },
        { q: "What if you can't recover my data?", a: "You only pay for the diagnostic assessment — no recovery, no additional charge." },
      ]}
    />
  );
}
