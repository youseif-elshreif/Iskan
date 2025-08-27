import React from "react";
import Card from "@/components/ui/Card";
import { FaHome, FaUsers, FaEnvelope, FaDollarSign } from "react-icons/fa";

interface StatsData {
  totalApartments: number;
  totalMessages: number;
  totalAppointments: number;
  revenue?: number;
}

interface DashboardStatsProps {
  stats: StatsData;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  const statsItems = [
    {
      title: "إجمالي الوحدات",
      value: stats.totalApartments,
      icon: FaHome,
      color: "var(--color-primary)",
      bgColor: "var(--color-primary)",
    },
    {
      title: "الرسائل",
      value: stats.totalMessages,
      icon: FaEnvelope,
      color: "#ef4444",
      bgColor: "#ef4444",
    },
    {
      title: "المواعيد",
      value: stats.totalAppointments,
      icon: FaUsers,
      color: "#10b981",
      bgColor: "#10b981",
    },
    {
      title: "الإيرادات",
      value: stats.revenue ? `${stats.revenue} ج.م` : "غير متوفر",
      icon: FaDollarSign,
      color: "#8b5cf6",
      bgColor: "#8b5cf6",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsItems.map((item, index) => (
        <Card
          key={index}
          className="hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex items-center">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center ml-4"
              style={{ backgroundColor: item.bgColor }}
            >
              <item.icon className="text-white text-xl" />
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: item.color }}>
                {item.value}
              </p>
              <p
                className="text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                {item.title}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
