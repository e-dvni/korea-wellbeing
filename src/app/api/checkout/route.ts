import { NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import type { CartItem } from "@/store/cart";

export async function POST(req: NextRequest) {
  const { items }: { items: CartItem[] } = await req.json();

  if (!items?.length) {
    return Response.json({ error: "Cart is empty" }, { status: 400 });
  }

  const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(item.price * 100), // cents
        product_data: {
          name: `${item.nameEN} / ${item.nameKR}`,
          ...(item.imageUrl ? { images: [item.imageUrl] } : {}),
        },
      },
    })),
    shipping_address_collection: {
      allowed_countries: ["US"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "usd" },
          display_name: "Standard Shipping",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 5 },
            maximum: { unit: "business_day", value: 10 },
          },
        },
      },
    ],
    success_url: `${origin}/store/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/store`,
    metadata: {
      // Store cart item IDs for the webhook to reference
      item_ids: items.map((i) => i.id).join(","),
    },
  });

  return Response.json({ url: session.url });
}
