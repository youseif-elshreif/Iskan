import React from "react";

export default function LoginHeader() {
  return (
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
  );
}
