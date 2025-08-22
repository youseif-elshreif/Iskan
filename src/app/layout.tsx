import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DecorativeElements from "@/components/DecorativeElements";

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
        <Navbar />
        <main>
          {children}
          <DecorativeElements />
        </main>
        <Footer />
      </body>
    </html>
  );
}
