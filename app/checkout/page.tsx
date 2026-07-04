// app/checkout/page.tsx
export const dynamic = "force-dynamic";

"use client";

import { useState } from "react";
import { useCart } from "@/lib/store/cart";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingBag, Lock, ArrowRight } from "lucide-react";

function formatPrice(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

export default function CheckoutPage() {
  const { items, total, count, clearCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: session?.user?.name ?? "",
    email: session?.user?.email ?? "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.id,
            quantity: i.quantity,
            unitPrice: i.price,
          })),
          shippingAddress: {
            name: form.name,
            phone: form.phone,
            address: form.address,
            city: form.city,
            state: form.state,
          },
          email: form.email,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to create order");

      // Clear cart and redirect to Flutterwave payment page
      clearCart();
      window.location.href = data.paymentUrl;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <main className="bg-slate-50 min-h-[70vh] flex items-center justify-center px-5">
        <div className="text-center">
          <ShoppingBag className="h-14 w-14 text-slate-300 mx-auto mb-4" />
          <h1 className="font-display font-bold text-2xl text-slate-900">Your cart is empty</h1>
          <Link href="/store" className="inline-block mt-6 bg-blue-700 text-white font-body font-semibold px-6 py-3 rounded-xl">
            Browse the store
          </Link>
        </div>
      </main>
    );
  }

  const inputClass = "w-full border border-slate-200 rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-blue-400";
  const labelClass = "font-body text-xs text-slate-500 block mb-1.5";

  return (
    <main className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-5 lg:px-8">
        <h1 className="font-display font-bold text-2xl lg:text-3xl text-slate-900 mb-8">Checkout</h1>

        <form onSubmit={handleCheckout} className="grid lg:grid-cols-3 gap-8">
          {/* Shipping details */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="font-display font-semibold text-slate-900 mb-5">Contact & delivery details</h2>

              {error && (
                <p className="font-body text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">{error}</p>
              )}

              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Full name *</label>
                    <input required type="text" value={form.name} onChange={(e) => update("name", e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Phone number *</label>
                    <input required type="tel" placeholder="+234..." value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Email address *</label>
                  <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>Delivery address *</label>
                  <input required type="text" placeholder="Street address, house number..." value={form.address} onChange={(e) => update("address", e.target.value)} className={inputClass} />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>City *</label>
                    <input required type="text" value={form.city} onChange={(e) => update("city", e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>State *</label>
                    <select required value={form.state} onChange={(e) => update("state", e.target.value)}
                      className={`${inputClass} cursor-pointer`}>
                      <option value="">Select state</option>
                      {["Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
              <Lock className="h-4 w-4 text-blue-700 shrink-0 mt-0.5" />
              <p className="font-body text-sm text-blue-800">
                Your payment is processed securely by <strong>Flutterwave</strong>. We never store your card details.
              </p>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-slate-200 rounded-xl p-5 sticky top-20">
              <h2 className="font-display font-semibold text-slate-900 mb-4">
                Order summary ({count()} item{count() !== 1 ? "s" : ""})
              </h2>

              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-start">
                    <div className="h-10 w-10 rounded-lg bg-slate-100 shrink-0 overflow-hidden">
                      {item.image ? (
                        <img src={item.image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-100 to-blue-50" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-xs text-slate-800 line-clamp-2">{item.name}</p>
                      <p className="font-body text-xs text-slate-400 mt-0.5">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-display font-bold text-xs text-slate-900 shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-2 font-body text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(total())}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Delivery</span>
                  <span className="text-green-600">Arranged after order</span>
                </div>
                <div className="flex justify-between font-semibold text-slate-900 pt-2 border-t border-slate-100">
                  <span>Total</span>
                  <span className="font-display font-bold text-blue-800">{formatPrice(total())}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-5 w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-body font-semibold py-3.5 rounded-xl transition-colors"
              >
                {loading ? (
                  "Preparing payment..."
                ) : (
                  <>Pay {formatPrice(total())} <ArrowRight className="h-4 w-4" /></>
                )}
              </button>

              <p className="font-body text-xs text-slate-400 text-center mt-3">
                You'll be redirected to Flutterwave to complete payment
              </p>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
