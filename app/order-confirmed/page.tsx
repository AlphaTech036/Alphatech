// app/order-confirmed/page.tsx
"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check, X, Loader, ShoppingBag } from "lucide-react";

function formatPrice(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

function OrderConfirmedContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    const transactionId = searchParams.get("transaction_id");
    const ref = searchParams.get("tx_ref");

    if (!transactionId || !ref) {
      setStatus("failed");
      return;
    }

    fetch(`/api/payments/verify?transaction_id=${transactionId}&tx_ref=${ref}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.status === "success") {
          setOrderData(data);
          setStatus("success");
        } else {
          setStatus("failed");
        }
      })
      .catch(() => setStatus("failed"));
  }, [searchParams]);

  if (status === "loading") {
    return (
      <div className="text-center py-20">
        <Loader className="h-10 w-10 text-sky-400 animate-spin mx-auto mb-4" />
        <p className="font-body text-slate-400">Verifying your payment...</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="text-center py-20 max-w-md mx-auto">
        <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
          <X className="h-8 w-8 text-red-600" />
        </div>
        <h1 className="font-display font-bold text-2xl text-slate-900">Payment not confirmed</h1>
        <p className="font-body text-slate-500 mt-3">
          Your payment could not be verified. If money was deducted, please contact us immediately on WhatsApp with your payment reference.
        </p>
        <div className="flex flex-wrap gap-3 justify-center mt-6">
          <a href="https://wa.link/3yo0c2" target="_blank" rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white font-body font-semibold px-5 py-2.5 rounded-xl transition-colors">
            Contact us on WhatsApp
          </a>
          <Link href="/store" className="border border-slate-300 text-slate-700 font-body font-semibold px-5 py-2.5 rounded-xl hover:border-slate-400 transition-colors">
            Back to store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-20 max-w-md mx-auto">
      <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
        <Check className="h-8 w-8 text-green-600" />
      </div>
      <h1 className="font-display font-bold text-2xl text-slate-900">Payment successful!</h1>
      <p className="font-body text-slate-500 mt-3">
        Thank you for your order. We'll contact you shortly to arrange delivery.
      </p>

      {orderData && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mt-6 text-left space-y-2">
          {orderData.orderNumber && (
            <div className="flex justify-between font-body text-sm">
              <span className="text-slate-500">Order number</span>
              <span className="font-mono font-semibold text-slate-900">{orderData.orderNumber}</span>
            </div>
          )}
          {orderData.amount && (
            <div className="flex justify-between font-body text-sm">
              <span className="text-slate-500">Amount paid</span>
              <span className="font-display font-bold text-green-700">{formatPrice(orderData.amount)}</span>
            </div>
          )}
          {orderData.email && (
            <div className="flex justify-between font-body text-sm">
              <span className="text-slate-500">Confirmation sent to</span>
              <span className="text-slate-700">{orderData.email}</span>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-3 justify-center mt-8">
        <Link href="/account/orders"
          className="bg-blue-700 hover:bg-blue-800 text-white font-body font-semibold px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2">
          <ShoppingBag className="h-4 w-4" /> View my orders
        </Link>
        <Link href="/store"
          className="border border-slate-300 text-slate-700 font-body font-semibold px-5 py-2.5 rounded-xl hover:border-slate-400 transition-colors">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}

export default function OrderConfirmedPage() {
  return (
    <main className="bg-white min-h-[70vh] px-5">
      <Suspense fallback={
        <div className="text-center py-20">
          <Loader className="h-10 w-10 text-sky-400 animate-spin mx-auto" />
        </div>
      }>
        <OrderConfirmedContent />
      </Suspense>
    </main>
  );
}
