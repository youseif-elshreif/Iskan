import React from "react";
import Image from "next/image";
import {Card} from "@/components/ui/index";
import { FaHome, FaMapMarkerAlt, FaDollarSign } from "react-icons/fa";

interface Apartment {
  id: string;
  title: string;
  location: string;
  area?: string;
  price: string;
  imageUrl: string;
}

interface ApartmentInfoCardProps {
  apartment: Apartment;
}

const ApartmentInfoCard: React.FC<ApartmentInfoCardProps> = ({ apartment }) => {
  return (
    <Card className="mb-6">
      <h3
        className="text-xl font-semibold mb-4"
        style={{ color: "var(--color-secondary)" }}
      >
        <FaHome className="inline-block ml-2" />
        تفاصيل الشقة
      </h3>

      <div className="space-y-4">
        <div className="flex items-start space-x-3 space-x">
          <Image
            src={apartment.imageUrl}
            alt={apartment.title}
            width={80}
            height={80}
            className="w-20 h-20 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h4
              className="font-semibold text-lg"
              style={{ color: "var(--color-primary)" }}
            >
              {apartment.title}
            </h4>
            <div className="flex items-center mt-2">
              <FaMapMarkerAlt
                className="ml-2"
                style={{ color: "var(--color-secondary)" }}
              />
              <span style={{ color: "var(--color-text)" }}>
                {apartment.location}
              </span>
            </div>
            {apartment.area && (
              <div className="flex items-center mt-1">
                <span
                  className="text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {apartment.area}
                </span>
              </div>
            )}
            <div className="flex items-center mt-2">
              <FaDollarSign
                className="ml-2"
                style={{ color: "var(--color-accent)" }}
              />
              <span
                className="font-semibold"
                style={{ color: "var(--color-accent)" }}
              >
                {apartment.price} ج.م / شهر
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ApartmentInfoCard;
