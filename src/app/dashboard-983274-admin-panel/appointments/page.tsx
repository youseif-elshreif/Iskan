"use client";
import { useState } from "react";
import {
  AppointmentsHeader,
  AvailableAppointments,
  BookedAppointments,
  CompletedAppointments,
  PostponedAppointments,
  PostponeModal,
} from "@/components/appointments";
import { MessageNotification } from "@/components/messages";
import { useAppointments } from "@/services/hooks/useAppointments";
import { Appointment } from "@/types";

export default function AppointmentsPage() {
  // استخدام الـ custom hooks
  const {
    appointments,
    loading,
    updateAppointment,
    deleteAppointment: deleteAppointmentAPI,
    postponeAppointment: postponeAppointmentAPI,
    availableAppointments,
    bookedAppointments,
    completedAppointments,
    postponedAppointments,
  } = useAppointments();

  const [postponingAppointment, setPostponingAppointment] =
    useState<Appointment | null>(null);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  // Show message for 3 seconds
  const showMessage = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  // Update appointment status
  const updateAppointmentStatus = async (
    id: string,
    status: Appointment["status"]
  ) => {
    try {
      await updateAppointment(id, { status });
      showMessage("تم تحديث حالة الموعد بنجاح", "success");
    } catch {
      showMessage("فشل في تحديث الموعد", "error");
    }
  };

  // Delete appointment
  const handleDeleteAppointment = async (appointment: Appointment) => {
    if (!confirm("هل أنت متأكد من حذف هذا الموعد؟")) return;

    try {
      await deleteAppointmentAPI(appointment.id);
      showMessage("تم حذف الموعد بنجاح", "success");
    } catch {
      showMessage("فشل في حذف الموعد", "error");
    }
  };

  // Postpone appointment
  const handlePostponeAppointment = async (
    newDate: string,
    newTime: string
  ) => {
    if (!postponingAppointment) return;

    try {
      await postponeAppointmentAPI(postponingAppointment.id, newDate, newTime);
      setPostponingAppointment(null);
      showMessage("تم تأجيل الموعد بنجاح", "success");
    } catch {
      showMessage("فشل في تأجيل الموعد", "error");
    }
  };

  return (
    <div className="space-y-8">
      <AppointmentsHeader
        appointments={appointments}
        onAddNew={() => {}} // Removed add functionality
        loading={loading}
      />

      <MessageNotification message={message} />

      <div className="grid gap-8">
        <AvailableAppointments
          appointments={availableAppointments}
          onDelete={handleDeleteAppointment}
          loading={loading}
        />

        <BookedAppointments
          appointments={bookedAppointments}
          onComplete={(id) => updateAppointmentStatus(id, "completed")}
          onPostpone={(appointment) => setPostponingAppointment(appointment)}
          onDelete={handleDeleteAppointment}
          loading={loading}
        />

        <PostponedAppointments
          appointments={postponedAppointments}
          onComplete={(id) => updateAppointmentStatus(id, "completed")}
          onPostpone={(appointment) => setPostponingAppointment(appointment)}
          onReactivate={(id) => updateAppointmentStatus(id, "available")}
          onDelete={handleDeleteAppointment}
          loading={loading}
        />

        <CompletedAppointments
          appointments={completedAppointments}
          onDelete={handleDeleteAppointment}
          loading={loading}
        />
      </div>

      <PostponeModal
        appointment={postponingAppointment}
        isOpen={!!postponingAppointment}
        onClose={() => setPostponingAppointment(null)}
        onConfirm={handlePostponeAppointment}
        loading={loading}
      />
    </div>
  );
}
