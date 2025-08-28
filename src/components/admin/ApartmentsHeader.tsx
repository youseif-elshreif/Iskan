import React from "react";
import { Button } from "@/components/ui/index";
import { FaPlus, FaFilter } from "react-icons/fa";

interface FiltersData {
  area: string[];
  university: string[];
  size: string[];
  rooms: string[];
}

interface ApartmentsHeaderProps {
  showFilters: boolean;
  onToggleFilters: () => void;
  onAddApartment: () => void;
  filters: FiltersData;
}

const ApartmentsHeader: React.FC<ApartmentsHeaderProps> = ({
  showFilters,
  onToggleFilters,
  onAddApartment,
  filters,
}) => {
  const activeFiltersCount = Object.values(filters).reduce(
    (total, arr) => total + arr.length,
    0
  );

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
      <div>
        <h1
          className="text-2xl lg:text-3xl font-bold"
          style={{
            color: "var(--color-text)",
            fontFamily: "Cairo, sans-serif",
          }}
        >
          إدارة الشقق
        </h1>
        <p
          className="text-base lg:text-lg mt-2"
          style={{ color: "var(--color-text-muted)" }}
        >
          إضافة وتعديل وحذف الشقق المتاحة
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
        <Button
          onClick={onToggleFilters}
          variant={showFilters ? "filled" : "outlined"}
          size="md"
          className={`shadow-lg relative ${
            activeFiltersCount > 0 ? "ring-2 ring-blue-200" : ""
          } w-full sm:w-auto`}
        >
          <FaFilter className="ml-2" />
          فلترة
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </Button>
        <Button
          onClick={onAddApartment}
          variant="filled"
          size="md"
          className="shadow-lg w-full sm:w-auto"
        >
          <FaPlus className="ml-2" />
          إضافة شقة جديدة
        </Button>
      </div>
    </div>
  );
};

export default ApartmentsHeader;
