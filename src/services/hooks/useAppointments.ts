import { useState, useEffect, useCallback } from "react";
import { appointmentsApi } from "../api/appointments";
import type {
  UseAppointmentsReturn,
  Appointment,
  CreateAppointmentData,
  UpdateAppointmentData,
  BookingData,
} from "@/types";

export const useAppointments = (): UseAppointmentsReturn => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Fetch all appointments
  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await appointmentsApi.getAll();
      setAppointments(data);
      return data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "فشل في تحميل المواعيد";
      setError(errorMessage);
      console.error("Error fetching appointments:", err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch available appointments only
  const fetchAvailableAppointments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await appointmentsApi.getAvailable();
      setAppointments(data);
      return data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "فشل في تحميل المواعيد المتاحة";
      setError(errorMessage);
      console.error("Error fetching available appointments:", err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Create appointment
  const createAppointment = useCallback(async (data: CreateAppointmentData) => {
    try {
      setLoading(true);
      setError(null);
      const newAppointment = await appointmentsApi.create(data);
      setAppointments((prev) => [...prev, newAppointment]);
      return newAppointment;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "فشل في إنشاء الموعد";
      setError(errorMessage);
      console.error("Error creating appointment:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update appointment
  const updateAppointment = useCallback(
    async (id: string, data: UpdateAppointmentData) => {
      try {
        setLoading(true);
        setError(null);
        const updatedAppointment = await appointmentsApi.update(id, data);
        setAppointments((prev) =>
          prev.map((apt) => (apt.id === id ? updatedAppointment : apt))
        );
        return updatedAppointment;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "فشل في تحديث الموعد";
        setError(errorMessage);
        console.error("Error updating appointment:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Book appointment
  const bookAppointment = useCallback(
    async (id: string, bookingData: BookingData) => {
      try {
        setLoading(true);
        setError(null);
        const bookedAppointment = await appointmentsApi.book(id, bookingData);
        setAppointments((prev) =>
          prev.map((apt) => (apt.id === id ? bookedAppointment : apt))
        );
        return bookedAppointment;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "فشل في حجز الموعد";
        setError(errorMessage);
        console.error("Error booking appointment:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Cancel appointment
  const cancelAppointment = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const cancelledAppointment = await appointmentsApi.cancel(id);
      setAppointments((prev) =>
        prev.map((apt) => (apt.id === id ? cancelledAppointment : apt))
      );
      return cancelledAppointment;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "فشل في إلغاء الموعد";
      setError(errorMessage);
      console.error("Error cancelling appointment:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Complete appointment
  const completeAppointment = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const completedAppointment = await appointmentsApi.complete(id);
      setAppointments((prev) =>
        prev.map((apt) => (apt.id === id ? completedAppointment : apt))
      );
      return completedAppointment;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "فشل في إكمال الموعد";
      setError(errorMessage);
      console.error("Error completing appointment:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Postpone appointment
  const postponeAppointment = useCallback(
    async (id: string, newDate: string, newTime: string) => {
      try {
        setLoading(true);
        setError(null);
        const postponedAppointment = await appointmentsApi.postpone(
          id,
          newDate,
          newTime
        );
        setAppointments((prev) =>
          prev.map((apt) => (apt.id === id ? postponedAppointment : apt))
        );
        return postponedAppointment;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "فشل في تأجيل الموعد";
        setError(errorMessage);
        console.error("Error postponing appointment:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Delete appointment
  const deleteAppointment = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await appointmentsApi.delete(id);
      setAppointments((prev) => prev.filter((apt) => apt.id !== id));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "فشل في حذف الموعد";
      setError(errorMessage);
      console.error("Error deleting appointment:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Search appointments
  const searchAppointments = useCallback(async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await appointmentsApi.search(query);
      setAppointments(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "فشل في البحث";
      setError(errorMessage);
      console.error("Error searching appointments:", err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Get appointments by status
  const getAppointmentsByStatus = useCallback(
    async (status: "available" | "booked" | "completed" | "postponed") => {
      try {
        setLoading(true);
        setError(null);
        const data = await appointmentsApi.getByStatus(status);
        setAppointments(data);
        return data;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "فشل في تحميل المواعيد";
        setError(errorMessage);
        console.error("Error fetching appointments by status:", err);
        return [];
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Initial fetch on component mount
  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return {
    // State
    appointments,
    loading,
    error,

    // Actions
    fetchAppointments,
    fetchAvailableAppointments,
    createAppointment,
    updateAppointment,
    bookAppointment,
    cancelAppointment,
    completeAppointment,
    postponeAppointment,
    deleteAppointment,
    searchAppointments,
    getAppointmentsByStatus,
    clearError,

    // Computed values
    availableAppointments: appointments.filter(
      (apt) => apt.status === "available"
    ),
    bookedAppointments: appointments.filter((apt) => apt.status === "booked"),
    completedAppointments: appointments.filter(
      (apt) => apt.status === "completed"
    ),
    postponedAppointments: appointments.filter(
      (apt) => apt.status === "postponed"
    ),
  };
};
