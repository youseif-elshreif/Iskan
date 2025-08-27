"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui";
import {
  LoginHeader,
  LoginForm,
  LoginDemoCredentials,
} from "@/components/auth";

export default function AdminLoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (credentials: {
    username: string;
    password: string;
  }) => {
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
        <LoginHeader />
        <LoginForm onSubmit={handleSubmit} loading={loading} error={error} />
        <LoginDemoCredentials />
      </Card>
    </div>
  );
}
