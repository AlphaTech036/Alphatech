// lib/email.ts
// Sends transactional emails via Resend.
// Sign up free at resend.com and add RESEND_API_KEY to .env.local

const RESEND_API = "https://api.resend.com/emails";

export async function sendOTPEmail({
  to,
  name,
  code,
}: {
  to: string;
  name: string;
  code: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("RESEND_API_KEY not set — cannot send email");
    throw new Error("Email service not configured");
  }

  const html = `
    <div style="font-family: 'Poppins', Arial, sans-serif; max-width: 480px; margin: 0 auto; background: #ffffff;">
      <div style="background: #0c1a2e; padding: 32px 24px; text-align: center;">
        <p style="color: #38bdf8; font-size: 12px; font-weight: 700; letter-spacing: 2px; margin: 0 0 8px;">
          ALPHATECH COMPUTER ENGINEERING & TECHNOLOGIES
        </p>
        <h1 style="color: #ffffff; font-size: 20px; margin: 0;">Verify your email</h1>
      </div>
      <div style="padding: 32px 24px;">
        <p style="color: #334155; font-size: 15px; line-height: 1.6;">Hi ${name},</p>
        <p style="color: #334155; font-size: 15px; line-height: 1.6;">
          Thanks for signing up. Use the verification code below to confirm your email address:
        </p>
        <div style="background: #f0f9ff; border: 2px dashed #0ea5e9; border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0;">
          <p style="color: #0284c7; font-size: 32px; font-weight: 700; letter-spacing: 8px; margin: 0; font-family: monospace;">
            ${code}
          </p>
        </div>
        <p style="color: #64748b; font-size: 13px; line-height: 1.6;">
          This code expires in 10 minutes. If you didn't request this, you can safely ignore this email.
        </p>
      </div>
      <div style="background: #f8fafc; padding: 16px 24px; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="color: #94a3b8; font-size: 11px; margin: 0;">
          Alphatech Computer Engineering & Technologies · Osogbo & Akure, Nigeria
        </p>
      </div>
    </div>
  `;

  const res = await fetch(RESEND_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Alphatech <onboarding@resend.dev>", // Replace with your verified domain once you have one
      to: [to],
      subject: `Your verification code: ${code}`,
      html,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    console.error("Resend error:", error);
    throw new Error(error.message ?? "Failed to send email");
  }

  return res.json();
}
