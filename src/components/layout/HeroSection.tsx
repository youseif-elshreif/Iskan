import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/index";

const HeroSection: React.FC = () => {
  return (
    <section
      className="relative py-24 flex items-center justify-center"
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
      </div>
    </section>
  );
};

export default HeroSection;
