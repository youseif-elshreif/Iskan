"use client";

import React from "react";
import { FloatingButton } from "@/components/contact";
import { FaCalendarPlus } from "react-icons/fa";
import { usePathname } from "next/navigation";

interface FloatingBookingButtonProps {
  listingId?: string;
  className?: string;
}

const FloatingBookingButton: React.FC<FloatingBookingButtonProps> = ({
  listingId,
  className = "",
}) => {
  const pathname = usePathname();

  // إخفاء الزر في صفحات معينة
  const shouldHide =
    pathname.includes("/dashboard-983274-admin-panel") ||
    pathname.includes("/book-appointment") ||
    pathname.includes("/contact");

  if (shouldHide) {
    return null;
  }

  const bookingUrl = listingId
    ? `/book-appointment?listing=${listingId}`
    : "/book-appointment";

  return (
    <FloatingButton
      href={bookingUrl}
      icon={FaCalendarPlus}
      tooltip="احجز موعد"
      position="bottom-right"
      className={`booking-button ${className}`}
    />
  );
};

export default FloatingBookingButton;
