'use client';

import React from 'react';
import { Button } from '@heroui/react';
import {
  FaCreditCard,
  FaHourglassHalf,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa';

export default function HiringHistoryPage() {
  // ডামি ডাটা সেট (ডাটাবেজ কানেকশনের জন্য প্রস্তুত)
  const hiringData = [
    {
      id: 1,
      lawyerName: 'Adv. Barrister Asif',
      specialisation: 'Criminal Law',
      fee: '$500',
      date: '2026-06-15',
      status: 'pending',
    },
    {
      id: 2,
      lawyerName: 'Dr. Sabrina Khan',
      specialisation: 'Family Law',
      fee: '$350',
      date: '2026-05-10',
      status: 'accepted',
    },
    {
      id: 3,
      lawyerName: 'Kazi Farhan',
      specialisation: 'Corporate Law',
      fee: '$800',
      date: '2026-04-12',
      status: 'rejected',
    },
  ];

  const getStatusBadge = status => {
    switch (status) {
      case 'accepted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold capitalize rounded-full bg-success-50 dark:bg-success-950/30 text-success border border-success-200">
            <FaCheckCircle size={12} /> Accepted
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold capitalize rounded-full bg-danger-50 dark:bg-danger-950/30 text-danger border border-danger-200">
            <FaTimesCircle size={12} /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold capitalize rounded-full bg-warning-50 dark:bg-warning-950/30 text-warning border border-warning-200">
            <FaHourglassHalf size={12} /> Pending
          </span>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div>
        <h2 className="text-xl font-black text-default-900 dark:text-zinc-100 uppercase tracking-wide">
          Hiring History
        </h2>
        <p className="text-xs text-default-500">
          Track your hiring requests and processing fees status.
        </p>
      </div>

      <div className="w-full overflow-x-auto rounded-xl border border-default-200 dark:border-zinc-800 bg-content1 dark:bg-zinc-900 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-default-200 dark:border-zinc-800 bg-default-50 dark:bg-zinc-950/40 text-[11px] font-black uppercase tracking-wider text-default-500">
              <th className="p-4">Lawyer Name</th>
              <th className="p-4">Specialisation</th>
              <th className="p-4">Fee</th>
              <th className="p-4">Hiring Date</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-default-100 dark:divide-zinc-800/60 text-sm font-medium">
            {hiringData.map(row => (
              <tr
                key={row.id}
                className="hover:bg-default-50/50 dark:hover:bg-zinc-800/20 transition-colors"
              >
                <td className="p-4 font-bold text-default-800 dark:text-zinc-200">
                  {row.lawyerName}
                </td>
                <td className="p-4 text-default-600 dark:text-zinc-400">
                  {row.specialisation}
                </td>
                <td className="p-4 font-bold text-[#005A5B] dark:text-[#20B2AA]">
                  {row.fee}
                </td>
                <td className="p-4 text-xs text-default-500">{row.date}</td>
                <td className="p-4">{getStatusBadge(row.status)}</td>
                <td className="p-4 text-center">
                  {row.status === 'accepted' ? (
                    <Button
                      size="sm"
                      startContent={<FaCreditCard />}
                      className="bg-[#cda863] text-zinc-950 font-bold rounded-lg shadow-sm"
                    >
                      Pay Now
                    </Button>
                  ) : (
                    <span className="text-xs text-default-400 font-semibold">
                      —
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
