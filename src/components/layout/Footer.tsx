"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { ContactInfo } from "../contact/index";

const Footer = () => {
  return (
    <footer
      className="relative"
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <h3
                className="text-2xl font-bold"
                style={{ color: "var(--color-accent)" }}
              >
                إسكان
              </h3>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-border)" }}
            >
              نحن نقدم أفضل الحلول السكنية للطلاب مع خدمات متميزة وأسعار مناسبة.
              سكن آمن ومريح بالقرب من جامعتك.
            </p>

            {/* Social Media */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ backgroundColor: "var(--color-secondary)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "var(--color-accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "var(--color-secondary)")
                }
              >
                <FaFacebook className="text-white text-lg" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ backgroundColor: "var(--color-secondary)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "var(--color-accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "var(--color-secondary)")
                }
              >
                <FaInstagram className="text-white text-lg" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ backgroundColor: "var(--color-secondary)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "var(--color-accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "var(--color-secondary)")
                }
              >
                <FaWhatsapp className="text-white text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4
              className="text-lg font-semibold"
              style={{ color: "var(--color-accent)" }}
            >
              روابط سريعة
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm transition-colors duration-300 hover:underline"
                  style={{ color: "var(--color-border)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-accent)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--color-border)")
                  }
                >
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link
                  href="/listings"
                  className="text-sm transition-colors duration-300 hover:underline"
                  style={{ color: "var(--color-border)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-accent)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--color-border)")
                  }
                >
                  الوحدات المتاحة
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm transition-colors duration-300 hover:underline"
                  style={{ color: "var(--color-border)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-accent)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--color-border)")
                  }
                >
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4
              className="text-lg font-semibold"
              style={{ color: "var(--color-accent)" }}
            >
              خدماتنا
            </h4>
            <ul className="space-y-2">
              <li>
                <span
                  className="text-sm"
                  style={{ color: "var(--color-border)" }}
                >
                  سكن طلابي آمن
                </span>
              </li>
              <li>
                <span
                  className="text-sm"
                  style={{ color: "var(--color-border)" }}
                >
                  مواقع قريبة من الجامعات
                </span>
              </li>
              <li>
                <span
                  className="text-sm"
                  style={{ color: "var(--color-border)" }}
                >
                  أسعار مناسبة
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <ContactInfo
              titleClassName="text-lg font-semibold"
              itemClassName="flex items-center space-x-3 space-x"
              iconClassName="w-5 h-5 flex-shrink-0 ml-2"
              textClassName="text-sm"
              colorTheme="accent"
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="border-t py-6"
        style={{
          borderColor: "var(--color-secondary)",
          backgroundColor: "var(--color-primary-hover)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p
              className="text-sm text-center md:text-right"
              style={{ color: "var(--color-border)" }}
            >
              © 2025{" "}
              <a href="https://www.linkedin.com/in/youseif-elshreif">
                لـ يوسف الشريف
              </a>
              . جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center justify-center md:justify-end space-x-4 space-x-reverse">
              <div className="flex items-center space-x-2 space-x-reverse">
                <FaWhatsapp className="text-green-500" />
                <a
                  href="tel:01277906691"
                  className="text-sm hover:underline"
                  style={{ color: "var(--color-border)" }}
                >
                  01277906691
                </a>
              </div>
              <a
                href="https://www.facebook.com/youseif.elshreif"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-200"
              >
                <FaFacebook className="text-blue-500 text-lg" />
              </a>
              <a
                href="https://www.instagram.com/youseifelshreif/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-200"
              >
                <FaInstagram className="text-pink-500 text-lg" />
              </a>
              <a
                href="https://github.com/youseif-elshreif"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-200"
              >
                <svg
                  className="w-5 h-5 text-gray-400 hover:text-white transition-colors duration-200"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
