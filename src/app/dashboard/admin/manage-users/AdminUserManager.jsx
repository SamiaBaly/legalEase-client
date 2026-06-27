'use client';

import { updateUserRole } from "@/lib/acitons/users";
import React from "react";
import { FaUserShield, FaEnvelope } from "react-icons/fa";

const AdminUserManager = ({ users }) => {
 

  const getUserId=(users)=>user._id?.$oid || user.id
  const handleRoleChange =async (userId, role) => {
    const data = await updateUserRole(userId, role);
  };

  return (
    <div className="min-h-screen bg-[#09090b] p-6 md:p-12 text-zinc-100">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">User Directory {users.length}</h1>
          <p className="text-zinc-500">Manage account roles and permissions.</p>
        </div>

        <div className="bg-[#18181b] border border-zinc-800 rounded-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800/50 text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Assign Roles</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-zinc-800/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                        <FaUserShield size={14} />
                      </div>
                      <span className="font-semibold text-sm">{user.name || "N/A"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-400 text-sm">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono text-zinc-500 uppercase px-2 py-1 bg-zinc-900 rounded border border-zinc-800">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      {/* সরাসরি onClick এর ভেতরে রোল নাম বসানো হয়েছে */}
                      <button
                        onClick={() => handleRoleChange(user.id, "client")}
                        className={`px-3 py-1 text-[10px] font-bold uppercase rounded-md transition-all ${user.role === "client" ? "bg-green-600/20 text-white" : "bg-zinc-800 text-zinc-400"}`}>
                        Client
                      </button>

                      <button
                        onClick={() => handleRoleChange(user.id, "lawyer")}
                        className={`px-3 py-1 text-[10px] font-bold uppercase rounded-md transition-all ${user.role === "lawyer" ? "bg-orange-500/20 text-white" : "bg-zinc-800 text-zinc-400"}`}>
                        Lawyer
                      </button>

                      <button
                        onClick={() => handleRoleChange(user.id, "admin")}
                        className={`px-3 py-1 text-[10px] font-bold uppercase rounded-md transition-all ${user.role === "admin" ? "bg-blue-500/20 text-white" : "bg-zinc-800 text-zinc-400"}`}>
                        Admin
                      </button>
                    </div>
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