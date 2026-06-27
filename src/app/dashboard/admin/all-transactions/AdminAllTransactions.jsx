'use client';

import React from 'react';
import { FaCalendarAlt, FaCheckCircle, FaEnvelope, FaHashtag, FaMoneyBillWave, FaUserTie } from 'react-icons/fa';

export default function AdminAllTransactions({ transactions = [] }) {
  const totalRevenue = transactions.reduce((sum, txn) => sum + (txn.amount || 0), 0);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] p-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tighter">
              Financial <span className="text-cyan-500">Overview</span>
            </h1>
            <p className="text-zinc-500 mt-2">Managing platform-wide financial transactions securely.</p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-3xl shadow-xl shadow-cyan-900/5 flex items-center gap-6">
            <div className="p-4 bg-gradient-to-br from-cyan-400 to-blue-600 text-white rounded-2xl shadow-lg">
              <FaMoneyBillWave size={24} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Total Revenue</p>
              <h3 className="text-3xl font-black text-zinc-900 dark:text-white">${totalRevenue.toLocaleString()}.00</h3>
            </div>
          </div>
        </div>

        {/* Transactions Table with Unique Style */}
        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-3xl p-2 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-zinc-400 text-[10px] uppercase tracking-widest font-bold">
                  <th className="px-6 py-4">Transaction Details</th>
                  <th className="px-6 py-4">Lawyer</th>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {transactions?.map((txn) => (
                  <tr key={txn._id} className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors duration-300">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-500">
                          <FaHashtag size={12} />
                        </div>
                        <span className="font-mono text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                          {txn._id.slice(-6).toUpperCase()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <FaUserTie className="text-cyan-500" />
                        {txn.hireId ? txn.hireId.slice(-6) : "---"}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <FaEnvelope className="text-zinc-400" />
                        {txn.customerEmail}
                      </div>
                    </td>
                    <td className="px-6 py-5 font-black text-lg text-emerald-500">
                      ${txn.amount}
                    </td>
                    <td className="px-6 py-5 text-sm text-zinc-500">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt size={12} />
                        {new Date(txn.createAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        <FaCheckCircle size={10} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">{txn.paymentStatus}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}