// ============================================
// SHARED TYPES FOR ISKAN PROJECT
// ============================================

import { ReactNode } from "react";

// ============================================
// CORE DATA TYPES
// ============================================

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
 * Listing (Real Estate Property) Types
 */
export interface Listing {
  id: string;
  title: string;
  image: string;
  nearestUniversity: string;
  address: string;
  description: string;
  area: string;
  university: string;
  size: string;
  rooms: string;
  price: number;
  images?: string[];
  amenities?: string[];
  mapEmbedUrl?: string;
}

/**
 * Filter Data Structure
 */
export interface FilterData {
  area: string[];
  university: string[];
  size: string[];
  rooms: string[];
}

/**
 * Filter Option for Dropdowns/Checkboxes
 */
export interface FilterOption {
  value: string;
  label: string;
}

// ============================================
// COMPONENT PROP TYPES
// ============================================

/**
 * Button Component Props
 */
export interface ButtonProps {
  children: ReactNode;
  variant?: "filled" | "outlined" | "secondary" | "disabled";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

/**
 * Card Component Props
 */
export interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  shadow?: "sm" | "md" | "lg";
  rounded?: "sm" | "md" | "lg" | "xl";
}

/**
 * Modal Component Props
 */
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

/**
 * Search Bar Component Props
 */
export interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

/**
 * Listing Card Component Props
 */
export interface ListingCardProps {
  id: string;
  image: string;
  nearestUniversity: string;
  address: string;
  description: string;
  price?: number;
}

/**
 * Filter Group Component Props
 */
export interface FilterGroupProps {
  title: string;
  options: FilterOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  isOpen?: boolean;
}

/**
 * Filters Component Props
 */
export interface FiltersProps {
  onFiltersChange: (filters: FilterData) => void;
  className?: string;
}

// ============================================
// UTILITY TYPES
// ============================================

/**
 * Size Variants (reusable across components)
 */
export type SizeVariant = "sm" | "md" | "lg";

/**
 * Extended Size Variants (includes xl)
 */
export type ExtendedSizeVariant = SizeVariant | "xl";

/**
 * Button Variants
 */
export type ButtonVariant = "filled" | "outlined" | "secondary" | "disabled";

/**
 * Shadow Variants
 */
export type ShadowVariant = "sm" | "md" | "lg";

/**
 * Rounded Variants
 */
export type RoundedVariant = "sm" | "md" | "lg" | "xl";

/**
 * Padding Variants
 */
export type PaddingVariant = "none" | "sm" | "md" | "lg";

// ============================================
// API TYPES (for future backend integration)
// ============================================

/**
 * API Response Structure
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

/**
 * Pagination Data
 */
export interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Paginated Response
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination?: PaginationData;
}

// ============================================
// FORM TYPES
// ============================================

/**
 * Form Field Error
 */
export interface FormFieldError {
  field: string;
  message: string;
}

/**
 * Form Validation Result
 */
export interface FormValidationResult {
  isValid: boolean;
  errors: FormFieldError[];
}

// ============================================
// EVENT HANDLER TYPES
// ============================================

/**
 * Click Handler
 */
export type ClickHandler = () => void;

/**
 * Change Handler for inputs
 */
export type ChangeHandler<T = string> = (value: T) => void;

/**
 * Submit Handler for forms
 */
export type SubmitHandler<T> = (data: T) => void | Promise<void>;

// ============================================
// THEME TYPES
// ============================================

/**
 * Color Palette
 */
export interface ColorPalette {
  primary: string; // #2C3E50
  secondary: string; // #3F4E65
  accent: string; // #D4C4A8
  background: string; // #FFFFFF
  text: string; // #333333
  textLight: string; // #F7F7F7
}

/**
 * Theme Configuration
 */
export interface ThemeConfig {
  colors: ColorPalette;
  fontFamily: string;
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
}
