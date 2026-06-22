import React from 'react'
import ManageLegalProfilePage from './ManageLegalProfilePage';
import { getLoggedInClientCompany } from '@/lib/api/companies';

const ManageprofilePage = async () => {
  const company = await getLoggedInClientCompany();
  console.log(company);
  return (
    <div>
      <ManageLegalProfilePage company={company} />
    </div>
  )
}

export default ManageprofilePage;