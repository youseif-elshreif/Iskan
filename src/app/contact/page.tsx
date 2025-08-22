"use client";

import React from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import {
  IoLocationOutline,
  IoCallOutline,
  IoMailOutline,
  IoLogoWhatsapp,
} from "react-icons/io5";

export default function ContactPage() {
  const contactInfo = [
    {
      icon: IoLocationOutline,
      title: "العنوان",
      content: "شارع التحرير، الدقي، محافظة الجيزة، مصر",
      link: "https://maps.google.com/?q=الدقي،الجيزة",
    },
    {
      icon: IoCallOutline,
      title: "الهاتف",
      content: "+20 123 456 7890",
      link: "tel:+201234567890",
    },
    {
      icon: IoMailOutline,
      title: "البريد الإلكتروني",
      content: "info@iskan.com",
      link: "mailto:info@iskan.com",
    },
    {
      icon: IoLogoWhatsapp,
      title: "واتساب",
      content: "+20 123 456 7890",
      link: "https://wa.me/201234567890",
    },
  ];

  return (
    <div className="min-h-screen bg-primary-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-heading mb-4">
            تواصل معنا
          </h1>
          <p className="text-lg text-primary-text max-w-2xl mx-auto">
            نحن هنا لمساعدتك في العثور على السكن المثالي. تواصل معنا الآن وسنقوم
            بالرد عليك في أقرب وقت
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card>
              <h2 className="text-2xl font-semibold text-heading mb-6">
                أرسل لنا رسالة
              </h2>
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">
                  للتواصل معنا، يرجى استخدام معلومات الاتصال المتاحة
                </p>
                <Button>تواصل معنا الآن</Button>
              </div>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="w-12 h-12 bg-accent-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-heading mb-2">
                    {info.title}
                  </h3>
                  <a
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-text hover:text-accent-primary transition-colors duration-200"
                  >
                    {info.content}
                  </a>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card>
              <h3 className="text-xl font-semibold text-heading mb-4">
                تواصل سريع
              </h3>
              <div className="space-y-3">
                <a
                  href="https://wa.me/201234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="filled"
                    className="w-full justify-center flex items-center space-x-2 space-x-reverse"
                  >
                    <IoLogoWhatsapp className="w-5 h-5" />
                    <span>راسلنا على واتساب</span>
                  </Button>
                </a>
                <a href="tel:+201234567890">
                  <Button
                    variant="outlined"
                    className="w-full justify-center flex items-center space-x-2 space-x-reverse"
                  >
                    <IoCallOutline className="w-5 h-5" />
                    <span>اتصل بنا الآن</span>
                  </Button>
                </a>
              </div>
            </Card>

            {/* Business Hours */}
            <Card>
              <h3 className="text-xl font-semibold text-heading mb-4">
                ساعات العمل
              </h3>
              <div className="space-y-2 text-primary-text">
                <div className="flex justify-between">
                  <span>السبت - الخميس</span>
                  <span>9:00 ص - 8:00 م</span>
                </div>
                <div className="flex justify-between">
                  <span>الجمعة</span>
                  <span>2:00 م - 8:00 م</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <Card>
            <h2 className="text-2xl font-semibold text-heading mb-6 text-center">
              موقعنا على الخريطة
            </h2>
            <div className="w-full h-96 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.6977!2d31.200!3d30.045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAyJzQyLjAiTiAzMcKwMTInMDAuMCJF!5e0!3m2!1sar!2seg!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="موقع المكتب"
              />
            </div>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <Card>
            <h2 className="text-2xl font-semibold text-heading mb-6 text-center">
              الأسئلة الشائعة
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-heading mb-2">
                  كيف يمكنني حجز موعد لمعاينة السكن؟
                </h3>
                <p className="text-primary-text">
                  يمكنك حجز موعد من خلال الضغط على زر &quot;احجز ميعاد&quot; في
                  صفحة السكن أو من خلال التواصل معنا مباشرة عبر الهاتف أو
                  واتساب.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-heading mb-2">
                  هل تشمل الأسعار المرافق؟
                </h3>
                <p className="text-primary-text">
                  نعم، معظم أسعار الوحدات تشمل المرافق الأساسية مثل الكهرباء
                  والمياه والإنترنت. تفاصيل أكثر متوفرة في صفحة كل سكن.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-heading mb-2">
                  ما هي شروط الحجز؟
                </h3>
                <p className="text-primary-text">
                  نطلب إيداع شهر مقدماً وشهر تأمين، بالإضافة إلى صورة من الهوية
                  الشخصية أو جواز السفر وإثبات التسجيل في الجامعة.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
