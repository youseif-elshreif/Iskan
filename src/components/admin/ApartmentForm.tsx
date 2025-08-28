"use client";

import React, { useState } from "react";
import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/index";
import { ApartmentFormData, ApartmentFormProps } from "@/types";
import { FaPlus, FaTimes } from "react-icons/fa";

const ApartmentForm: React.FC<ApartmentFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = {},
  isEditing = false,
  loading = false,
}) => {
  const [formData, setFormData] = useState<ApartmentFormData>({
    title: initialData.title || "",
    description: initialData.description || "",
    price: initialData.price || "",
    location: initialData.location || "",
    area: initialData.area || "",
    university: initialData.university || "",
    nearestUniversity: initialData.nearestUniversity || "",
    rooms: initialData.rooms || "1",
    size: initialData.size || "",
    imageUrl: initialData.imageUrl || "",
    images: initialData.images || [""],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validation function
  const validateField = (name: string, value: string) => {
    let error = "";
    
    switch (name) {
      case "title":
        if (!value.trim()) error = "العنوان مطلوب";
        else if (value.trim().length < 3) error = "العنوان يجب أن يكون 3 أحرف على الأقل";
        break;
      case "price":
        if (!value.trim()) error = "السعر مطلوب";
        else if (!/^\d+$/.test(value.trim())) error = "السعر يجب أن يكون رقماً صحيحاً";
        break;
      case "location":
        if (!value.trim()) error = "الموقع مطلوب";
        break;
      case "area":
        if (!value.trim()) error = "المنطقة مطلوبة";
        break;
      case "nearestUniversity":
        if (!value.trim()) error = "الجامعة القريبة مطلوبة";
        break;
      case "size":
        if (!value.trim()) error = "المساحة مطلوبة";
        break;
      case "imageUrl":
        if (value.trim() && !/^https?:\/\/.+\..+/.test(value.trim())) {
          error = "رابط الصورة غير صحيح";
        }
        break;
    }
    
    return error;
  };

  // Handle blur event to show errors
  const handleBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name as keyof ApartmentFormData] as string);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }

    // Real-time validation for immediate feedback
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  const addImageField = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ""],
    }));
  };

  const removeImageField = (index: number) => {
    if (formData.images.length > 1) {
      const newImages = formData.images.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        images: newImages,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allFields = ["title", "price", "location", "area", "nearestUniversity", "size", "imageUrl"];
    const newTouched: Record<string, boolean> = {};
    const newErrors: Record<string, string> = {};
    
    allFields.forEach(field => {
      newTouched[field] = true;
      const error = validateField(field, formData[field as keyof ApartmentFormData] as string);
      if (error) newErrors[field] = error;
    });
    
    setTouched(newTouched);
    setErrors(newErrors);
    
    // Check if there are any errors
    if (Object.values(newErrors).some(error => error !== "")) {
      return;
    }

    // Filter out empty image URLs
    const filteredImages = formData.images.filter((img) => img.trim() !== "");
    const dataToSubmit = {
      ...formData,
      images: filteredImages,
    };

    await onSubmit(dataToSubmit);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="max-w-4xl w-full translate-y-6">
        <Card className="!p-0 overflow-hidden">
          <div className="max-h-[calc(100vh-100px)] overflow-auto rounded-xl p-4">
            <div className="flex justify-between items-center mb-6 ">
              <h2
                className="text-2xl font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                {isEditing ? "تحرير الوحدة" : "إضافة وحدة جديدة"}
              </h2>
              <Button
                variant="outlined"
                size="sm"
                onClick={onClose}
                className="!p-2"
              >
                <FaTimes />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--color-primary)" }}
                  >
                    العنوان *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("title")}
                    required
                    className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${
                      errors.title && touched.title 
                        ? "border-red-500 focus:ring-red-200" 
                        : "focus:ring-blue-200"
                    }`}
                    style={{
                      borderColor: errors.title && touched.title ? "#ef4444" : "var(--color-border)",
                      backgroundColor: "var(--color-background)",
                      color: "var(--color-text)",
                    }}
                    placeholder="عنوان الوحدة"
                  />
                  {errors.title && touched.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--color-primary)" }}
                  >
                    السعر *
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("price")}
                    required
                    className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${
                      errors.price && touched.price 
                        ? "border-red-500 focus:ring-red-200" 
                        : "focus:ring-blue-200"
                    }`}
                    style={{
                      borderColor: errors.price && touched.price ? "#ef4444" : "var(--color-border)",
                      backgroundColor: "var(--color-background)",
                      color: "var(--color-text)",
                    }}
                    placeholder="السعر بالجنيه"
                  />
                  {errors.price && touched.price && (
                    <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--color-primary)" }}
                  >
                    الموقع *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("location")}
                    required
                    className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${
                      errors.location && touched.location 
                        ? "border-red-500 focus:ring-red-200" 
                        : "focus:ring-blue-200"
                    }`}
                    style={{
                      borderColor: errors.location && touched.location ? "#ef4444" : "var(--color-border)",
                      backgroundColor: "var(--color-background)",
                      color: "var(--color-text)",
                    }}
                    placeholder="الموقع"
                  />
                  {errors.location && touched.location && (
                    <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                  )}
                </div>

                {/* Area */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--color-primary)" }}
                  >
                    المنطقة *
                  </label>
                  <select
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("area")}
                    required
                    className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${
                      errors.area && touched.area 
                        ? "border-red-500 focus:ring-red-200" 
                        : "focus:ring-blue-200"
                    }`}
                    style={{
                      borderColor: errors.area && touched.area ? "#ef4444" : "var(--color-border)",
                      backgroundColor: "var(--color-background)",
                      color: "var(--color-text)",
                    }}
                  >
                    <option value="">اختر المنطقة</option>
                    <option value="المعادي">المعادي</option>
                    <option value="مدينة نصر">مدينة نصر</option>
                    <option value="الزمالك">الزمالك</option>
                    <option value="الهرم">الهرم</option>
                    <option value="مصر الجديدة">مصر الجديدة</option>
                    <option value="وسط البلد">وسط البلد</option>
                    <option value="الشيخ زايد">الشيخ زايد</option>
                    <option value="فيصل">فيصل</option>
                    <option value="التجمع الخامس">التجمع الخامس</option>
                    <option value="شبرا">شبرا</option>
                    <option value="6 أكتوبر">6 أكتوبر</option>
                    <option value="المرج">المرج</option>
                  </select>
                  {errors.area && touched.area && (
                    <p className="text-red-500 text-sm mt-1">{errors.area}</p>
                  )}
                </div>

                {/* University */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--color-primary)" }}
                  >
                    الجامعة القريبة *
                  </label>
                  <select
                    name="nearestUniversity"
                    value={formData.nearestUniversity}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("nearestUniversity")}
                    required
                    className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${
                      errors.nearestUniversity && touched.nearestUniversity 
                        ? "border-red-500 focus:ring-red-200" 
                        : "focus:ring-blue-200"
                    }`}
                    style={{
                      borderColor: errors.nearestUniversity && touched.nearestUniversity ? "#ef4444" : "var(--color-border)",
                      backgroundColor: "var(--color-background)",
                      color: "var(--color-text)",
                    }}
                  >
                    <option value="">اختر الجامعة القريبة</option>
                    <option value="الجامعة الأمريكية">الجامعة الأمريكية</option>
                    <option value="جامعة عين شمس">جامعة عين شمس</option>
                    <option value="جامعة القاهرة">جامعة القاهرة</option>
                    <option value="جامعة النيل">جامعة النيل</option>
                    <option value="جامعة 6 أكتوبر">جامعة 6 أكتوبر</option>
                  </select>
                  {errors.nearestUniversity && touched.nearestUniversity && (
                    <p className="text-red-500 text-sm mt-1">{errors.nearestUniversity}</p>
                  )}
                </div>

                {/* Rooms */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--color-primary)" }}
                  >
                    عدد الغرف
                  </label>
                  <select
                    name="rooms"
                    value={formData.rooms}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2"
                    style={{
                      borderColor: "var(--color-border)",
                      backgroundColor: "var(--color-background)",
                      color: "var(--color-text)",
                    }}
                  >
                    <option value="1">غرفة واحدة</option>
                    <option value="2">غرفتان</option>
                    <option value="3">ثلاث غرف</option>
                    <option value="4">أربع غرف</option>
                    <option value="5">خمس غرف</option>
                  </select>
                </div>

                {/* Size */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--color-primary)" }}
                  >
                    المساحة *
                  </label>
                  <select
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("size")}
                    required
                    className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${
                      errors.size && touched.size 
                        ? "border-red-500 focus:ring-red-200" 
                        : "focus:ring-blue-200"
                    }`}
                    style={{
                      borderColor: errors.size && touched.size ? "#ef4444" : "var(--color-border)",
                      backgroundColor: "var(--color-background)",
                      color: "var(--color-text)",
                    }}
                  >
                    <option value="">اختر المساحة</option>
                    <option value="25 متر مربع">25 متر مربع</option>
                    <option value="30 متر مربع">30 متر مربع</option>
                    <option value="35 متر مربع">35 متر مربع</option>
                    <option value="45 متر مربع">45 متر مربع</option>
                    <option value="65 متر مربع">65 متر مربع</option>
                    <option value="80 متر مربع">80 متر مربع</option>
                    <option value="85 متر مربع">85 متر مربع</option>
                    <option value="120 متر مربع">120 متر مربع</option>
                    <option value="170 متر مربع">170 متر مربع</option>
                  </select>
                  {errors.size && touched.size && (
                    <p className="text-red-500 text-sm mt-1">{errors.size}</p>
                  )}
                </div>

                {/* Main Image URL */}
                <div className="md:col-span-2">
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--color-primary)" }}
                  >
                    رابط الصورة الرئيسية
                  </label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("imageUrl")}
                    className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${
                      errors.imageUrl && touched.imageUrl 
                        ? "border-red-500 focus:ring-red-200" 
                        : "focus:ring-blue-200"
                    }`}
                    style={{
                      borderColor: errors.imageUrl && touched.imageUrl ? "#ef4444" : "var(--color-border)",
                      backgroundColor: "var(--color-background)",
                      color: "var(--color-text)",
                    }}
                    placeholder="رابط الصورة الرئيسية"
                  />
                  {errors.imageUrl && touched.imageUrl && (
                    <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>
                  )}
                  {/* Preview Main Image */}
                  {formData.imageUrl && (
                    <div className="mt-3">
                      <p className="text-sm font-medium mb-2" style={{ color: "var(--color-primary)" }}>
                        معاينة الصورة الرئيسية:
                      </p>
                      <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={formData.imageUrl}
                          alt="معاينة الصورة الرئيسية"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const errorDiv = e.currentTarget.nextElementSibling as HTMLDivElement;
                            if (errorDiv) {
                              errorDiv.style.display = 'flex';
                            }
                          }}
                        />
                        <div 
                          className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 text-sm"
                          style={{ display: 'none' }}
                        >
                          فشل في تحميل الصورة
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--color-primary)" }}
                >
                  الوصف
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 resize-vertical"
                  style={{
                    borderColor: "var(--color-border)",
                    backgroundColor: "var(--color-background)",
                    color: "var(--color-text)",
                  }}
                  placeholder="وصف الوحدة والمرافق المتوفرة"
                />
              </div>

              {/* Additional Images */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label
                    className="block text-sm font-medium"
                    style={{ color: "var(--color-primary)" }}
                  >
                    صور إضافية
                  </label>
                  <Button
                    type="button"
                    variant="outlined"
                    size="sm"
                    onClick={addImageField}
                    className="flex items-center space-x-2"
                  >
                    <FaPlus />
                    <span>إضافة صورة</span>
                  </Button>
                </div>

                <div className="space-y-3">
                  {formData.images.map((image, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1">
                          <input
                            type="url"
                            value={image}
                            onChange={(e) =>
                              handleImageChange(index, e.target.value)
                            }
                            className="w-full px-4 py-2 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2"
                            style={{
                              borderColor: "var(--color-border)",
                              backgroundColor: "var(--color-background)",
                              color: "var(--color-text)",
                            }}
                            placeholder={`رابط الصورة ${index + 1}`}
                          />
                        </div>
                        {formData.images.length > 1 && (
                          <Button
                            type="button"
                            variant="outlined"
                            size="sm"
                            onClick={() => removeImageField(index)}
                            className="!p-2 border-red-500 text-red-500 hover:bg-red-50"
                          >
                            <FaTimes />
                          </Button>
                        )}
                      </div>
                      {/* Preview Additional Image */}
                      {image && (
                        <div className="relative w-full h-32 rounded-lg overflow-hidden border">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={image}
                            alt={`معاينة الصورة ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const errorDiv = e.currentTarget.nextElementSibling as HTMLDivElement;
                              if (errorDiv) {
                                errorDiv.style.display = 'flex';
                              }
                            }}
                          />
                          <div 
                            className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 text-sm"
                            style={{ display: 'none' }}
                          >
                            فشل في تحميل الصورة
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="outlined"
                  onClick={onClose}
                  disabled={loading}
                >
                  إلغاء
                </Button>
                <Button
                  type="submit"
                  variant="filled"
                  disabled={loading}
                  className="flex items-center space-x-2"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                      جاري الحفظ...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <FaPlus className="ml-2" />
                      {isEditing ? "تحديث الوحدة" : "إضافة الوحدة"}
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ApartmentForm;
