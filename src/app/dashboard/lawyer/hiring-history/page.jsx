import React from "react";
import LawyerHiringHistory from "./LawyerHiringHistory";
import { getLoggedInHire} from "@/lib/api/hire";

export default async function LawyerHiringHistoryPage() {
  const initialHires = await getLoggedInHire();

  return <LawyerHiringHistory initialHires={initialHires} />;
}