"use client";

import { usePathname } from "next/navigation";
import { FloatingButton } from "@/components/contact/index";
import { FaHome } from "react-icons/fa";

export default function AdminButton() {
  const pathname = usePathname();

  // إخفاء الزر فقط في صفحات الداشبورد (لتجنب التكرار)
  if (pathname.includes("/dashboard-983274-admin-panel")) {
    return null;
  }

  return (
    <FloatingButton
      href="/dashboard-983274-admin-panel"
      icon={FaHome}
      tooltip="لوحة التحكم"
      position="bottom-left"
      className="admin-button"
    />
  );
}
