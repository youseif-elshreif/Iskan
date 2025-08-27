import React from "react";
import { FaLock, FaMapMarkerAlt, FaDollarSign } from "react-icons/fa";

const FeatureHighlights: React.FC = () => {
  const features = [
    {
      icon: FaLock,
      title: "سكن آمن",
      description: "مكان آمن",
      color: "var(--color-secondary)",
    },
    {
      icon: FaMapMarkerAlt,
      title: "موقع مميز",
      description: "قريب من الجامعة",
      color: "var(--color-secondary)",
    },
    {
      icon: FaDollarSign,
      title: "أسعار مناسبة",
      description: "في متناول الطلاب",
      color: "var(--color-secondary)",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className="text-center p-6 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border"
          style={{
            backgroundColor: "var(--color-card-bg)",
            borderColor: "var(--color-border)",
          }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
            style={{ backgroundColor: feature.color }}
          >
            <feature.icon className="w-6 h-6 text-white" />
          </div>
          <h3
            className="text-lg font-semibold mb-2"
            style={{ color: "var(--color-primary)" }}
          >
            {feature.title}
          </h3>
          <p className="text-sm" style={{ color: "var(--color-text)" }}>
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FeatureHighlights;
