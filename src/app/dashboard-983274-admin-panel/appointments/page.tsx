"use client";
import { useState } from "react";
import {
  AppointmentsHeader,
  AvailableAppointments,
  BookedAppointments,
  CompletedAppointments,
  PostponedAppointments,
  PostponeModal,
  AddAppointmentModal,
} from "@/components/appointments";
import { MessageNotification } from "@/components/messages";
import { ConfirmationModal } from "@/components/ui";
import { useAppointments } from "@/services/hooks/useAppointments";
import { Appointment } from "@/types";

export default function AppointmentsPage() {
  // استخدام الـ custom hooks
  const {
    appointments,
    loading,
    createAppointment,
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
  const [addAppointmentModalOpen, setAddAppointmentModalOpen] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  // Confirmation modal
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    appointment: Appointment | null;
  }>({
    isOpen: false,
    appointment: null,
  });
  const [confirmationLoading, setConfirmationLoading] = useState(false);

  // Show message for 3 seconds
  const showMessage = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  // Add new appointment
  const handleAddAppointment = async (appointmentData: {
    date: string;
    time: string;
    notes?: string;
  }) => {
    try {
      await createAppointment({
        date: appointmentData.date,
        time: appointmentData.time,
        status: "available",
      });
      setAddAppointmentModalOpen(false);
      showMessage("تم إضافة الموعد بنجاح", "success");
    } catch {
      showMessage("فشل في إضافة الموعد", "error");
    }
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
    setDeleteConfirmation({
      isOpen: true,
      appointment: appointment,
    });
  };

  // Confirm delete appointment
  const confirmDeleteAppointment = async () => {
    if (!deleteConfirmation.appointment) return;

    try {
      setConfirmationLoading(true);
      await deleteAppointmentAPI(deleteConfirmation.appointment.id);
      showMessage("تم حذف الموعد بنجاح", "success");
      setDeleteConfirmation({ isOpen: false, appointment: null });
    } catch {
      showMessage("فشل في حذف الموعد", "error");
    } finally {
      setConfirmationLoading(false);
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
    <div>
      <AppointmentsHeader
        appointments={appointments}
        onAddNew={() => setAddAppointmentModalOpen(true)}
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

      {/* Add Appointment Modal */}
      <AddAppointmentModal
        isOpen={addAppointmentModalOpen}
        onClose={() => setAddAppointmentModalOpen(false)}
        onSubmit={handleAddAppointment}
        loading={loading}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteConfirmation.isOpen}
        onClose={() =>
          setDeleteConfirmation({ isOpen: false, appointment: null })
        }
        onConfirm={confirmDeleteAppointment}
        title="حذف الموعد"
        message={`هل أنت متأكد من حذف موعد ${deleteConfirmation.appointment?.date} في تمام الساعة ${deleteConfirmation.appointment?.time}؟ لا يمكن التراجع عن هذا الإجراء.`}
        confirmText="حذف"
        cancelText="إلغاء"
        type="danger"
        loading={confirmationLoading}
      />
    </div>
  );
}
