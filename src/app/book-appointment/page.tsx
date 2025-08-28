"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button, Card } from "@/components/ui";
import { ApartmentInfoCard } from "@/components/admin";
import { AppointmentSelector, BookingForm } from "@/components/appointments";
import { ContactUsButton } from "@/components/contact";
import { useApartments, useAppointments } from "@/services/hooks/index";
import { Appointment, BookingData } from "@/types";

function BookAppointmentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // استخدام الـ custom hooks
  const {
    apartments,
    loading: apartmentsLoading,
    error: apartmentsError,
  } = useApartments();
  const {
    availableAppointments: appointments,
    loading: appointmentsLoading,
    error: appointmentsError,
    bookAppointment,
  } = useAppointments();

  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const [formData, setFormData] = useState({
    userName: "",
    userPhone: "",
    userEmail: "",
    userMessage: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validation function
  const validateField = (name: string, value: string) => {
    let error = "";
    
    switch (name) {
      case "userName":
        if (!value.trim()) error = "الاسم مطلوب";
        else if (value.trim().length < 2) error = "الاسم يجب أن يكون حرفين على الأقل";
        break;
      case "userPhone":
        if (!value.trim()) error = "رقم الهاتف مطلوب";
        else if (!/^[0-9+\-\s()]+$/.test(value.trim())) error = "رقم الهاتف غير صحيح";
        break;
      case "userEmail":
        if (value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          error = "البريد الإلكتروني غير صحيح";
        }
        break;
    }
    
    return error;
  };

  // Handle blur event to show errors
  const handleBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name as keyof typeof formData]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // Get apartment ID from URL params
  const apartmentId = searchParams.get("apartmentId");
  const apartment = apartments.find((apt) => apt.id === apartmentId);

  // Computed loading state
  const loading = apartmentsLoading || appointmentsLoading;

  // Show message for 3 seconds
  const showMessage = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 2000);
  };

  // Show error messages from hooks
  useEffect(() => {
    if (apartmentsError) {
      showMessage(apartmentsError, "error");
    }
  }, [apartmentsError]);

  useEffect(() => {
    if (appointmentsError) {
      showMessage(appointmentsError, "error");
    }
  }, [appointmentsError]);

  // Book appointment using the hook
  const handleBookAppointment = async () => {
    if (!selectedAppointment || !apartment) {
      showMessage("يرجى اختيار موعد", "error");
      return;
    }

    // Validate all fields
    const requiredFields = ["userName", "userPhone"];
    const allFields = ["userName", "userPhone", "userEmail"];
    const newErrors: Record<string, string> = {};
    const newTouched: Record<string, boolean> = {};

    allFields.forEach(field => {
      newTouched[field] = true;
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) newErrors[field] = error;
    });

    setTouched(newTouched);
    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error)) {
      showMessage("يرجى تصحيح الأخطاء في النموذج", "error");
      return;
    }

    // Check required fields
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData].trim());
    if (missingFields.length > 0) {
      showMessage("يرجى ملء البيانات المطلوبة", "error");
      return;
    }

    try {
      const bookingData: BookingData = {
        userName: formData.userName,
        userPhone: formData.userPhone,
        userEmail: formData.userEmail,
        userMessage: formData.userMessage,
        apartmentId: apartment.id,
        apartmentTitle: apartment.title,
        apartmentLocation: apartment.location,
      };

      await bookAppointment(selectedAppointment.id, bookingData);
      showMessage("تم حجز الموعد بنجاح!", "success");

      // Reset form and redirect after success
      setTimeout(() => {
        setFormData({
          userName: "",
          userPhone: "",
          userEmail: "",
          userMessage: "",
        });
        setErrors({});
        setTouched({});
        router.push(`/listings/listing/${apartment.id}`);
      }, 500);
    } catch {
      // الخطأ هيتم التعامل معه في الـ hook
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Validate if field was touched
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  if (!apartmentId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="max-w-md">
          <div className="text-center p-6">
            <h2
              className="text-xl font-bold mb-4"
              style={{ color: "var(--color-text)" }}
            >
              خطأ في الرابط
            </h2>
            <p className="mb-4" style={{ color: "var(--color-text-muted)" }}>
              لم يتم العثور على معلومات الشقة
            </p>
            <Button onClick={() => router.push("/listings")}>
              العودة للشقق
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!apartment) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="max-w-md">
          <div className="text-center p-6">
            <h2
              className="text-xl font-bold mb-4"
              style={{ color: "var(--color-text)" }}
            >
              جاري التحميل...
            </h2>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-6"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: "var(--color-primary)" }}
          >
            حجز موعد للمعاينة
          </h1>
          <p style={{ color: "var(--color-text-muted)" }}>
            احجز موعد لمعاينة الشقة واحصل على جولة شخصية
          </p>
        </div>

        {/* Message Notification */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-100 border border-green-300 text-green-700"
                : "bg-red-100 border border-red-300 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Apartment Info and Appointments */}
          <div>
            <ApartmentInfoCard apartment={apartment} />
            <AppointmentSelector
              appointments={appointments}
              selectedAppointment={selectedAppointment}
              onSelectAppointment={setSelectedAppointment}
              onBack={() => router.push(`/listings/listing/${apartment.id}`)}
            />
          </div>

          {/* Right Column - Booking Form */}
          <div>
            <BookingForm
              formData={formData}
              onInputChange={handleInputChange}
              selectedAppointment={selectedAppointment}
              onSubmit={handleBookAppointment}
              loading={loading}
              apartment={apartment}
              errors={errors}
              touched={touched}
              onBlur={handleBlur}
            />
          </div>
        </div>
      </div>

      {/* Contact Us Button */}
      <ContactUsButton />
    </div>
  );
}

export default function BookAppointmentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    }>
      <BookAppointmentContent />
    </Suspense>
  );
}
