'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@heroui/react';
import { toast } from 'react-hot-toast';
import {
  FaUser,
  FaEnvelope,
  FaTrash,
  FaSpinner,
  FaUsers,
  FaUserShield,
} from 'react-icons/fa';
import { getHires } from '@/lib/api/hire';

export default function AdminManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await getHires();
        setUsers(Array.isArray(data) ? data : data?.users || []);
      } catch (error) {
        toast.error(error?.message || 'Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleRoleChange = async (id, newRole) => {
    if (!newRole) return;

    try {
      setActionId(id);
      setUsers(prev =>
        prev.map(user => (user.id === id ? { ...user, role: newRole } : user)),
      );
      toast.success(`User role updated to ${newRole} successfully!`);
    } catch (error) {
      toast.error(error?.message || 'Failed to update role');
    } finally {
      setActionId(null);
    }
  };

  const handleDeleteUser = (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${name}?`,
    );

    if (confirmDelete) {
      setUsers(prev => prev.filter(user => user.id !== id));
      toast.error(`${name} has been removed from the platform.`);
    }
  };

  const getRoleStyle = role => {
    if (role === 'admin') {
      return 'bg-red-50 text-red-600 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-900/40';
    }
    if (role === 'lawyer') {
      return 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/30 dark:text-cyan-300 dark:border-cyan-900/40';
    }
    return 'bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700';
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6 text-white shadow-2xl shadow-black/20">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.2em] text-white/80">
              <FaUserShield />
              ADMIN CONTROL PANEL
            </div>

            <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
              Manage System Users
            </h2>
            <p className="mt-2 text-sm leading-7 text-white/70">
              View users, change roles, and remove accounts from the platform.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                Total Users
              </p>
              <p className="mt-1 text-2xl font-black">{users.length}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                System Access
              </p>
              <p className="mt-1 text-2xl font-black">Active</p>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950/30 dark:text-cyan-300">
              <FaUsers />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                Registered Users
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Role management and account control
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left">
            <thead>
              <tr className="bg-zinc-50 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 dark:bg-zinc-900/60 dark:text-zinc-400">
                <th className="px-5 py-4">Name</th>
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4">Current Role</th>
                <th className="px-5 py-4">Change Role</th>
                <th className="px-5 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-5 py-16 text-center">
                    <div className="flex items-center justify-center gap-3 text-zinc-500 dark:text-zinc-400">
                      <FaSpinner className="animate-spin" />
                      Loading users...
                    </div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-16 text-center">
                    <div className="mx-auto max-w-sm rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 dark:border-zinc-700 dark:bg-zinc-900/40">
                      <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                        No users found
                      </p>
                      <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                        Users will appear here once loaded.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                users.map(user => (
                  <tr
                    key={user.id}
                    className="transition-colors hover:bg-cyan-50/40 dark:hover:bg-white/5"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                          <FaUser size={13} />
                        </div>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                          {user.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-zinc-600 dark:text-zinc-400">
                      <div className="flex items-center gap-2">
                        <FaEnvelope size={12} />
                        <span className="break-all">{user.email}</span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] ${getRoleStyle(
                          user.role,
                        )}`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-5 py-4 min-w-[160px]">
                      <select
                        value={user.role}
                        onChange={e => handleRoleChange(user.id, e.target.value)}
                        disabled={actionId === user.id}
                        className="h-10 w-full rounded-2xl border border-zinc-200 bg-white px-3 text-sm font-semibold text-zinc-800 outline-none transition focus:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
                      >
                        <option value="client">Client</option>
                        <option value="lawyer">Lawyer</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-center">
                        <Button
                          size="sm"
                          isIconOnly
                          isLoading={actionId === user.id}
                          onClick={() => handleDeleteUser(user.id, user.name)}
                          className="rounded-2xl border border-red-200 bg-red-50 text-red-600 shadow-sm transition hover:bg-red-100 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-300"
                        >
                          <FaTrash size={12} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}