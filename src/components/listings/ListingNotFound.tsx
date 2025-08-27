import React from "react";
import { Button } from "@/components/ui/index";

interface ListingNotFoundProps {
  onBackToListings?: () => void;
}

const ListingNotFound: React.FC<ListingNotFoundProps> = ({
  onBackToListings,
}) => {
  const handleBackToListings = () => {
    if (onBackToListings) {
      onBackToListings();
    } else {
      window.location.href = "/listings";
    }
  };

  return (
    <div
      className="min-h-screen pt-16"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--color-primary)" }}
          >
            الوحدة غير موجودة
          </h1>
          <p className="mb-8" style={{ color: "var(--color-text)" }}>
            عذراً، لم يتم العثور على الوحدة المطلوبة.
          </p>
          <div>
            <Button onClick={handleBackToListings} variant="filled" size="md">
              العودة للوحدات
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingNotFound;
