"use client";

import React, { useMemo, useState } from "react";
import { Button, Card } from "@heroui/react";
import { FiMapPin, FiUser, FiMail, FiBriefcase, FiClock, FiDollarSign, FiCheckCircle } from "react-icons/fi";

const HireDetailsClient = ({ hire }) => {
  const [status, setStatus] = useState(hire?.status || "pending");
  const [loading, setLoading] = useState(false);

  const statusStyle = useMemo(() => {
    if (status === "paid") {
      return {
        label: "Paid",
        className:
          "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
      };
    }
    return {
      label: "Pending",
      className:
        "bg-amber-500/15 text-amber-400 border-amber-500/25",
    };
  }, [status]);

  const handlePay = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus("paid");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] bg-gradient-to-b from-[#0b0b10] via-[#0f0f14] to-[#0b0b10] px-4 py-10">
      <Card className="mx-auto max-w-4xl overflow-hidden border border-white/10 bg-[#111118] shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
        <div className="grid lg:grid-cols-[1.4fr_0.9fr]">
          {/* LEFT SIDE */}
          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
                  Hire Details
                </p>
                <h2 className="mt-2 text-3xl font-bold text-white">
                  {hire?.lawyerName}
                </h2>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-white/60">
                  <span className="inline-flex items-center gap-2">
                    <FiMapPin className="text-cyan-400" />
                    {hire?.lawyerLocation}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <FiBriefcase className="text-cyan-400" />
                    {hire?.lawyerExperience} Years Experience
                  </span>
                </div>
              </div>

              <div
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${statusStyle.className}`}
              >
                <FiCheckCircle />
                {statusStyle.label}
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/40">
                Lawyer Bio
              </p>
              <p className="mt-3 text-base leading-7 text-white/80">
                {hire?.lawyerBio}
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-[#0d0d12] p-4">
                <div className="flex items-center gap-2 text-sm text-white/45">
                  <FiUser className="text-cyan-400" />
                  Client Name
                </div>
                <p className="mt-2 text-lg font-semibold text-white">
                  {hire?.clientName}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0d0d12] p-4">
                <div className="flex items-center gap-2 text-sm text-white/45">
                  <FiMail className="text-cyan-400" />
                  Client Email
                </div>
                <p className="mt-2 break-all text-lg font-semibold text-white">
                  {hire?.clientEmail}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
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
                      {hire?.lawyerFee}
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-right">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                    Status
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {status}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">Hire ID</span>
                  <span className="max-w-[180px] truncate text-white/80">
                    {hire?._id}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">Client ID</span>
                  <span className="max-w-[180px] truncate text-white/80">
                    {hire?.clientId}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">Lawyer ID</span>
                  <span className="max-w-[180px] truncate text-white/80">
                    {hire?.lawyerId}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">Created At</span>
                  <span className="inline-flex items-center gap-2 text-white/80">
                    <FiClock className="text-cyan-400" />
                    {hire?.createAt
                      ? new Date(hire.createAt).toLocaleDateString()
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
                  <Button
                    className="w-full rounded-2xl bg-cyan-500 font-semibold text-black hover:bg-cyan-400"
                    isLoading={loading}
                    onPress={handlePay}
                  >
                    Pay Now
                  </Button>
                )}
              </div>
            </div>

            <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm font-semibold text-white">Quick Note</p>
              <p className="mt-2 text-sm leading-6 text-white/60">
                This hire request is linked to the selected lawyer profile and
                can be updated from pending to paid after payment confirmation.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HireDetailsClient;