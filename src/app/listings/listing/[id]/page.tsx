"use client";

import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Breadcrumb from "@/components/Breadcrumb";
import { getListingById } from "@/data/mockListings";
import Link from "next/link";
import { FaLongArrowAltLeft } from "react-icons/fa";
import ContactInfo from "@/components/ContactInfo";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ListingDetailPage() {
  const params = useParams();
  const listingId = params.id as string;

  const listing = getListingById(listingId);

  // إذا لم يتم العثور على الوحدة، عرض رسالة خطأ
  if (!listing) {
    return (
      <div
        className="min-h-screen pt-16"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--color-primary)" }}
            >
              الوحدة غير موجودة
            </h1>
            <p className="mb-8" style={{ color: "var(--color-text)" }}>
              عذراً، لم يتم العثور على الوحدة المطلوبة.
            </p>
            <div>
              <Button
                onClick={() => (window.location.href = "/listings")}
                variant="filled"
                size="md"
              >
                العودة للوحدات
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // عنوان الصفحة
  const title = listing.title || "تفاصيل الوحدة السكنية";
  const fullAddress = `${listing.address}, مصر`;

  return (
    <div
      className="min-h-screen pt-16"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="sm:block mb-4 justify-between">
          <Link href="/listings">
            <Button variant="filled" size="sm" className="mr-auto block">
              {" "}
              <FaLongArrowAltLeft />
            </Button>
          </Link>
          <Breadcrumb
            items={[
              { href: "/", label: "الرئيسية" },
              { href: "/listings", label: "الوحدات" },
              { label: title, isActive: true },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Carousel */}
            <Card className="mb-8 overflow-hidden" padding="none">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                loop
                className="h-64 sm:h-80 md:h-96"
              >
                {(listing.images || [listing.image]).map(
                  (image: string, index: number) => (
                    <SwiperSlide key={index}>
                      <div className="relative h-64 sm:h-80 md:h-96">
                        <Image
                          src={image}
                          alt={`${title} - صورة ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 66vw"
                          priority={index === 0}
                        />
                      </div>
                    </SwiperSlide>
                  )
                )}
              </Swiper>
            </Card>

            {/* Details */}
            <Card className="mb-8">
              <div className="mb-6">
                <h1
                  className="text-3xl font-bold mb-2"
                  style={{ color: "var(--color-primary)" }}
                >
                  {title}
                </h1>
                <p
                  className="text-lg font-semibold mb-2"
                  style={{ color: "var(--color-secondary)" }}
                >
                  قريب من {listing.nearestUniversity}
                </p>
                <p style={{ color: "var(--color-text)" }}>{fullAddress}</p>
              </div>

              {/* Property Info */}
              <div
                className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-lg"
                style={{ backgroundColor: "var(--color-border-light)" }}
              >
                <div className="text-center">
                  <p
                    className="text-2xl font-bold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {listing.rooms}
                  </p>
                  <p className="text-sm" style={{ color: "var(--color-text)" }}>
                    غرف
                  </p>
                </div>
                <div className="text-center">
                  <p
                    className="text-2xl font-bold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {listing.size}
                  </p>
                  <p className="text-sm" style={{ color: "var(--color-text)" }}>
                    المساحة
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2
                  className="text-xl font-semibold mb-3"
                  style={{ color: "var(--color-primary)" }}
                >
                  الوصف
                </h2>
                <p
                  className="leading-relaxed"
                  style={{ color: "var(--color-text)" }}
                >
                  {listing.description}
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h2
                  className="text-xl font-semibold mb-3"
                  style={{ color: "var(--color-primary)" }}
                >
                  المرافق والخدمات
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {(listing.amenities || []).map(
                    (amenity: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 space-x-reverse"
                      >
                        <svg
                          className="w-5 h-5"
                          style={{ color: "var(--color-secondary)" }}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span style={{ color: "var(--color-text)" }}>
                          {amenity}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </Card>

            {/* Map */}
            {listing.mapEmbedUrl && (
              <Card>
                <h2
                  className="text-xl font-semibold mb-4"
                  style={{ color: "var(--color-primary)" }}
                >
                  الموقع
                </h2>
                <div className="w-full h-64 rounded-lg overflow-hidden">
                  <iframe
                    src={listing.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="موقع السكن"
                  />
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <Card>
                <Button size="lg" className="w-full mb-4">
                  احجز ميعاد للمعاينة
                </Button>

                <div
                  className="border-t pt-4"
                  style={{ borderColor: "var(--color-border-light)" }}
                >
                  <ContactInfo
                    className="space-y-2"
                    titleClassName="text-lg font-semibold mb-3"
                    itemClassName="flex items-center space-x-3 space-x-reverse transition-colors hover:opacity-80"
                    colorTheme="primary"
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
