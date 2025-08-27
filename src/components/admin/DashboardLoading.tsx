import React from "react";
import { FaSpinner, FaShieldAlt } from "react-icons/fa";

interface DashboardLoadingProps {
  message?: string;
}

const DashboardLoading: React.FC<DashboardLoadingProps> = ({
  message = "جاري التحقق من صلاحيات الوصول...",
}) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center pt-16"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="text-center">
        {/* Loading Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            {/* Shield Icon */}
            <FaShieldAlt
              className="text-6xl mb-2"
              style={{ color: "var(--color-primary)" }}
            />
            {/* Spinning Loader */}
            <FaSpinner
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl animate-spin"
              style={{ color: "var(--color-secondary)" }}
            />
          </div>
        </div>

        {/* Loading Message */}
        <h2
          className="text-2xl font-bold mb-4"
          style={{ color: "var(--color-primary)" }}
        >
          لوحة التحكم
        </h2>

        <p className="text-lg mb-6" style={{ color: "var(--color-text)" }}>
          {message}
        </p>

        {/* Loading Animation Dots */}
        <div className="flex justify-center space-x-1">
          <div
            className="w-2 h-2 rounded-full animate-bounce"
            style={{
              backgroundColor: "var(--color-primary)",
              animationDelay: "0ms",
            }}
          ></div>
          <div
            className="w-2 h-2 rounded-full animate-bounce"
            style={{
              backgroundColor: "var(--color-primary)",
              animationDelay: "150ms",
            }}
          ></div>
          <div
            className="w-2 h-2 rounded-full animate-bounce"
            style={{
              backgroundColor: "var(--color-primary)",
              animationDelay: "300ms",
            }}
          ></div>
        </div>

        {/* Additional Info */}
        <div
          className="mt-8 text-sm"
          style={{ color: "var(--color-text-muted)" }}
        >
          يرجى الانتظار لحظات...
        </div>
      </div>
    </div>
  );
};

export default DashboardLoading;
