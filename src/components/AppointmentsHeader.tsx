import React from "react";
import {Button} from "@/components/ui/index";
import { FaPlus } from "react-icons/fa";

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

interface AppointmentsHeaderProps {
  appointments: Appointment[];
  onAddNew: () => void;
  loading: boolean;
}

const AppointmentsHeader: React.FC<AppointmentsHeaderProps> = ({
  appointments,
  onAddNew,
  loading,
}) => {
  const availableAppointments = appointments.filter(
    (apt) => apt.status === "available"
  );
  const bookedAppointments = appointments.filter(
    (apt) => apt.status === "booked"
  );
  const completedAppointments = appointments.filter(
    (apt) => apt.status === "completed"
  );
  const postponedAppointments = appointments.filter(
    (apt) => apt.status === "postponed"
  );

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1
          className="text-3xl font-bold"
          style={{ color: "var(--color-primary)" }}
        >
          إدارة المواعيد
        </h1>
        <div className="flex gap-4 mt-2 text-sm">
          <span style={{ color: "var(--color-text-muted)" }}>
            المتاحة: {availableAppointments.length}
          </span>
          <span style={{ color: "var(--color-text-muted)" }}>
            المحجوزة: {bookedAppointments.length}
          </span>
          <span style={{ color: "var(--color-text-muted)" }}>
            المكتملة: {completedAppointments.length}
          </span>
          <span style={{ color: "var(--color-text-muted)" }}>
            المؤجلة: {postponedAppointments.length}
          </span>
        </div>
      </div>
      <Button variant="filled" onClick={onAddNew} disabled={loading}>
        <FaPlus className="ml-2" />
        إضافة موعد جديد
      </Button>
    </div>
  );
};

export default AppointmentsHeader;
