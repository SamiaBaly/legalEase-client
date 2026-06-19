'use client';

import React, { useState } from 'react';
import { Button } from '@heroui/react';
import { toast } from 'react-hot-toast';
import { FaUser, FaEnvelope, FaTrash } from 'react-icons/fa';

export default function AdminManageUsersPage() {
  // ডামি ইউজার ডাটা লিস্ট
  const [users, setUsers] = useState([
    { id: 1, name: 'Asif Rahman', email: 'asif@gmail.com', role: 'client' },
    {
      id: 2,
      name: 'Barrister Rafiq',
      email: 'rafiq@legal.com',
      role: 'lawyer',
    },
    { id: 3, name: 'Admin Shuvo', email: 'shuvo@admin.com', role: 'admin' },
    { id: 4, name: 'Mitu Islam', email: 'mitu@gmail.com', role: 'client' },
  ]);

  // রোল চেঞ্জ করার হ্যান্ডলার
  const handleRoleChange = (id, newRole) => {
    if (!newRole) return;
    setUsers(prev =>
      prev.map(user => (user.id === id ? { ...user, role: newRole } : user)),
    );
    toast.success(`User role updated to ${newRole} successfully!`);
  };

  // ইউজার ডিলিট করার হ্যান্ডলার
  const handleDeleteUser = (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${name}?`,
    );
    if (confirmDelete) {
      setUsers(prev => prev.filter(user => user.id !== id));
      toast.error(`${name} has been removed from the platform.`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      <div>
        <h2 className="text-xl font-black text-default-900 dark:text-zinc-100 uppercase tracking-wide">
          Manage System Users
        </h2>
        <p className="text-xs text-default-500">
          Overview of registered accounts, role modification, and access
          revocation.
        </p>
      </div>

      <div className="w-full overflow-x-auto rounded-xl border border-default-200 dark:border-zinc-800 bg-content1 dark:bg-zinc-900 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-default-200 dark:border-zinc-800 bg-default-50 dark:bg-zinc-950/40 text-[11px] font-black uppercase tracking-wider text-default-500">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Current Role</th>
              <th className="p-4">Change Role</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-default-100 dark:divide-zinc-800/60 text-sm font-medium">
            {users.map(user => (
              <tr
                key={user.id}
                className="hover:bg-default-50/50 dark:hover:bg-zinc-800/20 transition-colors"
              >
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <FaUser className="text-default-400" size={13} />
                    <span className="font-bold text-default-800 dark:text-zinc-200">
                      {user.name}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-xs text-default-500">
                  <div className="flex items-center gap-1.5">
                    <FaEnvelope size={12} />
                    {user.email}
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-black uppercase rounded-md border ${
                      user.role === 'admin'
                        ? 'bg-danger-50 dark:bg-danger-950/30 text-danger border-danger-200'
                        : user.role === 'lawyer'
                          ? 'bg-[#005A5B]/10 dark:bg-[#20B2AA]/10 text-[#005A5B] dark:text-[#20B2AA] border-transparent'
                          : 'bg-default-100 dark:bg-zinc-800 text-default-700 dark:text-zinc-300 border-transparent'
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="p-4 min-w-[140px]">
                  {/* ✅ ফিক্সড করা কালার ক্লাসসমূহ */}
                  <select
                    value={user.role}
                    onChange={e => handleRoleChange(user.id, e.target.value)}
                    className="h-9 w-full px-2 rounded-lg border border-default-200 dark:border-zinc-800 bg-transparent text-xs font-bold text-default-800 dark:text-zinc-200 focus:outline-none focus:border-[#005A5B] dark:focus:border-[#20B2AA]"
                  >
                    {/* অপশনগুলোর ব্যাকগ্রাউন্ড থিম অনুযায়ী সেট করা হয়েছে */}
                    <option
                      value="client"
                      className="bg-content1 dark:bg-zinc-900 text-default-800 dark:text-zinc-200"
                    >
                      Client
                    </option>
                    <option
                      value="lawyer"
                      className="bg-content1 dark:bg-zinc-900 text-default-800 dark:text-zinc-200"
                    >
                      Lawyer
                    </option>
                    <option
                      value="admin"
                      className="bg-content1 dark:bg-zinc-900 text-default-800 dark:text-zinc-200"
                    >
                      Admin
                    </option>
                  </select>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center">
                    <Button
                      size="sm"
                      isIconOnly
                      onClick={() => handleDeleteUser(user.id, user.name)}
                      className="bg-danger-50 hover:bg-danger-100 text-danger rounded-lg border border-danger-200 dark:bg-danger-950/20 dark:border-transparent"
                    >
                      <FaTrash size={12} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
