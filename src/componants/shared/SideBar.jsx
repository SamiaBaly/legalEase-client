import React from 'react'
import { DashboardSidebar } from './DashboardSidebar';
import { getUserSession } from '@/lib/core/session';

const SideBar = async () => {
  const user = await getUserSession()
  return (
    <div>
      <DashboardSidebar user={user} />
    </div>
  )
}

export default SideBar