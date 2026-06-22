'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@heroui/react';
import { useSession } from '@/lib/auth-client';

import { toast } from 'react-hot-toast';
import {
  FaCheck,
  FaTimes,
  FaUser,
  FaCalendarAlt,
  FaHourglassHalf,
} from 'react-icons/fa';
// import { getHireHistory } from '@/lib/api/hire';

// হার্ডকোডেড ডামি ডাটা array
const MOCK_REQUESTS = [
  {
    _id: '1',
    clientName: 'Rahim Ali',
    createdAt: '2026-06-15T10:00:00.000Z',
    status: 'pending',
  },
  {
    _id: '2',
    clientName: 'Karim Ahmed',
    createdAt: '2026-06-12T14:30:00.000Z',
    status: 'accepted',
  },
  {
    _id: '3',
    clientName: 'Sultana Razia',
    createdAt: '2026-06-10T09:15:00.000Z',
    status: 'rejected',
  },
];

export default function LawyerHiringHistoryPage() {
  const [mounted, setMounted] = useState(false);
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    setMounted(true);

    const fetchHiringHistory = async () => {
      try {
        setIsLoading(true);
        // কৃত্রিমভাবে একটু লেট করানো (UI Loading স্টেট দেখার জন্য), সরাসরি ডামি ডাটা সেট করা হয়েছে
        setTimeout(() => {
          setRequests(MOCK_REQUESTS);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching hiring history:', error);
        toast.error('Failed to load history requests.');
        setIsLoading(false);
      }
    };

    fetchHiringHistory();
  }, [user?.id]);

  const handleAction = async (id, actionType) => {
    // Optimistically update status local configuration state
    setRequests(prev =>
      prev.map(req =>
        req._id === id || req.id === id ? { ...req, status: actionType } : req,
      ),
    );

    try {
      if (actionType === 'accepted') {
        toast.success(
          'Hiring request accepted! Client can now proceed with payment.',
        );
      } else {
        toast.error('Hiring request rejected.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update request state.');
    }
  };

  if (!mounted) {
    return (
      <div className="max-w-5xl mx-auto p-8 text-center text-zinc-500 text-sm">
        Initializing request workspace...
      </div>
    );
  }

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
            {isLoading ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-8 text-center text-xs text-zinc-500 italic"
                >
                  Loading dynamic data pipelines...
                </td>
              </tr>
            ) : requests.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-8 text-center text-xs text-zinc-500 italic"
                >
                  No incoming hiring requests found.
                </td>
              </tr>
            ) : (
              requests.map(row => {
                const rowId = row._id || row.id;

                return (
                  <tr
                    key={rowId}
                    className="hover:bg-default-50/50 dark:hover:bg-zinc-800/20 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <FaUser className="text-default-400" size={14} />
                        <span className="font-bold text-default-800 dark:text-zinc-200">
                          {row.clientName || 'Anonymous Client'}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-xs text-default-500">
                      <div className="flex items-center gap-1.5">
                        <FaCalendarAlt size={12} />
                        {row.createdAt
                          ? new Date(row.createdAt).toLocaleDateString(
                              'en-US',
                              {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              },
                            )
                          : row.requestDate || 'N/A'}
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
                            onClick={() => handleAction(rowId, 'accepted')}
                            startContent={<FaCheck size={12} />}
                            className="bg-[#005A5B] dark:bg-[#20B2AA] text-white dark:text-zinc-950 font-bold rounded-lg shadow-sm"
                          >
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleAction(rowId, 'rejected')}
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
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
