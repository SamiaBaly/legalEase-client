import LawyerDetailsClient from "@/componants/shared/LawyerDetailsClient";
import { getHiresByClient } from "@/lib/api/hire";
import { getJobById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";

// LawyerDetailsPage.jsx
export default async function LawyerDetailsPage({ params }) {
  const { id } = await params;
  const lawyer = await getJobById(id);
  const user = await getUserSession();
  const allHires = await getHiresByClient(user?.email) || [];

  const lawyerSpecificHire = allHires.find(
    h => String(h.lawyerId) === String(id) && String(h.clientId) === String(user?._id || user?.id)
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