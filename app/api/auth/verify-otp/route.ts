// app/api/auth/verify-otp/route.ts
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { email, code } = parsed.data;

    const otp = await prisma.emailOTP.findFirst({
      where: {
        email,
        code,
        verified: false,
        expiresAt: { gte: new Date() },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!otp) {
      return NextResponse.json(
        { error: "Invalid or expired code. Please request a new one." },
        { status: 400 }
      );
    }

    // Mark OTP as used
    await prisma.emailOTP.update({
      where: { id: otp.id },
      data: { verified: true },
    });

    // Mark the user's email as verified (if the user already exists)
    await prisma.user.updateMany({
      where: { email },
      data: { emailVerified: new Date() },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Verify OTP error:", err);
    return NextResponse.json(
      { error: err.message ?? "Verification failed" },
      { status: 500 }
    );
  }
}
