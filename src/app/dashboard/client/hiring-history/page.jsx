
import HiringHistoryClient from "@/componants/shared/HiringHistoryClient";
import { getLoggedInHire } from "@/lib/api/hire";


export default async function Page() {
  const initialHires = await getLoggedInHire();

  return <HiringHistoryClient initialHires={initialHires || []} />;
}