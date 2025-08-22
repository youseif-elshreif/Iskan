import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./ui/Button";
import Card from "./ui/Card";
import { ListingCardProps } from "@/types";

const ListingCard: React.FC<ListingCardProps> = ({
  id,
  image,
  nearestUniversity,
  address,
  description,
}) => {
  return (
    <Card className="overflow-hidden" padding="sm" rounded="lg">
      {/* Image */}
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={`سكن بالقرب من ${nearestUniversity}`}
          fill
          className="object-cover rounded-t-md"
          priority
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* University */}
        <h3
          className="text-lg font-bold mb-2"
          style={{ color: "var(--color-primary)" }}
        >
          {nearestUniversity}
        </h3>

        {/* Address */}
        <p className="text-sm mb-3" style={{ color: "var(--color-secondary)" }}>
          {address}
        </p>

        {/* Description */}
        <p
          className="text-sm mb-4 overflow-hidden"
          style={{
            color: "var(--color-text)",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <Link href={`/listings/listing/${id}`} className="flex-1">
            <Button variant="outlined" size="sm">
              عرض التفاصيل
            </Button>
          </Link>
          <Button variant="secondary" size="sm">
            احجز ميعاد
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ListingCard;
