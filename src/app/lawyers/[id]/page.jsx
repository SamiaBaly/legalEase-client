import LawyerDetailsClient from '@/componants/shared/LawyerDetailsClient';
import { getHiresByClient } from '@/lib/api/hire';
import { getJobById } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';

export default async function LawyerDetailsPage({ params }) {
  const { id } = await params;
  const lawyer = await getJobById(id);
  const user = await getUserSession();
  
  
  const allHires = await getHiresByClient(user?.id) || [];
  
  
  const lawyerSpecificHire = allHires.find(h => h.lawyerId === id); 
  
  return (
    <LawyerDetailsClient 
      lawyer={lawyer} 
      user={user} 
      hires={allHires} 
      existingHire={lawyerSpecificHire} 
    />
  );
}