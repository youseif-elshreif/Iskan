import api from "./config";
import type {
  Appointment,
  CreateAppointmentData,
  UpdateAppointmentData,
  BookingData,
} from "@/types";

export const appointmentsApi = {
  // Get all appointments
  getAll: async (): Promise<Appointment[]> => {
    try {
      const response = await api.get("/appointments");
      return response.data;
    } catch (error) {
      console.error("Error fetching appointments:", error);
      throw new Error("Failed to fetch appointments");
    }
  },

  // Get appointments by status
  getByStatus: async (
    status: "available" | "booked" | "completed" | "postponed"
  ): Promise<Appointment[]> => {
    try {
      const response = await api.get("/appointments", {
        params: { status },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching appointments by status:", error);
      throw new Error("Failed to fetch appointments by status");
    }
  },

  // Get available appointments only
  getAvailable: async (): Promise<Appointment[]> => {
    return appointmentsApi.getByStatus("available");
  },

  // Get appointment by ID
  getById: async (id: string): Promise<Appointment> => {
    try {
      const response = await api.get(`/appointments/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching appointment:", error);
      throw new Error("Failed to fetch appointment");
    }
  },

  // Create new appointment
  create: async (
    appointmentData: CreateAppointmentData
  ): Promise<Appointment> => {
    try {
      const response = await api.post("/appointments", {
        ...appointmentData,
        id: crypto.randomUUID(),
        status: appointmentData.status || "available",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return response.data;
    } catch (error) {
      console.error("Error creating appointment:", error);
      throw new Error("Failed to create appointment");
    }
  },

  // Update appointment
  update: async (
    id: string,
    appointmentData: UpdateAppointmentData
  ): Promise<Appointment> => {
    try {
      const response = await api.patch(`/appointments/${id}`, {
        ...appointmentData,
        updatedAt: new Date().toISOString(),
      });
      return response.data;
    } catch (error) {
      console.error("Error updating appointment:", error);
      throw new Error("Failed to update appointment");
    }
  },

  // Book an appointment
  book: async (id: string, bookingData: BookingData): Promise<Appointment> => {
    try {
      const response = await api.patch(`/appointments/${id}`, {
        status: "booked",
        userName: bookingData.userName,
        userPhone: bookingData.userPhone,
        userEmail: bookingData.userEmail,
        userMessage: bookingData.userMessage,
        apartmentId: bookingData.apartmentId,
        apartmentTitle: bookingData.apartmentTitle,
        apartmentLocation: bookingData.apartmentLocation,
        updatedAt: new Date().toISOString(),
      });
      return response.data;
    } catch (error) {
      console.error("Error booking appointment:", error);
      throw new Error("Failed to book appointment");
    }
  },

  // Cancel appointment (set back to available)
  cancel: async (id: string): Promise<Appointment> => {
    try {
      const response = await api.patch(`/appointments/${id}`, {
        status: "available",
        userName: undefined,
        userPhone: undefined,
        userEmail: undefined,
        userMessage: undefined,
        apartmentId: undefined,
        apartmentTitle: undefined,
        apartmentLocation: undefined,
        postponeReason: undefined,
        updatedAt: new Date().toISOString(),
      });
      return response.data;
    } catch (error) {
      console.error("Error canceling appointment:", error);
      throw new Error("Failed to cancel appointment");
    }
  },

  // Complete appointment
  complete: async (id: string): Promise<Appointment> => {
    try {
      const response = await api.patch(`/appointments/${id}`, {
        status: "completed",
        updatedAt: new Date().toISOString(),
      });
      return response.data;
    } catch (error) {
      console.error("Error completing appointment:", error);
      throw new Error("Failed to complete appointment");
    }
  },

  // Postpone appointment
  postpone: async (
    id: string,
    newDate: string,
    newTime: string,
    reason?: string
  ): Promise<Appointment> => {
    try {
      const response = await api.patch(`/appointments/${id}`, {
        status: "postponed",
        date: newDate,
        time: newTime,
        postponeReason: reason,
        updatedAt: new Date().toISOString(),
      });
      return response.data;
    } catch (error) {
      console.error("Error postponing appointment:", error);
      throw new Error("Failed to postpone appointment");
    }
  },

  // Delete appointment
  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/appointments/${id}`);
    } catch (error) {
      console.error("Error deleting appointment:", error);
      throw new Error("Failed to delete appointment");
    }
  },

  // Search appointments
  search: async (query: string): Promise<Appointment[]> => {
    try {
      if (!query.trim()) {
        return await appointmentsApi.getAll();
      }

      const response = await api.get("/appointments", {
        params: { q: query },
      });
      return response.data;
    } catch (error) {
      console.error("Error searching appointments:", error);
      throw new Error("Failed to search appointments");
    }
  },
};
