import React from "react";
import {AdminListingCard} from "@/components/admin/index";
import {Button} from "@/components/ui/index";

interface Apartment {
  id: string;
  title: string;
  description: string;
  price: string;
  location: string;
  area?: string;
  university?: string;
  nearestUniversity?: string;
  rooms?: string;
  size?: string;
  imageUrl: string;
  images?: string[];
  amenities?: string[];
}

interface ApartmentsListProps {
  apartments: Apartment[];
  totalApartments: number;
  onEdit: (apartment: Apartment) => void;
  onDelete: (apartment: Apartment) => void;
  loading: boolean;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  onAddFirst?: () => void;
}

const ApartmentsList: React.FC<ApartmentsListProps> = ({
  apartments,
  totalApartments,
  onEdit,
  onDelete,
  loading,
  hasActiveFilters,
  onClearFilters,
  onAddFirst,
}) => {
  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2
            className="text-xl font-semibold"
            style={{ color: "var(--color-text)" }}
          >
            الشقق المتاحة ({apartments.length})
          </h2>
          {hasActiveFilters && (
            <div
              className="text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              عرض {apartments.length} من أصل {totalApartments} شقة
            </div>
          )}
        </div>
      </div>

      {/* Apartments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apartments.map((apartment) => (
          <AdminListingCard
            key={apartment.id}
            id={apartment.id}
            title={apartment.title}
            description={apartment.description}
            price={apartment.price}
            location={apartment.location}
            area={apartment.area}
            nearestUniversity={apartment.nearestUniversity}
            rooms={apartment.rooms}
            size={apartment.size}
            imageUrl={apartment.imageUrl}
            onEdit={() => onEdit(apartment)}
            onDelete={() => onDelete(apartment)}
            isLoading={loading}
          />
        ))}
      </div>

      {/* Empty States */}
      {apartments.length === 0 && totalApartments > 0 && (
        <div
          className="text-center py-12"
          style={{ color: "var(--color-text-muted)" }}
        >
          <p className="text-lg mb-4">لا توجد شقق تطابق الفلاتر المحددة</p>
          <Button
            onClick={onClearFilters}
            variant="outlined"
            size="lg"
          >
            مسح الفلاتر
          </Button>
        </div>
      )}

      {totalApartments === 0 && (
        <div
          className="text-center py-12"
          style={{ color: "var(--color-text-muted)" }}
        >
          <p className="text-lg mb-4">لا توجد شقق مضافة بعد</p>
          {onAddFirst && (
            <Button
              onClick={onAddFirst}
              variant="filled"
              size="lg"
              className="mt-2"
            >
              إضافة أول شقة
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default ApartmentsList;
