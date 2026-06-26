

import { getPaymentByClientEmail } from "@/lib/api/payment";
import { getUserSession } from "@/lib/core/session";

const ClientTransactions = async () => {
  const user = await getUserSession();
  console.log(user,"user");

  if (!user?.id) {
    return <div>User not logged in</div>;
  }

  const result = await getPaymentByClientEmail(user?.email);
  const payments = Array.isArray(result) ? result : [];
  const totalAmount = payments.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  console.log(result, "result");

  return (
    <div>
     
      {!Array.isArray(result) && (
        <div className="text-red-500 p-4">Error: Could not load transactions.</div>
      )}

      <h1>ClientTransactions</h1>
      <p>Total Amount: ${totalAmount.toLocaleString()}</p>
      {/* Header Section */}
      <div className="max-w-5xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Transactions</h1>
        <p className="text-gray-600">Your transactions is here</p>
      </div>

      {/* Summary Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 uppercase">Total Spent</p>
          <h2 className="text-3xl font-bold text-indigo-600">${totalAmount?.toLocaleString()}</h2>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 uppercase">Total Transactions</p>
          <h2 className="text-3xl font-bold text-gray-800">{payments?.length || 0}</h2>
        </div>
      </div>

      {/* Table Section */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-700">Date</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Payment ID</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
              <th className="px-6 py-4 font-semibold text-gray-700 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {payments?.map((pay) => (
              <tr key={pay._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-gray-600">
                  {new Date(pay.createAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 font-mono text-xs text-gray-500">
                  {(pay.sessionId ?? "").slice(0, 15)}...
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 uppercase">
                    {pay.paymentStatus}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-bold text-gray-800">${pay.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {(!payments || payments.length === 0) && (
          <div className="p-10 text-center text-gray-500">No Transactons</div>
        )}
      </div>
    </div>
  );
};

export default ClientTransactions;