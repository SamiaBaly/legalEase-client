import { getLoggedInClientCompany } from '@/lib/api/companies';
import { getCompanyJobs } from '@/lib/api/jobs';
import React from 'react';
import { FaUser, FaCalendarAlt, FaHourglassHalf, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const LawyerJobsPage = async () => {
  const company = await getLoggedInClientCompany();
  const companyId = company?._id;
  let jobs = [];
  
  try {
    jobs = await getCompanyJobs(company._id);
  
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'N/A';
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return 'N/A';
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-black text-zinc-100 uppercase tracking-wide">
          Hiring Requests
        </h1>
        <p className="text-xs text-default-500">
          Review, accept, or decline pending hiring cases from normal users.
        </p>
      </div>

      <div className="w-full overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/50 shadow-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 text-[11px] font-black uppercase tracking-wider text-zinc-400 bg-zinc-950/40">
              <th className="py-4 px-6">Client Name</th>
              <th className="py-4 px-6">Request Date</th>
              <th className="py-4 px-6">Current Status</th>
              <th className="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-sm text-zinc-200">
            {!jobs || jobs.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-zinc-500 text-xs font-semibold">
                  No hiring requests found for Company ID: {companyId}
                </td>
              </tr>
            ) : (
              jobs.map((job) => {
                // এখানে .toLowerCase() করে স্ট্যাটাস চেক করা হচ্ছে সেফটির জন্য
                const currentStatus = job.status ? job.status.toLowerCase() : 'pending';
                
                // আপনার ডেটাবেজে যদি 'available' বা 'pending' থাকে, তবে বাটন দেখাবে
                const isPendingOrAvailable = currentStatus === 'pending' || currentStatus === 'available';

                return (
                  <tr key={job._id || job.id || Math.random()} className="hover:bg-zinc-900/30 transition-colors">
                    {/* CLIENT NAME */}
                    <td className="py-5 px-6 font-semibold">
                      <div className="flex items-center gap-3">
                        <span className="p-2 bg-zinc-800 rounded-full text-zinc-400 text-xs">
                          <FaUser size={12} />
                        </span>
                        <span className="text-zinc-100">{job.name || 'Unknown Client'}</span>
                      </div>
                    </td>

                    {/* REQUEST DATE */}
                    <td className="py-5 px-6 text-zinc-400 font-medium">
                      <div className="flex items-center gap-2 text-xs">
                        <FaCalendarAlt className="text-zinc-500" size={13} />
                        {/* আপনার ডেটার createdAt বা createAt.$date দুটোই হ্যান্ডেল করবে */}
                        {formatDate(job.createdAt || (job.createAt && job.createAt.$date))}
                      </div>
                    </td>

                    {/* CURRENT STATUS */}
                    <td className="py-5 px-6">
                      {isPendingOrAvailable && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 capitalize">
                          <FaHourglassHalf size={10} /> {job.status || 'Pending'}
                        </span>
                      )}
                      {(currentStatus === 'accepted' || currentStatus === 'approved') && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 capitalize">
                          <FaCheckCircle size={10} /> Accepted
                        </span>
                      )}
                      {(currentStatus === 'rejected' || currentStatus === 'declined') && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-500 border border-rose-500/20 capitalize">
                          <FaTimesCircle size={10} /> Rejected
                        </span>
                      )}
                    </td>

                    {/* ACTIONS */}
                    <td className="py-5 px-6 text-center">
                      {isPendingOrAvailable ? (
                        <div className="flex items-center justify-center gap-2">
                          <button className="px-4 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-600 text-zinc-950 font-black text-xs transition-colors shadow-sm">
                            Accept
                          </button>
                          <button className="px-4 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-black text-xs transition-colors shadow-sm">
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs font-black italic tracking-wider text-zinc-500 uppercase">
                          Action Taken
                        </span>
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
};

export default LawyerJobsPage;