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

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validation function
  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "username":
        if (!value.trim()) error = "اسم المستخدم مطلوب";
        else if (value.trim().length < 3)
          error = "اسم المستخدم يجب أن يكون 3 أحرف على الأقل";
        break;
      case "password":
        if (!value.trim()) error = "كلمة المرور مطلوبة";
        else if (value.trim().length < 4)
          error = "كلمة المرور يجب أن تكون 4 أحرف على الأقل";
        break;
    }

    return error;
  };

  // Handle blur event to show errors
  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(
      name,
      credentials[name as keyof typeof credentials]
    );
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleInputChange = (name: string, value: string) => {
    setCredentials((prev) => ({ ...prev, [name]: value }));

    // Validate if field was touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const allFields = ["username", "password"];
    const newErrors: Record<string, string> = {};
    const newTouched: Record<string, boolean> = {};

    allFields.forEach((field) => {
      newTouched[field] = true;
      const error = validateField(
        field,
        credentials[field as keyof typeof credentials]
      );
      if (error) newErrors[field] = error;
    });

    setTouched(newTouched);
    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

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
          onChange={(e) => handleInputChange("username", e.target.value)}
          onBlur={() => handleBlur("username")}
          className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 ${
            errors.username && touched.username
              ? "border-red-500 focus:ring-red-200"
              : "focus:ring-blue-200"
          }`}
          style={{
            borderColor:
              errors.username && touched.username
                ? "#ef4444"
                : "var(--color-border)",
            backgroundColor: "var(--color-background)",
            color: "var(--color-text)",
          }}
          required
        />
        {errors.username && touched.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username}</p>
        )}
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
          onChange={(e) => handleInputChange("password", e.target.value)}
          onBlur={() => handleBlur("password")}
          className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 ${
            errors.password && touched.password
              ? "border-red-500 focus:ring-red-200"
              : "focus:ring-blue-200"
          }`}
          style={{
            borderColor:
              errors.password && touched.password
                ? "#ef4444"
                : "var(--color-border)",
            backgroundColor: "var(--color-background)",
            color: "var(--color-text)",
          }}
          required
        />
        {errors.password && touched.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
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
