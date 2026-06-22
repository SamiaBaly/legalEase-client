'use client';
import { useSession } from '@/lib/auth-client';
import React from 'react';

// Law practice related mock data
const dailyAgenda = [
  {
    id: 1,
    client: 'Ahmed Corporation Ltd.',
    type: 'NDA & Contract Review',
    time: '10:30 AM',
    status: 'Today',
  },
  {
    id: 2,
    client: 'Tanvir Rahman',
    type: 'Civil Suit Hearing',
    time: '02:15 PM',
    status: 'Courtroom 3',
  },
  {
    id: 3,
    client: 'Begum Sufia',
    type: 'Family Law Consultation',
    time: '04:00 PM',
    status: 'Chamber B',
  },
];

const urgentFiles = [
  {
    id: 1,
    title: 'High Court Appeal Brief Submission',
    deadline: 'Today, 4:00 PM',
    level: 'high',
  },
  {
    id: 2,
    title: 'Retainer Agreement - New Client Setup',
    deadline: 'Tomorrow',
    level: 'medium',
  },
];

const recentActivities = [
  {
    id: 1,
    text: 'You filed a bail petition for Case No. 452/2026',
    time: '1 hour ago',
  },
  {
    id: 2,
    text: 'New document uploaded: RAJUK Plot Mutual Deed',
    time: '3 hours ago',
  },
];

const LawyerHomePage = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center font-medium bg-zinc-50 dark:bg-zinc-950 text-zinc-500 dark:text-zinc-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-zinc-900 dark:border-zinc-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm tracking-wide">Loading secure workspace...</p>
        </div>
      </div>
    );
  }

  const user = session?.user;
  const initials = user?.name
    ? user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'LC';

  return (
    <div className="min-h-screen font-sans antialiased bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 transition-colors duration-200">
      {/* 1. THEMED NAVBAR / HEADER */}
      <header className="sticky top-0 z-50 border-b shadow-sm bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Lawyer Identity Card Profile */}
          <div className="flex items-center gap-3.5">
            {user?.image ? (
              <img
                src={user.image}
                alt={user?.name || 'Lawyer'}
                className="w-11 h-11 rounded-full object-cover border-2 border-zinc-300 dark:border-zinc-700"
              />
            ) : (
              <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm border bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700 shadow-inner">
                {initials}
              </div>
            )}
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 dark:text-zinc-400 block">
                Senior Counsel
              </span>
              <h1 className="text-base font-bold leading-tight text-zinc-900 dark:text-zinc-100">
                {user?.name || 'Legal Counsel'}
              </h1>
            </div>
          </div>

          {/* Quick Actions Portal */}
          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-xs px-3 py-1.5 rounded border text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
              {user?.email || 'lawyer@firm.com'}
            </span>
            <button className="px-4 py-2 rounded font-semibold text-xs shadow-md transition-all transform hover:-translate-y-0.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200">
              + New Case File
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN HUB CONTENT */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Block */}
        <div className="mb-8 border-b pb-4 border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Welcome Back, {user?.name || ''}
          </h2>
          <p className="text-sm mt-1 text-zinc-500 dark:text-zinc-400">
            Here is a curated overview of your practice agenda, pending court
            filings, and logs.
          </p>
        </div>

        {/* Dashboard Architecture Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Operations Flow (Cols 1 & 2) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Monochromatic Metric Summary Card */}
            <div className="rounded-xl p-6 shadow-md border relative overflow-hidden bg-white dark:bg-gradient-to-br dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 border-zinc-200 dark:border-zinc-800 border-l-4 border-l-zinc-600 dark:border-l-4 dark:border-l-zinc-400">
              <div className="relative z-10">
                <span className="text-xs font-bold uppercase tracking-wider block text-zinc-500 dark:text-zinc-400">
                  Practice Metrics Summary
                </span>
                <p className="text-xs mt-1 text-zinc-400 dark:text-zinc-500">
                  Digital Litigation & Matter Management Portal
                </p>

                <div className="mt-6 grid grid-cols-3 gap-4 border-t pt-5 border-zinc-100 dark:border-zinc-800/80">
                  <div>
                    <span className="text-xs block text-zinc-500 dark:text-zinc-400">
                      Active Briefs
                    </span>
                    <span className="text-lg font-bold mt-1 block text-zinc-900 dark:text-zinc-100">
                      18 Matters
                    </span>
                  </div>
                  <div>
                    <span className="text-xs block text-zinc-500 dark:text-zinc-400">
                      Billable Hours
                    </span>
                    <span className="text-lg font-bold mt-1 block text-zinc-900 dark:text-zinc-100">
                      42.5 hrs
                    </span>
                  </div>
                  <div>
                    <span className="text-xs block text-zinc-500 dark:text-zinc-400">
                      Today's Agenda
                    </span>
                    <span className="text-lg font-bold mt-1 block text-zinc-700 dark:text-zinc-300">
                      03 Sessions
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Courtroom Schedule List */}
            <div className="border rounded-xl p-5 shadow-sm bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-400 dark:bg-zinc-500"></span>
                  Daily Docket & Client Appointments
                </h3>
              </div>
              <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {dailyAgenda.map(item => (
                  <div
                    key={item.id}
                    className="py-3.5 flex items-center justify-between gap-4 first:pt-0 last:pb-0"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                        {item.client}
                      </h4>
                      <p className="text-xs mt-0.5 text-zinc-500 dark:text-zinc-400">
                        {item.type}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold block text-zinc-800 dark:text-zinc-200">
                        {item.time}
                      </span>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded border mt-1 inline-block text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700/50">
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar Structural Components */}
          <div className="space-y-6">
            {/* Urgent Matters Sidebar Component */}
            <div className="border rounded-xl p-5 shadow-sm bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                Critical Deadlines
              </h3>
              <div className="space-y-3">
                {urgentFiles.map(file => (
                  <div
                    key={file.id}
                    className="p-3 border rounded-lg transition-colors bg-zinc-50 dark:bg-zinc-950/60 border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700"
                  >
                    <p className="text-xs font-semiboldDoc leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {file.title}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[11px] text-zinc-500 font-medium">
                        Due: {file.deadline}
                      </span>
                      {file.level === 'high' && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider text-zinc-700 dark:text-zinc-200 bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700">
                          High Priority
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Attorney History / Actions Section */}
            <div className="border rounded-xl p-5 shadow-sm bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-400 dark:bg-zinc-600"></span>
                Recent Action History
              </h3>
              <div className="space-y-4">
                {recentActivities.map(log => (
                  <div
                    key={log.id}
                    className="text-xs relative pl-4 border-l-2 pb-1 last:pb-0 border-zinc-200 dark:border-zinc-800"
                  >
                    <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-500"></span>
                    <p className="font-medium leading-normal text-zinc-700 dark:text-zinc-300">
                      {log.text}
                    </p>
                    <span className="text-[10px] text-zinc-500 block mt-1">
                      {log.time}
                    </span>
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

export default LawyerHomePage;
