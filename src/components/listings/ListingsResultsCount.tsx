import React from "react";

interface ListingsResultsCountProps {
  filteredCount: number;
  totalCount: number;
}

export default function ListingsResultsCount({
  filteredCount,
  totalCount,
}: ListingsResultsCountProps) {
  return (
    <div className="mb-6">
      <p style={{ color: "var(--color-text)" }}>
        عرض {filteredCount} من أصل {totalCount} سكن
      </p>
    </div>
  );
}
