"use client";

import React, { useState } from "react";
import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/index";
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.message) {
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
                required
                className="w-full pl-4 pr-10 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2"
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-text)",
                }}
                placeholder="أدخل اسمك الكامل"
              />
            </div>
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
                className="w-full pl-4 pr-10 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2"
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-text)",
                }}
                placeholder="أدخل بريدك الإلكتروني"
              />
            </div>
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
                className="w-full pl-4 pr-10 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2"
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-text)",
                }}
                placeholder="أدخل رقم هاتفك"
              />
            </div>
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
              required
              rows={5}
              className="w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 resize-vertical"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-background)",
                color: "var(--color-text)",
              }}
              placeholder="اكتب رسالتك هنا..."
            />
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
