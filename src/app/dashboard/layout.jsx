

import { DashboardSidebar } from '@/componants/shared/DashboardSidebar';
import SideBar from '@/componants/shared/SideBar';
import { getUserSession } from '@/lib/core/session';
import React from 'react'

const DashboardLayout = async({ children }) => {
  const user = await getUserSession()
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar user={user} />
      
      <div className="flex-1"> {children}</div>
    </div>
  );
}

export default DashboardLayout;