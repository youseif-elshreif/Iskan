"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui";
import {
  FaTimes,
  FaCalendarPlus,
  FaClock,
  FaCalendarAlt,
} from "react-icons/fa";

interface AddAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (appointmentData: {
    date: string;
    time: string;
    notes?: string;
  }) => Promise<void>;
  loading?: boolean;
}

const AddAppointmentModal: React.FC<AddAppointmentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validation function
  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "date":
        if (!value.trim()) {
          error = "التاريخ مطلوب";
        } else {
          const selectedDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (selectedDate < today) {
            error = "لا يمكن اختيار تاريخ سابق";
          }
        }
        break;
      case "time":
        if (!value.trim()) {
          error = "الوقت مطلوب";
        }
        break;
    }

    return error;
  };

  // Handle blur event to show errors
  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name as keyof typeof formData]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate if field was touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const allFields = ["date", "time"];
    const newErrors: Record<string, string> = {};
    const newTouched: Record<string, boolean> = {};

    allFields.forEach((field) => {
      newTouched[field] = true;
      const error = validateField(
        field,
        formData[field as keyof typeof formData]
      );
      if (error) newErrors[field] = error;
    });

    setTouched(newTouched);
    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    try {
      await onSubmit({
        date: formData.date,
        time: formData.time,
        notes: formData.notes.trim() || undefined,
      });

      // Reset form on success
      setFormData({ date: "", time: "", notes: "" });
      setErrors({});
      setTouched({});
    } catch (error) {
      console.error("Error adding appointment:", error);
    }
  };

  const handleClose = () => {
    setFormData({ date: "", time: "", notes: "" });
    setErrors({});
    setTouched({});
    onClose();
  };

  if (!isOpen) return null;

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full mx-auto overflow-hidden shadow-2xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-full bg-blue-100">
                <FaCalendarPlus className="text-xl text-blue-600" />
              </div>
              <h3
                className="text-xl font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                إضافة موعد جديد
              </h3>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={loading}
            >
              <FaTimes />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date Input */}
            <div>
              <label
                className="flex items-center text-sm font-medium mb-2"
                style={{ color: "var(--color-primary)" }}
              >
                <FaCalendarAlt className="ml-2" />
                التاريخ *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                onBlur={() => handleBlur("date")}
                min={today}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${
                  errors.date && touched.date
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                }`}
                style={{
                  borderColor:
                    errors.date && touched.date
                      ? "#ef4444"
                      : "var(--color-border)",
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-text)",
                }}
                required
              />
              {errors.date && touched.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date}</p>
              )}
            </div>

            {/* Time Input */}
            <div>
              <label
                className="flex items-center text-sm font-medium mb-2"
                style={{ color: "var(--color-primary)" }}
              >
                <FaClock className="ml-2" />
                الوقت *
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange("time", e.target.value)}
                onBlur={() => handleBlur("time")}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${
                  errors.time && touched.time
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                }`}
                style={{
                  borderColor:
                    errors.time && touched.time
                      ? "#ef4444"
                      : "var(--color-border)",
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-text)",
                }}
                required
              />
              {errors.time && touched.time && (
                <p className="text-red-500 text-sm mt-1">{errors.time}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row-reverse gap-3 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white flex-1 min-w-0"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                    جاري الإضافة...
                  </div>
                ) : (
                  "إضافة الموعد"
                )}
              </Button>
              <Button
                type="button"
                onClick={handleClose}
                variant="outlined"
                disabled={loading}
                className="flex-1 min-w-0 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                إلغاء
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAppointmentModal;
