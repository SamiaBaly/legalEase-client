"use client";

import React, { useMemo } from "react";
import { Button, Card } from "@heroui/react";
import {
  FiMapPin,
  FiUser,
  FiMail,
  FiBriefcase,
  FiClock,
  FiDollarSign,
  FiCheckCircle,
} from "react-icons/fi";

const HireDetailsClient = ({ hire }) => {
  
  const status = (hire?.status || "pending").toLowerCase();

  const statusStyle = useMemo(() => {
    if (status === "paid") {
      return {
        label: "Paid",
        className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
      };
    }

    if (status === "accepted") {
      return {
        label: "Accepted",
        className: "bg-blue-500/15 text-blue-400 border-blue-500/25",
      };
    }

    return {
      label: "Pending",
      className: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    };
  }, [status]);

  const handleCheckout = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.url) {
        
        window.location.href = data.url;
      } else {
        console.error("Error:", data.error);
        alert("Payment initiation failed: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };



  return (
    <div className="min-h-[70vh] bg-gradient-to-b from-[#0b0b10] via-[#0f0f14] to-[#0b0b10] px-4 py-10">
      <Card className="mx-auto max-w-4xl overflow-hidden border border-white/10 bg-[#111118] shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
        <div className="grid lg:grid-cols-[1.4fr_0.9fr]">
          <div className="p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Hire Details
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              {hire?.lawyerName || "N/A"}
            </h2>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-white/60">
              <span className="inline-flex items-center gap-2">
                <FiMapPin className="text-cyan-400" />
                {hire?.lawyerLocation || "N/A"}
              </span>

              <span className="inline-flex items-center gap-2">
                <FiBriefcase className="text-cyan-400" />
                {hire?.lawyerExperience || 0} Years Experience
              </span>
            </div>

            <div
              className={`mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${statusStyle.className}`}
            >
              <FiCheckCircle />
              {statusStyle.label}
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/40">
                Lawyer Bio
              </p>
              <p className="mt-3 text-base leading-7 text-white/80">
                {hire?.lawyerBio || "No bio available"}
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-[#0d0d12] p-4">
                <div className="flex items-center gap-2 text-sm text-white/45">
                  <FiUser className="text-cyan-400" />
                  Client Name
                </div>
                <p className="mt-2 text-lg font-semibold text-white">
                  {hire?.clientName || "N/A"}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0d0d12] p-4">
                <div className="flex items-center gap-2 text-sm text-white/45">
                  <FiMail className="text-cyan-400" />
                  Client Email
                </div>
                <p className="mt-2 break-all text-lg font-semibold text-white">
                  {hire?.clientEmail || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 bg-[#0d0d12] p-6 md:p-8 lg:border-l lg:border-t-0">
            <div className="rounded-3xl border border-cyan-500/15 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
                Payment Summary
              </p>

              <div className="mt-5 flex items-end justify-between">
                <div>
                  <p className="text-sm text-white/50">Lawyer Fee</p>
                  <div className="mt-1 flex items-center gap-2">
                    <FiDollarSign className="text-2xl text-cyan-400" />
                    <span className="text-4xl font-bold text-white">
                      {hire?.lawyerFee || 0}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Hire ID</span>
                  <span className="break-all text-white/80">
                    {hire?._id || "N/A"}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Created At</span>
                  <span className="inline-flex items-center gap-2 text-white/80">
                    <FiClock className="text-cyan-400" />
                    {hire?.createdAt || hire?.createAt
                      ? new Date(hire.createdAt || hire.createAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                {status === "paid" ? (
                  <Button
                    className="w-full rounded-2xl bg-emerald-500 font-semibold text-white"
                    isDisabled
                  >
                    Paid Successfully
                  </Button>
                ) : (
                    <form onSubmit={handleCheckout}>
                      <input type="hidden" name="hireId" value={hire?._id || ""} />
                      <input type="hidden" name="amount" value={hire?.lawyerFee || ""} />
                      <input type="hidden" name="lawyerName" value={hire?.lawyerName || ""} />
                      <input type="hidden" name="lawyerId" value={hire?.lawyerId || ""} />

                      <button
                        type="submit"
                        className="w-full rounded-xl bg-cyan-600 py-3 font-semibold text-white hover:bg-cyan-500"
                      >
                        Pay Now
                      </button>
                    </form>
                )}
              </div>
            </div>

            <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm font-semibold text-white">Quick Note</p>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Payment completed
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HireDetailsClient;