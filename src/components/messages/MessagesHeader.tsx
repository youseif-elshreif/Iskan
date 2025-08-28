import React from "react";
import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/index";
import { FaEnvelope, FaEnvelopeOpen, FaTrash } from "react-icons/fa";

interface MessagesHeaderProps {
  totalMessages: number;
  unreadCount: number;
  onMarkAllAsRead: () => void;
  onDeleteAll: () => void;
  loading: boolean;
}

const MessagesHeader: React.FC<MessagesHeaderProps> = ({
  totalMessages,
  unreadCount,
  onMarkAllAsRead,
  onDeleteAll,
  loading,
}) => {
  return (
    <>
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
        <div>
          <h1
            className="text-2xl lg:text-3xl font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            الرسائل
          </h1>
          <p className="mt-2 text-sm lg:text-base" style={{ color: "var(--color-text-muted)" }}>
            إجمالي الرسائل: {totalMessages} | غير مقروءة: {unreadCount}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <Button
            variant="filled"
            onClick={onMarkAllAsRead}
            disabled={loading || unreadCount === 0}
            className="flex items-center justify-center space-x-2 space-x w-full sm:w-auto"
          >
            <FaEnvelopeOpen />
            <span>تعليم الكل كمقروء</span>
          </Button>
          <Button
            variant="outlined"
            onClick={onDeleteAll}
            disabled={loading || totalMessages === 0}
            className="border-red-500 text-red-500 hover:bg-red-50 flex items-center justify-center space-x-2 space-x w-full sm:w-auto"
          >
            <FaTrash />
            <span>حذف الكل</span>
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <div className="flex items-center">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center ml-4"
              style={{ backgroundColor: "var(--color-secondary)" }}
            >
              <FaEnvelope className="text-white text-xl" />
            </div>
            <div>
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                {totalMessages}
              </p>
              <p
                className="text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                إجمالي الرسائل
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center ml-4"
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
              <p
                className="text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                رسائل غير مقروءة
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center ml-4"
              style={{ backgroundColor: "#10b981" }}
            >
              <FaEnvelope className="text-white text-xl" />
            </div>
            <div>
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                {totalMessages - unreadCount}
              </p>
              <p
                className="text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                رسائل مقروءة
              </p>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default MessagesHeader;
