import HiringHistoryClient from "@/componants/shared/HiringHistoryClient";
import { getHiresByClient } from "@/lib/api/hire";
import { getUserSession } from "@/lib/core/session";

export default async function Page() {
  const user = await getUserSession();


  const clientId = user?._id || user?.id;

 
  if (!clientId) {
    return <HiringHistoryClient initialHires={[]} />;
  }

  const initialHires = await getHiresByClient(clientId);

  return <HiringHistoryClient initialHires={initialHires || []} />;
}