"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { FaHome } from "react-icons/fa";

export default function AdminButton() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleAdminClick = () => {
    router.push("/dashboard-983274-admin-panel");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={handleAdminClick}
        variant="filled"
        size="md"
        className="shadow-lg hover:shadow-xl transition-all duration-300 admin-button"
      >
        <FaHome className="ml-1" /> لوحة التحكم
      </Button>
      <style jsx>{`
        .admin-button {
          background-color: var(--color-primary) !important;
          border-radius: 50px !important;
          padding: 12px 24px !important;
          font-size: 14px !important;
          font-weight: 600 !important;
        }
      `}</style>
    </div>
  );
}
