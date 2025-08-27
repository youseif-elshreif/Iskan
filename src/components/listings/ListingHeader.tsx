import React from "react";
import { Button } from "@/components/ui/index";
import Link from "next/link";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Breadcrumb } from "@/components/common/index";

interface ListingHeaderProps {
  title: string;
}

const ListingHeader: React.FC<ListingHeaderProps> = ({ title }) => {
  return (
    <div className="sm:block mb-4 justify-between">
      <Breadcrumb
        items={[
          { href: "/", label: "الرئيسية" },
          { href: "/listings", label: "الوحدات" },
          { label: title, isActive: true },
        ]}
      />
      <Link href="/listings">
        <Button variant="filled" size="sm" className="mr-auto block">
          <FaLongArrowAltLeft />
        </Button>
      </Link>
    </div>
  );
};

export default ListingHeader;
