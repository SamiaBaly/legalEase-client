import LawyerDetailsClient from '@/componants/shared/LawyerDetailsClient';
import { getHiresByClient } from '@/lib/api/hire';
import { getJobById } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';

export default async function LawyerDetailsPage({ params }) {
  const { id } = await params;
  const lawyer = await getJobById(id);
  const user = await getUserSession();
  
  // ইউজারের করা সব হায়ার ডাটা
  const allHires = await getHiresByClient(user?.id) || [];
  
  // এই নির্দিষ্ট ল'ইয়ারের সাথে বর্তমান ইউজারের স্ট্যাটাস
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