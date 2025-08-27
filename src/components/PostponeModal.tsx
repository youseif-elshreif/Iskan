import React, { useState } from "react";
import {Card,Button} from "@/components/ui/index";
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

  const handleConfirm = () => {
    if (!newDate || !newTime) {
      alert("يرجى اختيار التاريخ والوقت الجديد");
      return;
    }
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
    onClose();
  };

  if (!isOpen || !appointment) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4 max-h-screen overflow-y-auto">
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

          {/* Reason for postponement */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--color-text)" }}
            >
              سبب التأجيل (اختياري)
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="أدخل سبب التأجيل..."
            />
          </div>

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
      </Card>
    </div>
  );
};

export default PostponeModal;
