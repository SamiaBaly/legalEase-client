'use client';

import { updateHire } from '@/lib/acitons/hire';
import { useRouter } from 'next/navigation';
import { FiClock, FiUser, FiBriefcase, FiCheck } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function LawyerHiringHistory({ initialHires = [] }) {
  const router = useRouter();

  const getStatusMeta = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'accepted') {
      return { label: 'Accepted', cls: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20' };
    }
    return { label: 'Pending', cls: 'bg-amber-500/15 text-amber-300 border-amber-500/20' };
  };

  const handleAccept = async (id) => {

    const result = await updateHire(id, { status: "accepted" })

    if (result.modifiedCount) {
      toast.success("accepted")
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
              {initialHires.map((hire) => {
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
                        <button
                          onClick={() => handleAccept(hire._id)}
                          className="flex items-center gap-2 mx-auto bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-xl text-sm font-semibold transition"
                        >
                          <FiCheck /> Accept Request
                        </button>
                      ) : (
                        <span className="text-emerald-400 font-semibold text-sm">Already Accepted</span>
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