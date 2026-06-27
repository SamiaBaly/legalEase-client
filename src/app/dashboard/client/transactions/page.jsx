import { getPaymentByClientEmail } from "@/lib/api/payment";
import { getUserSession } from "@/lib/core/session";
import { FaCreditCard, FaHistory, FaCheckCircle, FaClock } from "react-icons/fa";

const ClientTransactions = async () => {
  const user = await getUserSession();

  if (!user?.id) return <div className="text-zinc-500 p-10 text-center">Please log in.</div>;

  const result = await getPaymentByClientEmail(user?.email);
  const payments = Array.isArray(result) ? result : [];
  const totalAmount = payments.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6 md:p-12 text-zinc-100">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Transaction History</h1>
          <p className="text-zinc-500 mt-2">View your payment logs and financial activity.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#111111] border border-zinc-800 p-8 rounded-3xl shadow-2xl">
            <p className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">Total Spent</p>
            <h2 className="text-4xl font-black mt-2 text-cyan-400">${totalAmount.toLocaleString()}</h2>
          </div>
          <div className="bg-[#111111] border border-zinc-800 p-8 rounded-3xl shadow-2xl">
            <p className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">Total Transactions</p>
            <h2 className="text-4xl font-black mt-2 text-white">{payments.length}</h2>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#111111] border border-zinc-800 rounded-3xl overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#18181b] border-b border-zinc-800 text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5">Reference</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {payments.map((pay) => (
                <tr key={pay._id} className="hover:bg-white/5 transition-colors">
                  <td className="px-8 py-6 text-sm text-zinc-400">
                    {new Date(pay.createAt).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-6 font-mono text-xs text-zinc-600">
                    {pay.sessionId?.slice(0, 15)}...
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${pay.paymentStatus === 'paid'
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-amber-500/10 text-amber-400"
                      }`}>
                      {pay.paymentStatus === 'paid' ? <FaCheckCircle size={10} /> : <FaClock size={10} />}
                      {pay.paymentStatus}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right font-black text-white">
                    ${pay.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientTransactions;