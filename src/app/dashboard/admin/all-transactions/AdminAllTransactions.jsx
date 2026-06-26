'use client';

import React from 'react';
import { FaCalendarAlt, FaCheckCircle, FaEnvelope, FaHashtag, FaMoneyBillWave, FaUserTie } from 'react-icons/fa';

export default function AdminAllTransactions({ transactions = [] }) {

  const totalRevenue = transactions.reduce((sum, txn) => sum + (txn.amount || 0), 0);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-tight">
            Platform Transactions
          </h2>
          <p className="text-sm text-zinc-500">Audit log of all financial checkouts.</p>
        </div>

        {/* Total Amount Card */}
        <div className="bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-100 dark:border-cyan-900/50 p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-cyan-500 text-white rounded-lg">
            <FaMoneyBillWave size={20} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-cyan-600 dark:text-cyan-400">Total Revenue</p>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white">${totalRevenue}.00</h3>
          </div>
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-950/50 border-b border-zinc-200 dark:border-zinc-800 text-[11px] font-bold uppercase tracking-widest text-zinc-500">
                <th className="p-5">Transaction ID</th>
                <th className="p-5">Lawyer ID</th>
                <th className="p-5">Client Email</th>
                <th className="p-5">Amount</th>
                <th className="p-5">Date</th>
                <th className="p-5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
              {transactions?.map((txn) => (
                <tr key={txn._id} className="group hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30 transition-all duration-200">
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400">
                      <FaHashtag size={10} className="text-cyan-500" />
                      {txn._id.slice(-8).toUpperCase()}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 font-mono">
                      <FaUserTie size={12} className="text-zinc-400" />
                      {txn.hireId ? txn.hireId.slice(-6) : "N/A"}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                      <FaEnvelope className="text-zinc-400" size={12} />
                      {txn.customerEmail}
                    </div>
                  </td>
                  <td className="p-4 text-sm font-black text-emerald-600 dark:text-emerald-400">
                    ${txn.amount}.00
                  </td>
                  <td className="p-4 text-xs text-zinc-500">
                    <div className="flex items-center gap-1.5">
                      <FaCalendarAlt size={12} className="text-zinc-400" />
                      {new Date(txn.createAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold rounded-full border ${txn.paymentStatus === 'paid'
                      ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-200"
                      : "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-200"
                      }`}>
                      <FaCheckCircle size={10} /> {txn.paymentStatus.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}