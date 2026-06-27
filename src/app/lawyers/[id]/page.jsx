import LawyerDetailsClient from "@/componants/shared/LawyerDetailsClient";
import { getHiresByClient } from "@/lib/api/hire";
import { getJobById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";

// LawyerDetailsPage.jsx - আইডি ম্যাচিং লজিক আপডেট করুন
export default async function LawyerDetailsPage({ params }) {
  const { id } = await params;
  const lawyer = await getJobById(id);
  console.log(lawyer, "lawyer");
  const user = await getUserSession();
  const allHires = await getHiresByClient(user?.id) || [];
  console.log(allHires);

 
  const currentUserId = user?._id || user?.id;

  const lawyerSpecificHire = allHires.find(
    h => h.lawyerId?.toString() === id.toString() &&
      h.clientId?.toString() === currentUserId?.toString()
  );

  return (
    <LawyerDetailsClient
      lawyer={lawyer}
      user={user}
      hires={allHires}
      existingHire={lawyerSpecificHire}
    />
  );
}