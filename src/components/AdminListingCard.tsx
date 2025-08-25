import React from "react";
import Image from "next/image";
import Button from "./ui/Button";
import Card from "./ui/Card";
import {
  FaEdit,
  FaTrash,
  FaMapMarkerAlt,
  FaCity,
  FaGraduationCap,
  FaRulerCombined,
} from "react-icons/fa";

interface AdminListingCardProps {
  id: string;
  title: string;
  description: string;
  price: string;
  location: string;
  area?: string;
  nearestUniversity?: string;
  rooms?: string;
  size?: string;
  imageUrl: string;
  onEdit: () => void;
  onDelete: () => void;
  isLoading?: boolean;
}

const AdminListingCard: React.FC<AdminListingCardProps> = ({
  title,
  description,
  price,
  location,
  area,
  nearestUniversity,
  rooms,
  size,
  imageUrl,
  onEdit,
  onDelete,
  isLoading = false,
}) => {
  return (
    <Card
      className="overflow-hidden hover:shadow-xl transition-shadow"
      padding="sm"
      rounded="lg"
    >
      {/* Image */}
      <div className="relative h-48 w-full flex flex-col">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover rounded-t-md"
          priority
        />
        {rooms && (
          <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded-lg text-xs font-medium">
            {rooms} غرف
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1">
        {/* Title */}
        <h3
          className="text-lg font-bold mb-2 line-clamp-1"
          style={{ color: "var(--color-primary)" }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="text-sm mb-3 line-clamp-2 overflow-hidden"
          style={{
            color: "var(--color-text)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </p>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <p
            className="font-bold text-xl"
            style={{ color: "var(--color-primary)" }}
          >
            {price}
          </p>
          <p
            className="text-sm flex items-center"
            style={{ color: "var(--color-text-muted)" }}
          >
            <FaMapMarkerAlt className="ml-1" /> {location}
          </p>
          {area && (
            <p
              className="text-sm flex items-center"
              style={{ color: "var(--color-text-muted)" }}
            >
              <FaCity className="ml-1" /> {area}
            </p>
          )}
          {nearestUniversity && (
            <p
              className="text-sm flex items-center"
              style={{ color: "var(--color-text-muted)" }}
            >
              <FaGraduationCap className="ml-1" /> {nearestUniversity}
            </p>
          )}
          {size && (
            <p
              className="text-sm flex items-center"
              style={{ color: "var(--color-text-muted)" }}
            >
              <FaRulerCombined className="ml-1" /> {size}
            </p>
          )}
        </div>

        {/* Admin Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outlined"
            size="sm"
            className="flex-1"
            onClick={onEdit}
          >
            <FaEdit className="ml-1" />
            تعديل
          </Button>
          <Button
            variant="outlined"
            size="sm"
            className="flex-1 text-red-600 border-red-600 hover:bg-red-50"
            onClick={onDelete}
            disabled={isLoading}
          >
            <FaTrash className="ml-1" />
            حذف
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AdminListingCard;
