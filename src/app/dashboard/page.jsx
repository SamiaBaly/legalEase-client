'use client';

import React from 'react';
import { Button, Card, Spinner } from '@heroui/react';
import { useRouter } from 'next/navigation';
import {
  FaUserCircle,
  FaEnvelope,
  FaIdCard,
  FaUserTag,
  FaEdit,
  FaCalendarAlt,
} from 'react-icons/fa';
import { useSession } from '@/lib/auth-client';

export default function DashboardPage() {
  const { data: session, isPending, error } = useSession();
  const router = useRouter();

  if (isPending) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-3">
        <Spinner
          size="lg"
          color="current"
          className="text-[#005A5B] dark:text-[#20B2AA]"
        />
        <p className="text-sm font-medium text-default-500">
          Loading profile data...
        </p>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h3 className="text-lg font-bold text-danger">
          Authentication Required
        </h3>
        <p className="text-sm text-default-500 mt-1">
          Please sign in to view your dashboard profile.
        </p>
      </div>
    );
  }

  const { user } = session;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* WELCOME SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-default-900 dark:text-zinc-100">
            Welcome back, {user.name || 'User'}!
          </h2>
          <p className="text-sm text-default-500 dark:text-zinc-400 mt-1">
            Manage your account overview and credentials below.
          </p>
        </div>
        <Button
          onClick={() => router.push('/dashboard/client/update-profile')}
          startContent={<FaEdit size={14} />}
          className="bg-[#005A5B] hover:bg-[#004445] dark:bg-[#20B2AA] dark:hover:bg-[#008B8B] dark:text-zinc-950 text-white font-bold rounded-xl shadow-md transition-colors"
        >
          Update Profile
        </Button>
      </div>

      {/* MAIN PROFILE CARD */}
      <Card className="w-full bg-content1 dark:bg-zinc-900 border border-default-200 dark:border-zinc-800 rounded-2xl shadow-md overflow-hidden">
        <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="flex flex-col items-center gap-3">
            <div className="text-default-300 dark:text-zinc-700">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-[110px] h-[110px] rounded-full object-cover border-2 border-default-200"
                />
              ) : (
                <FaUserCircle size={110} />
              )}
            </div>
            <span className="px-3 py-1 text-xs font-black uppercase tracking-wider rounded-full bg-success-50 dark:bg-success-950/30 text-success border border-success-200 dark:border-success-900/30">
              Active
            </span>
          </div>

          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
            <div className="flex items-center gap-4 p-4 rounded-xl border border-default-100 dark:border-zinc-800 bg-[#eeeae1]/20 dark:bg-zinc-800/30">
              <FaIdCard
                className="text-[#cda863] dark:text-[#d4af37]"
                size={20}
              />
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-default-400 dark:text-zinc-500">
                  Full Name
                </p>
                <p className="text-sm font-bold text-default-800 dark:text-zinc-200">
                  {user.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl border border-default-100 dark:border-zinc-800 bg-[#eeeae1]/20 dark:bg-zinc-800/30">
              <FaEnvelope
                className="text-[#cda863] dark:text-[#d4af37]"
                size={18}
              />
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-default-400 dark:text-zinc-500">
                  Email Address
                </p>
                <p className="text-sm font-bold text-default-800 dark:text-zinc-200 break-all">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl border border-default-100 dark:border-zinc-800 bg-[#eeeae1]/20 dark:bg-zinc-800/30">
              <FaUserTag
                className="text-[#cda863] dark:text-[#d4af37]"
                size={18}
              />
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-default-400 dark:text-zinc-500">
                  Account Type / Role
                </p>
                <p className="text-sm font-bold text-default-800 dark:text-zinc-200 capitalize">
                  {user.role || 'Client'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl border border-default-100 dark:border-zinc-800 bg-[#eeeae1]/20 dark:bg-zinc-800/30">
              <FaCalendarAlt
                className="text-[#cda863] dark:text-[#d4af37]"
                size={18}
              />
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-default-400 dark:text-zinc-500">
                  Member Since
                </p>
                <p className="text-sm font-bold text-default-800 dark:text-zinc-200">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })
                    : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
