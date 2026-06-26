import React from 'react'

import { getUsersList } from '@/lib/api/users';
import { getHires } from '@/lib/api/hire';
import AdminAnalytics from './AdminAnalytics';
import { getAllPayment } from '@/lib/api/payment';

const AnalyticsPage =async () => {
  const users = await getUsersList()
  const hires = await getHires()
  const payment = await getAllPayment()
  console.log(payment, "payment");
  console.log(hires, "hires");

  return (
    <div>
      <AdminAnalytics users={users} hires={hires} payment={payment} />
    </div>
  )
}

export default AnalyticsPage;