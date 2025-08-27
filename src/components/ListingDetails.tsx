import React from "react";
import { Card } from "@/components/ui/index";

interface Listing {
  title: string;
  nearestUniversity: string;
  address: string;
  rooms: string;
  size: string;
  price: string | number;
  description: string;
  amenities?: string[];
}

interface ListingDetailsProps {
  listing: Listing;
}

const ListingDetails: React.FC<ListingDetailsProps> = ({ listing }) => {
  const fullAddress = `${listing.address}, مصر`;

  return (
    <Card className="mb-8">
      <div className="mb-6">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: "var(--color-primary)" }}
        >
          {listing.title}
        </h1>
        <p
          className="text-lg font-semibold mb-2"
          style={{ color: "var(--color-secondary)" }}
        >
          قريب من {listing.nearestUniversity}
        </p>
        <p style={{ color: "var(--color-text)" }}>{fullAddress}</p>
      </div>

      {/* Property Info */}
      <div
        className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-lg"
        style={{ backgroundColor: "var(--color-border-light)" }}
      >
        <div className="text-center">
          <p
            className="text-2xl font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            {listing.rooms}
          </p>
          <p className="text-sm" style={{ color: "var(--color-text)" }}>
            غرف
          </p>
        </div>
        <div className="text-center">
          <p
            className="text-2xl font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            {listing.size}
          </p>
          <p className="text-sm" style={{ color: "var(--color-text)" }}>
            المساحة
          </p>
        </div>
        <div className="text-center">
          <p
            className="text-xl font-bold"
            style={{ color: "var(--color-secondary)" }}
          >
            {listing.price} ج.م
          </p>
          <p className="text-sm" style={{ color: "var(--color-text)" }}>
            السعر / شهر
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h2
          className="text-xl font-semibold mb-3"
          style={{ color: "var(--color-primary)" }}
        >
          الوصف
        </h2>
        <p className="leading-relaxed" style={{ color: "var(--color-text)" }}>
          {listing.description}
        </p>
      </div>

      {/* Amenities */}
      {listing.amenities && listing.amenities.length > 0 && (
        <div>
          <h2
            className="text-xl font-semibold mb-3"
            style={{ color: "var(--color-primary)" }}
          >
            المرافق والخدمات
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {listing.amenities.map((amenity: string, index: number) => (
              <div key={index} className="flex items-center space-x-2 space-x">
                <svg
                  className="w-5 h-5"
                  style={{ color: "var(--color-secondary)" }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span style={{ color: "var(--color-text)" }}>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default ListingDetails;
