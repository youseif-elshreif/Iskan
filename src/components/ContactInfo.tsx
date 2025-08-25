"use client";

import React from "react";
import { FaPhone, FaWhatsapp, FaEnvelope } from "react-icons/fa";

interface ContactInfoProps {
  className?: string;
  titleClassName?: string;
  itemClassName?: string;
  iconClassName?: string;
  textClassName?: string;
  showTitle?: boolean;
  colorTheme?: "default" | "primary" | "info" | "accent";
}

const ContactInfo: React.FC<ContactInfoProps> = ({
  className = "",
  titleClassName = "",
  itemClassName = "",
  iconClassName = "",
  textClassName = "",
  showTitle = true,
  colorTheme = "default",
}) => {
  // Define color schemes
  const getColors = () => {
    switch (colorTheme) {
      case "primary":
        return {
          titleColor: "var(--color-primary)",
          iconColor: "var(--color-primary)",
          textColor: "var(--color-text)",
        };
      case "info":
        return {
          titleColor: "var(--color-info)",
          iconColor: "var(--color-info)",
          textColor: "var(--color-text)",
        };
      case "accent":
        return {
          titleColor: "var(--color-accent)",
          iconColor: "var(--color-accent)",
          textColor: "var(--color-border)",
        };
      default: // "default"
        return {
          titleColor: "var(--color-accent)",
          iconColor: "var(--color-accent)",
          textColor: "var(--color-border)",
        };
    }
  };

  const colors = getColors();
  return (
    <div className={`space-y-4 ${className}`}>
      {showTitle && (
        <h4
          className={`text-lg font-semibold ${titleClassName}`}
          style={{ color: colors.titleColor }}
        >
          تواصل معنا
        </h4>
      )}
      <div className="space-y-3">
        <div className={`flex items-center space-x-3 space-x ${itemClassName}`}>
          <FaPhone
            className={`w-5 h-5 flex-shrink-0 ml-2 ${iconClassName}`}
            style={{ color: colors.iconColor }}
          />
          <a
            href="tel:+201234567890"
            className={`text-sm hover:opacity-80 transition-opacity ${textClassName}`}
            style={{ color: colors.textColor }}
          >
            +20 123 456 7890
          </a>
        </div>
        <div className={`flex items-center space-x-3 space-x ${itemClassName}`}>
          <FaWhatsapp
            className={`w-5 h-5 flex-shrink-0 ml-2 ${iconClassName}`}
            style={{ color: colors.iconColor }}
          />
          <a
            href="https://wa.me/201234567890"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm hover:opacity-80 transition-opacity ${textClassName}`}
            style={{ color: colors.textColor }}
          >
            +20 123 456 7890
          </a>
        </div>
        <div className={`flex items-center space-x-3 space-x ${itemClassName}`}>
          <FaEnvelope
            className={`w-5 h-5 flex-shrink-0 ml-2 ${iconClassName}`}
            style={{ color: colors.iconColor }}
          />
          <a
            href="mailto:info@iskan.com"
            className={`text-sm hover:opacity-80 transition-opacity ${textClassName}`}
            style={{ color: colors.textColor }}
          >
            info@iskan.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
