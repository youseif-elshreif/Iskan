import React from "react";
import { CardProps } from "@/types";

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  padding = "md",
  shadow = "md",
  rounded = "lg",
}) => {
  const paddingClasses = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  const shadowClasses = {
    sm: "shadow-sm hover:shadow-md",
    md: "shadow-md hover:shadow-lg",
    lg: "shadow-lg hover:shadow-xl",
  };

  const roundedClasses = {
    sm: "rounded-lg",
    md: "rounded-xl",
    lg: "rounded-xl",
    xl: "rounded-2xl",
  };

  return (
    <div
      className={`
        ${paddingClasses[padding]}
        ${shadowClasses[shadow]}
        ${roundedClasses[rounded]}
        transition-all 
        duration-300
        flex flex-col
        ${className}
      `}
      style={{
        backgroundColor: "var(--color-white)",
        borderColor: "var(--color-border-light)",
        borderWidth: "1px",
        borderStyle: "solid",
      }}
    >
      {children}
    </div>
  );
};

export default Card;
