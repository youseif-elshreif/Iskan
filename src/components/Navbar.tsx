"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav
      className="fixed top-0 left-0 right-0 backdrop-blur-sm shadow-lg z-50 h-16 border-b"
      style={{
        background: "var(--color-border)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-center h-16">
          {/* Center brand */}
          <Link
            href="/"
            className="text-2xl sm:text-3xl font-bold hover:scale-105 transition-transform duration-300"
            style={{
              fontFamily: "Cairo, sans-serif",
              color: "var(--color-secondary)",
            }}
          >
            إسكان{" "}
          </Link>

          {/* Right link */}
          <div className="absolute right-0 flex items-center">
            <Link href="/">
              <Button
                variant={pathname === "/" ? "filled" : "outlined"}
                size="sm"
                className="text-[14px] sm:text-lg"
              >
                الرئيسية
              </Button>
            </Link>
          </div>

          {/* Left link */}
          <div className="absolute left-0 flex items-center">
            <Link href="/listings">
              <Button
                variant={pathname.includes("/listings") ? "filled" : "outlined"}
                size="sm"
                className="text-[14px] sm:text-lg"
              >
                الوحدات
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
