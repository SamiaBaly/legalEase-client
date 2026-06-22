"use client";

import { useRouter } from "next/navigation"; 

export default function HiringHistoryClient({ initialHires }) {
  console.log('initialHires', initialHires);
  const router = useRouter(); 

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">My Hiring History</h1>
      
      <div className="grid gap-4">
       {initialHires.length > 0 ? (
  initialHires.map((hire) => {
     
    console.log('hire', hire);

    
    return (
      <div key={hire._id} className="p-6 border border-gray-700 bg-gray-900 rounded-2xl flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold">{hire.lawyerName}</h3>
          <p className="text-gray-400">Status: 
            <span className={`ml-2 px-2 py-0.5 rounded text-xs ${hire.status === 'accepted' ? 'bg-green-500/20 text-green-500' : 'bg-amber-500/20 text-amber-500'}`}>
              {hire.status.toUpperCase()}
            </span>
          </p>
        </div>
        {hire.status === 'accepted' && (
          <button 
           onClick={() => router.push(`/dashboard/client/hiring-history/${hire.lawyerId}`)}
            className="bg-emerald-600 hover:bg-emerald-500 px-6 py-2 rounded-lg transition-all"
          >
            Pay Now
          </button>
        )}
      </div>
    );
  })
) : (
  <p className="text-gray-500">No hiring history found.</p>
)}
      </div>
    </div>
  );
}