import React from "react";
import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/index";
import { FaTrash, FaExclamationTriangle } from "react-icons/fa";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  itemName?: string;
  loading?: boolean;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  itemName,
  loading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="max-w-md w-full">
        <Card>
          <div className="text-center">
            {/* Warning Icon */}
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <FaExclamationTriangle className="text-red-500 text-2xl" />
            </div>

            {/* Title */}
            <h2
              className="text-xl font-bold mb-4"
              style={{ color: "var(--color-primary)" }}
            >
              {title}
            </h2>

            {/* Message */}
            <p className="mb-2" style={{ color: "var(--color-text)" }}>
              {message}
            </p>

            {/* Item Name */}
            {itemName && (
              <p
                className="font-semibold mb-6"
                style={{ color: "var(--color-primary)" }}
              >
                &ldquo;{itemName}&rdquo;
              </p>
            )}

            <p
              className="text-sm mb-8"
              style={{ color: "var(--color-text-muted)" }}
            >
              لا يمكن التراجع عن هذا الإجراء
            </p>

            {/* Action Buttons */}
            <div className="flex space-x-4 justify-center">
              <Button
                variant="outlined"
                onClick={onClose}
                disabled={loading}
                className="flex-1"
              >
                إلغاء
              </Button>
              <Button
                variant="filled"
                onClick={onConfirm}
                disabled={loading}
                className="flex-1 bg-red-500 hover:bg-red-600 border-red-500 hover:border-red-600 flex items-center justify-center"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                    جاري الحذف...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <FaTrash className="ml-2" />
                    تأكيد الحذف
                  </div>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
