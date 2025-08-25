"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import { FaEnvelope, FaUser, FaPhone, FaTrash, FaClock } from "react-icons/fa";

interface Message {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  // Mock data for demo
  const mockMessages: Message[] = [
    {
      id: "1",
      name: "سارة أحمد",
      email: "sara@example.com",
      phone: "+20123456789",
      message:
        "أريد الاستفسار عن الشقق المتاحة في منطقة الجيزة قريباً من جامعة القاهرة. هل يمكنكم تزويدي بالتفاصيل والأسعار؟",
      createdAt: "2024-01-15T10:30:00Z",
      isRead: false,
    },
    {
      id: "2",
      name: "محمد علي",
      email: "mohamed@example.com",
      phone: "+20111222333",
      message:
        "مرحباً، أنا طالب في الجامعة الأمريكية وأبحث عن سكن قريب من الجامعة. ما هي الخيارات المتاحة؟",
      createdAt: "2024-01-14T15:45:00Z",
      isRead: true,
    },
    {
      id: "3",
      name: "فاطمة حسن",
      phone: "+20155666777",
      message:
        "هل يمكنني حجز موعد لمعاينة الشقة في المعادي؟ أنا متاحة في أي وقت هذا الأسبوع.",
      createdAt: "2024-01-13T09:15:00Z",
      isRead: true,
    },
    {
      id: "4",
      name: "أحمد محمود",
      email: "ahmed@example.com",
      message:
        "أرجو منكم إرسال قائمة بجميع الشقق المتاحة مع الأسعار. شكراً لكم.",
      createdAt: "2024-01-12T14:20:00Z",
      isRead: false,
    },
  ];

  const fetchMessages = () => {
    // Replace with actual json-server call
    setMessages(mockMessages);
  };

  useEffect(() => {
    // Replace with actual json-server call
    setMessages(mockMessages);
  }, []);

  const markAsRead = async (id: string) => {
    try {
      // Replace with actual json-server call
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, isRead: true } : msg))
      );
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  const deleteMessage = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذه الرسالة؟")) {
      try {
        // Replace with actual json-server call
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const unreadCount = messages.filter((msg) => !msg.isRead).length;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1
            className="text-3xl font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            الرسائل
          </h1>
          <p className="mt-2" style={{ color: "var(--color-text)" }}>
            إجمالي الرسائل: {messages.length} | غير مقروءة: {unreadCount}
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <div className="flex items-center">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
              style={{ backgroundColor: "var(--color-secondary)" }}
            >
              <FaEnvelope className="text-white text-xl" />
            </div>
            <div>
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                {messages.length}
              </p>
              <p className="text-sm" style={{ color: "var(--color-text)" }}>
                إجمالي الرسائل
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
              style={{ backgroundColor: "#ef4444" }}
            >
              <FaEnvelope className="text-white text-xl" />
            </div>
            <div>
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                {unreadCount}
              </p>
              <p className="text-sm" style={{ color: "var(--color-text)" }}>
                رسائل غير مقروءة
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
              style={{ backgroundColor: "#10b981" }}
            >
              <FaEnvelope className="text-white text-xl" />
            </div>
            <div>
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                {messages.length - unreadCount}
              </p>
              <p className="text-sm" style={{ color: "var(--color-text)" }}>
                رسائل مقروءة
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {messages.map((message) => (
          <Card
            key={message.id}
            className={`transition-all duration-300 ${
              !message.isRead ? "ring-2 ring-blue-200" : ""
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center mb-3">
                  <div className="flex items-center flex-1">
                    <FaUser
                      className="ml-2"
                      style={{ color: "var(--color-secondary)" }}
                    />
                    <span
                      className="font-semibold"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {message.name}
                    </span>

                    {!message.isRead && (
                      <span
                        className="mr-3 px-2 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: "#ef4444",
                          color: "white",
                        }}
                      >
                        جديد
                      </span>
                    )}
                  </div>

                  <div
                    className="flex items-center text-sm"
                    style={{ color: "var(--color-text)" }}
                  >
                    <FaClock className="ml-1" />
                    {formatDate(message.createdAt)}
                  </div>
                </div>

                <div className="mb-3 space-y-1">
                  {message.email && (
                    <div className="flex items-center text-sm">
                      <FaEnvelope
                        className="ml-2"
                        style={{ color: "var(--color-secondary)" }}
                      />
                      <a
                        href={`mailto:${message.email}`}
                        className="hover:underline"
                        style={{ color: "var(--color-text)" }}
                      >
                        {message.email}
                      </a>
                    </div>
                  )}

                  {message.phone && (
                    <div className="flex items-center text-sm">
                      <FaPhone
                        className="ml-2"
                        style={{ color: "var(--color-secondary)" }}
                      />
                      <a
                        href={`tel:${message.phone}`}
                        className="hover:underline"
                        style={{ color: "var(--color-text)" }}
                      >
                        {message.phone}
                      </a>
                    </div>
                  )}
                </div>

                <div
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: "var(--color-border-light)" }}
                >
                  <p style={{ color: "var(--color-text)" }}>
                    {message.message}
                  </p>
                </div>
              </div>

              <div className="mr-4 flex flex-col space-y-2">
                {!message.isRead && (
                  <button
                    onClick={() => markAsRead(message.id)}
                    className="px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: "var(--color-secondary)",
                      color: "var(--color-background)",
                    }}
                  >
                    تم القراءة
                  </button>
                )}

                <button
                  onClick={() => deleteMessage(message.id)}
                  className="px-3 py-1 rounded-lg text-sm font-medium transition-colors border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  <FaTrash className="inline ml-1" />
                  حذف
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {messages.length === 0 && (
        <div className="text-center py-12">
          <FaEnvelope
            className="mx-auto mb-4 text-6xl"
            style={{ color: "var(--color-border)" }}
          />
          <p className="text-xl" style={{ color: "var(--color-text)" }}>
            لا توجد رسائل بعد
          </p>
        </div>
      )}
    </div>
  );
}
