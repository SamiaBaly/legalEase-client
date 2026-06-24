'use client';

import React from 'react';
import { useSession } from '@/lib/auth-client';

// Client dashboard mock data
const upcomingAppointments = [
  {
    id: 1,
    title: 'Case Follow-up Meeting',
    lawyer: 'Adv. Muhammad Karim',
    time: '10:30 AM',
    status: 'Today',
  },
  {
    id: 2,
    title: 'Document Review Session',
    lawyer: 'Adv. Nusrat Jahan',
    time: '02:15 PM',
    status: 'Tomorrow',
  },
  {
    id: 3,
    title: 'Court Hearing Update',
    lawyer: 'Adv. Tanvir Ahmed',
    time: '04:00 PM',
    status: 'This Week',
  },
];

const activeCases = [
  {
    id: 1,
    caseTitle: 'Bail Petition - Case No. 452/2026',
    stage: 'Under Review',
    priority: 'high',
  },
  {
    id: 2,
    caseTitle: 'Property Deed Verification',
    stage: 'Waiting for Documents',
    priority: 'medium',
  },
  {
    id: 3,
    caseTitle: 'Family Matter Consultation',
    stage: 'Scheduled',
    priority: 'low',
  },
];

const recentUpdates = [
  {
    id: 1,
    text: 'Your lawyer uploaded a new case note for Case No. 452/2026',
    time: '1 hour ago',
  },
  {
    id: 2,
    text: 'A hearing date has been updated in your dashboard',
    time: '3 hours ago',
  },
  {
    id: 3,
    text: 'New document request added: National ID copy',
    time: 'Yesterday',
  },
];

const pendingDocuments = [
  {
    id: 1,
    name: 'National ID Card Copy',
    due: 'Today',
  },
  {
    id: 2,
    name: 'Property Ownership Paper',
    due: 'Tomorrow',
  },
  {
    id: 3,
    name: 'Passport Size Photo',
    due: 'This Week',
  },
];

const ClientdashboardHomePage = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center font-medium bg-zinc-50 dark:bg-zinc-950 text-zinc-500 dark:text-zinc-400">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-900 border-t-transparent dark:border-zinc-500"></div>
          <p className="text-sm tracking-wide">Loading secure workspace...</p>
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
    : 'CL';
  const bg =
    '/asset/banner/hero1.jpg';
   
  

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-800 antialiased transition-colors duration-200 dark:bg-zinc-950 dark:text-zinc-200">
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white shadow-sm transition-colors duration-200 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3.5">
            {user?.image ? (
              <img
                src={user.image}
                alt={user?.name || 'Client'}
                className="h-11 w-11 rounded-full border-2 border-zinc-300 object-cover dark:border-zinc-700"
              />
            ) : (
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-300 bg-zinc-200 text-sm font-bold text-zinc-800 shadow-inner dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                {initials}
              </div>
            )}

            <div>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Client Dashboard
              </span>
              <h1 className="text-base font-bold leading-tight text-zinc-900 dark:text-zinc-100">
                {user?.name || 'Welcome Client'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden rounded border border-zinc-200 bg-zinc-100 px-3 py-1.5 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 md:inline">
              {user?.email || 'client@email.com'}
            </span>
            <button className="rounded bg-zinc-900 px-4 py-2 text-xs font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
              + New Request
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 border-b border-zinc-200 pb-4 dark:border-zinc-800">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-2xl">
            Welcome Back, {user?.name || 'Client'}
          </h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Here is your case overview, upcoming appointments, and document
            updates.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="relative overflow-hidden rounded-xl border border-zinc-200 border-l-4 border-l-zinc-600 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-gradient-to-br dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 dark:border-l-zinc-400">
              <div className="relative z-10">
                <span className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Case Summary
                </span>
                <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
                  Private client case management portal
                </p>

                <div className="mt-6 grid grid-cols-3 gap-4 border-t border-zinc-100 pt-5 dark:border-zinc-800/80">
                  <div>
                    <span className="block text-xs text-zinc-500 dark:text-zinc-400">
                      Active Cases
                    </span>
                    <span className="mt-1 block text-lg font-bold text-zinc-900 dark:text-zinc-100">
                      03 Cases
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs text-zinc-500 dark:text-zinc-400">
                      Pending Docs
                    </span>
                    <span className="mt-1 block text-lg font-bold text-zinc-900 dark:text-zinc-100">
                      03 Items
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs text-zinc-500 dark:text-zinc-400">
                      Next Meeting
                    </span>
                    <span className="mt-1 block text-lg font-bold text-zinc-700 dark:text-zinc-300">
                      Today
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-400 dark:bg-zinc-500"></span>
                  Upcoming Appointments
                </h3>
              </div>

              <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {upcomingAppointments.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                        {item.title}
                      </h4>
                      <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                        {item.lawyer}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="block text-xs font-bold text-zinc-800 dark:text-zinc-200">
                        {item.time}
                      </span>
                      <span className="mt-1 inline-block rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300">
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
                Pending Documents
              </h3>

              <div className="space-y-3">
                {pendingDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="rounded-lg border border-zinc-100 bg-zinc-50 p-3 transition-colors hover:border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950/60 dark:hover:border-zinc-700"
                  >
                    <p className="text-xs font-semibold leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {doc.name}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[11px] font-medium text-zinc-500">
                        Due: {doc.due}
                      </span>
                      <button className="text-[10px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-200">
                        Upload
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-400 dark:bg-zinc-600"></span>
                Recent Updates
              </h3>

              <div className="space-y-4">
                {recentUpdates.map((log) => (
                  <div
                    key={log.id}
                    className="relative border-l-2 border-zinc-200 pb-1 pl-4 text-xs last:pb-0 dark:border-zinc-800"
                  >
                    <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-zinc-400 dark:bg-zinc-500"></span>
                    <p className="font-medium leading-normal text-zinc-700 dark:text-zinc-300">
                      {log.text}
                    </p>
                    <span className="mt-1 block text-[10px] text-zinc-500">
                      {log.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-400 dark:bg-zinc-600"></span>
                Active Cases
              </h3>

              <div className="space-y-3">
                {activeCases.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-zinc-100 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950/60"
                  >
                    <p className="text-xs font-semibold leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {item.caseTitle}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[11px] text-zinc-500">
                        {item.stage}
                      </span>
                      <span className="rounded border border-zinc-300 bg-zinc-200 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                        {item.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientdashboardHomePage;