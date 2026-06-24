'use client';

import React from 'react';
import { useSession } from '@/lib/auth-client';

// Admin mock data
const systemStats = [
  { id: 1, label: 'Total Users', value: '1,240' },
  { id: 2, label: 'Active Lawyers', value: '86' },
  { id: 3, label: 'Active Clients', value: '1,120' },
  { id: 4, label: 'Pending Requests', value: '32' },
];

const recentUsers = [
  {
    id: 1,
    name: 'Tanvir Rahman',
    role: 'Client',
    time: '2 hours ago',
  },
  {
    id: 2,
    name: 'Adv. Nusrat Jahan',
    role: 'Lawyer',
    time: '5 hours ago',
  },
  {
    id: 3,
    name: 'Ahmed Corporation Ltd.',
    role: 'Client',
    time: 'Yesterday',
  },
];

const systemAlerts = [
  {
    id: 1,
    text: 'High traffic detected on document upload service',
    level: 'high',
  },
  {
    id: 2,
    text: 'New lawyer verification request submitted',
    level: 'medium',
  },
  {
    id: 3,
    text: 'Database backup completed successfully',
    level: 'low',
  },
];

const pendingApprovals = [
  {
    id: 1,
    title: 'Lawyer Verification - Adv. Kamrul Hasan',
    type: 'Lawyer',
  },
  {
    id: 2,
    title: 'New Client Business Account Request',
    type: 'Client',
  },
  {
    id: 3,
    title: 'Document Access Permission Request',
    type: 'System',
  },
];

const AdminDashboardHomePage = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-50 text-zinc-500 dark:bg-zinc-950 dark:text-zinc-400">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-900 border-t-transparent dark:border-zinc-500"></div>
          <p className="text-sm">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  const user = session?.user;

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'AD';

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-800 antialiased transition-colors duration-200 dark:bg-zinc-950 dark:text-zinc-200">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3.5">
            {user?.image ? (
              <img
                src={user.image}
                alt={user?.name || 'Admin'}
                className="h-11 w-11 rounded-full border-2 border-zinc-300 object-cover dark:border-zinc-700"
              />
            ) : (
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-300 bg-zinc-200 text-sm font-bold dark:border-zinc-700 dark:bg-zinc-800">
                {initials}
              </div>
            )}

            <div>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Admin Panel
              </span>
              <h1 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                {user?.name || 'System Admin'}
              </h1>
            </div>
          </div>

          <button className="rounded bg-zinc-900 px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900">
            System Settings
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* WELCOME */}
        <div className="mb-8 border-b border-zinc-200 pb-4 dark:border-zinc-800">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-2xl">
            Welcome Back, Admin
          </h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Monitor users, approvals, and system health in real time.
          </p>
        </div>

        {/* STATS */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {systemStats.map((stat) => (
            <div
              key={stat.id}
              className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {stat.label}
              </p>
              <h3 className="mt-2 text-xl font-bold text-zinc-900 dark:text-zinc-100">
                {stat.value}
              </h3>
            </div>
          ))}
        </div>

        {/* GRID */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* LEFT */}
          <div className="space-y-6 lg:col-span-2">
            {/* Pending Approvals */}
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="mb-4 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Pending Approvals
              </h3>

              <div className="space-y-3">
                {pendingApprovals.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-zinc-100 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950/60"
                  >
                    <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      {item.title}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[11px] text-zinc-500">
                        Type: {item.type}
                      </span>
                      <div className="flex gap-2">
                        <button className="text-[10px] font-bold uppercase text-green-600">
                          Approve
                        </button>
                        <button className="text-[10px] font-bold uppercase text-red-600">
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Users */}
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="mb-4 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Recent Users
              </h3>

              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                        {user.name}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {user.role} • {user.time}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold uppercase text-zinc-600 dark:text-zinc-300">
                      View
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* System Alerts */}
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="mb-4 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                System Alerts
              </h3>

              <div className="space-y-3">
                {systemAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="rounded-lg border border-zinc-100 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950/60"
                  >
                    <p className="text-xs text-zinc-700 dark:text-zinc-300">
                      {alert.text}
                    </p>
                    <span className="mt-2 inline-block text-[10px] font-bold uppercase text-zinc-500">
                      {alert.level} priority
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="mb-4 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Quick Actions
              </h3>

              <div className="space-y-2">
                <button className="w-full rounded bg-zinc-900 py-2 text-xs font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">
                  Add New User
                </button>
                <button className="w-full rounded border border-zinc-300 py-2 text-xs font-semibold dark:border-zinc-700">
                  Manage Roles
                </button>
                <button className="w-full rounded border border-zinc-300 py-2 text-xs font-semibold dark:border-zinc-700">
                  System Logs
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardHomePage;