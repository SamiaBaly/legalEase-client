'use client';

import React, { useState } from 'react';
import { updateHire } from '@/lib/acitons/hire';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FiCheck, FiX } from 'react-icons/fi';

export default function LawyerHiringHistory({ initialHires = [] }) {
  const router = useRouter();
  const [hires, setHires] = useState(initialHires);

  const getStatusMeta = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'accepted') {
      return { label: 'Accepted', cls: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20' };
    }
    if (s === 'rejected') {
      return { label: 'Rejected', cls: 'bg-red-500/15 text-red-300 border-red-500/20' };
    }
    return { label: 'Pending', cls: 'bg-amber-500/15 text-amber-300 border-amber-500/20' };
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const result = await updateHire(id, { status });
      if (result.modifiedCount) {
        toast.success(`Request ${status} successfully`);
        // লোকাল স্টেট আপডেট করা যাতে রিফ্রেশ ছাড়াই দেখা যায়
        setHires(prev => prev.map(h => h._id === id ? { ...h, status } : h));
        router.refresh();
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-[#05070d] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black mb-6">Hiring Requests</h1>

        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400">
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {hires.map((hire) => {
                const statusMeta = getStatusMeta(hire?.status);

                return (
                  <tr key={hire._id}>
                    <td className="px-6 py-4">
                      <p className="font-semibold">{hire.clientName}</p>
                      <p className="text-xs text-zinc-500">{hire.clientEmail}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusMeta.cls}`}>
                        {statusMeta.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {statusMeta.label === 'Pending' ? (
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleStatusUpdate(hire._id, 'accepted')}
                            className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 px-3 py-2 rounded-xl text-xs font-semibold transition"
                          >
                            <FiCheck /> Accept
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(hire._id, 'rejected')}
                            className="flex items-center gap-1 bg-red-600 hover:bg-red-700 px-3 py-2 rounded-xl text-xs font-semibold transition"
                          >
                            <FiX /> Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-zinc-400 text-sm italic">
                          {statusMeta.label === 'Accepted' ? 'Accepted' : 'Rejected'}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}