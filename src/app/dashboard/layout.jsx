
// import DashboardSidebar from '@/componants/shared/DashboardSidebar';
// import React from 'react';


// export const metadata = {
//   title: 'Dashboard - LegalDesk',
//   description: 'Manage your profile, appointments, and cases.',
// };

// export default function DashboardLayout({ children }) {
//   return <DashboardSidebar>{children}</DashboardSidebar>;
// }

import { DashboardSidebar } from '@/componants/shared/DashboardSidebar';
import React from 'react'

const DashboardLayout = ({ children}) => {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1"> {children}</div>
    </div>
  );
}

export default DashboardLayout