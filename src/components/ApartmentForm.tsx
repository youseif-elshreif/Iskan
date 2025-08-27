"use client";

import React, { useState } from "react";
import {Card,Button} from "@/components/ui/index";
import { FaPlus, FaTimes } from "react-icons/fa";

interface ApartmentFormData {
  title: string;
  description: string;
  price: string;
  location: string;
  area: string;
  university: string;
  nearestUniversity: string;
  rooms: string;
  size: string;
  imageUrl: string;
  images: string[];
}

interface ApartmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ApartmentFormData) => Promise<void>;
  initialData?: Partial<ApartmentFormData>;
  isEditing?: boolean;
  loading?: boolean;
}

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
    if (!formData.title || !formData.price || !formData.location) {
      alert("يرجى ملء الحقول المطلوبة");
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
      <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <Card>
          <div className="flex justify-between items-center mb-6">
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
                  required
                  className="w-full px-4 py-2 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2"
                  style={{
                    borderColor: "var(--color-border)",
                    backgroundColor: "var(--color-background)",
                    color: "var(--color-text)",
                  }}
                  placeholder="عنوان الوحدة"
                />
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
                  required
                  className="w-full px-4 py-2 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2"
                  style={{
                    borderColor: "var(--color-border)",
                    backgroundColor: "var(--color-background)",
                    color: "var(--color-text)",
                  }}
                  placeholder="السعر بالجنيه"
                />
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
                  required
                  className="w-full px-4 py-2 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2"
                  style={{
                    borderColor: "var(--color-border)",
                    backgroundColor: "var(--color-background)",
                    color: "var(--color-text)",
                  }}
                  placeholder="الموقع"
                />
              </div>

              {/* Area */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--color-primary)" }}
                >
                  المنطقة
                </label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2"
                  style={{
                    borderColor: "var(--color-border)",
                    backgroundColor: "var(--color-background)",
                    color: "var(--color-text)",
                  }}
                  placeholder="المنطقة"
                />
              </div>

              {/* University */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--color-primary)" }}
                >
                  الجامعة القريبة
                </label>
                <input
                  type="text"
                  name="nearestUniversity"
                  value={formData.nearestUniversity}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2"
                  style={{
                    borderColor: "var(--color-border)",
                    backgroundColor: "var(--color-background)",
                    color: "var(--color-text)",
                  }}
                  placeholder="الجامعة القريبة"
                />
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
                </select>
              </div>

              {/* Size */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--color-primary)" }}
                >
                  المساحة
                </label>
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2"
                  style={{
                    borderColor: "var(--color-border)",
                    backgroundColor: "var(--color-background)",
                    color: "var(--color-text)",
                  }}
                  placeholder="المساحة بالمتر المربع"
                />
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
                  className="w-full px-4 py-2 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2"
                  style={{
                    borderColor: "var(--color-border)",
                    backgroundColor: "var(--color-background)",
                    color: "var(--color-text)",
                  }}
                  placeholder="رابط الصورة الرئيسية"
                />
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
                  <div key={index} className="flex items-center space-x-2">
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
        </Card>
      </div>
    </div>
  );
};

export default ApartmentForm;
