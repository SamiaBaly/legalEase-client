import React from "react";
import { getJobs } from "@/lib/api/jobs";
import LawyerFilterComponent from "@/componants/shared/LawyerFilterComponent";



export default async function LawyerPage() {
  let lawyers = [];
  let error = null;

  try {
  
    const data = await getJobs();
    if (Array.isArray(data)) {
      lawyers = data;
    }
  } catch (err) {
    error = err.message || "Failed to load data from server.";
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
    
      <LawyerFilterComponent initialLawyers={lawyers} error={error} />
    </div>
  );
}