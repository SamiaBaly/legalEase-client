'use client';

import { useRouter } from 'next/navigation';
import { FiClock, FiCreditCard, FiUser, FiBriefcase, FiArrowRight } from 'react-icons/fi';

export default function HiringHistoryClient({ initialHires = [] }) {
  const router = useRouter();

  const getStatusMeta = status => {
    const s = (status || '').toLowerCase();
    if (s === 'paid') return { label: 'Paid', cls: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20' };
    if (s === 'accepted') return { label: 'Accepted', cls: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/20' };
    return { label: 'Pending', cls: 'bg-amber-500/15 text-amber-300 border-amber-500/20' };
  };

  return (
    <div className="min-h-screen bg-[#05070d] text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10">
        <div className="mb-8 rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                <FiBriefcase />
                Hiring Records
              </div>
              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                Hiring History
              </h1>
              <p className="mt-2 text-sm text-zinc-400">
                Total Hires: {initialHires.length}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:flex">
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-zinc-500">Total</p>
                <p className="mt-1 text-lg font-semibold text-white">{initialHires.length}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-zinc-500">Active</p>
                <p className="mt-1 text-lg font-semibold text-cyan-300">
                  {initialHires.filter(h => (h?.status || '').toLowerCase() === 'accepted').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-left">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
                    Lawyer
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
                    Client
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
                    Fee
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
                    Date
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/10">
                {initialHires.length > 0 ? (
                  initialHires.map(hire => {
                    const statusMeta = getStatusMeta(hire?.status);
                    const dateValue = hire?.createAt || hire?.createdAt;

                    return (
                      <tr
                        key={String(hire._id)}
                        className="transition hover:bg-white/5"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-cyan-500/10 text-cyan-300">
                              <FiUser />
                            </div>
                            <div>
                              <p className="font-semibold text-white">
                                {hire.lawyerName}
                              </p>
                              <p className="mt-1 text-xs text-zinc-500">
                                ID: {hire.lawyerId}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <div>
                            <p className="font-medium text-white">
                              {hire.clientName}
                            </p>
                            <p className="mt-1 text-sm text-zinc-400">
                              {hire.clientEmail}
                            </p>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-sm font-semibold text-emerald-300">
                            <FiCreditCard />
                            ${hire.lawyerFee}
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider ${statusMeta.cls}`}
                          >
                            {statusMeta.label}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-zinc-400">
                          <div className="inline-flex items-center gap-2 text-sm">
                            <FiClock className="text-zinc-500" />
                            {dateValue ? new Date(dateValue).toLocaleDateString() : 'N/A'}
                          </div>
                        </td>

                        <td className="px-6 py-5 text-center">
                          {statusMeta.label === 'Paid' ? (
                            <button
                              disabled
                              className="inline-flex items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300"
                            >
                              Paid
                            </button>
                          ) : statusMeta.label === 'Accepted' ? (
                            <button
                              onClick={() =>
                                router.push(`/dashboard/client/hiring-history/${hire._id}`)
                              }
                              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-95"
                            >
                              Pay Now
                              <FiArrowRight />
                            </button>
                          ) : (
                            <button
                              disabled
                              className="inline-flex items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-300"
                            >
                              Pending
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-16 text-center">
                      <div className="mx-auto max-w-md">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400">
                          <FiBriefcase className="text-2xl" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">
                          No hiring history found
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-zinc-400">
                          Once a hire is created, it will appear here with payment and status details.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}