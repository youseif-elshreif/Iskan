# مجلد الكمبونانتس المنظم

تم تنظيم الكمبونانتس في مجلدات منطقية لتسهيل الوصول والصيانة:

## 📁 التنظيم الجديد

### `/admin`

كمبونانتس لوحة التحكم الإدارية:

- `AdminButton` - زر الوصول للوحة الإدارية
- `AdminListingCard` - كارد الوحدات في لوحة التحكم
- `DashboardLoading` - حالة التحميل للوحة التحكم
- `DashboardSidebar` - الشريط الجانبي للوحة التحكم
- `DashboardStats` - إحصائيات لوحة التحكم
- `ApartmentForm` - نموذج إضافة/تحرير الشقق
- `ApartmentInfoCard` - معلومات الشقة
- `ApartmentsHeader` - رأسية صفحة الشقق
- `ApartmentsList` - قائمة الشقق

### `/listings`

كمبونانتس صفحات الوحدات:

- `ListingCard` - كارد الوحدة
- `ListingDetails` - تفاصيل الوحدة
- `ListingHeader` - رأسية صفحة الوحدة
- `ListingImageCarousel` - معرض صور الوحدة
- `ListingMap` - خريطة موقع الوحدة
- `ListingNotFound` - صفحة الوحدة غير موجودة
- `ListingsContent` - محتوى صفحة الوحدات
- `ListingsEmptyState` - حالة عدم وجود وحدات
- `ListingsGrid` - شبكة عرض الوحدات
- `ListingsHeader` - رأسية صفحة الوحدات
- `ListingSidebar` - الشريط الجانبي للوحدة
- `ListingsLoadingState` - حالة تحميل الوحدات
- `ListingsResultsCount` - عداد نتائج البحث
- `ListingsSearchFilters` - فلاتر البحث

### `/appointments`

كمبونانتس المواعيد:

- `AppointmentSelector` - منتقي المواعيد
- `AppointmentsHeader` - رأسية صفحة المواعيد
- `AvailableAppointments` - المواعيد المتاحة
- `BookedAppointments` - المواعيد المحجوزة
- `BookingForm` - نموذج الحجز
- `BookingSummary` - ملخص الحجز
- `CompletedAppointments` - المواعيد المكتملة
- `PostponedAppointments` - المواعيد المؤجلة
- `PostponeModal` - نافذة التأجيل

### `/messages`

كمبونانتس الرسائل:

- `MessageCard` - كارد الرسالة
- `MessageNotification` - إشعار الرسالة
- `MessagesFilters` - فلاتر الرسائل
- `MessagesHeader` - رأسية صفحة الرسائل
- `MessagesList` - قائمة الرسائل

### `/auth`

كمبونانتس المصادقة:

- `LoginDemoCredentials` - بيانات تسجيل الدخول التجريبية
- `LoginForm` - نموذج تسجيل الدخول
- `LoginHeader` - رأسية صفحة تسجيل الدخول

### `/contact`

كمبونانتس التواصل:

- `ContactForm` - نموذج التواصل
- `ContactInfo` - معلومات التواصل
- `ContactInfoSection` - قسم معلومات التواصل
- `ContactUsButton` - زر تواصل معنا

### `/layout`

كمبونانتس التخطيط:

- `Navbar` - شريط التنقل
- `Footer` - تذييل الصفحة
- `HeroSection` - القسم الرئيسي

### `/common`

كمبونانتس مشتركة:

- `Breadcrumb` - مسار التنقل
- `SearchBar` - شريط البحث
- `Filters` - الفلاتر
- `FiltersSummary` - ملخص الفلاتر
- `DecorativeElements` - العناصر الزخرفية
- `DeleteConfirmationModal` - نافذة تأكيد الحذف
- `FeatureHighlights` - تمييز الميزات

### `/ui`

كمبونانتس واجهة المستخدم الأساسية:

- `Button` - الأزرار
- `Card` - الكروت

## 🚀 كيفية الاستخدام

### الاستيراد من مجلد محدد:

```typescript
import { LoginForm, LoginHeader } from "@/components/auth";
import { ListingCard, ListingsHeader } from "@/components/listings";
import { Button, Card } from "@/components/ui";
```

### الاستيراد من الفهرس الرئيسي:

```typescript
import { LoginForm, ListingCard, Button } from "@/components";
```
