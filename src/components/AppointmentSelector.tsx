import React from "react";
import { Card, Button } from "@/components/ui/index";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

interface Appointment {
  id: string;
  date: string;
  time: string;
  status: "available" | "booked" | "completed" | "postponed";
}

interface AppointmentSelectorProps {
  appointments: Appointment[];
  selectedAppointment: Appointment | null;
  onSelectAppointment: (appointment: Appointment) => void;
  onBack?: () => void;
}

const AppointmentSelector: React.FC<AppointmentSelectorProps> = ({
  appointments,
  selectedAppointment,
  onSelectAppointment,
  onBack,
}) => {
  return (
    <Card>
      <h3
        className="text-xl font-semibold mb-4"
        style={{ color: "var(--color-secondary)" }}
      >
        <FaCalendarAlt className="inline-block ml-2" />
        المواعيد المتاحة
      </h3>

      {appointments.length === 0 ? (
        <div className="text-center py-8">
          <p style={{ color: "var(--color-text-muted)" }}>
            لا توجد مواعيد متاحة حالياً
          </p>
          {onBack && (
            <Button variant="outlined" className="mt-4" onClick={onBack}>
              العودة للشقة
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                selectedAppointment?.id === appointment.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => onSelectAppointment(appointment)}
            >
              <div className="flex items-center space-x-3 space-x">
                <FaCalendarAlt
                  className="text-lg"
                  style={{ color: "var(--color-secondary)" }}
                />
                <div>
                  <div
                    className="font-medium"
                    style={{ color: "var(--color-text)" }}
                  >
                    {new Date(appointment.date).toLocaleDateString("ar-EG")}
                  </div>
                  <div className="flex items-center mt-1">
                    <FaClock
                      className="ml-1"
                      style={{ color: "var(--color-text-muted)" }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {appointment.time}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default AppointmentSelector;
