import React from "react";
import Link from "next/link";
import { BreadcrumbProps } from "@/types";

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = "" }) => {
  return (
    <nav className={`mb-8 ${className}`}>
      <ol className="flex items-center space-x-2 space-x-reverse text-sm">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li>
              {item.href && !item.isActive ? (
                <Link
                  href={item.href}
                  className="transition-colors duration-200"
                  style={{ color: "var(--color-secondary)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--color-secondary)";
                  }}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={item.isActive ? "" : ""}
                  style={{
                    color: item.isActive
                      ? "var(--color-text)"
                      : "var(--color-secondary)",
                  }}
                >
                  {item.label}
                </span>
              )}
            </li>
            {index < items.length - 1 && <li className="text-gray-500">/</li>}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
