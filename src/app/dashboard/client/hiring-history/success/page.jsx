import { savePayment } from "@/lib/acitons/payment";
import Link from "next/link";
import { BiCheckCircle } from "react-icons/bi";

export default async function SuccessPage({ searchParams }) {
  const sp = await searchParams;
  const sessionId = sp?.session_id;

  try {
    if (sessionId) {
      const sessionRes = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
        headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` },
      });
      const session = await sessionRes.json();

      const paymentPayload = {
        sessionId: sessionId,
        hireId: session?.metadata?.hireId,
        amount: session?.amount_total / 100,
        customerEmail: session?.customer_details?.email,
        paymentStatus: session?.payment_status,
      };

   
      const paymentResult = await savePayment(paymentPayload);

     
      if (paymentPayload.hireId) {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/hires/${paymentPayload.hireId}/paid`, {
          method: "PATCH",
        });
      }
    }
  } catch (error) {
    console.error("Payment save failed:", error);
  }
  return (
    <div className="min-h-screen bg-[#0b0b10] flex items-center justify-center px-4">
      <div className="w-full max-w-xl text-center">
        <BiCheckCircle className="text-emerald-400 text-6xl mx-auto" />

        <h1 className="text-white text-3xl mt-4">
          Payment Successful
        </h1>

        <div className="mt-6 flex gap-3 justify-center">
          <Link href="/dashboard/client/hiring-history" className="bg-cyan-500 px-6 py-3 rounded-xl">
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}