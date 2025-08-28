"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardSidebar, DashboardLoading } from "@/components/admin";
import { FaBars, FaTimes } from "react-icons/fa";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, user, logout, loading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/super-secret-login-983274");
    }
  }, [isAuthenticated, loading, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return <DashboardLoading message="جاري التحقق من صلاحيات الوصول..." />;
  }

  if (!isAuthenticated) {
    return <DashboardLoading message="جاري التوجيه إلى صفحة تسجيل الدخول..." />;
  }

  return (
    <div className="min-h-screen pt-16 z-10 relative">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex h-screen">
        {/* Mobile Header with Menu Button */}
        <div className="lg:hidden fixed top-16 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center px-4 z-30">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            {sidebarOpen ? (
              <FaTimes className="w-6 h-6 text-gray-600" />
            ) : (
              <FaBars className="w-6 h-6 text-gray-600" />
            )}
          </button>
          <h1 className="mr-4 text-lg font-semibold text-gray-800">
            لوحة التحكم - إسكان
          </h1>
        </div>

        {/* Sidebar */}
        <DashboardSidebar
          user={user}
          onLogout={handleLogout}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 lg:p-8 pt-20 lg:pt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
