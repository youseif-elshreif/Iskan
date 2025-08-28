"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/index";
import { FaUser, FaCalendarAlt, FaClock } from "react-icons/fa";

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

interface BookingFormProps {
  formData: FormData;
  onInputChange: (field: string, value: string) => void;
  selectedAppointment: Appointment | null;
  onSubmit: () => void;
  loading: boolean;
  apartment: Apartment;
  errors?: Record<string, string>;
  touched?: Record<string, boolean>;
  onBlur?: (name: string) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  formData,
  onInputChange,
  selectedAppointment,
  onSubmit,
  loading,
  apartment,
  errors = {},
  touched = {},
  onBlur = () => {},
}) => {
  const router = useRouter();

  const isFormValid = Boolean(
    selectedAppointment && formData.userName && formData.userPhone
  );

  return (
    <Card>
      <h3
        className="text-xl font-semibold mb-6"
        style={{ color: "var(--color-secondary)" }}
      >
        <FaUser className="inline-block ml-2" />
        بياناتك الشخصية
      </h3>

      <div className="space-y-6">
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--color-primary)" }}
          >
            الاسم الكامل *
          </label>
          <input
            type="text"
            value={formData.userName}
            onChange={(e) => onInputChange("userName", e.target.value)}
            onBlur={() => onBlur("userName")}
            className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 ${
              errors.userName && touched.userName 
                ? "border-red-500 focus:ring-red-200" 
                : "focus:ring-blue-200"
            }`}
            style={{
              borderColor: errors.userName && touched.userName ? "#ef4444" : "var(--color-border)",
              backgroundColor: "var(--color-background)",
              color: "var(--color-text)",
            }}
            placeholder="أدخل اسمك الكامل"
            required
          />
          {errors.userName && touched.userName && (
            <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
          )}
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--color-primary)" }}
          >
            رقم الهاتف *
          </label>
          <input
            type="tel"
            value={formData.userPhone}
            onChange={(e) => onInputChange("userPhone", e.target.value)}
            onBlur={() => onBlur("userPhone")}
            className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 ${
              errors.userPhone && touched.userPhone 
                ? "border-red-500 focus:ring-red-200" 
                : "focus:ring-blue-200"
            }`}
            style={{
              borderColor: errors.userPhone && touched.userPhone ? "#ef4444" : "var(--color-border)",
              backgroundColor: "var(--color-background)",
              color: "var(--color-text)",
            }}
            placeholder="01xxxxxxxxx"
            required
          />
          {errors.userPhone && touched.userPhone && (
            <p className="text-red-500 text-sm mt-1">{errors.userPhone}</p>
          )}
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--color-primary)" }}
          >
            البريد الإلكتروني (اختياري)
          </label>
          <input
            type="email"
            value={formData.userEmail}
            onChange={(e) => onInputChange("userEmail", e.target.value)}
            onBlur={() => onBlur("userEmail")}
            className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 ${
              errors.userEmail && touched.userEmail 
                ? "border-red-500 focus:ring-red-200" 
                : "focus:ring-blue-200"
            }`}
            style={{
              borderColor: errors.userEmail && touched.userEmail ? "#ef4444" : "var(--color-border)",
              backgroundColor: "var(--color-background)",
              color: "var(--color-text)",
            }}
            placeholder="example@email.com"
          />
          {errors.userEmail && touched.userEmail && (
            <p className="text-red-500 text-sm mt-1">{errors.userEmail}</p>
          )}
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--color-primary)" }}
          >
            رسالة إضافية (اختياري)
          </label>
          <textarea
            value={formData.userMessage}
            onChange={(e) => onInputChange("userMessage", e.target.value)}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-background)",
              color: "var(--color-text)",
            }}
            placeholder="أي ملاحظات أو استفسارات..."
          />
        </div>

        {/* Selected Appointment Summary */}
        {selectedAppointment && (
          <div
            className="p-4 rounded-lg"
            style={{
              backgroundColor: "var(--color-background-secondary)",
            }}
          >
            <h4
              className="font-semibold mb-2"
              style={{ color: "var(--color-primary)" }}
            >
              الموعد المختار:
            </h4>
            <div className="flex items-center space-x-3 space-x">
              <FaCalendarAlt style={{ color: "var(--color-secondary)" }} />
              <span style={{ color: "var(--color-text)" }}>
                {new Date(selectedAppointment.date).toLocaleDateString("ar-EG")}
              </span>
              <FaClock style={{ color: "var(--color-secondary)" }} />
              <span style={{ color: "var(--color-text)" }}>
                {selectedAppointment.time}
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3">
          <Button
            onClick={onSubmit}
            variant="filled"
            size="lg"
            disabled={loading || !isFormValid}
            className="w-full"
          >
            {loading ? "جاري الحجز..." : "تأكيد الحجز"}
          </Button>

          <Button
            onClick={() => router.push(`/listings/listing/${apartment.id}`)}
            variant="outlined"
            size="lg"
            className="w-full"
          >
            العودة للشقة
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default BookingForm;
