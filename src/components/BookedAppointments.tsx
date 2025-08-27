import React from "react";
import { useRouter } from "next/navigation";
import { Card, Button } from "@/components/ui/index";
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaPhone,
  FaHome,
  FaMapMarkerAlt,
  FaCheck,
  FaPause,
  FaTrash,
} from "react-icons/fa";

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

interface BookedAppointmentsProps {
  appointments: Appointment[];
  onComplete: (id: string) => void;
  onPostpone: (appointment: Appointment) => void;
  onDelete: (appointment: Appointment) => void;
  loading: boolean;
}

const BookedAppointments: React.FC<BookedAppointmentsProps> = ({
  appointments,
  onComplete,
  onPostpone,
  onDelete,
  loading,
}) => {
  const router = useRouter();

  return (
    <div>
      <h2
        className="text-2xl font-semibold mb-6 flex items-center"
        style={{ color: "var(--color-primary)" }}
      >
        <FaUser className="ml-3" />
        المواعيد المحجوزة ({appointments.length})
      </h2>

      <div className="space-y-4">
        {appointments.map((appointment) => (
          <Card key={appointment.id}>
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center mb-2">
                    <FaCalendarAlt
                      className="ml-2"
                      style={{ color: "var(--color-primary)" }}
                    />
                    <span style={{ color: "var(--color-text)" }}>
                      {new Date(appointment.date).toLocaleDateString("ar-EG")}
                    </span>
                    <FaClock
                      className="mr-4 ml-2"
                      style={{ color: "var(--color-primary)" }}
                    />
                    <span style={{ color: "var(--color-text)" }}>
                      {appointment.time}
                    </span>
                  </div>
                </div>

                <span
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: "var(--color-secondary)",
                    color: "var(--color-background)",
                  }}
                >
                  محجوز
                </span>
              </div>

              {appointment.userName && (
                <div
                  className="border-t pt-3"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <div className="flex items-center mb-2">
                    <FaUser
                      className="ml-2"
                      style={{ color: "var(--color-secondary)" }}
                    />
                    <span
                      className="font-medium"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {appointment.userName}
                    </span>
                  </div>

                  {appointment.userPhone && (
                    <div className="flex items-center mb-2">
                      <FaPhone
                        className="ml-2"
                        style={{ color: "var(--color-secondary)" }}
                      />
                      <a
                        href={`tel:${appointment.userPhone}`}
                        className="hover:underline"
                        style={{ color: "var(--color-text)" }}
                      >
                        {appointment.userPhone}
                      </a>
                    </div>
                  )}

                  {appointment.apartmentTitle && (
                    <div className="flex items-center mb-2">
                      <FaHome
                        className="ml-2"
                        style={{ color: "var(--color-accent)" }}
                      />
                      <span
                        className="font-medium"
                        style={{ color: "var(--color-accent)" }}
                      >
                        {appointment.apartmentTitle}
                      </span>
                    </div>
                  )}

                  {appointment.apartmentLocation && (
                    <div className="flex items-center mb-2">
                      <FaMapMarkerAlt
                        className="ml-2"
                        style={{ color: "var(--color-accent)" }}
                      />
                      <span
                        className="text-sm"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {appointment.apartmentLocation}
                      </span>
                    </div>
                  )}

                  {appointment.userMessage && (
                    <div>
                      <p
                        className="text-sm font-medium mb-1"
                        style={{ color: "var(--color-primary)" }}
                      >
                        الرسالة:
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: "var(--color-text)" }}
                      >
                        {appointment.userMessage}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons for Booked Appointments */}
              <div
                className="flex flex-wrap gap-2 pt-3 border-t"
                style={{ borderColor: "var(--color-border)" }}
              >
                {appointment.apartmentId && (
                  <Button
                    variant="outlined"
                    size="sm"
                    onClick={() =>
                      router.push(
                        `/listings/listing/${appointment.apartmentId}`
                      )
                    }
                    className="border-blue-500 text-blue-600 hover:bg-blue-50"
                    disabled={loading}
                  >
                    <FaHome className="ml-1" />
                    عرض الشقة
                  </Button>
                )}
                <Button
                  variant="filled"
                  size="sm"
                  onClick={() => onComplete(appointment.id)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  disabled={loading}
                >
                  <FaCheck className="ml-1" />
                  إتمام
                </Button>
                <Button
                  variant="outlined"
                  size="sm"
                  onClick={() => onPostpone(appointment)}
                  className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                  disabled={loading}
                >
                  <FaPause className="ml-1" />
                  تأجيل
                </Button>
                <Button
                  variant="outlined"
                  size="sm"
                  onClick={() => onDelete(appointment)}
                  className="border-red-500 text-red-500 hover:bg-red-50"
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
            <p style={{ color: "var(--color-text)" }}>لا توجد مواعيد محجوزة</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookedAppointments;
