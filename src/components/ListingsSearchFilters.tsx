import React from "react";
import { SearchBar, Filters } from "@/components/common/index";
import { FilterData } from "@/types";

interface ListingsSearchFiltersProps {
  onSearch: (query: string) => void;
  onFiltersChange: (filters: FilterData) => void;
}

export default function ListingsSearchFilters({
  onSearch,
  onFiltersChange,
}: ListingsSearchFiltersProps) {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-20">
        <SearchBar
          onSearch={onSearch}
          placeholder="ابحث بالجامعة أو المنطقة..."
          className="max-w-md"
        />
        <Filters onFiltersChange={onFiltersChange} />
      </div>
    </div>
  );
}
