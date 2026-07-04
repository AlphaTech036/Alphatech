export const dynamic = "force-dynamic";
// app/api/orders/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { initializePayment } from "@/lib/flutterwave";
import { z } from "zod";
import { randomBytes } from "crypto";

const itemSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1),
  unitPrice: z.number().min(0),
});

const orderSchema = z.object({
  items: z.array(itemSchema).min(1),
  shippingAddress: z.object({
    name: z.string().min(2),
    phone: z.string().min(7),
    address: z.string().min(5),
    city: z.string().min(2),
    state: z.string().min(2),
  }),
  email: z.string().email(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const parsed = orderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
    }

    const { items, shippingAddress, email } = parsed.data;

    const products = await prisma.product.findMany({
      where: { id: { in: items.map((i) => i.productId) } },
    });

    if (products.length !== items.length) {
      return NextResponse.json({ error: "One or more products not found" }, { status: 400 });
    }

    for (const item of items) {
      const product = products.find((p) => p.id === item.productId)!;
      if (product.stockQuantity < item.quantity) {
        return NextResponse.json({ error: `Insufficient stock for ${product.name}` }, { status: 400 });
      }
    }

    const subtotal = items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
    const total = subtotal;
    const orderNumber = `ALP-ORD-${Date.now()}-${randomBytes(3).toString("hex").toUpperCase()}`;
    const paymentRef = `ALP-PAY-${randomBytes(8).toString("hex").toUpperCase()}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: session?.user?.id ?? null,
        status: "PENDING",
        subtotal,
        total,
        shippingAddress,
        items: {
          create: items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
            unitPrice: i.unitPrice,
          })),
        },
        payments: {
          create: {
            provider: "FLUTTERWAVE",
            reference: paymentRef,
            amount: total,
            status: "PENDING",
          },
        },
      },
    });

    const payment = await initializePayment({
      email,
      amount: total,
      name: shippingAddress.name,
      phone: shippingAddress.phone,
      reference: paymentRef,
      orderId: order.id,
      orderNumber,
      redirectUrl: `${process.env.NEXTAUTH_URL}/order-confirmed?ref=${paymentRef}`,
    });

    return NextResponse.json({
      orderId: order.id,
      orderNumber,
      paymentUrl: payment.link,
      reference: paymentRef,
    });
  } catch (err: any) {
    console.error("Order creation error:", err);
    return NextResponse.json({ error: err.message ?? "Failed to create order" }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const orders = await prisma.order.findMany({
    where: session.user.role === "ADMIN" ? {} : { userId: session.user.id },
    include: { items: { include: { product: true } }, payments: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(orders);
}

