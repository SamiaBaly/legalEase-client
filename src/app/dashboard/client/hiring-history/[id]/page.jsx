// app/dashboard/client/hiring-history/[id]/page.jsx
import { getHiresbById } from '@/lib/api/hire';
import HireDetailsClient from '@/componants/shared/HireDetailsClient';

export default async function HireDetailsPage({ params }) {
  const { id } = await params;
  console.log(id);
  const hire = await getHiresbById(id);

  console.log("Fetched Hire Data:", hire); 

  if (!hire) return <div>Data not found</div>;

  return <HireDetailsClient hire={hire} />;
}