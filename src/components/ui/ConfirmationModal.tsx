"use client";

import React from "react";
import { Button } from "@/components/ui";
import { FaTimes, FaExclamationTriangle } from "react-icons/fa";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "warning" | "info";
  loading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "تأكيد",
  cancelText = "إلغاء",
  type = "danger",
  loading = false,
}) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "danger":
        return {
          iconColor: "#ef4444",
          confirmButtonClass: "bg-red-600 hover:bg-red-700 text-white",
          iconBg: "#fee2e2",
        };
      case "warning":
        return {
          iconColor: "#f59e0b",
          confirmButtonClass: "bg-yellow-600 hover:bg-yellow-700 text-white",
          iconBg: "#fef3c7",
        };
      case "info":
        return {
          iconColor: "#3b82f6",
          confirmButtonClass: "bg-blue-600 hover:bg-blue-700 text-white",
          iconBg: "#dbeafe",
        };
      default:
        return {
          iconColor: "#ef4444",
          confirmButtonClass: "bg-red-600 hover:bg-red-700 text-white",
          iconBg: "#fee2e2",
        };
    }
  };

  const typeStyles = getTypeStyles();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full mx-auto overflow-hidden shadow-2xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-3">
              <div 
                className="p-3 rounded-full"
                style={{ backgroundColor: typeStyles.iconBg }}
              >
                <FaExclamationTriangle 
                  className="text-xl"
                  style={{ color: typeStyles.iconColor }}
                />
              </div>
              <h3 
                className="text-lg font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                {title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={loading}
            >
              <FaTimes />
            </button>
          </div>

          {/* Message */}
          <div className="mb-6">
            <p 
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-text)" }}
            >
              {message}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row-reverse gap-3">
            <Button
              onClick={onConfirm}
              disabled={loading}
              className={`${typeStyles.confirmButtonClass} flex-1 min-w-0`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                  جاري المعالجة...
                </div>
              ) : (
                confirmText
              )}
            </Button>
            <Button
              onClick={onClose}
              variant="outlined"
              disabled={loading}
              className="flex-1 min-w-0 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              {cancelText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
