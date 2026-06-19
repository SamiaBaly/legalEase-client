// কোনো 'use client' নেই, এটি এখন একটি পিওর সার্ভার কম্পোনেন্ট
import DashboardSidebar from '@/componants/shared/DashboardSidebar';
import React from 'react';


export const metadata = {
  title: 'Dashboard - LegalDesk',
  description: 'Manage your profile, appointments, and cases.',
};

export default function DashboardLayout({ children }) {
  return <DashboardSidebar>{children}</DashboardSidebar>;
}
