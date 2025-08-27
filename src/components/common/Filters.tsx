"use client";

import React, { useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { FilterGroupProps, FiltersProps } from "@/types";

const FilterGroup: React.FC<FilterGroupProps> = ({
  title,
  options,
  selectedValues,
  onChange,
  isOpen: initialIsOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  const handleOptionChange = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onChange(newValues);
  };

  return (
    <div
      className="border-b transition-colors duration-200"
      style={{ borderColor: "var(--color-border-light)" }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer w-full px-4 py-3 text-right flex justify-between items-center hover:transition-colors duration-200"
        style={{
          backgroundColor: isOpen
            ? "var(--color-border-hover)"
            : "var(--color-transparent)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--color-border-hover)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = isOpen
            ? "var(--color-border-hover)"
            : "var(--color-transparent)";
        }}
      >
        <span className="font-medium" style={{ color: "var(--color-primary)" }}>
          {title}
        </span>
        {isOpen ? (
          <IoChevronUp style={{ color: "var(--color-secondary)" }} />
        ) : (
          <IoChevronDown style={{ color: "var(--color-secondary)" }} />
        )}
      </button>

      {/* Animated accordion content */}
      <div
        className={`overflow-auto transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div>
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-3 space-x py-2 cursor-pointer rounded transition-colors duration-200"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--color-border-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--color-transparent)";
              }}
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(option.value)}
                onChange={() => handleOptionChange(option.value)}
                className="w-4 h-4 rounded border-2 ml-2 cursor-pointer"
                style={{
                  accentColor: "var(--color-secondary)",
                  borderColor: "var(--color-accent)",
                }}
              />
              <span className="text-sm" style={{ color: "var(--color-text)" }}>
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

const Filters: React.FC<FiltersProps> = ({
  onFiltersChange,
  className = "",
}) => {
  const [filters, setFilters] = useState({
    area: [] as string[],
    university: [] as string[],
    size: [] as string[],
    rooms: [] as string[],
  });

  const filterGroups = [
    {
      title: "المنطقة",
      key: "area" as const,
      options: [
        { value: "المعادي", label: "المعادي" },
        { value: "مدينة نصر", label: "مدينة نصر" },
        { value: "الزمالك", label: "الزمالك" },
        { value: "الهرم", label: "الهرم" },
        { value: "مصر الجديدة", label: "مصر الجديدة" },
        { value: "وسط البلد", label: "وسط البلد" },
        { value: "الشيخ زايد", label: "الشيخ زايد" },
        { value: "فيصل", label: "فيصل" },
        { value: "التجمع الخامس", label: "التجمع الخامس" },
        { value: "شبرا", label: "شبرا" },
        { value: "6 أكتوبر", label: "6 أكتوبر" },
        { value: "المرج", label: "المرج" },
      ],
    },
    {
      title: "الجامعة القريبة",
      key: "university" as const,
      options: [
        { value: "الجامعة الأمريكية", label: "الجامعة الأمريكية" },
        { value: "جامعة عين شمس", label: "جامعة عين شمس" },
        { value: "جامعة القاهرة", label: "جامعة القاهرة" },
        { value: "جامعة النيل", label: "جامعة النيل" },
        { value: "جامعة 6 أكتوبر", label: "جامعة 6 أكتوبر" },
      ],
    },
    {
      title: "المساحة",
      key: "size" as const,
      options: [
        { value: "25 متر مربع", label: "25 متر مربع" },
        { value: "30 متر مربع", label: "30 متر مربع" },
        { value: "35 متر مربع", label: "35 متر مربع" },
        { value: "45 متر مربع", label: "45 متر مربع" },
        { value: "65 متر مربع", label: "65 متر مربع" },
        { value: "80 متر مربع", label: "80 متر مربع" },
        { value: "85 متر مربع", label: "85 متر مربع" },
        { value: "120 متر مربع", label: "120 متر مربع" },
        { value: "170 متر مربع", label: "170 متر مربع" },
      ],
    },
    {
      title: "عدد الغرف",
      key: "rooms" as const,
      options: [
        { value: "1", label: "غرفة واحدة" },
        { value: "2", label: "غرفتان" },
        { value: "3", label: "ثلاث غرف" },
        { value: "4", label: "أربع غرف" },
        { value: "5", label: "خمس غرف" },
      ],
    },
  ];

  const handleFilterChange = (key: keyof typeof filters, values: string[]) => {
    const newFilters = { ...filters, [key]: values };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      area: [],
      university: [],
      size: [],
      rooms: [],
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some((arr) => arr.length > 0);

  return (
    <div
      className={`rounded-lg shadow-md ${className}`}
      style={{ backgroundColor: "var(--color-white)" }}
    >
      <div
        className="px-4 py-3 flex justify-between items-center"
        style={{
          borderBottomColor: "var(--color-border-light)",
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
        }}
      >
        <h3
          className="text-lg font-semibold"
          style={{ color: "var(--color-primary)" }}
        >
          تصفية النتائج
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm transition-colors duration-200 hover:text-[var(--color-primary)] cursor-pointer   "
            style={{ color: "var(--color-secondary)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--color-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--color-secondary)";
            }}
          >
            مسح الكل
          </button>
        )}
      </div>

      {filterGroups.map((group) => (
        <FilterGroup
          key={group.key}
          title={group.title}
          options={group.options}
          selectedValues={filters[group.key]}
          onChange={(values) => handleFilterChange(group.key, values)}
          isOpen={false}
        />
      ))}
    </div>
  );
};

export default Filters;
