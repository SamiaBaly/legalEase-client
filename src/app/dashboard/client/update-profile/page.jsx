import React from 'react'
import DashboardProfilePage from './DashboardProfilePage';
import { getUserSession } from '@/lib/core/session';
import { getClientCompany } from '@/lib/api/companies';

const ClientPage =async () => {
  const user = await getUserSession();
  const company=await getClientCompany(user?.id)
  console.log(user);
  return (
    <div>
      <DashboardProfilePage client={user} clientCompany={ company}></DashboardProfilePage>
    </div>
  )
}

export default ClientPage;