import React from "react";

export default function ListingsFiltersSkeleton() {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-20 space-y-6">
        {/* Search Bar Skeleton */}
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded-lg"></div>
        </div>

        {/* Filters Section Skeleton */}
        <div className="bg-white rounded-lg p-6 shadow-sm animate-pulse">
          {/* Filter Title */}
          <div className="h-6 bg-gray-300 rounded mb-4 w-1/2"></div>

          {/* Filter Groups */}
          {Array.from({ length: 4 }).map((_, groupIndex) => (
            <div key={groupIndex} className="mb-6">
              {/* Group Title */}
              <div className="h-5 bg-gray-200 rounded mb-3 w-1/3"></div>

              {/* Filter Options */}
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, optionIndex) => (
                  <div
                    key={optionIndex}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded flex-1"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Apply Button Skeleton */}
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}
