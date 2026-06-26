'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { FiDollarSign, FiClock, FiCheckCircle } from "react-icons/fi";
import { submitHire } from "@/lib/acitons/hire";

export default function LawyerDetailsClient({ lawyer, user, hires = [], existingHire }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHiredLocally, setIsHiredLocally] = useState(false);

  const isClient = user?.role === "client";
  const isBusy = lawyer?.isAvailable === false;

  // বর্তমান হায়ারিং স্ট্যাটাস খুঁজে বের করা
  const currentHire = existingHire || hires.find(
    (h) => String(h.lawyerId) === String(lawyer?._id) && String(h.clientEmail) === String(user?.email)
  );

  const status = (currentHire?.status || "").toLowerCase();
  // অলরেডি হায়ার করা থাকলে বা সবেমাত্র হায়ার করলে এটি True হবে
  const isPending = ["pending", "accepted", "paid"].includes(status) || isHiredLocally;

  const handleHire = async () => {
    setIsLoading(true);
    try {
      const res = await submitHire({
        lawyerId: lawyer?._id,
        lawyerName: lawyer?.name,
        clientName: user?.name,
        clientEmail: user?.email,
        clientId: user?._id || user?.id,
        lawyerFee: lawyer?.fee,
        status: "pending",
      });

      if (res?.acknowledged || res?.insertedId) {
        toast.success("Request sent successfully!");
        setIsHiredLocally(true);
        setIsModalOpen(false);
        router.refresh();
      } else if (res?.alreadyExists) {
        toast.info("You have already sent a request to this lawyer.");
        setIsHiredLocally(true);
        setIsModalOpen(false);
      } else {
        toast.error(res?.error || "Failed to process request");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black p-4 md:p-8 text-white">
      <div className="max-w-4xl mx-auto bg-[#111118] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row gap-8">
          <img src={lawyer?.image} className="w-full md:w-56 h-64 md:h-56 rounded-2xl object-cover border border-white/10" alt={lawyer?.name} />

          <div className="flex-1 space-y-4">
            <h1 className="text-4xl font-bold">{lawyer?.name}</h1>
            <p className="text-white/60 leading-relaxed">{lawyer?.bio}</p>

            <div className="flex items-center gap-6 mt-4 p-4 bg-white/5 rounded-2xl">
              <div>
                <p className="text-white/40 text-xs uppercase">Fee</p>
                <div className="flex items-center text-cyan-400 font-bold text-xl">
                  <FiDollarSign /> {lawyer?.fee}
                </div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <p className="text-white/40 text-xs uppercase">Experience</p>
                <p className="font-bold text-xl">{lawyer?.lawyerExperience || 5}+ Years</p>
              </div>
            </div>

            {/* বাটন লজিক: অলরেডি হায়ার করা থাকলে বাটন বদলে স্ট্যাটাস বক্স দেখাবে */}
            {isClient && (
              <button
                onClick={() => setIsModalOpen(true)}
                // এখানে লজিকটি দেখুন:
                // status এর মধ্যে 'pending', 'accepted' বা 'paid' থাকলে OR ইদানীং হায়ার করলে
                disabled={["pending", "accepted", "paid"].includes(status) || isHiredLocally || isBusy || isLoading}
                className={`w-full py-4 rounded-2xl font-bold transition-all ${(["pending", "accepted", "paid"].includes(status) || isHiredLocally || isBusy)
                    ? "bg-white/5 text-white/30 cursor-not-allowed border border-white/5" // এটি সব সময় ডিজেবল স্টাইল দেখাবে
                    : "bg-cyan-600 hover:bg-cyan-500 shadow-lg shadow-cyan-900/20" // সক্রিয় স্টাইল
                  }`}
              >
                {isBusy
                  ? "Not Available: Busy"
                  : (["pending", "accepted", "paid"].includes(status) || isHiredLocally)
                    ? "Already Hired" // যখন হায়ার করা হয়ে যাবে, তখন এই টেক্সট দেখাবে
                    : "Hire Lawyer"
                }
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111118] p-8 rounded-3xl w-full max-w-sm border border-white/10 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">Confirm Hiring</h2>
            <p className="text-white/60 mb-8">You are hiring <span className="text-white font-semibold">{lawyer?.name}</span> for ${lawyer?.fee}.</p>
            <div className="flex gap-3">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 bg-white/5 py-3 rounded-2xl hover:bg-white/10">Cancel</button>
              <button onClick={handleHire} disabled={isLoading} className="flex-1 bg-cyan-600 py-3 rounded-2xl font-bold hover:bg-cyan-500">
                {isLoading ? "Processing..." : "Confirm & Pay"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}