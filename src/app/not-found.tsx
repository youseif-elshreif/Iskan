"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import { FaHome, FaSearch, FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Main Container */}
      <section
        className="relative py-24 flex items-center justify-center w-full"
        style={{
          backgroundColor: "var(--color-background)",
        }}
      >
        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {/* 404 Number */}
          <div
            className="text-8xl sm:text-9xl md:text-[12rem] font-bold mb-8 opacity-20"
            style={{ color: "var(--color-secondary)" }}
          >
            404
          </div>

          {/* Main Heading */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight"
            style={{ color: "var(--color-primary)" }}
          >
            الصفحة غير موجودة
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg sm:text-xl mb-12 max-w-2xl mx-auto leading-relaxed opacity-90"
            style={{ color: "var(--color-text)" }}
          >
            عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها. يمكنك العودة
            إلى الصفحة الرئيسية أو البحث عن ما تحتاجه.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Home Button */}
            <Link href="/">
              <Button
                variant="outlined"
                size="lg"
                className="inline-flex items-center gap-3"
              >
                <FaHome className="text-xl" />
                العودة للرئيسية
              </Button>
            </Link>

            {/* Listings Button */}
            <Link href="/listings">
              <Button
                variant="secondary"
                size="lg"
                className="inline-flex items-center gap-3"
              >
                <FaSearch className="text-xl" />
                تصفح الوحدات
              </Button>
            </Link>
          </div>

          {/* Help Section */}
          <div
            className="mt-16 pt-8 border-t border-opacity-20"
            style={{ borderColor: "var(--color-secondary)" }}
          >
            <h3
              className="text-xl font-semibold mb-4"
              style={{ color: "var(--color-secondary)" }}
            >
              هل تحتاج مساعدة؟
            </h3>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link
                href="/"
                className="hover:underline transition-colors duration-200"
                style={{ color: "var(--color-text)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--color-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--color-text)";
                }}
              >
                الصفحة الرئيسية
              </Link>
              <Link
                href="/listings"
                className="hover:underline transition-colors duration-200"
                style={{ color: "var(--color-text)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--color-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--color-text)";
                }}
              >
                الوحدات السكنية
              </Link>
              <Link
                href="/"
                className="hover:underline transition-colors duration-200"
                style={{ color: "var(--color-text)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--color-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--color-text)";
                }}
              >
                اتصل بنا
              </Link>
            </div>
          </div>

          {/* Back Browser Button */}
          <div className="mt-8">
            <Button
              onClick={() => window.history.back()}
              variant="secondary"
              size="md"
              className="inline-flex items-center gap-2 hover:scale-105"
            >
              <FaArrowLeft className="text-sm" />
              العودة للصفحة السابقة
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
