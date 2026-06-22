// src/app/hiring-history/page.jsx
import HiringHistoryClient from '@/componants/shared/HiringHistoryClient';
import { getHiresByClient } from '@/lib/api/hire';
import { getUserSession } from '@/lib/core/session';

export default async function HiringHistoryPage() {
  const user = await getUserSession();
  console.log(user);
  
  if (!user) return <p className="text-white p-10">Please login to see history.</p>;

  
  const myHires = await getHiresByClient(user.id) || [];
  console.log(myHires);

  return <HiringHistoryClient initialHires={myHires} />;
}