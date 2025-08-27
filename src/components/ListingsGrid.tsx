import React from "react";
import { ListingCard } from "@/components/listings/index";
import { ListingsGridProps } from "@/types";

export default function ListingsGrid({ listings }: ListingsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          id={listing.id}
          image={listing.image}
          nearestUniversity={listing.nearestUniversity}
          address={listing.address}
          description={listing.description}
          price={listing.price}
        />
      ))}
    </div>
  );
}
