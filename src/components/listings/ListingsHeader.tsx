import React from "react";

interface ListingsHeaderProps {
  title: string;
  subtitle: string;
}

export default function ListingsHeader({
  title,
  subtitle,
}: ListingsHeaderProps) {
  return (
    <div className="mb-8">
      <h1
        className="text-3xl md:text-4xl font-bold mb-4"
        style={{ color: "var(--color-primary)" }}
      >
        {title}
      </h1>
      <p
        className="text-lg mb-6 opacity-90"
        style={{ color: "var(--color-text)" }}
      >
        {subtitle}
      </p>
    </div>
  );
}
