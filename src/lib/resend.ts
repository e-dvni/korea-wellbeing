import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderItem {
  product_name_en: string;
  quantity: number;
  unit_price_cents: number;
  total_price_cents: number;
}

interface SendOrderConfirmationParams {
  to: string;
  customerName: string;
  orderId: string;
  items: OrderItem[];
  totalCents: number;
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
}

export async function sendOrderConfirmation(params: SendOrderConfirmationParams) {
  const { to, customerName, orderId, items, totalCents, shippingAddress } = params;

  const itemRows = items
    .map(
      (item) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#333;">${item.product_name_en}</td>
        <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#333;text-align:center;">${item.quantity}</td>
        <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#333;text-align:right;">$${(item.total_price_cents / 100).toFixed(2)}</td>
      </tr>`
    )
    .join("");

  const address = [
    shippingAddress.line1,
    shippingAddress.line2,
    `${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.postal_code}`,
  ]
    .filter(Boolean)
    .join("<br/>");

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;">

        <!-- Header -->
        <tr>
          <td style="background:#23356e;padding:32px;text-align:center;">
            <h1 style="color:#ffffff;margin:0;font-size:24px;">Wellbeing Korea USA</h1>
            <p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:14px;">웰빙코리아 USA</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px 32px;">
            <h2 style="color:#23356e;margin:0 0 8px;">Order Confirmed! / 주문 완료</h2>
            <p style="color:#666;margin:0 0 24px;">Hi ${customerName}, thank you for your order.<br/>
            <span style="color:#999;font-size:13px;">주문해 주셔서 감사합니다.</span></p>

            <p style="color:#999;font-size:12px;margin:0 0 16px;">Order ID: ${orderId}</p>

            <!-- Items -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <th style="text-align:left;color:#999;font-size:12px;padding-bottom:8px;border-bottom:2px solid #23356e;">Product</th>
                <th style="text-align:center;color:#999;font-size:12px;padding-bottom:8px;border-bottom:2px solid #23356e;">Qty</th>
                <th style="text-align:right;color:#999;font-size:12px;padding-bottom:8px;border-bottom:2px solid #23356e;">Total</th>
              </tr>
              ${itemRows}
              <tr>
                <td colspan="2" style="padding:16px 0 0;font-weight:bold;color:#23356e;">Total / 합계</td>
                <td style="padding:16px 0 0;font-weight:bold;color:#23356e;text-align:right;font-size:18px;">$${(totalCents / 100).toFixed(2)}</td>
              </tr>
            </table>

            <!-- Shipping -->
            <div style="margin-top:32px;padding:20px;background:#f8f9ff;border-radius:8px;">
              <p style="color:#23356e;font-weight:bold;margin:0 0 8px;">Shipping Address / 배송지</p>
              <p style="color:#666;margin:0;line-height:1.6;">${address}</p>
            </div>

            <p style="color:#666;margin:32px 0 0;font-size:14px;">
              We will contact you when your order ships.<br/>
              <span style="color:#999;font-size:13px;">배송이 시작되면 연락드리겠습니다.</span>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8f8f8;padding:24px 32px;text-align:center;border-top:1px solid #eee;">
            <p style="color:#999;font-size:12px;margin:0;">Wellbeing Korea LLC</p>
            <p style="color:#999;font-size:12px;margin:4px 0;">230 E. Brinkerhoff Ave, Palisades Park, NJ 07650</p>
            <p style="color:#999;font-size:12px;margin:4px 0;">sales@wellbeingkoreausa.com · 201-429-2632</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return resend.emails.send({
    from: "Wellbeing Korea USA <sales@wellbeingkoreausa.com>",
    to,
    subject: "Order Confirmed / 주문 완료 — Wellbeing Korea USA",
    html,
  });
}
