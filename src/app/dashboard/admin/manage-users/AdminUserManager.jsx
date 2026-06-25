

"use client"

import { Button } from '@heroui/react';


const AdminUserManager =() => {
  



  const handleApprove = async (id) => {
    
    console.log("Approved ID:", id);
  
  };

  const handleReject = async (id) => {
    
    console.log("Rejected ID:", id);
   
  };

  return (
    <div className="min-h-screen bg-[#111111] p-8 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Hire for review: {hires.length}</h1>

        <div className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="text-zinc-400 border-b border-white/10">
              <tr>
                <th className="p-4 font-medium">Company Name</th>
                <th className="p-4 font-medium">Recruiter Email</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {hires.map((hire, index) => (
                <tr key={hire.id || index} className="hover:bg-white/5 transition">
                
                  <td className="p-6 font-semibold text-white">
                    
                    {hire?.companyName || hire.name || hire.title || "No Name Found"}
                  </td>
                  <td className="p-4 text-zinc-400">{hire.email}</td>
                  <td className="p-4">
                    <span className="flex items-center gap-2 text-amber-500">
                      <span className="w-2 h-2 rounded-full bg-current"></span>
                      {hire.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleApprove(hire._id)}
                      className="bg-transparent border border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10"
                    >
                      Approve
                    </Button>

                    <Button
                      size="sm"
                      onClick={() => handleReject(hire._id)}
                      className="bg-transparent border border-red-500/50 text-red-500 hover:bg-red-500/10"
                    >
                      Reject
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUserManager;