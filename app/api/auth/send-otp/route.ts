// app/api/auth/send-otp/route.ts
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendOTPEmail } from "@/lib/email";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const { email, name } = parsed.data;

    // Rate limit: max 3 OTP requests per email per 15 minutes
    const recentCount = await prisma.emailOTP.count({
      where: {
        email,
        createdAt: { gte: new Date(Date.now() - 15 * 60 * 1000) },
      },
    });

    if (recentCount >= 3) {
      return NextResponse.json(
        { error: "Too many requests. Please wait 15 minutes and try again." },
        { status: 429 }
      );
    }

    const code = generateCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await prisma.emailOTP.create({
      data: { email, code, expiresAt },
    });

    await sendOTPEmail({ to: email, name, code });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Send OTP error:", err);
    return NextResponse.json(
      { error: err.message ?? "Failed to send verification code" },
      { status: 500 }
    );
  }
}
