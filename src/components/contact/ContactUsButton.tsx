"use client";

import React from "react";
import { IconType } from "react-icons";
import { FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";

interface FloatingButtonProps {
  href: string;
  icon?: IconType;
  tooltip?: string;
  position?: "bottom-left" | "bottom-right" | "top-left";
  className?: string;
  hideForAdmin?: boolean;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  href,
  icon: Icon = FaEnvelope,
  tooltip = "تواصل معنا",
  position = "bottom-left",
  className = "",
  hideForAdmin = false,
}) => {
  const { isAuthenticated, user } = useAuth();

  // إخفاء الزر إذا كان المستخدم أدمن و hideForAdmin = true
  if (hideForAdmin && isAuthenticated && user) {
    return null;
  }

  const positionClasses = {
    "bottom-left": "bottom-6 left-6",
    "top-left": "bottom-21 left-6",
    "bottom-right": "bottom-6 right-6",
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      <div className="group relative">
        {/* Main Button */}
        <Link
          href={href}
          className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl ${className}`}
          style={{
            backgroundColor: "var(--color-secondary)",
            color: "white",
          }}
        >
          <Icon className="text-xl" />
        </Link>

        {/* Tooltip */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          {tooltip}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      </div>
    </div>
  );
};

// Default ContactUs Button
const ContactUsButton: React.FC = () => {
  const pathname = usePathname();

  // إخفاء الزر في صفحة التواصل نفسها
  if (pathname === "/contact") {
    return null;
  }

  return (
    <FloatingButton
      href="/contact"
      tooltip="تواصل معنا"
      position="top-left"
      hideForAdmin={false}
    />
  );
};

export default ContactUsButton;
export { FloatingButton };
