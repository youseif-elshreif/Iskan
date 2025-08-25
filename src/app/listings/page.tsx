"use client";

import React, { useState, useEffect } from "react";
import Filters from "@/components/Filters";
import ListingCard from "@/components/ListingCard";
import SearchBar from "@/components/SearchBar";
import Breadcrumb from "@/components/Breadcrumb";
import { FilterData, Listing } from "@/types";

export default function ListingsPage() {
  const [allListings, setAllListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [filtered, setFiltered] = useState<FilterData>({
    area: [],
    university: [],
    size: [],
    rooms: [],
  });

  // Fetch apartments from JSON Server
  const fetchApartments = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3002/apartments");
      const apartments = await response.json();

      // Convert apartments to listings format
      const listings: Listing[] = apartments.map(
        (apt: {
          id: string;
          title: string;
          location: string;
          area?: string;
          university?: string;
          nearestUniversity?: string;
          rooms?: string;
          price: string;
          description: string;
          imageUrl: string;
          size?: string;
          images?: string[];
          amenities?: string[];
        }) => ({
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
        })
      );

      setAllListings(listings);
      setFilteredListings(listings);
    } catch (error) {
      console.error("Error fetching apartments:", error);
      // Fallback to empty array if API fails
      setAllListings([]);
      setFilteredListings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, []);

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
                عرض {filteredListings.length} من أصل {allListings.length} سكن
              </p>
            </div>

            {/* Listings Grid */}
            {loading ? (
              <div className="text-center py-12">
                <div
                  className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"
                  style={{ borderTopColor: "var(--color-primary)" }}
                ></div>
                <p style={{ color: "var(--color-text)" }}>
                  جاري تحميل الوحدات...
                </p>
              </div>
            ) : filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredListings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    id={listing.id}
                    image={listing.image}
                    nearestUniversity={listing.nearestUniversity}
                    address={listing.address}
                    description={listing.description}
                    price={listing.price}
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
