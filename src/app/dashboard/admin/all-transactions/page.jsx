import React from 'react'
import AdminAllTransactions from './AdminAllTransactions';
import { getAllPayment } from '@/lib/api/payment';

const TransactionsPage =async () => {
  const transactions = await getAllPayment()
  return (
    <div>
      <AdminAllTransactions transactions={transactions} />
    </div>
  )
}

export default TransactionsPage;