// ============================================
// UNIFIED TYPES FOR ISKAN PROJECT
// ============================================

import { ReactNode } from "react";

// ============================================
// CORE BUSINESS TYPES
// ============================================

/**
 * User Types
 */
export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  avatar?: string;
}

export interface UserWithPassword extends User {
  password: string;
}

/**
 * Apartment Types
 */
export interface Apartment {
  id: string;
  title: string;
  description: string;
  price: string;
  location: string;
  area?: string;
  university?: string;
  nearestUniversity?: string;
  rooms?: string;
  size?: string;
  imageUrl: string;
  images?: string[];
  amenities?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export type CreateApartmentData = Omit<
  Apartment,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateApartmentData = Partial<CreateApartmentData>;

/**
 * Appointment Types
 */
export interface Appointment {
  id: string;
  date: string;
  time: string;
  status: "available" | "booked" | "completed" | "postponed";
  userName?: string;
  userPhone?: string;
  userEmail?: string;
  userMessage?: string;
  apartmentId?: string;
  apartmentTitle?: string;
  apartmentLocation?: string;
  postponeReason?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateAppointmentData = {
  date: string;
  time: string;
  status?: "available" | "booked" | "completed" | "postponed";
};

export type UpdateAppointmentData = Partial<CreateAppointmentData> & {
  userName?: string;
  userPhone?: string;
  userEmail?: string;
  userMessage?: string;
  apartmentId?: string;
  apartmentTitle?: string;
  apartmentLocation?: string;
  postponeReason?: string;
};

export interface BookingData {
  userName: string;
  userPhone: string;
  userEmail?: string;
  userMessage?: string;
  apartmentId: string;
  apartmentTitle: string;
  apartmentLocation: string;
}

/**
 * Message Types
 */
export interface Message {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export type CreateMessageData = {
  name: string;
  email?: string;
  phone?: string;
  message: string;
  isRead?: boolean;
};

export type UpdateMessageData = Partial<CreateMessageData> & {
  isRead?: boolean;
};

/**
 * Listing Types (converted from Apartment for frontend display)
 */
export interface Listing {
  id: string;
  title: string;
  address: string;
  area: string;
  university: string;
  nearestUniversity: string;
  rooms: string;
  price: number;
  description: string;
  image: string;
  size: string;
  images: string[];
  amenities: string[];
  mapEmbedUrl: string;
}

// ============================================
// FILTER TYPES
// ============================================

export interface FilterData {
  area: string[];
  university: string[];
  size: string[];
  rooms: string[];
}

export interface ApartmentFilters {
  area?: string[];
  university?: string[];
  size?: string[];
  rooms?: string[];
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

// ============================================
// FORM TYPES
// ============================================

/**
 * Contact Form
 */
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

/**
 * Apartment Form
 */
export interface ApartmentFormData {
  title: string;
  description: string;
  price: string;
  location: string;
  area: string;
  university: string;
  nearestUniversity: string;
  rooms: string;
  size: string;
  imageUrl: string;
  images: string[];
}

export interface ApartmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ApartmentFormData) => Promise<void>;
  initialData?: Partial<ApartmentFormData>;
  isEditing?: boolean;
  loading?: boolean;
}

export interface AdminListingCardProps {
  id: string;
  title: string;
  description: string;
  price: string;
  location: string;
  area?: string;
  nearestUniversity?: string;
  rooms?: string;
  size?: string;
  imageUrl: string;
  onEdit: () => void;
  onDelete: () => void;
  isLoading?: boolean;
}

/**
 * Booking Form
 */
export interface BookingFormData {
  userName: string;
  userPhone: string;
  userEmail: string;
  userMessage: string;
}

/**
 * Stats Data
 */
export interface StatsData {
  totalApartments: number;
  totalBookings: number;
  totalMessages: number;
  monthlyGrowth: number;
}

// ============================================
// UI COMPONENT TYPES
// ============================================

/**
 * Message Notification
 */
export interface MessageNotificationProps {
  message: {
    text: string;
    type: "success" | "error";
  } | null;
}

/**
 * Breadcrumb Types
 */
export interface BreadcrumbItem {
  href?: string;
  label: string;
  isActive?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Button Types
 */
export type ButtonVariant = "filled" | "outlined" | "secondary" | "disabled";
export type SizeVariant = "sm" | "md" | "lg";
export type ExtendedSizeVariant = SizeVariant | "xl";

export interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: SizeVariant;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

/**
 * Card Types
 */
export type ShadowVariant = "sm" | "md" | "lg";
export type RoundedVariant = "sm" | "md" | "lg" | "xl";
export type PaddingVariant = "none" | "sm" | "md" | "lg";

export interface CardProps {
  children: ReactNode;
  shadow?: ShadowVariant;
  rounded?: RoundedVariant;
  padding?: PaddingVariant;
  className?: string;
}

/**
 * Modal Types
 */
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Search Bar Types
 */
export interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
}

/**
 * Notification Types
 */
export interface NotificationMessage {
  text: string;
  type: "success" | "error" | "warning" | "info";
}

// ============================================
// COMPONENT PROP TYPES
// ============================================

/**
 * Listing Components
 */
export interface ListingCardProps {
  id: string;
  image: string;
  nearestUniversity: string;
  address: string;
  description: string;
  price: number;
}

export interface ListingHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export interface ListingDetailsProps {
  listing: Listing;
  className?: string;
}

export interface ListingSidebarProps {
  listingId: string;
  className?: string;
}

export interface ListingImageCarouselProps {
  images: string[];
  title: string;
  className?: string;
}

export interface ListingMapProps {
  mapEmbedUrl: string;
  className?: string;
}

export interface ListingNotFoundProps {
  message?: string;
  className?: string;
}

/**
 * Apartment Components
 */
export interface ApartmentInfoCardProps {
  apartment: Apartment;
  className?: string;
}

export interface ApartmentsHeaderProps {
  showFilters: boolean;
  onToggleFilters: () => void;
  onAddApartment: () => void;
  filters: FilterData;
}

export interface ApartmentsListProps {
  apartments: Apartment[];
  totalApartments: number;
  onEdit: (apartment: Apartment) => void;
  onDelete: (apartment: Apartment) => void;
  loading: boolean;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  onAddFirst?: () => void;
}

export interface ApartmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ApartmentFormData) => Promise<void>;
  initialData?: Partial<ApartmentFormData>;
  isEditing?: boolean;
  loading?: boolean;
}

/**
 * Appointment Components
 */
export interface AppointmentSelectorProps {
  appointments: Appointment[];
  selectedAppointment: Appointment | null;
  onSelectAppointment: (appointment: Appointment) => void;
  onBack: () => void;
}

export interface AppointmentsHeaderProps {
  appointments: Appointment[];
  onAddNew: () => void;
  loading: boolean;
}

export interface AvailableAppointmentsProps {
  appointments: Appointment[];
  onDelete: (appointment: Appointment) => void;
  loading: boolean;
}

export interface BookedAppointmentsProps {
  appointments: Appointment[];
  onComplete: (id: string) => void;
  onPostpone: (appointment: Appointment) => void;
  onDelete: (appointment: Appointment) => void;
  loading: boolean;
}

export interface CompletedAppointmentsProps {
  appointments: Appointment[];
  onDelete: (appointment: Appointment) => void;
  loading: boolean;
}

export interface PostponedAppointmentsProps {
  appointments: Appointment[];
  onComplete: (id: string) => void;
  onPostpone: (appointment: Appointment) => void;
  onReactivate: (id: string) => void;
  onDelete: (appointment: Appointment) => void;
  loading: boolean;
}

export interface PostponeModalProps {
  appointment: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newDate: string, newTime: string, reason?: string) => void;
  loading: boolean;
}

export interface BookingFormProps {
  formData: BookingFormData;
  onInputChange: (field: string, value: string) => void;
  selectedAppointment: Appointment | null;
  onSubmit: () => void;
  loading: boolean;
  apartment: Apartment;
}

export interface BookingSummaryProps {
  appointment: Appointment;
  apartment: Apartment;
  formData: BookingFormData;
  onConfirm: () => void;
  onBack: () => void;
  loading: boolean;
}

export interface FloatingBookingButtonProps {
  listingId?: string;
  className?: string;
}

/**
 * Message Components
 */
export interface MessageCardProps {
  message: Message;
  onToggleRead: (id: string, currentStatus: boolean) => void;
  onDelete: (id: string) => void;
  loading: boolean;
}

export interface MessagesHeaderProps {
  totalMessages: number;
  unreadCount: number;
  onMarkAllAsRead: () => void;
  onDeleteAll: () => void;
  loading: boolean;
}

export interface MessagesFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filterStatus: "all" | "read" | "unread";
  onFilterStatusChange: (status: "all" | "read" | "unread") => void;
  sortBy: "newest" | "oldest";
  onSortChange: (sort: "newest" | "oldest") => void;
}

export interface MessagesListProps {
  messages: Message[];
  onToggleRead: (id: string, currentStatus: boolean) => void;
  onDelete: (id: string) => void;
  loading: boolean;
}

/**
 * Dashboard Components
 */
export interface DashboardStatsProps {
  stats: StatsData;
  loading?: boolean;
}

export interface DashboardSidebarProps {
  user: User;
  onLogout: () => void;
}

/**
 * Filter Components
 */
export interface FilterGroupProps {
  title: string;
  options: FilterOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  className?: string;
}

export interface FiltersProps {
  onFiltersChange: (filters: FilterData) => void;
  className?: string;
}

export interface FiltersSummaryProps {
  filters: FilterData;
  onClearFilters: () => void;
  totalResults: number;
  filteredResults: number;
}

/**
 * Contact Components
 */
export interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  loading?: boolean;
}

export interface FloatingButtonProps {
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  tooltip: string;
  position?: "bottom-left" | "bottom-right";
  hideForAdmin?: boolean;
  className?: string;
}

/**
 * Common Components
 */
export interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  loading: boolean;
}

export interface AddAppointmentFormProps {
  onAdd: (date: string, time: string) => void;
  loading: boolean;
}

export interface ListingsSearchFiltersProps {
  onSearch: (query: string) => void;
  onFiltersChange: (filters: FilterData) => void;
}

export interface ListingsGridProps {
  listings: Listing[];
}

export interface ListingsContentProps {
  loading: boolean;
  filteredListings: Listing[];
  allListings: Listing[];
}

export interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  loading: boolean;
  error?: string;
}

// ============================================
// API & RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  timestamp: string;
}

export interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: PaginationData;
}

// ============================================
// FORM VALIDATION TYPES
// ============================================

export interface FormFieldError {
  field: string;
  message: string;
  code?: string;
}

export interface FormValidationResult<T = unknown> {
  isValid: boolean;
  errors: FormFieldError[];
  data?: T;
}

// ============================================
// EVENT HANDLER TYPES
// ============================================

export type ClickHandler = () => void;
export type ChangeHandler<T = string> = (value: T) => void;
export type SubmitHandler<T> = (data: T) => void | Promise<void>;
export type ErrorHandler = (error: Error | string) => void;
export type SuccessHandler<T = unknown> = (data: T) => void;

// ============================================
// CONTEXT TYPES
// ============================================

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

// ============================================
// THEME TYPES
// ============================================

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  error: string;
  success: string;
  warning: string;
}

export interface ThemeConfig {
  colors: ColorPalette;
  borderRadius: string;
  fontFamily: string;
  spacing: Record<string, string>;
  breakpoints: Record<string, string>;
}

// ============================================
// HOOK RETURN TYPES
// ============================================

export interface UseApartmentsReturn {
  apartments: Apartment[];
  loading: boolean;
  error: string | null;
  createApartment: (data: CreateApartmentData) => Promise<Apartment>;
  updateApartment: (
    id: string,
    data: UpdateApartmentData
  ) => Promise<Apartment>;
  deleteApartment: (id: string) => Promise<void>;
  searchApartments: (query: string) => Promise<Apartment[]>;
  filterApartments: (filters: ApartmentFilters) => Promise<Apartment[]>;
  refreshApartments: () => Promise<Apartment[]>;
  clearError: () => void;
}

export interface UseAppointmentsReturn {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
  availableAppointments: Appointment[];
  bookedAppointments: Appointment[];
  completedAppointments: Appointment[];
  postponedAppointments: Appointment[];
  fetchAppointments: () => Promise<Appointment[]>;
  fetchAvailableAppointments: () => Promise<Appointment[]>;
  createAppointment: (data: CreateAppointmentData) => Promise<Appointment>;
  updateAppointment: (
    id: string,
    data: UpdateAppointmentData
  ) => Promise<Appointment>;
  bookAppointment: (
    id: string,
    bookingData: BookingData
  ) => Promise<Appointment>;
  cancelAppointment: (id: string) => Promise<Appointment>;
  completeAppointment: (id: string) => Promise<Appointment>;
  postponeAppointment: (
    id: string,
    newDate: string,
    newTime: string
  ) => Promise<Appointment>;
  deleteAppointment: (id: string) => Promise<void>;
  searchAppointments: (query: string) => Promise<Appointment[]>;
  getAppointmentsByStatus: (
    status: "available" | "booked" | "completed" | "postponed"
  ) => Promise<Appointment[]>;
  clearError: () => void;
}

export interface UseMessagesReturn {
  messages: Message[];
  loading: boolean;
  error: string | null;
  unreadMessages: Message[];
  readMessages: Message[];
  unreadCount: number;
  fetchMessages: () => Promise<Message[]>;
  createMessage: (data: CreateMessageData) => Promise<Message>;
  updateMessage: (id: string, data: UpdateMessageData) => Promise<Message>;
  toggleReadStatus: (id: string, currentStatus: boolean) => Promise<Message>;
  markAsRead: (id: string) => Promise<Message>;
  markAsUnread: (id: string) => Promise<Message>;
  deleteMessage: (id: string) => Promise<void>;
  deleteMultipleMessages: (ids: string[]) => Promise<void>;
  deleteAllMessages: () => Promise<void>;
  markAllAsRead: () => Promise<void>;
  searchMessages: (query: string) => Promise<Message[]>;
  filterByStatus: (status: "read" | "unread" | "all") => Promise<Message[]>;
  sortMessages: (sortBy: "newest" | "oldest") => Promise<Message[]>;
  clearError: () => void;
}
