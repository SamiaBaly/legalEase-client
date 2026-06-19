'use client';

import React from 'react';
import { FaCalendarAlt, FaCheckCircle, FaEnvelope, FaHashtag } from 'react-icons/fa';


export default function AdminAllTransactionsPage() {
  // ডামি ট্রানজেকশন ডাটা
  const transactions = [
    {
      id: 'TXN-98231',
      email: 'client.rahat@gmail.com',
      amount: 150,
      date: '2026-06-18 14:22',
    },
    {
      id: 'TXN-54124',
      email: 'sumaiya.akter@yahoo.com',
      amount: 300,
      date: '2026-06-17 09:15',
    },
    {
      id: 'TXN-32111',
      email: 'tamim.iqbal@gmail.com',
      amount: 80,
      date: '2026-06-15 18:45',
    },
    {
      id: 'TXN-88741',
      email: 'karim.law@legal.com',
      amount: 200,
      date: '2026-06-12 11:30',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div>
        <h2 className="text-xl font-black text-default-900 dark:text-zinc-100 uppercase tracking-wide">
          Platform Transactions
        </h2>
        <p className="text-xs text-default-500">
          Real-time audit log of all financial checkouts between clients and
          service providers.
        </p>
      </div>

      <div className="w-full overflow-x-auto rounded-xl border border-default-200 dark:border-zinc-800 bg-content1 dark:bg-zinc-900 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-default-200 dark:border-zinc-800 bg-default-50 dark:bg-zinc-950/40 text-[11px] font-black uppercase tracking-wider text-default-500">
              <th className="p-4">Transaction ID</th>
              <th className="p-4">User / Lawyer Email</th>
              <th className="p-4">Amount Paid</th>
              <th className="p-4">Payment Date</th>
              <th className="p-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-default-100 dark:divide-zinc-800/60 text-sm font-medium">
            {transactions.map(txn => (
              <tr
                key={txn.id}
                className="hover:bg-default-50/50 dark:hover:bg-zinc-800/20 transition-colors"
              >
                <td className="p-4 font-mono text-xs text-default-800 dark:text-zinc-300 font-bold">
                  <div className="flex items-center gap-1">
                    <FaHashtag
                    className="text-default-400" size={10} />
                    {txn.id}
                  </div>
                </td>
                <td className="p-4 text-xs text-default-600 dark:text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <FaEnvelope className="text-default-400" size={12} />
                    {txn.email}
                  </div>
                </td>
                <td className="p-4 text-sm font-black text-[#005A5B] dark:text-[#20B2AA]">
                  ${txn.amount}.00
                </td>
                <td className="p-4 text-xs text-default-500">
                  <div className="flex items-center gap-1.5">
                    <FaCalendarAlt size={12} />
                    {txn.date}
                  </div>
                </td>
                <td className="p-4 text-center">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full bg-success-50 dark:bg-success-950/20 text-success border border-success-200 dark:border-transparent">
                    <FaCheckCircle size={10} /> Success
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
