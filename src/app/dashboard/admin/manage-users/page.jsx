import React from 'react'

import { getUsersList } from '@/lib/api/users';
import AdminUserManager from './AdminUserManager';

const userManagePage =async () => {
  const users=await getUsersList()
  return (
    <div>
      <AdminUserManager users={users} />
    </div>
  )
}

export default userManagePage