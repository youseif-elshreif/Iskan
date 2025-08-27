import React from "react";

export default function ListingsEmptyState() {
  return (
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
        لم نجد أي سكنات تطابق معايير البحث الخاصة بك. جرب تعديل الفلاتر.
      </p>
    </div>
  );
}
