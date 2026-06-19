import { NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import type { CartItem } from "@/store/cart";

const NJ_TAX_RATE = 0.06625; // 6.625% NJ sales tax

export async function POST(req: NextRequest) {
  const { items }: { items: CartItem[] } = await req.json();

  if (!items?.length) {
    return Response.json({ error: "Cart is empty" }, { status: 400 });
  }

  const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const subtotalCents = items.reduce(
    (sum, item) => sum + Math.round(item.price * 100) * item.quantity,
    0
  );
  const taxCents = Math.round(subtotalCents * NJ_TAX_RATE);

  const pickupOption = {
    shipping_rate_data: {
      type: "fixed_amount" as const,
      fixed_amount: { amount: 0, currency: "usd" },
      display_name: "Local Pickup — 230 E. Brinkerhoff Ave, Palisades Park, NJ 07650",
    },
  };

  const deliveryOption = {
    shipping_rate_data: {
      type: "fixed_amount" as const,
      fixed_amount: { amount: 0, currency: "usd" },
      display_name: "Free Delivery (Essex, Hudson, Bergen County NJ & New York City)",
      delivery_estimate: {
        minimum: { unit: "business_day" as const, value: 3 },
        maximum: { unit: "business_day" as const, value: 7 },
      },
    },
  };

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      // Product line items
      ...items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(item.price * 100),
          product_data: {
            name: `${item.nameEN} / ${item.nameKR}`,
            ...(item.imageUrl ? { images: [item.imageUrl] } : {}),
          },
        },
      })),
      // NJ Sales Tax line item
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: taxCents,
          product_data: {
            name: "NJ Sales Tax (6.625%)",
          },
        },
      },
    ],
    shipping_address_collection: { allowed_countries: ["US"] },
    shipping_options: [deliveryOption, pickupOption],
    success_url: `${origin}/store/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/store`,
    metadata: {
      item_ids: items.map((i) => i.id).join(","),
    },
  });

  return Response.json({ url: session.url });
}
