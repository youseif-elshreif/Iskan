"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/index";
import {
  FaHome,
  FaCalendarAlt,
  FaEnvelope,
  FaSignOutAlt,
} from "react-icons/fa";

interface User {
  name: string;
  email: string;
}

interface DashboardSidebarProps {
  user?: User | null;
  onLogout: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  user,
  onLogout,
}) => {
  const pathname = usePathname();

  const sidebarItems = [
    {
      href: "/dashboard-983274-admin-panel",
      label: "الوحدات",
      icon: FaHome,
    },
    {
      href: "/dashboard-983274-admin-panel/appointments",
      label: "المواعيد",
      icon: FaCalendarAlt,
    },
    {
      href: "/dashboard-983274-admin-panel/messages",
      label: "الرسائل",
      icon: FaEnvelope,
    },
  ];

  return (
    <div
      className="w-64 min-h-screen shadow-lg border-r"
      style={{
        backgroundColor: "var(--color-primary)",
        borderColor: "var(--color-border)",
      }}
    >
      <div
        className="p-6 border-b"
        style={{ borderColor: "var(--color-border)" }}
      >
        <h1
          className="text-2xl font-bold"
          style={{
            color: "var(--color-background)",
            fontFamily: "Cairo, sans-serif",
          }}
        >
          إسكان
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-border)" }}>
          لوحة التحكم
        </p>
        {user && (
          <div
            className="mt-4 p-3 rounded-lg"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          >
            <p
              className="text-sm font-medium"
              style={{ color: "var(--color-background)" }}
            >
              أهلاً {user.name}
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: "var(--color-border)" }}
            >
              {user.email}
            </p>
          </div>
        )}
      </div>

      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center space-x-3 space-x px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer ${
                  isActive ? "shadow-md" : "hover:shadow-sm"
                } mb-2`}
                style={{
                  backgroundColor: isActive
                    ? "var(--color-secondary)"
                    : "transparent",
                  color: isActive
                    ? "var(--color-background)"
                    : "var(--color-background)",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-secondary)";
                    e.currentTarget.style.opacity = "0.8";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.opacity = "1";
                  }
                }}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
        <Button
          variant="secondary"
          size="md"
          className="w-full justify-center logout-button"
          onClick={onLogout}
        >
          <FaSignOutAlt className="ml-2" />
          تسجيل الخروج
        </Button>
      </nav>
    </div>
  );
};

export default DashboardSidebar;
