// lib/flutterwave.ts
// Flutterwave payment helper functions.
// Secret key is server-side only. Public key is exposed to browser (safe).

const FLW_BASE = "https://api.flutterwave.com/v3";
const SECRET = process.env.FLUTTERWAVE_SECRET_KEY!;

function flwHeaders() {
  return {
    Authorization: `Bearer ${SECRET}`,
    "Content-Type": "application/json",
  };
}

// Initialize a Flutterwave payment
// Returns { link } — redirect the customer to this URL
export async function initializePayment({
  email,
  amount, // in Naira (NOT kobo — Flutterwave uses full currency units)
  name,
  phone,
  reference,
  orderId,
  orderNumber,
  redirectUrl,
}: {
  email: string;
  amount: number;
  name: string;
  phone?: string;
  reference: string;
  orderId: string;
  orderNumber: string;
  redirectUrl: string;
}) {
  const res = await fetch(`${FLW_BASE}/payments`, {
    method: "POST",
    headers: flwHeaders(),
    body: JSON.stringify({
      tx_ref: reference,
      amount,
      currency: "NGN",
      redirect_url: redirectUrl,
      customer: { email, name, phonenumber: phone ?? "" },
      meta: { orderId, orderNumber },
      customizations: {
        title: "Alphatech Computer Engineering",
        description: `Payment for order ${orderNumber}`,
        logo: "https://res.cloudinary.com/alphatech/image/upload/logo.png",
      },
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message ?? "Flutterwave initialization failed");
  }

  const data = await res.json();
  return data.data as { link: string };
}

// Verify a transaction by ID
export async function verifyPayment(transactionId: string) {
  const res = await fetch(`${FLW_BASE}/transactions/${transactionId}/verify`, {
    headers: flwHeaders(),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message ?? "Verification failed");
  }

  const data = await res.json();
  return data.data as {
    status: string; // "successful" | "failed"
    tx_ref: string;
    amount: number;
    currency: string;
    customer: { email: string; name: string };
    meta: { orderId: string; orderNumber: string };
  };
}
