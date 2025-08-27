import React from "react";
import {
  ListingsResultsCount,
  ListingsGrid,
  ListingsLoadingState,
  ListingsEmptyState,
} from "@/components/listings/index";
import { Listing } from "@/types";

interface ListingsContentProps {
  loading: boolean;
  filteredListings: Listing[];
  allListings: Listing[];
}

export default function ListingsContent({
  loading,
  filteredListings,
  allListings,
}: ListingsContentProps) {
  return (
    <div className="lg:col-span-3">
      {/* Results Count */}
      <ListingsResultsCount
        filteredCount={filteredListings.length}
        totalCount={allListings.length}
      />

      {/* Listings Content */}
      {loading ? (
        <ListingsLoadingState />
      ) : filteredListings.length > 0 ? (
        <ListingsGrid listings={filteredListings} />
      ) : (
        <ListingsEmptyState />
      )}
    </div>
  );
}
