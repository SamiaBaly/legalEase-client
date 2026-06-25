import { requireRole } from '@/lib/core/session';
import React from 'react'

const ManageProfileLayout =async ({ children }) => {
  await requireRole('lawyer');
  return children;
}

export default ManageProfileLayout