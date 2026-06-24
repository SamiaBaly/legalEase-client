import React from 'react'
import ManageLegalProfilePage from './ManageLegalProfilePage';
import { getLawyerCompany, getLoggedInClientCompany } from '@/lib/api/companies';
import { getUserSession } from '@/lib/core/session';

const ManageprofilePage = async () => {
  const user = await getUserSession();
  const company = await getLawyerCompany(user?.id);
  return (
    <div>
      <ManageLegalProfilePage lawyer={user} lawyerCompany={ company} />
    </div>
  )
}

export default ManageprofilePage;