import React, { useState } from "react";
import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/index";
import { FaCalendarAlt, FaClock, FaTimes } from "react-icons/fa";

interface Appointment {
  id: string;
  date: string;
  time: string;
  userName?: string;
  userPhone?: string;
  userMessage?: string;
  apartmentId?: string;
  apartmentTitle?: string;
  apartmentLocation?: string;
  status: "available" | "booked" | "completed" | "postponed";
}

interface PostponeModalProps {
  appointment: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newDate: string, newTime: string, reason?: string) => void;
  loading: boolean;
}

const PostponeModal: React.FC<PostponeModalProps> = ({
  appointment,
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = () => {
    if (!newDate || !newTime) {
      setError("يرجى اختيار التاريخ والوقت الجديد");
      return;
    }
    setError("");
    onConfirm(newDate, newTime, reason);
    // Reset form
    setNewDate("");
    setNewTime("");
    setReason("");
  };

  const handleClose = () => {
    setNewDate("");
    setNewTime("");
    setReason("");
    setError("");
    onClose();
  };

  if (!isOpen || !appointment) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="!p-0 w-full max-w-md mx-4  overflow-hidden">
        <div className="max-h-[calc(100vh-200px)] overflow-auto rounded-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <h3
              className="text-xl font-semibold"
              style={{ color: "var(--color-warning)" }}
            >
              تأجيل الموعد
            </h3>
            <Button
              variant="outlined"
              size="sm"
              onClick={handleClose}
              className="border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              <FaTimes />
            </Button>
          </div>

          <div className="space-y-4">
            {/* Current appointment details */}
            <div className="bg-gray-50 p-3 rounded">
              <h4 className="font-medium mb-2">الموعد الحالي:</h4>
              <div className="flex items-center mb-1">
                <FaCalendarAlt
                  className="ml-2"
                  style={{ color: "var(--color-warning)" }}
                />
                <span style={{ color: "var(--color-text)" }}>
                  {new Date(appointment.date).toLocaleDateString("ar-EG")}
                </span>
              </div>
              <div className="flex items-center">
                <FaClock
                  className="ml-2"
                  style={{ color: "var(--color-warning)" }}
                />
                <span style={{ color: "var(--color-text)" }}>
                  {appointment.time}
                </span>
              </div>
            </div>

            {/* New date selection */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--color-text)" }}
              >
                التاريخ الجديد
              </label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            {/* New time selection */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--color-text)" }}
              >
                الوقت الجديد
              </label>
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-2 pt-4">
              <Button
                variant="filled"
                onClick={handleConfirm}
                disabled={loading || !newDate || !newTime}
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                {loading ? "جاري التأجيل..." : "تأجيل الموعد"}
              </Button>
              <Button
                variant="outlined"
                onClick={handleClose}
                disabled={loading}
                className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                إلغاء
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PostponeModal;
