import React from "react";
import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/index";
import { ContactInfo } from "@/components/contact/index";
import Link from "next/link";

interface ListingSidebarProps {
  listingId: string;
}

const ListingSidebar: React.FC<ListingSidebarProps> = ({ listingId }) => {
  return (
    <div className="sticky top-20">
      <Card>
        <Link href={`/book-appointment?apartmentId=${listingId}`}>
          <Button size="lg" className="w-full mb-4">
            احجز ميعاد للمعاينة
          </Button>
        </Link>

        <div
          className="border-t pt-4"
          style={{ borderColor: "var(--color-border-light)" }}
        >
          <ContactInfo
            className="space-y-2"
            titleClassName="text-lg font-semibold mb-3"
            itemClassName="flex items-center space-x-3 space-x transition-colors hover:opacity-80"
            colorTheme="primary"
          />
        </div>
      </Card>
    </div>
  );
};

export default ListingSidebar;
