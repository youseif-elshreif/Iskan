"use client";

import React, { useState } from "react";
import { Card, Button } from "@/components/ui/index";
import { api } from "@/services/api";
import {
  IoPersonOutline,
  IoMailOutline,
  IoCallOutline,
  IoSendOutline,
} from "react-icons/io5";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface ContactFormProps {
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ className = "" }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validation function
  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) error = "الاسم مطلوب";
        else if (value.trim().length < 2)
          error = "الاسم يجب أن يكون حرفين على الأقل";
        break;
      case "email":
        if (value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          error = "البريد الإلكتروني غير صحيح";
        }
        break;
      case "phone":
        if (value.trim() && !/^[0-9+\-\s()]+$/.test(value.trim())) {
          error = "رقم الهاتف غير صحيح";
        }
        break;
      case "message":
        if (!value.trim()) error = "الرسالة مطلوبة";
        else if (value.trim().length < 10)
          error = "الرسالة يجب أن تكون 10 أحرف على الأقل";
        break;
    }

    return error;
  };

  // Handle blur event to show errors
  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name as keyof FormData]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Show message for 3 seconds
  const showMessage = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate if field was touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const requiredFields = ["name", "message"];
    const allFields = ["name", "email", "phone", "message"];
    const newErrors: Record<string, string> = {};
    const newTouched: Record<string, boolean> = {};

    allFields.forEach((field) => {
      newTouched[field] = true;
      const error = validateField(field, formData[field as keyof FormData]);
      if (error) newErrors[field] = error;
    });

    setTouched(newTouched);
    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error)) {
      showMessage("يرجى تصحيح الأخطاء في النموذج", "error");
      return;
    }

    // Check required fields
    const missingFields = requiredFields.filter(
      (field) => !formData[field as keyof FormData].trim()
    );
    if (missingFields.length > 0) {
      showMessage("يرجى ملء الحقول المطلوبة", "error");
      return;
    }

    try {
      setLoading(true);

      const messageData = {
        ...formData,
        createdAt: new Date().toISOString(),
        isRead: false,
      };

      const response = await api.post("/messages", messageData);

      if (response.status === 200 || response.status === 201) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        setErrors({});
        setTouched({});
        showMessage("تم إرسال رسالتك بنجاح! سنتواصل معك قريباً", "success");
      } else {
        showMessage("حدث خطأ أثناء إرسال الرسالة", "error");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      showMessage("حدث خطأ أثناء إرسال الرسالة", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={className}>
      <Card>
        <h2
          className="text-2xl font-semibold mb-6"
          style={{ color: "var(--color-primary)" }}
        >
          أرسل لنا رسالة
        </h2>

        {/* Message Notification */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === "success"
                ? "border text-green-700"
                : "border text-red-700"
            }`}
            style={{
              backgroundColor:
                message.type === "success"
                  ? "var(--color-success)"
                  : "var(--color-error)",
              opacity: 0.1,
              borderColor:
                message.type === "success"
                  ? "var(--color-success)"
                  : "var(--color-error)",
            }}
          >
            <div
              style={{
                color:
                  message.type === "success"
                    ? "var(--color-success)"
                    : "var(--color-error)",
              }}
            >
              {message.text}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--color-primary)" }}
              htmlFor="name"
            >
              الاسم الكامل *
            </label>
            <div className="relative">
              <IoPersonOutline
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                style={{ color: "var(--color-text-muted)" }}
              />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={() => handleBlur("name")}
                required
                className={`w-full pl-4 pr-10 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 ${
                  errors.name && touched.name
                    ? "border-red-500 focus:ring-red-200"
                    : "focus:ring-blue-200"
                }`}
                style={{
                  borderColor:
                    errors.name && touched.name
                      ? "#ef4444"
                      : "var(--color-border)",
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-text)",
                }}
                placeholder="أدخل اسمك الكامل"
              />
            </div>
            {errors.name && touched.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--color-primary)" }}
              htmlFor="email"
            >
              البريد الإلكتروني
            </label>
            <div className="relative">
              <IoMailOutline
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                style={{ color: "var(--color-text-muted)" }}
              />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={() => handleBlur("email")}
                className={`w-full pl-4 pr-10 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 ${
                  errors.email && touched.email
                    ? "border-red-500 focus:ring-red-200"
                    : "focus:ring-blue-200"
                }`}
                style={{
                  borderColor:
                    errors.email && touched.email
                      ? "#ef4444"
                      : "var(--color-border)",
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-text)",
                }}
                placeholder="أدخل بريدك الإلكتروني"
              />
            </div>
            {errors.email && touched.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--color-primary)" }}
              htmlFor="phone"
            >
              رقم الهاتف
            </label>
            <div className="relative">
              <IoCallOutline
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                style={{ color: "var(--color-text-muted)" }}
              />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                onBlur={() => handleBlur("phone")}
                className={`w-full pl-4 pr-10 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 ${
                  errors.phone && touched.phone
                    ? "border-red-500 focus:ring-red-200"
                    : "focus:ring-blue-200"
                }`}
                style={{
                  borderColor:
                    errors.phone && touched.phone
                      ? "#ef4444"
                      : "var(--color-border)",
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-text)",
                }}
                placeholder="أدخل رقم هاتفك"
              />
            </div>
            {errors.phone && touched.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--color-primary)" }}
              htmlFor="message"
            >
              الرسالة *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              onBlur={() => handleBlur("message")}
              required
              rows={5}
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 resize-vertical ${
                errors.message && touched.message
                  ? "border-red-500 focus:ring-red-200"
                  : "focus:ring-blue-200"
              }`}
              style={{
                borderColor:
                  errors.message && touched.message
                    ? "#ef4444"
                    : "var(--color-border)",
                backgroundColor: "var(--color-background)",
                color: "var(--color-text)",
              }}
              placeholder="اكتب رسالتك هنا..."
            />
            {errors.message && touched.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="filled"
            size="lg"
            disabled={loading}
            className="w-full flex items-center justify-center"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                جارِ الإرسال...
              </div>
            ) : (
              <div className="flex items-center">
                <IoSendOutline className="ml-2" />
                إرسال الرسالة
              </div>
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ContactForm;
