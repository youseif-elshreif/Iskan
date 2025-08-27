"use client";

import React from "react";
import Card from "@/components/ui/Card";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaRulerCombined,
  FaDollarSign,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCommentDots,
} from "react-icons/fa";

interface Appointment {
  id: string;
  date: string;
  time: string;
  status: "available" | "booked" | "completed" | "postponed";
}

interface Apartment {
  id: string;
  title: string;
  location: string;
  area?: string;
  price: string;
  imageUrl: string;
}

interface FormData {
  userName: string;
  userPhone: string;
  userEmail: string;
  userMessage: string;
}

interface BookingSummaryProps {
  apartment: Apartment;
  selectedAppointment: Appointment | null;
  formData: FormData;
  showTitle?: boolean;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  apartment,
  selectedAppointment,
  formData,
  showTitle = true,
}) => {
  return (
    <Card>
      {showTitle && (
        <h3
          className="text-xl font-semibold mb-6"
          style={{ color: "var(--color-secondary)" }}
        >
          ملخص الحجز
        </h3>
      )}

      <div className="space-y-6">
        {/* Apartment Summary */}
        <div
          className="p-4 rounded-lg"
          style={{
            backgroundColor: "var(--color-background-secondary)",
          }}
        >
          <h4
            className="font-semibold mb-3"
            style={{ color: "var(--color-primary)" }}
          >
            تفاصيل الشقة:
          </h4>
          <div className="space-y-2">
            <p style={{ color: "var(--color-text)" }}>
              <strong>العنوان:</strong> {apartment.title}
            </p>
            <div className="flex items-center">
              <FaMapMarkerAlt
                className="ml-2"
                style={{ color: "var(--color-secondary)" }}
              />
              <span style={{ color: "var(--color-text)" }}>
                {apartment.location}
              </span>
            </div>
            {apartment.area && (
              <div className="flex items-center">
                <FaRulerCombined
                  className="ml-2"
                  style={{ color: "var(--color-secondary)" }}
                />
                <span style={{ color: "var(--color-text)" }}>
                  {apartment.area}
                </span>
              </div>
            )}
            <div className="flex items-center">
              <FaDollarSign
                className="ml-2"
                style={{ color: "var(--color-secondary)" }}
              />
              <span
                className="font-bold"
                style={{ color: "var(--color-secondary)" }}
              >
                {apartment.price}
              </span>
            </div>
          </div>
        </div>

        {/* Appointment Summary */}
        {selectedAppointment && (
          <div
            className="p-4 rounded-lg"
            style={{
              backgroundColor: "var(--color-background-secondary)",
            }}
          >
            <h4
              className="font-semibold mb-3"
              style={{ color: "var(--color-primary)" }}
            >
              تفاصيل الموعد:
            </h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <FaCalendarAlt
                  className="ml-2"
                  style={{ color: "var(--color-secondary)" }}
                />
                <span style={{ color: "var(--color-text)" }}>
                  {new Date(selectedAppointment.date).toLocaleDateString(
                    "ar-EG",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </span>
              </div>
              <div className="flex items-center">
                <FaClock
                  className="ml-2"
                  style={{ color: "var(--color-secondary)" }}
                />
                <span style={{ color: "var(--color-text)" }}>
                  {selectedAppointment.time}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* User Information Summary */}
        {(formData.userName || formData.userPhone) && (
          <div
            className="p-4 rounded-lg"
            style={{
              backgroundColor: "var(--color-background-secondary)",
            }}
          >
            <h4
              className="font-semibold mb-3"
              style={{ color: "var(--color-primary)" }}
            >
              بياناتك:
            </h4>
            <div className="space-y-2">
              {formData.userName && (
                <div className="flex items-center">
                  <FaUser
                    className="ml-2"
                    style={{ color: "var(--color-secondary)" }}
                  />
                  <span style={{ color: "var(--color-text)" }}>
                    {formData.userName}
                  </span>
                </div>
              )}
              {formData.userPhone && (
                <div className="flex items-center">
                  <FaPhone
                    className="ml-2"
                    style={{ color: "var(--color-secondary)" }}
                  />
                  <span style={{ color: "var(--color-text)" }}>
                    {formData.userPhone}
                  </span>
                </div>
              )}
              {formData.userEmail && (
                <div className="flex items-center">
                  <FaEnvelope
                    className="ml-2"
                    style={{ color: "var(--color-secondary)" }}
                  />
                  <span style={{ color: "var(--color-text)" }}>
                    {formData.userEmail}
                  </span>
                </div>
              )}
              {formData.userMessage && (
                <div className="flex items-start">
                  <FaCommentDots
                    className="ml-2 mt-1"
                    style={{ color: "var(--color-secondary)" }}
                  />
                  <span style={{ color: "var(--color-text)" }}>
                    {formData.userMessage}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Booking Status */}
        <div className="text-center">
          <div
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium"
            style={{
              backgroundColor: selectedAppointment
                ? "var(--color-primary)"
                : "var(--color-border)",
              color: selectedAppointment
                ? "white"
                : "var(--color-text-secondary)",
            }}
          >
            {selectedAppointment
              ? "جاهز للحجز"
              : "يرجى اختيار موعد وإدخال البيانات"}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BookingSummary;
