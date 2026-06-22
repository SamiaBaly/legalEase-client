"use client";

import React from "react";
import { Skeleton, Card } from "@heroui/react";
import LawyerCard from "./LawyerCard";

export default function LawyerGrid({ lawyers = [], isLoading = false, error = null }) {
  
  // 1. Loading State (Skeleton Grid)
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 w-full">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="w-full h-[200px] p-4 space-y-3 radius-lg">
            <div className="flex items-center gap-3">
              <Skeleton className="flex rounded-full w-12 h-12 shrink-0" />
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
              </div>
            </div>
            <div className="space-y-2 pt-2">
              <Skeleton className="h-3 w-full rounded-lg" />
              <Skeleton className="h-3 w-5/6 rounded-lg" />
            </div>
            <div className="pt-2">
              <Skeleton className="h-8 w-full rounded-full" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <p className="text-danger font-medium">Failed to load legal professionals.</p>
        <p className="text-small text-default-400 mt-1">Please try refreshing the page later.</p>
      </div>
    );
  }

  // 3. Empty State (Friendly No Matches Message)
  if (!lawyers || lawyers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center border-2 border-dashed border-default-200 rounded-xl m-4">
        <h3 className="text-medium font-semibold text-default-700">No Lawyers Found</h3>
        <p className="text-small text-default-400 max-w-sm mt-1">
          We couldn't find any legal advisors matching your current filter criteria. Try adjusting your search settings.
        </p>
      </div>
    );
  }

  // 4. Data State
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 w-full">
      {lawyers.map((lawyer) => (
        <LawyerCard key={lawyer._id?.$oid || lawyer._id} lawyer={lawyer} />
      ))}
    </div>
  );
}