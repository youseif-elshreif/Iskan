import React from "react";
import { useRouter } from "next/navigation";
import { Card, Button } from "@/components/ui/index";
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaHome,
  FaMapMarkerAlt,
  FaTrash,
  FaPause,
  FaCheck,
  FaEdit,
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

interface PostponedAppointmentsProps {
  appointments: Appointment[];
  onComplete: (id: string) => void;
  onPostpone: (appointment: Appointment) => void;
  onReactivate: (id: string) => void;
  onDelete: (appointment: Appointment) => void;
  loading: boolean;
}

const PostponedAppointments: React.FC<PostponedAppointmentsProps> = ({
  appointments,
  onComplete,
  onPostpone,
  onReactivate,
  onDelete,
  loading,
}) => {
  const router = useRouter();

  return (
    <div>
      <h2
        className="text-2xl font-semibold mb-6 flex items-center"
        style={{ color: "var(--color-warning)" }}
      >
        <FaPause className="ml-3" />
        المواعيد المؤجلة ({appointments.length})
      </h2>

      <div className="space-y-4">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="bg-yellow-50">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center mb-2">
                    <FaCalendarAlt
                      className="ml-2"
                      style={{ color: "var(--color-warning)" }}
                    />
                    <span style={{ color: "var(--color-text)" }}>
                      {new Date(appointment.date).toLocaleDateString("ar-EG")}
                    </span>
                    <FaClock
                      className="mr-4 ml-2"
                      style={{ color: "var(--color-warning)" }}
                    />
                    <span style={{ color: "var(--color-text)" }}>
                      {appointment.time}
                    </span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700">
                  مؤجل
                </span>
              </div>

              {appointment.userName && (
                <div className="flex items-center">
                  <FaUser
                    className="ml-2"
                    style={{ color: "var(--color-warning)" }}
                  />
                  <span style={{ color: "var(--color-text)" }}>
                    {appointment.userName}
                  </span>
                </div>
              )}

              {appointment.apartmentTitle && (
                <div className="flex items-center mt-2">
                  <FaHome
                    className="ml-2"
                    style={{ color: "var(--color-warning)" }}
                  />
                  <span
                    className="font-medium"
                    style={{ color: "var(--color-warning)" }}
                  >
                    {appointment.apartmentTitle}
                  </span>
                </div>
              )}

              {appointment.apartmentLocation && (
                <div className="flex items-center mt-1">
                  <FaMapMarkerAlt
                    className="ml-2"
                    style={{ color: "var(--color-warning)" }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {appointment.apartmentLocation}
                  </span>
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-2">
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
                  variant="outlined"
                  size="sm"
                  onClick={() => onReactivate(appointment.id)}
                  className="border-green-500 text-green-600 hover:bg-green-50"
                  disabled={loading}
                >
                  <FaCheck className="ml-1" />
                  إعادة تفعيل
                </Button>
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
                  <FaEdit className="ml-1" />
                  تعديل الموعد
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
            <p style={{ color: "var(--color-text)" }}>لا توجد مواعيد مؤجلة</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostponedAppointments;
