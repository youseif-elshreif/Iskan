import React from "react";

// Skeleton Card Component with variations
const SkeletonCard = ({ index }: { index: number }) => {
  // Add slight variations to make it look more realistic
  const titleWidth = ["w-full", "w-5/6", "w-4/5"][index % 3];
  const descriptionLines = [2, 3, 2][index % 3];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-gradient-to-r from-gray-300 to-gray-200"></div>

      {/* Content Skeleton */}
      <div className="p-4">
        {/* Title Skeleton */}
        <div
          className={`h-6 bg-gradient-to-r from-gray-300 to-gray-200 rounded mb-2 ${titleWidth}`}
        ></div>

        {/* Address Skeleton */}
        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded mb-3 w-3/4"></div>

        {/* Description Skeleton */}
        <div className="space-y-2 mb-4">
          {Array.from({ length: descriptionLines }).map((_, lineIndex) => (
            <div
              key={lineIndex}
              className={`h-3 bg-gradient-to-r from-gray-200 to-gray-100 rounded ${
                lineIndex === descriptionLines - 1 ? "w-2/3" : "w-full"
              }`}
            ></div>
          ))}
        </div>

        {/* Price Skeleton */}
        <div className="h-6 bg-gradient-to-r from-gray-300 to-gray-200 rounded mb-4 w-1/3"></div>

        {/* Buttons Skeleton */}
        <div className="flex gap-3">
          <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-100 rounded flex-1"></div>
          <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-100 rounded flex-1"></div>
        </div>
      </div>
    </div>
  );
};

export default function ListingsLoadingState() {
  return (
    <div className="space-y-6">
      {/* Loading Message */}
      <div className="text-center py-4">
        <div className="inline-flex items-center space-x-2">
          <div
            className="w-4 h-4 border-2 border-t-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"
            style={{ borderTopColor: "var(--color-primary)" }}
          ></div>
          <span style={{ color: "var(--color-text)" }}>
            جاري تحميل الوحدات السكنية...
          </span>
        </div>
      </div>

      {/* Skeleton Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Render 6 skeleton cards with variations */}
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} index={index} />
        ))}
      </div>

      {/* Additional Loading Indicators */}
      <div className="flex justify-center space-x-1 py-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="w-2 h-2 rounded-full animate-bounce"
            style={{
              backgroundColor: "var(--color-primary)",
              animationDelay: `${index * 150}ms`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
