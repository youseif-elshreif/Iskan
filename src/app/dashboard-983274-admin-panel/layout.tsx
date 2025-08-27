"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardSidebar, DashboardLoading } from "@/components/admin";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/super-secret-login-983274");
    }
  }, [isAuthenticated, loading, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (loading) {
    return <DashboardLoading message="جاري التحقق من صلاحيات الوصول..." />;
  }

  if (!isAuthenticated) {
    return <DashboardLoading message="جاري التوجيه إلى صفحة تسجيل الدخول..." />;
  }

  return (
    <div className="min-h-screen pt-16 z-10 relative">
      <div className="flex">
        <DashboardSidebar user={user} onLogout={handleLogout} />

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
