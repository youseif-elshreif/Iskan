import React from "react";
import { ButtonProps } from "@/types";

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "filled",
  size = "md",
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) => {
  const baseClasses =
    "font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 focus:ring-offset-0 items-center justify-center";

  const variantClasses = {
    filled: disabled
      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
      : "text-white hover:shadow-lg transform hover:-translate-y-1 active:transform active:translate-y-0",
    outlined: disabled
      ? "border-2 border-gray-300 text-gray-500 cursor-not-allowed"
      : "border-2 hover:text-white hover:shadow-md transform hover:-translate-y-0.5 active:transform active:translate-y-0",
    secondary: disabled
      ? "border-2 border-gray-300 text-gray-500 cursor-not-allowed"
      : "border-2 bg-transparent shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:transform active:translate-y-0",
    disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
  };
  const handleMouseEnter = (
    e: React.MouseEvent<HTMLButtonElement>,
    variant: string
  ) => {
    if (disabled) return;
    if (variant === "filled") {
      e.currentTarget.style.backgroundColor = "var(--color-primary)";
    } else if (variant === "outlined") {
      e.currentTarget.style.backgroundColor = "var(--color-primary)";
      e.currentTarget.style.color = "var(--color-white)";
    } else if (variant === "secondary") {
      e.currentTarget.style.backgroundColor = "var(--color-accent)";
      e.currentTarget.style.color = "var(--color-primary)";
    }
  };

  const handleMouseLeave = (
    e: React.MouseEvent<HTMLButtonElement>,
    variant: string
  ) => {
    if (disabled) return;
    if (variant === "filled") {
      e.currentTarget.style.backgroundColor = "var(--color-secondary)";
    } else if (variant === "outlined") {
      e.currentTarget.style.backgroundColor = "var(--color-transparent)";
      e.currentTarget.style.color = "var(--color-primary)";
    } else if (variant === "secondary") {
      e.currentTarget.style.backgroundColor = "var(--color-transparent)";
      e.currentTarget.style.color = "var(--color-accent)";
    }
  };

  const sizeClasses = {
    sm: "px-2 py-2 text-sm min-h-[25px]",
    md: "px-6 py-3 text-base min-h-[38px]",
    lg: "px-10 py-4 text-lg min-h-[52px] w-full ",
  };

  const getButtonStyles = () => {
    if (disabled) return {};
    if (variant === "filled") {
      return { backgroundColor: "var(--color-secondary)" };
    } else if (variant === "outlined") {
      return {
        borderColor: "var(--color-primary)",
        color: "var(--color-primary)",
        backgroundColor: "var(--color-transparent)",
      };
    } else if (variant === "secondary") {
      return {
        borderColor: "var(--color-accent)",
        color: "var(--color-accent)",
        backgroundColor: "var(--color-transparent)",
      };
    }
    return {};
  };

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={getButtonStyles()}
      onMouseEnter={(e) => handleMouseEnter(e, variant)}
      onMouseLeave={(e) => handleMouseLeave(e, variant)}
      className={`
        ${baseClasses}
        ${variantClasses[disabled ? "disabled" : variant]}
        ${sizeClasses[size]}
        ${className}
        cursor-pointer
        flex
      `}
    >
      {children}
    </button>
  );
};

export default Button;
