'use client';

import React, { useState } from 'react';
import { Button } from '@heroui/react';
import { toast } from 'react-hot-toast';
import {
  FaCheck,
  FaTimes,
  FaUser,
  FaCalendarAlt,
  FaHourglassHalf,
} from 'react-icons/fa';

export default function LawyerHiringHistoryPage() {
  // ডামি ক্লায়েন্ট রিকোয়েস্ট ডাটা
  const [requests, setRequests] = useState([
    {
      id: 1,
      clientName: 'Rahat Ahmed',
      requestDate: '2026-06-18',
      status: 'pending',
    },
    {
      id: 2,
      clientName: 'Sumaiya Akter',
      requestDate: '2026-06-17',
      status: 'pending',
    },
    {
      id: 3,
      clientName: 'Tamim Iqbal',
      requestDate: '2026-06-15',
      status: 'accepted',
    },
  ]);

  const handleAction = (id, actionType) => {
    setRequests(prev =>
      prev.map(req => (req.id === id ? { ...req, status: actionType } : req)),
    );

    if (actionType === 'accepted') {
      toast.success('Hiring request accepted! Client can now pay.');
    } else {
      toast.error('Hiring request rejected.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div>
        <h2 className="text-xl font-black text-default-900 dark:text-zinc-100 uppercase tracking-wide">
          Hiring Requests
        </h2>
        <p className="text-xs text-default-500">
          Review, accept, or decline pending hiring cases from normal users.
        </p>
      </div>

      <div className="w-full overflow-x-auto rounded-xl border border-default-200 dark:border-zinc-800 bg-content1 dark:bg-zinc-900 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-default-200 dark:border-zinc-800 bg-default-50 dark:bg-zinc-950/40 text-[11px] font-black uppercase tracking-wider text-default-500">
              <th className="p-4">Client Name</th>
              <th className="p-4">Request Date</th>
              <th className="p-4">Current Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-default-100 dark:divide-zinc-800/60 text-sm font-medium">
            {requests.map(row => (
              <tr
                key={row.id}
                className="hover:bg-default-50/50 dark:hover:bg-zinc-800/20 transition-colors"
              >
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <FaUser className="text-default-400" size={14} />
                    <span className="font-bold text-default-800 dark:text-zinc-200">
                      {row.clientName}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-xs text-default-500">
                  <div className="flex items-center gap-1.5">
                    <FaCalendarAlt size={12} />
                    {row.requestDate}
                  </div>
                </td>
                <td className="p-4">
                  {row.status === 'pending' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full bg-warning-50 dark:bg-warning-950/30 text-warning border border-warning-200">
                      <FaHourglassHalf size={10} /> Pending
                    </span>
                  )}
                  {row.status === 'accepted' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full bg-success-50 dark:bg-success-950/30 text-success border border-success-200">
                      Accepted
                    </span>
                  )}
                  {row.status === 'rejected' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full bg-danger-50 dark:bg-danger-950/30 text-danger border border-danger-200">
                      Rejected
                    </span>
                  )}
                </td>
                <td className="p-4">
                  {row.status === 'pending' ? (
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleAction(row.id, 'accepted')}
                        startContent={<FaCheck size={12} />}
                        className="bg-[#005A5B] dark:bg-[#20B2AA] text-white dark:text-zinc-950 font-bold rounded-lg shadow-sm"
                      >
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleAction(row.id, 'rejected')}
                        startContent={<FaTimes size={12} />}
                        className="bg-danger-50 hover:bg-danger-100 dark:bg-danger-950/20 text-danger font-bold rounded-lg border border-danger-200 dark:border-transparent"
                      >
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center text-xs text-default-400 font-bold italic uppercase">
                      Action Taken
                    </div>
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
