"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function AdminLoginPage() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const success = await login(credentials.username, credentials.password);

      if (success) {
        router.push("/dashboard-983274-admin-panel");
      } else {
        setError("بيانات الدخول غير صحيحة");
      }
    } catch (error) {
      setError("حدث خطأ أثناء تسجيل الدخول");
      console.error("Login error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="pt-24 min-h-screen flex items-center justify-center px-4 z-10 relative">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1
            className="text-3xl font-bold mb-2"
            style={{
              color: "var(--color-primary)",
              fontFamily: "Cairo, sans-serif",
            }}
          >
            إسكان
          </h1>
          <p style={{ color: "var(--color-text)" }}>لوحة التحكم الإدارية</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--color-primary)" }}
            >
              اسم المستخدم
            </label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-background)",
                color: "var(--color-text)",
              }}
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--color-primary)" }}
            >
              كلمة المرور
            </label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-background)",
                color: "var(--color-text)",
              }}
              required
            />
          </div>

          {error && (
            <div
              className="text-sm text-center p-3 rounded-lg"
              style={{
                backgroundColor: "#fee2e2",
                color: "#dc2626",
              }}
            >
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="filled"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {loading ? "جاري تسجيل الدخول..." : "دخول"}
          </Button>
        </form>

        <div
          className="mt-6 text-center text-sm"
          style={{ color: "var(--color-text)" }}
        >
          <p>Demo credentials:</p>
          <p>
            Username: <strong>admin</strong>
          </p>
          <p>
            Password: <strong>iskan2024</strong>
          </p>
        </div>
      </Card>
    </div>
  );
}
