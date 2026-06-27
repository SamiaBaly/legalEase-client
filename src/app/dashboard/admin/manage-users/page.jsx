import React from 'react'

import { getUsersList } from '@/lib/api/users';
import AdminUserManager from './AdminUserManager';

const userManagePage =async () => {
  const data= await getUsersList()
  const users =data?.users || []
  return (
    <div>
      <AdminUserManager users={users} />
    </div>
  )
}

export default userManagePage