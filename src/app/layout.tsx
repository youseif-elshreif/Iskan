import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components/layout";
import { DecorativeElements } from "@/components/common";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminButton } from "@/components/admin";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "إسكان - سكن طلابي آمن ومريح",
  description: "ابحث عن أفضل سكن طلابي بالقرب من جامعتك",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>
        <AuthProvider>
          <Navbar />
          <main>
            {children}
            <DecorativeElements />
          </main>
          <Footer />
          <AdminButton />
        </AuthProvider>
      </body>
    </html>
  );
}
