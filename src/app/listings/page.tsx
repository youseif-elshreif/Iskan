"use client";

import React, { useState, useEffect } from "react";
import { Breadcrumb } from "@/components/common";
import { ContactUsButton } from "@/components/contact";
import {
  ListingsHeader,
  ListingsHeaderSkeleton,
  ListingsSearchFilters,
  ListingsContent,
  ListingsFiltersSkeleton,
} from "@/components/listings";
import { FilterData, Listing } from "@/types";
import { useApartments } from "@/services/hooks";

export default function ListingsPage() {
  // استخدام الـ custom hook
  const { apartments, loading: apartmentsLoading } = useApartments();

  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filtered, setFiltered] = useState<FilterData>({
    area: [],
    university: [],
    size: [],
    rooms: [],
  });

  // Convert apartments to listings format
  const allListings: Listing[] = apartments.map((apt) => ({
    id: apt.id,
    title: apt.title,
    address: apt.location,
    area: apt.area || apt.location,
    university: apt.university || apt.nearestUniversity || "",
    nearestUniversity: apt.nearestUniversity || apt.university || "",
    rooms: apt.rooms || "1",
    price: parseInt(apt.price.replace(/[^\d]/g, "")) || 0,
    description: apt.description,
    image: apt.imageUrl,
    size: apt.size || "غير محدد",
    images: apt.images || [apt.imageUrl],
    amenities: apt.amenities || [],
    mapEmbedUrl: "",
  }));

  // Initialize filtered listings when apartments change
  useEffect(() => {
    const listings = apartments.map((apt) => ({
      id: apt.id,
      title: apt.title,
      address: apt.location,
      area: apt.area || apt.location,
      university: apt.university || apt.nearestUniversity || "",
      nearestUniversity: apt.nearestUniversity || apt.university || "",
      rooms: apt.rooms || "1",
      price: parseInt(apt.price.replace(/[^\d]/g, "")) || 0,
      description: apt.description,
      image: apt.imageUrl,
      size: apt.size || "غير محدد",
      images: apt.images || [apt.imageUrl],
      amenities: apt.amenities || [],
      mapEmbedUrl: "",
    }));
    setFilteredListings(listings);
  }, [apartments]);

  const applyFiltersAndSearch = (
    filters: FilterData,
    query: string = searchQuery
  ) => {
    let filtered = allListings;

    // Apply search query
    if (query.trim()) {
      filtered = filtered.filter(
        (listing: Listing) =>
          listing.nearestUniversity.includes(query) ||
          listing.address.includes(query) ||
          listing.description.includes(query)
      );
    }

    // Apply filters
    if (filters.area.length > 0) {
      filtered = filtered.filter((listing: Listing) =>
        filters.area.includes(listing.area)
      );
    }
    if (filters.university.length > 0) {
      filtered = filtered.filter((listing: Listing) =>
        filters.university.includes(listing.university)
      );
    }
    if (filters.size.length > 0) {
      filtered = filtered.filter((listing: Listing) =>
        filters.size.includes(listing.size)
      );
    }
    if (filters.rooms.length > 0) {
      filtered = filtered.filter((listing: Listing) =>
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
        {apartmentsLoading ? (
          <ListingsHeaderSkeleton />
        ) : (
          <ListingsHeader
            title="الوحدات المتاحة"
            subtitle="اكتشف أفضل الخيارات السكنية بالقرب من جامعتك"
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          {apartmentsLoading ? (
            <ListingsFiltersSkeleton />
          ) : (
            <ListingsSearchFilters
              onSearch={handleSearch}
              onFiltersChange={handleFiltersChange}
            />
          )}

          {/* Listings Grid */}
          <ListingsContent
            loading={apartmentsLoading}
            filteredListings={filteredListings}
            allListings={allListings}
          />
        </div>
      </div>

      {/* Contact Us Button */}
      <ContactUsButton />
    </div>
  );
}
