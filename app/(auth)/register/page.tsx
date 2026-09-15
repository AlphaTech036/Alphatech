"use client";
export const dynamic = "force-dynamic";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { UserPlus, Mail, ShieldCheck, ArrowLeft } from "lucide-react";
import PasswordInput from "@/components/ui/PasswordInput";

type Step = "form" | "otp";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("form");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setInterval(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [resendCooldown]);

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, name: form.name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to send verification code");
      setStep("otp");
      setResendCooldown(60);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleOtpChange(index: number, value: string) {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 5) inputsRef.current[index + 1]?.focus();
  }

  function handleOtpKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  async function handleVerifyAndRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const code = otp.join("");

    try {
      const verifyRes = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, code }),
      });
      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) throw new Error(verifyData.error ?? "Invalid code");

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");

      await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      router.push("/account");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (resendCooldown > 0) return;
    setError("");
    try {
      await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, name: form.name }),
      });
      setResendCooldown(60);
    } catch {
      setError("Failed to resend code. Try again.");
    }
  }

  return (
    <main className="min-h-[70vh] bg-[#0c1a2e] flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8">
        {step === "form" ? (
          <>
            <div className="h-11 w-11 rounded-lg bg-sky-500/20 flex items-center justify-center mb-5">
              <UserPlus className="h-5 w-5 text-sky-400" />
            </div>
            <h1 className="font-bold text-2xl text-white">Create your account</h1>
            <p className="text-sm text-slate-400 mt-1.5">
              Book repairs, shop, and track everything in one place.
            </p>

            <form onSubmit={handleSendOtp} className="mt-6 space-y-4">
              {error && (
                <p className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-3 py-2">{error}</p>
              )}
              <div>
                <label className="text-xs text-slate-400 block mb-1.5">Full name</label>
                <input type="text" required value={form.name} onChange={(e) => update("name", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-sky-400" />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1.5">Email</label>
                <input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-sky-400" />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1.5">Phone (optional)</label>
                <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-sky-400" />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1.5">Password</label>
                <PasswordInput value={form.password} onChange={(v) => update("password", v)} required minLength={8} />
                <p className="text-xs text-slate-500 mt-1">At least 8 characters.</p>
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-sky-500 hover:bg-sky-600 disabled:opacity-60 text-white font-semibold px-4 py-3 rounded-lg transition-colors">
                {loading ? "Sending code..." : "Continue"}
              </button>
            </form>

            <p className="text-sm text-slate-400 mt-6 text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-sky-400 hover:underline">Log in</Link>
            </p>
          </>
        ) : (
          <>
            <button onClick={() => setStep("form")} className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-5">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>

            <div className="h-11 w-11 rounded-lg bg-sky-500/20 flex items-center justify-center mb-5">
              <ShieldCheck className="h-5 w-5 text-sky-400" />
            </div>
            <h1 className="font-bold text-2xl text-white">Verify your email</h1>
            <p className="text-sm text-slate-400 mt-1.5">
              We sent a 6-digit code to <span className="text-sky-400">{form.email}</span>
            </p>

            <form onSubmit={handleVerifyAndRegister} className="mt-6 space-y-5">
              {error && (
                <p className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-3 py-2">{error}</p>
              )}

              <div className="flex gap-2 justify-center">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { inputsRef.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className="w-11 h-13 text-center text-xl font-bold bg-slate-950 border border-slate-700 text-white rounded-lg focus:outline-none focus:border-sky-400"
                  />
                ))}
              </div>

              <button type="submit" disabled={loading || otp.join("").length !== 6}
                className="w-full bg-sky-500 hover:bg-sky-600 disabled:opacity-60 text-white font-semibold px-4 py-3 rounded-lg transition-colors">
                {loading ? "Verifying..." : "Verify & Create Account"}
              </button>

              <p className="text-sm text-slate-400 text-center">
                Didn't get a code?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendCooldown > 0}
                  className="text-sky-400 hover:underline disabled:text-slate-600 disabled:no-underline"
                >
                  {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend code"}
                </button>
              </p>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
