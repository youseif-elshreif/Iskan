import React from "react";
import { Card, Button } from "@/components/ui/index";
import { FaCalendarAlt, FaClock, FaTrash } from "react-icons/fa";

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

interface AvailableAppointmentsProps {
  appointments: Appointment[];
  onDelete: (appointment: Appointment) => void;
  loading: boolean;
}

const AvailableAppointments: React.FC<AvailableAppointmentsProps> = ({
  appointments,
  onDelete,
  loading,
}) => {
  return (
    <div>
      <h2
        className="text-2xl font-semibold mb-6 flex items-center"
        style={{ color: "var(--color-secondary)" }}
      >
        <FaCalendarAlt className="ml-3" />
        المواعيد المتاحة ({appointments.length})
      </h2>

      <div className="space-y-4">
        {appointments.map((appointment) => (
          <Card key={appointment.id}>
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center mb-2">
                  <FaCalendarAlt
                    className="ml-2"
                    style={{ color: "var(--color-secondary)" }}
                  />
                  <span style={{ color: "var(--color-text)" }}>
                    {new Date(appointment.date).toLocaleDateString("ar-EG")}
                  </span>
                </div>
                <div className="flex items-center">
                  <FaClock
                    className="ml-2"
                    style={{ color: "var(--color-secondary)" }}
                  />
                  <span style={{ color: "var(--color-text)" }}>
                    {appointment.time}
                  </span>
                </div>
              </div>

              <div className="flex space-x-2 space-x">
                <Button
                  variant="outlined"
                  size="sm"
                  onClick={() => onDelete(appointment)}
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  disabled={loading}
                >
                  <FaTrash className="ml-1" />
                  حذف
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {appointments.length === 0 && (
          <div className="text-center py-8">
            <p style={{ color: "var(--color-text)" }}>لا توجد مواعيد متاحة</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableAppointments;
