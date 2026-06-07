import { NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServerClient } from "@/lib/supabase-server";
import type Stripe from "stripe";

// Stripe requires the raw body to verify the webhook signature
export const config = { api: { bodyParser: false } };

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return Response.json({ error: "Missing signature or webhook secret" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch {
    return Response.json({ error: "Webhook signature verification failed" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    await handleCheckoutComplete(session);
  }

  return Response.json({ received: true });
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const supabase = createServerClient();

  const shipping = session.shipping_details;
  const shippingAddress = shipping?.address
    ? {
        line1: shipping.address.line1 ?? "",
        line2: shipping.address.line2 ?? undefined,
        city: shipping.address.city ?? "",
        state: shipping.address.state ?? "",
        postal_code: shipping.address.postal_code ?? "",
        country: shipping.address.country ?? "US",
      }
    : { line1: "", city: "", state: "", postal_code: "", country: "US" };

  // Upsert customer
  const email = session.customer_details?.email ?? "";
  const name = session.customer_details?.name ?? "";

  const { data: customer } = await supabase
    .from("customers")
    .upsert({ email, name }, { onConflict: "email" })
    .select("id")
    .single();

  // Create order
  const totalCents = session.amount_total ?? 0;
  const shippingCents = session.shipping_cost?.amount_total ?? 0;
  const subtotalCents = totalCents - shippingCents;

  const { data: order } = await supabase
    .from("orders")
    .insert({
      customer_id: customer?.id ?? null,
      customer_email: email,
      customer_name: name,
      customer_phone: session.customer_details?.phone ?? null,
      shipping_address: shippingAddress,
      status: "paid",
      stripe_session_id: session.id,
      stripe_payment_intent_id:
        typeof session.payment_intent === "string" ? session.payment_intent : null,
      subtotal_cents: subtotalCents,
      shipping_cents: shippingCents,
      tax_cents: session.total_details?.amount_tax ?? 0,
      total_cents: totalCents,
    })
    .select("id")
    .single();

  if (!order) return;

  // Create order items from line items
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });

  await supabase.from("order_items").insert(
    lineItems.data.map((item) => ({
      order_id: order.id,
      sanity_product_id: "",
      product_name_en: item.description ?? "",
      product_name_kr: "",
      quantity: item.quantity ?? 1,
      unit_price_cents: item.price?.unit_amount ?? 0,
      total_price_cents: item.amount_total,
    }))
  );
}
