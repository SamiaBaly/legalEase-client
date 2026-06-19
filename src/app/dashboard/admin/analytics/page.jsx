'use client';

import React from 'react';
import { Card } from '@heroui/react';
import { FaDollarSign, FaHandshake, FaUsers, FaUserTie } from 'react-icons/fa';
import { BiTrendingUp } from 'react-icons/bi';


export default function AdminAnalyticsPage() {
  // ডামি অ্যানালিটিক্স ম্যাট্রিক্স ডাটা
  const stats = [
    {
      title: 'Total Users',
      value: '1,420',
      description: 'Registered client entities',
      icon: <FaUsers size={24} className="text-blue-500" />,
      bg: 'border-l-4 border-blue-500',
    },
    {
      title: 'Total Lawyers',
      value: '248',
      description: 'Verified active practitioners',
      icon: (
        <FaUserTie size={24} className="text-[#005A5B] dark:text-[#20B2AA]" />
      ),
      bg: 'border-l-4 border-[#005A5B] dark:border-[#20B2AA]',
    },
    {
      title: 'Total Hires',
      value: '890',
      description: 'Successful consulting orders',
      icon: <FaHandshake size={24} className="text-warning" />,
      bg: 'border-l-4 border-warning',
    },
    {
      title: 'Total Revenue',
      value: '$34,650',
      description: 'Platform gross earnings',
      icon: <FaDollarSign size={24} className="text-success" />,
      bg: 'border-l-4 border-success',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-black text-default-900 dark:text-zinc-100 uppercase tracking-wide">
          Analytics & Insights
        </h2>
        <p className="text-xs text-default-500">
          Live indicators displaying platform scaling parameters and economic
          status.
        </p>
      </div>

      {/* STATS CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card
            key={idx}
            className={`p-5 bg-content1 dark:bg-zinc-900 border border-default-200 dark:border-zinc-800 rounded-xl shadow-sm flex flex-row items-center justify-between ${stat.bg}`}
          >
            <div className="space-y-1">
              <p className="text-xs font-black uppercase tracking-wider text-default-400">
                {stat.title}
              </p>
              <h3 className="text-2xl font-black text-default-800 dark:text-zinc-100 tracking-tight">
                {stat.value}
              </h3>
              <p className="text-[10px] text-default-500 font-medium">
                {stat.description}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-default-50 dark:bg-zinc-950/50 border border-default-100 dark:border-zinc-800/40 shadow-inner">
              {stat.icon}
            </div>
          </Card>
        ))}
      </div>

      {/* RECENT REVENUE GROWTH PLACEHOLDER */}
      <Card className="p-6 bg-content1 dark:bg-zinc-900 border border-default-200 dark:border-zinc-800 rounded-2xl shadow-sm flex flex-col justify-center items-center py-12 text-center">
        <div className="w-12 h-12 rounded-full bg-success-50 dark:bg-success-950/20 flex items-center justify-center text-success mb-3">
          <BiTrendingUp size={20} />
        </div>
        <h4 className="text-sm font-black uppercase tracking-wider text-default-800 dark:text-zinc-200">
          Monthly Conversion Growth
        </h4>
        <p className="text-xs text-default-400 max-w-sm mt-1">
          Your platform observed a{' '}
          <span className="text-success font-bold">+12.4%</span> increase in
          automated escrow bookings over the last 30 billing cycles.
        </p>
      </Card>
    </div>
  );
}
