import React, { useState } from "react";
import { Button } from "@/components/ui";

interface LoginFormProps {
  onSubmit: (credentials: {
    username: string;
    password: string;
  }) => Promise<void>;
  loading: boolean;
  error: string;
}

export default function LoginForm({
  onSubmit,
  loading,
  error,
}: LoginFormProps) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(credentials);
  };

  return (
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
  );
}
