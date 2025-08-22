"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import { FaLock, FaMapMarkerAlt, FaDollarSign } from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative py-24  flex items-center justify-center"
        style={{
          backgroundColor: "var(--color-background-overlay)",
        }}
      >
        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          {/* Main Heading */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
            style={{ color: "var(--color-primary)" }}
          >
            <span className="block mb-2">سكن آمن ومريح</span>
            <span className="block" style={{ color: "var(--color-secondary)" }}>
              بالقرب من جامعتك
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg sm:text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-90"
            style={{ color: "var(--color-text)" }}
          >
            ابحث عن أفضل سكن طلابي يناسب احتياجاتك وميزانيتك مع خدمات متميزة
            وأسعار مناسبة
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16">
            <Link href="/listings">
              <Button variant="outlined" size="lg">
                تصفح الوحدات
              </Button>
            </Link>

            <Link href="/contact">
              <Button variant="secondary" size="lg">
                تواصل معنا
              </Button>
            </Link>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div
              className="text-center p-6 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border"
              style={{
                backgroundColor: "var(--color-card-bg)",
                borderColor: "var(--color-border)",
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: "var(--color-secondary)" }}
              >
                <FaLock className="w-6 h-6 text-white" />
              </div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "var(--color-primary)" }}
              >
                سكن آمن
              </h3>
              <p className="text-sm" style={{ color: "var(--color-text)" }}>
                مكان امن{" "}
              </p>
            </div>

            <div
              className="text-center p-6 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border"
              style={{
                backgroundColor: "var(--color-card-bg)",
                borderColor: "var(--color-border)",
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: "var(--color-secondary)" }}
              >
                <FaMapMarkerAlt className="w-6 h-6 text-white" />
              </div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "var(--color-primary)" }}
              >
                موقع مميز
              </h3>
              <p className="text-sm" style={{ color: "var(--color-text)" }}>
                قريب من الجامعة
              </p>
            </div>

            <div
              className="text-center p-6 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border"
              style={{
                backgroundColor: "var(--color-card-bg)",
                borderColor: "var(--color-border)",
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: "var(--color-secondary)" }}
              >
                <FaDollarSign className="w-6 h-6 text-white" />
              </div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "var(--color-primary)" }}
              >
                أسعار مناسبة
              </h3>
              <p className="text-sm" style={{ color: "var(--color-text)" }}>
                في متناول الطلاب
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
