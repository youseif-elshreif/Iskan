"use client";

import React from "react";
import { useParams } from "next/navigation";
import { ContactUsButton } from "@/components/contact";
import {
  ListingHeader,
  ListingImageCarousel,
  ListingDetails,
  ListingMap,
  ListingSidebar,
  ListingNotFound,
} from "@/components/listings";
import { useApartments } from "@/services/hooks";

export default function ListingDetailPage() {
  const params = useParams();
  const listingId = params.id as string;

  // استخدام الـ custom hook للحصول على الشقق
  const { apartments, loading, error } = useApartments();

  // البحث عن الشقة بالـ ID
  const apartment = apartments.find((apt) => apt.id === listingId);

  // تحويل الشقة إلى format الـ listing
  const listing = apartment
    ? {
        id: apartment.id,
        title: apartment.title,
        address: apartment.location,
        area: apartment.area || apartment.location,
        university: apartment.university || apartment.nearestUniversity || "",
        nearestUniversity:
          apartment.nearestUniversity || apartment.university || "",
        rooms: apartment.rooms || "1",
        price: parseInt(apartment.price.replace(/[^\d]/g, "")) || 0,
        description: apartment.description,
        image: apartment.imageUrl,
        size: apartment.size || "غير محدد",
        images: apartment.images || [apartment.imageUrl],
        amenities: apartment.amenities || [],
        mapEmbedUrl: "",
      }
    : null;

  // عرض loading state
  if (loading) {
    return (
      <div
        className="min-h-screen pt-16 flex items-center justify-center"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p style={{ color: "var(--color-text)" }}>
            جاري تحميل تفاصيل الشقة...
          </p>
        </div>
      </div>
    );
  }

  // عرض error state
  if (error) {
    return (
      <div
        className="min-h-screen pt-16 flex items-center justify-center"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <div className="text-center">
          <p style={{ color: "var(--color-error)" }}>
            حدث خطأ في تحميل البيانات: {error}
          </p>
        </div>
      </div>
    );
  }

  // إذا لم يتم العثور على الوحدة، عرض رسالة خطأ
  if (!listing) {
    return <ListingNotFound />;
  }

  // عنوان الصفحة
  const title = listing.title || "تفاصيل الوحدة السكنية";
  const images = listing.images || [listing.image];

  return (
    <div
      className="min-h-screen pt-16"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ListingHeader title={title} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <ListingImageCarousel images={images} title={title} />
            <ListingDetails listing={listing} />
            {listing.mapEmbedUrl && (
              <ListingMap mapEmbedUrl={listing.mapEmbedUrl} />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ListingSidebar listingId={listingId} />
          </div>
        </div>
      </div>

      <ContactUsButton />
    </div>
  );
}
