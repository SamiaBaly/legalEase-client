import HireDetailsClient from "@/componants/shared/HireDetailsClient";
import { getHiresbById } from "@/lib/api/hire";

export default async function HireDetailsPage({ params }) {
  const { id } =await params;

  const hire = await getHiresbById(id);

  console.log("HIRE:", id);

  if (!hire || !hire._id) {
    return <div>Hire not found</div>;
  }

  return <HireDetailsClient hire={hire} />;
}