"use client";

import { HeroSection } from "@/components/layout";
import { FeatureHighlights } from "@/components/common";
import { ContactUsButton } from "@/components/contact";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Feature Highlights */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeatureHighlights />
        </div>
      </section>

      {/* Contact Us Button */}
      <ContactUsButton />
    </div>
  );
}
