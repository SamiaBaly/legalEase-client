'use client';

import React, { useState } from 'react';
import { Trash2, Edit2, AlertCircle } from 'lucide-react';
import { deleteJob } from '@/lib/acitons/jobs';
import toast from 'react-hot-toast';

const MyPostService = ({ initialJobs = [] }) => {
  const [jobs, setJobs] = useState(initialJobs);
  const [loadingId, setLoadingId] = useState(null);

  const handleDelete = async (id) => {
    
    if (!confirm("Are you sure you want to delete this service?")) return;

    setLoadingId(id);
    try {
      const result = await deleteJob(id);
      if (result?.success || result?.deletedCount > 0) {
        setJobs(jobs.filter(job => job._id !== id));
        toast.success('Service deleted successfully');
      } else {
        toast.error('Failed to delete');
      }
    } catch (error) {
      toast.error('Delete failed');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="p-6 bg-gray-950 min-h-screen text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">Manage Services</h1>

        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/80 text-zinc-400 uppercase text-xs tracking-wider">
                <th className="px-6 py-4">Service Details</th>
                <th className="px-6 py-4">Fee</th>
                <th className="px-6 py-4">Experience</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {jobs.map((job) => (
                <tr key={job._id} className="hover:bg-zinc-900/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{job?.name}</div>
                    <div className="text-sm text-zinc-500">{job?.specialization}</div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-blue-400">${job?.fee}</td>
                  <td className="px-6 py-4 text-yellow-500">
                    { job?.experience} years
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      <button className="text-zinc-400 hover:text-white transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(job?._id)}
                        disabled={loadingId === job?._id}
                        className="text-zinc-400 hover:text-red-500 transition-colors disabled:opacity-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {jobs.length === 0 && (
            <div className="text-center py-12 text-zinc-500 flex flex-col items-center gap-2">
              <AlertCircle size={32} />
              <p>No services found at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPostService;