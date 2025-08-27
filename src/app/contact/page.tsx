"use client";
import React from "react";
import { ContactForm, ContactInfoSection } from "@/components/contact";

export default function ContactPage() {
  return (
    <div
      className="min-h-screen z-10 relative pt-16"
      style={{ backgroundColor: "var(--color-background-soft)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "var(--color-primary)" }}
          >
            تواصل معنا
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--color-text)" }}
          >
            نحن هنا لمساعدتك في العثور على السكن المثالي. تواصل معنا الآن وسنقوم
            بالرد عليك في أقرب وقت
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <ContactForm />

          {/* Contact Info */}
          <ContactInfoSection />
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h2
            className="text-2xl font-semibold mb-6 text-center"
            style={{ color: "var(--color-primary)" }}
          >
            موقعنا على الخريطة
          </h2>
          <div
            className="w-full h-96 rounded-2xl shadow-lg overflow-hidden"
            style={{ backgroundColor: "var(--color-background-soft)" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.1234567890!2d31.2!3d30.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAwJzAwLjAiTiAzMcKwMTInMDAuMCJF!5e0!3m2!1sen!2seg!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="موقعنا على الخريطة"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
