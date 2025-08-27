// ============================================
// SERVICES INDEX - UNIFIED EXPORTS
// ============================================

// API Services
export { apartmentsApi } from "./api/apartments";
export { appointmentsApi } from "./api/appointments";
export { messagesApi } from "./api/messages";
export { default as api } from "./api/config";

// Hooks
export { useApartments } from "./hooks/useApartments";
export { useAppointments } from "./hooks/useAppointments";
export { useMessages } from "./hooks/useMessages";
