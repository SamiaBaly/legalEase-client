import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getUserSession } from "@/lib/core/session";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const hireId = formData.get("hireId");
    const amount = formData.get("amount");

    const user = await getUserSession();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const origin = new URL(request.url).origin;

    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Lawyer Service Fee - $${amount}`,
            },
            unit_amount: Math.round(parseFloat(amount) * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment", // ডায়নামিক পেমেন্টের জন্য পেমেন্ট মোড
      metadata: {
        hireId: hireId,
        clientId: user?.id,
      },
      success_url: `${origin}/dashboard/client/hiring-history/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}