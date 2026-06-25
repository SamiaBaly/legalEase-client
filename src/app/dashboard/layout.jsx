

import SideBar from '@/componants/shared/SideBar';
import { requireRole } from '@/lib/core/session';

import React from 'react'

const DashboardLayout = async ({ children }) => {
  
  
  return (
    <div className="flex min-h-screen">
      <SideBar/>
      
      <div className="flex-1"> {children}</div>
    </div>
  );
}

export default DashboardLayout;