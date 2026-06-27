import React from "react";
import LawyerHiringHistory from "./LawyerHiringHistory";
import {getHiresbById} from "@/lib/api/hire";
import { getUserSession } from "@/lib/core/session";

export default async function LawyerHiringHistoryPage() {
  const user = await getUserSession();
  console.log(user);
  const initialHires = await getHiresbById(user?.id);
  console.log(initialHires);

  return <LawyerHiringHistory initialHires={initialHires} />;
}