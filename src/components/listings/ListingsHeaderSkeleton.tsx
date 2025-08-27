import React from "react";

export default function ListingsHeaderSkeleton() {
  return (
    <div className="mb-8 animate-pulse">
      {/* Title Skeleton */}
      <div className="h-10 bg-gray-300 rounded mb-4 w-1/2"></div>

      {/* Subtitle Skeleton */}
      <div className="space-y-2">
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        <div className="h-5 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
}
