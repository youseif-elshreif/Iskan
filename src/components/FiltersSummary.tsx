import React from "react";
import {Button} from "@/components/ui/index";

interface FiltersData {
  area: string[];
  university: string[];
  size: string[];
  rooms: string[];
}

interface FiltersSummaryProps {
  filters: FiltersData;
  onClearFilters: () => void;
  totalResults: number;
  filteredResults: number;
}

const FiltersSummary: React.FC<FiltersSummaryProps> = ({
  filters,
  onClearFilters,
  totalResults,
  filteredResults,
}) => {
  const hasActiveFilters = Object.values(filters).some((arr) => arr.length > 0);

  if (!hasActiveFilters) return null;

  return (
    <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-blue-800 mb-2">
            الفلاتر النشطة:
          </h3>
          <div className="flex flex-wrap gap-2">
            {filters.area.map((item) => (
              <span
                key={item}
                className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
              >
                المنطقة: {item}
              </span>
            ))}
            {filters.university.map((item) => (
              <span
                key={item}
                className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
              >
                الجامعة: {item}
              </span>
            ))}
            {filters.rooms.map((item) => (
              <span
                key={item}
                className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
              >
                الغرف: {item}
              </span>
            ))}
            {filters.size.map((item) => (
              <span
                key={item}
                className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full"
              >
                المساحة: {item}
              </span>
            ))}
          </div>
          <div className="mt-2 text-sm text-blue-700">
            عرض {filteredResults} من أصل {totalResults} شقة
          </div>
        </div>
        <Button
          onClick={onClearFilters}
          variant="outlined"
          size="sm"
          className="text-red-600 border-red-300 hover:bg-red-50"
        >
          مسح الكل
        </Button>
      </div>
    </div>
  );
};

export default FiltersSummary;
