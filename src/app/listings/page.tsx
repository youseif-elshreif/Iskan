"use client";

import React, { useState } from "react";
import Filters from "@/components/Filters";
import ListingCard from "@/components/ListingCard";
import SearchBar from "@/components/SearchBar";
import Breadcrumb from "@/components/Breadcrumb";
import { mockListings } from "@/data/mockListings";
import { FilterData, Listing } from "@/types";

export default function ListingsPage() {
  const [filteredListings, setFilteredListings] =
    useState<Listing[]>(mockListings);
  const [searchQuery, setSearchQuery] = useState("");
  const [filtered, setFiltered] = useState<FilterData>({
    area: [],
    university: [],
    size: [],
    rooms: [],
  });

  const applyFiltersAndSearch = (
    filters: FilterData,
    query: string = searchQuery
  ) => {
    let filtered = mockListings;

    // Apply search query
    if (query.trim()) {
      filtered = filtered.filter(
        (listing) =>
          listing.nearestUniversity.includes(query) ||
          listing.address.includes(query) ||
          listing.description.includes(query)
      );
    }

    // Apply filters
    if (filters.area.length > 0) {
      filtered = filtered.filter((listing) =>
        filters.area.includes(listing.area)
      );
    }
    if (filters.university.length > 0) {
      filtered = filtered.filter((listing) =>
        filters.university.includes(listing.university)
      );
    }
    if (filters.size.length > 0) {
      filtered = filtered.filter((listing) =>
        filters.size.includes(listing.size)
      );
    }
    if (filters.rooms.length > 0) {
      filtered = filtered.filter((listing) =>
        filters.rooms.includes(listing.rooms)
      );
    }

    setFilteredListings(filtered);
  };

  const handleFiltersChange = (filters: FilterData) => {
    setFiltered(filters);
    applyFiltersAndSearch(filters, searchQuery);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFiltersAndSearch(filtered, query);
  };

  return (
    <div
      className="min-h-screen pt-16"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { href: "/", label: "الرئيسية" },
            { label: "الوحدات", isActive: true },
          ]}
        />

        {/* Page Header */}
        <div className="mb-8">
          <h1
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "var(--color-primary)" }}
          >
            الوحدات المتاحة
          </h1>
          <p
            className="text-lg mb-6 opacity-90"
            style={{ color: "var(--color-text)" }}
          >
            اكتشف أفضل الخيارات السكنية بالقرب من جامعتك
          </p>

          {/* Search Bar */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <SearchBar
                onSearch={handleSearch}
                placeholder="ابحث بالجامعة أو المنطقة..."
                className="max-w-md"
              />
              <Filters onFiltersChange={handleFiltersChange} />
            </div>
          </div>

          {/* Listings Grid */}
          <div className="lg:col-span-3">
            {/* Results Count */}
            <div className="mb-6">
              <p style={{ color: "var(--color-text)" }}>
                عرض {filteredListings.length} من أصل {mockListings.length} سكن
              </p>
            </div>

            {/* Listings Grid */}
            {filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredListings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    id={listing.id}
                    image={listing.image}
                    nearestUniversity={listing.nearestUniversity}
                    address={listing.address}
                    description={listing.description}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "var(--color-border-light)" }}
                >
                  <svg
                    className="w-12 h-12"
                    style={{ color: "var(--color-secondary)" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: "var(--color-primary)" }}
                >
                  لا توجد نتائج
                </h3>
                <p style={{ color: "var(--color-text)" }}>
                  لم نجد أي سكنات تطابق معايير البحث الخاصة بك. جرب تعديل
                  الفلاتر.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
