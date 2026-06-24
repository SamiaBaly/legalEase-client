import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getUserSession } from "@/lib/core/session";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const amount = Number(formData.get("amount"));
    const lawyerName = formData.get("lawyerName");
    const hireId = formData.get("hireId");
const lawyerId = formData.get("lawyerId");

    const user = await getUserSession();

    const origin = new URL(request.url).origin;

    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,

      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "usd", // অথবা bdt support থাকলে bdt
            product_data: {
              name: `${lawyerName} Consultation Fee`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],

      mode: "payment",
      metadata: {
    hireId,
    lawyerId,
    clientId: user?.id,
  },

      success_url: `${origin}/dashboard/client/hiring-history/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}