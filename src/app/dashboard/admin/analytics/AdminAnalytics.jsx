'use client';

import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export default function AdminAnalytics({ payment, users, hires = [] }) {
  
  const allUsers = users?.users || [];
  const clients = allUsers.filter(user => user.role === 'client');
  const lawyers = allUsers.filter(user => user.role === 'lawyer');
  const totalRevenue = payment?.reduce((sum, hire) => sum + (hire.amount || 0), 0) || 0;

 
  const chartData = [
    { name: 'clients', value: clients.length },
    { name: 'Hires', value: hires.length },
    { name: 'Revenue', value: totalRevenue },
    { name: 'Users', value: allUsers.length },
    { name: 'Lawyers', value: lawyers.length },
  ];

  return (
    <div className="min-h-screen bg-[#111111] p-8 text-white">
      <h1 className="text-3xl font-bold mb-8">Admin Analytics Overview</h1>

      {/* মেট্রিকস সেকশন - কোনো কার্ড নেই */}
      <div className="grid grid-cols-5 gap-8 mb-12">
        <div className="border border-white/10 p-6 rounded-xl">
          <p className="text-gray-400 text-sm">Total Users</p>
          <h2 className="text-4xl font-bold mt-2">{allUsers.length}</h2>
        </div>
     
        <div className="border border-white/10 p-6 rounded-xl">
          <p className="text-gray-400 text-sm">Total Users</p>
          <h2 className="text-4xl font-bold mt-2">{clients.length}</h2>
        </div>
        <div className="border border-white/10 p-6 rounded-xl">
          <p className="text-gray-400 text-sm">Total Lawyers</p>
          <h2 className="text-4xl font-bold mt-2">{lawyers.length}</h2>
        </div>
        <div className="border border-white/10 p-6 rounded-xl">
          <p className="text-gray-400 text-sm">Total Hires</p>
          <h2 className="text-4xl font-bold mt-2">{hires.length}</h2>
        </div>
        <div className="border border-white/10 p-6 rounded-xl">
          <p className="text-gray-400 text-sm">Total Revenue</p>
          <h2 className="text-4xl font-bold mt-2">${totalRevenue}</h2>
        </div>
      </div>

      {/* চার্ট সেকশন - কোনো কার্ড নেই */}
      <div className="w-full h-[400px] border border-white/10 p-4 rounded-lg bg-[#1b1b1b]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#06b6d4"
              fill="url(#colorVal)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}