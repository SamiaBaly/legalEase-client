import React from "react";
import Link from "next/link";
import { BiCheckCircle } from "react-icons/bi";

export default async function SuccessPage({ searchParams }) {
  const sp = await searchParams;
  const sessionId=sp?.session_id
  console.log(sessionId);

  try {
    if (sessionId) {
      const sessionRes = await fetch(
        `https://api.stripe.com/v1/checkout/sessions/${sessionId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
          },
        }
      );

      const session = await sessionRes.json();
      const hireId = session?.metadata?.hireId;

      if (hireId) {
        await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/hires/${hireId}/paid`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
    }
  } catch (error) {
    console.error("Payment success update failed:", error);
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