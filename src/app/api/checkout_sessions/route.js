import { NextResponse } from "next/server";
import { PLAN_PRICE_ID, stripe } from "@/lib/stripe";
import { getUserSession } from "@/lib/core/session";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const hireId = formData.get("hireId");
    const planId = formData.get("plan_id");

    const user = await getUserSession();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const origin = new URL(request.url).origin;

    // স্ট্রাইপ সেশন তৈরি
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      payment_method_types: ["card"],
      line_items: [
        {
          price: PLAN_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "subscription",
      metadata: {
        planId,
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