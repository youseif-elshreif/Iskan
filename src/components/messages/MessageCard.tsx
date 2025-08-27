import React from "react";
import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/index";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaClock,
  FaEye,
  FaEyeSlash,
  FaTrash,
} from "react-icons/fa";

interface Message {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

interface MessageCardProps {
  message: Message;
  onToggleRead: (id: string, currentStatus: boolean) => void;
  onDelete: (id: string) => void;
  loading: boolean;
}

const MessageCard: React.FC<MessageCardProps> = ({
  message,
  onToggleRead,
  onDelete,
  loading,
}) => {
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

  return (
    <Card
      className={`transition-all duration-300 ${
        !message.isRead
          ? "ring-2 ring-blue-300 bg-blue-50 shadow-lg border-l-4 border-l-blue-500"
          : "bg-gray-50 opacity-75 border-l-4 border-l-green-500 hover:opacity-100"
      }`}
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <FaUser
              className="ml-2"
              style={{ color: "var(--color-secondary)" }}
            />
            <span
              className={`font-semibold text-lg ${
                !message.isRead ? "text-blue-800" : "text-gray-600"
              }`}
              style={{ color: !message.isRead ? "#1e40af" : "#6b7280" }}
            >
              {message.name}
            </span>

            {!message.isRead && (
              <span className="mr-3 px-3 py-1 rounded-full text-xs font-bold bg-red-500 text-white animate-pulse">
                جديد
              </span>
            )}

            {message.isRead && (
              <span className="mr-3 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-300">
                ✓ مقروء
              </span>
            )}
          </div>

          <div className="flex items-center text-sm space-x-4 space-x">
            <div className="flex items-center">
              <FaClock
                className="ml-1"
                style={{ color: "var(--color-text-muted)" }}
              />
              <span style={{ color: "var(--color-text-muted)" }}>
                {formatDate(message.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap gap-4 text-sm">
          {message.email && (
            <div className="flex items-center">
              <FaEnvelope
                className="ml-1"
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
            <div className="flex items-center">
              <FaPhone
                className="ml-1"
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

        {/* Message Content */}
        <div
          className={`p-4 rounded-lg ${
            !message.isRead
              ? "bg-blue-100 border border-blue-200"
              : "bg-gray-100 border border-gray-200"
          }`}
        >
          <p
            className={`${
              !message.isRead ? "text-blue-900 font-medium" : "text-gray-700"
            }`}
          >
            {message.message}
          </p>
        </div>

        {/* Action Buttons */}
        <div
          className="flex justify-between items-center pt-3 border-t"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div className="flex space-x-2 space-x">
            <Button
              variant="outlined"
              size="sm"
              onClick={() => onToggleRead(message.id, message.isRead)}
              disabled={loading}
              className="flex items-center space-x-1 space-x"
            >
              {message.isRead ? <FaEyeSlash /> : <FaEye />}
              <span>
                {message.isRead ? "تعليم كغير مقروء" : "تعليم كمقروء"}
              </span>
            </Button>
          </div>

          <Button
            variant="outlined"
            size="sm"
            onClick={() => onDelete(message.id)}
            disabled={loading}
            className="border-red-500 text-red-500 hover:bg-red-50 flex items-center space-x-1 space-x"
          >
            <FaTrash />
            <span>حذف</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default MessageCard;
