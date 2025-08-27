"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaWhatsapp, FaGithub } from "react-icons/fa";
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
                href="https://www.facebook.com/youseif.elshreif"
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
                href="https://www.instagram.com/youseifelshreif/"
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
                href="https://wa.me/201277906691"
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
              <a
                href="https://github.com/youseif-elshreif"
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
                <FaGithub className="text-white text-lg" />
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
              © 2025 . جميع الحقوق محفوظة.
              <a href="https://www.linkedin.com/in/youseif-elshreif">
                لـ يوسف الشريف
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
