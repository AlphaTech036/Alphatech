// app/api/payments/verify/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPayment } from "@/lib/flutterwave";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const transactionId = searchParams.get("transaction_id");
    const ref = searchParams.get("tx_ref");

    if (!transactionId || !ref) {
      return NextResponse.json({ error: "Missing transaction details" }, { status: 400 });
    }

    // Verify with Flutterwave
    const transaction = await verifyPayment(transactionId);

    if (transaction.status !== "successful") {
      // Update payment as failed
      await prisma.payment.updateMany({
        where: { reference: ref },
        data: { status: "FAILED" },
      });
      return NextResponse.json({ status: "failed" });
    }

    // Update payment and order status
    await prisma.payment.updateMany({
      where: { reference: ref },
      data: { status: "SUCCESS", paidAt: new Date() },
    });

    // Find the order linked to this payment and mark as PAID
    const payment = await prisma.payment.findFirst({ where: { reference: ref } });
    if (payment) {
      await prisma.order.update({
        where: { id: payment.orderId },
        data: { status: "PAID" },
      });

      // Reduce stock for each item
      const orderItems = await prisma.orderItem.findMany({
        where: { orderId: payment.orderId },
      });
      for (const item of orderItems) {
        await prisma.product.update({
          where: { id: item.productId },
          data: { stockQuantity: { decrement: item.quantity } },
        });
      }
    }

    return NextResponse.json({
      status: "success",
      orderNumber: transaction.meta?.orderNumber,
      amount: transaction.amount,
      email: transaction.customer.email,
    });
  } catch (err: any) {
    console.error("Payment verification error:", err);
    return NextResponse.json({ error: err.message ?? "Verification failed" }, { status: 500 });
  }
}
