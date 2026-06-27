'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { FiDollarSign, FiClock, FiCheckCircle, FiPhone, FiMapPin, FiAward, FiMessageSquare } from "react-icons/fi";
import { submitHire } from "@/lib/acitons/hire";
import { submitComment } from "@/lib/acitons/comments";

export default function LawyerDetailsClient({ lawyer, user, hires = [], existingHire }) {
  const router = useRouter();
  const [hiredData, setHiredData] = useState(existingHire);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewText, setReviewText] = useState("");
  
  const isBusy = lawyer?.availability === "busy";

  const isClient = user?.role === "client";
  const status = (hiredData?.status || "").toLowerCase();

  const handleHire = async () => {
    setIsLoading(true);
    const res = await submitHire({
      lawyerId: lawyer?._id,
      lawyerName: lawyer?.name,
      lawyerEmail:lawyer?.email,
      clientName: user?.name,
      clientEmail: user?.email,
      clientId: user?._id || user?.id,
      lawyerFee: lawyer?.fee,
      status: "pending",
    });


    
    if (res?.acknowledged || res?.insertedId) {
      toast.success("Request sent!");
      setHiredData({ status: "pending" });
      setIsModalOpen(false);
      router.refresh();
    } else {
      toast.error("Failed");
    }
    setIsLoading(false);
  };
  const handleReviewSubmit = async () => {
    if (!reviewText.trim()) {
      toast.error("Please write a comment before submitting!");
      return;
    }

    setIsLoading(true);
    try {
      const res = await submitComment({
        lawyerId: lawyer?._id,
        clientId: user?._id || user?.id,
        clientName: user?.name,
        lawyerEmail:lawyer?.email,
        comment: reviewText,
        rating: 5,
        createdAt: new Date()
      });

      if (res.success) {
        toast.success("Review submitted successfully!");
        
        setIsReviewModalOpen(false);
        
        setReviewText("");
      } else {
        toast.error(res.error || "Failed to submit review");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };
  console.log("--- Debugging ---");
  console.log("Is Client:", isClient);
  console.log("Status:", status);
  console.log("Lawyer Availability:", lawyer?.availability);
  console.log("Hired Data:", hiredData);
  console.log("-----------------");

  return (
    <div className="min-h-screen bg-black p-4 md:p-8 text-white">
      <div className="max-w-4xl mx-auto bg-[#111118] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={lawyer?.image || "/placeholder-lawyer.jpg"}
            className="w-56 h-56 rounded-2xl object-cover border border-white/10"
            alt={lawyer?.name || "Lawyer"}
          />
          <div className="flex-1 space-y-4">
            <h1 className="text-4xl font-bold">{lawyer?.name}</h1>
            <p className="text-cyan-400 font-semibold">{lawyer?.specialization}</p>
            <p className="text-white/60 leading-relaxed">{lawyer?.bio}</p>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-white/70">
              <div className="flex items-center gap-2"><FiPhone className="text-cyan-500" /> {lawyer?.phone}</div>
              <div className="flex items-center gap-2"><FiMapPin className="text-cyan-500" /> {lawyer?.location}</div>
              <div className="flex items-center gap-2"><FiAward className="text-cyan-500" /> {lawyer?.experience}+ Years Exp</div>
            </div>

            <div className="flex items-center gap-6 mt-4 p-4 bg-white/5 rounded-2xl">
              <div>
                <p className="text-white/40 text-xs uppercase">Fee</p>
                <div className="flex items-center text-cyan-400 font-bold text-xl"><FiDollarSign /> {lawyer?.fee}</div>
              </div>
            </div>

            {/* Action Buttons */}
            {/* Action Buttons */}
            {user && user.role === "client" ? (
              status === "paid" ? (
                <button onClick={() => setIsReviewModalOpen(true)} className=" text-center w-full bg-green-600 py-3 rounded-xl font-bold">Leave a Review</button>
              ) : status === "pending" ? (
                  <div className="w-full bg-yellow-600 py-3 rounded-xl text-center font-bold">Request Pending</div>
              ) : (
                    <button onClick={() => !isBusy && setIsModalOpen(true)} disabled={isBusy} className="w-full text-center bg-cyan-600 py-3 rounded-xl font-bold">
                  {isBusy ? "Not Available: Busy" : "Hire Lawyer"}
                </button>
              )
            ) : (
              <div className="text-white/50 text-sm italic">
                {user ? "Only clients can hire." : "Please login to hire."}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hire Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#111118] p-8 rounded-3xl w-full max-w-sm border border-white/10">
            <h2 className="text-2xl font-bold mb-4">Confirm Hiring</h2>
            <button onClick={handleHire} className="w-full bg-cyan-600 py-3 rounded-xl font-bold">Confirm & Pay</button>
            <button onClick={() => setIsModalOpen(false)} className="w-full mt-2 py-3">Cancel</button>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#111118] p-8 rounded-3xl w-full max-w-md border border-white/10">
            <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>

            <textarea
              
              value={reviewText}
             
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full bg-white/5 p-4 rounded-xl border border-white/10 text-white"
              rows={4}
              placeholder="Write your feedback..."
            />

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="flex-1 py-3 bg-white/10 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleReviewSubmit}
                disabled={isLoading}
                className="flex-1 py-3 bg-cyan-600 rounded-xl font-bold"
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}