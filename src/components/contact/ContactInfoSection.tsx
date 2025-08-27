import React from "react";
import { IconType } from "react-icons";
import {
  IoLocationOutline,
  IoCallOutline,
  IoMailOutline,
  IoLogoWhatsapp,
} from "react-icons/io5";

interface ContactInfoItem {
  icon: IconType;
  title: string;
  content: string;
  link: string;
}

const ContactInfoSection: React.FC = () => {
  const contactInfo: ContactInfoItem[] = [
    {
      icon: IoLocationOutline,
      title: "العنوان",
      content: "الاسماعيلية الشيخ زايد",
      link: "https://maps.app.goo.gl/X5tT8Dti2xW49VEU9",
    },
    {
      icon: IoCallOutline,
      title: "الهاتف",
      content: "+201277906691",
      link: "tel:+201277906691",
    },
    {
      icon: IoMailOutline,
      title: "البريد الإلكتروني",
      content: "youseifelshreif3@gmail.com",
      link: "mailto:youseifelshreif3@gmail.com",
    },
    {
      icon: IoLogoWhatsapp,
      title: "واتساب",
      content: "+201277906691",
      link: "https://wa.me/201277906691",
    },
  ];

  return (
    <div className="space-y-6">
      <h2
        className="text-2xl font-semibold mb-6"
        style={{ color: "var(--color-primary)" }}
      >
        معلومات التواصل
      </h2>

      <div className="space-y-4">
        {contactInfo.map((info, index) => (
          <a
            key={index}
            href={info.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-4 rounded-xl transition-all duration-300 hover:shadow-md"
            style={{
              backgroundColor: "var(--color-background-soft)",
              borderColor: "var(--color-border)",
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center ml-4"
              style={{ backgroundColor: "var(--color-secondary)" }}
            >
              <info.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3
                className="font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                {info.title}
              </h3>
              <p style={{ color: "var(--color-text)" }}>{info.content}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Business Hours */}
      <div
        className="p-6 rounded-xl"
        style={{
          backgroundColor: "var(--color-background-soft)",
          borderColor: "var(--color-border)",
        }}
      >
        <h3
          className="text-lg font-semibold mb-3"
          style={{ color: "var(--color-primary)" }}
        >
          ساعات العمل
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span style={{ color: "var(--color-text)" }}>السبت - الخميس</span>
            <span style={{ color: "var(--color-text)" }}>9:00 ص - 6:00 م</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: "var(--color-text)" }}>الجمعة</span>
            <span style={{ color: "var(--color-text)" }}>مغلق</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoSection;
