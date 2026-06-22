"use client";

import { submitHire } from '@/lib/acitons/hire';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function LawyerDetailsClient({ lawyer, user, hires = [], existingHire }) {
  const router = useRouter();

  console.log('lawyer', lawyer);
  // console.log('user', user);
  const isClient = user?.role === 'client';
  const [hiringStatus, setHiringStatus] = useState(existingHire?.status || null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleHire = async () => {
  setIsLoading(true);

  try {
    const submissionData = {
      lawyerId: lawyer?._id,
      lawyerName: lawyer?.name,
      clientName: user?.name,
      clientEmail: user?.email,
      clientId: user?.id,
      lawyerFee: lawyer?.fee,
      lawyerExperience: lawyer?.experience,
      lawyerLocation: lawyer?.location,
      lawyerBio: lawyer?.bio,
      status: "pending",
    };

    console.log("submissionData:", submissionData);

    const res = await submitHire(submissionData);

    console.log("API RESPONSE:", res);

    // ✅ SUCCESS CHECK (better condition)
    if (res?.acknowledged || res?.insertedId) {
      toast.success("Request sent successfully!");
      setHiringStatus("pending");
      setIsModalOpen(false);
      router.refresh();
    } else {
      toast.error("Something went wrong.");
    }
  } catch (error) {
    console.error(error);
    toast.error(error?.message || "Failed to process request.");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-black p-4 md:p-8 space-y-6 text-white">
      
      {/* ১. আলাদা বক্স: ইউজারের মোট হায়ারিং হিস্ট্রি */}
      <div className="max-w-4xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl flex items-center justify-between">
        <div>
          <h3 className="text-gray-400 text-xs uppercase tracking-widest">My Activity</h3>
          <p className="text-xl font-bold mt-1"><span className="text-red-500 text-2xl uppercase">{user?.name}</span> Total Lawyers Hired: <span className="text-indigo-400">{hires.length}</span></p>
        </div>
      </div>

      {/* ২. মেইন প্রোফাইল বক্স (এখানে সব ইনফরমেশন আছে) */}
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <img src={lawyer.image} alt={lawyer.name} className="w-56 h-56 object-cover rounded-2xl border border-gray-700 shadow-2xl" />

          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-4xl font-extrabold">{lawyer.name}</h1>
              <p className="text-gray-400 mt-2 leading-relaxed">{lawyer.bio}</p>
            </div>

            {/* স্পেশালাইজেশন এবং ফি (এগুলোই আপনি চাচ্ছিলেন) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800/40 p-4 rounded-xl border border-gray-700/50">
                <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">Specialization</p>
                <p className="text-indigo-300 font-semibold text-lg">{lawyer.specialization}</p>
              </div>
              <div className="bg-gray-800/40 p-4 rounded-xl border border-gray-700/50">
                <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">Consultation Fee</p>
                <p className="text-emerald-300 font-semibold text-lg"> per hour: $ {lawyer.fee}</p>
              </div>
            </div>

            {/* বাটন */}
            {isClient ? (
              <button 
                onClick={() => setIsModalOpen(true)} 
                disabled={hiringStatus !== null}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                  hiringStatus ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500'
                }`}
              >
                {hiringStatus ? `Request ${hiringStatus.toUpperCase()}` : "Hire Lawyer Now"}
              </button>
            ) : (
              <p className="text-amber-500 text-xs italic bg-amber-500/5 p-3 rounded-lg border border-amber-500/20">Only clients can hire.</p>
            )}
          </div>
        </div>
      </div>

      {/* ৩. মডাল */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 p-8 rounded-2xl border border-gray-700 w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Confirm Hire?</h2>
            <div className="flex gap-4">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 py-2 bg-gray-700 rounded-lg">Cancel</button>
             <button onClick={handleHire} disabled={isLoading} className="flex-1 py-2 bg-indigo-600 rounded-lg">
        {isLoading ? "Processing..." : "Confirm"}
      </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}