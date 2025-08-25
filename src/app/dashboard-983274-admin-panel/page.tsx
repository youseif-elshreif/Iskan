"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import AdminListingCard from "@/components/AdminListingCard";
import Filters from "@/components/Filters";
import { FaPlus, FaTrash, FaFilter } from "react-icons/fa";

interface Apartment {
  id: string;
  title: string;
  description: string;
  price: string;
  location: string;
  area?: string;
  university?: string;
  nearestUniversity?: string;
  rooms?: string;
  size?: string;
  imageUrl: string;
  images?: string[];
  amenities?: string[];
}

export default function ApartmentsPage() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [filteredApartments, setFilteredApartments] = useState<Apartment[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingApartment, setDeletingApartment] = useState<Apartment | null>(
    null
  );
  const [editingApartment, setEditingApartment] = useState<Apartment | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    area: [] as string[],
    university: [] as string[],
    size: [] as string[],
    rooms: [] as string[],
  });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    area: "",
    university: "",
    nearestUniversity: "",
    rooms: "1",
    size: "",
    imageUrl: "",
    images: [""],
  });

  // Fetch apartments from JSON Server
  const fetchApartments = async () => {
    try {
      const response = await fetch("http://localhost:3002/apartments");
      const data = await response.json();
      setApartments(data);
      setFilteredApartments(data);
    } catch (error) {
      console.error("Error fetching apartments:", error);
    }
  };

  // Filter apartments based on selected filters
  const applyFilters = useCallback(
    (apartments: Apartment[], currentFilters: typeof filters) => {
      return apartments.filter((apartment) => {
        // Filter by area
        if (currentFilters.area.length > 0) {
          if (!currentFilters.area.includes(apartment.area || "")) {
            return false;
          }
        }

        // Filter by university
        if (currentFilters.university.length > 0) {
          if (
            !currentFilters.university.includes(
              apartment.nearestUniversity || ""
            )
          ) {
            return false;
          }
        }

        // Filter by size
        if (currentFilters.size.length > 0) {
          if (!currentFilters.size.includes(apartment.size || "")) {
            return false;
          }
        }

        // Filter by rooms
        if (currentFilters.rooms.length > 0) {
          if (!currentFilters.rooms.includes(apartment.rooms || "")) {
            return false;
          }
        }

        return true;
      });
    },
    []
  );

  // Handle filter changes
  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    const filtered = applyFilters(apartments, newFilters);
    setFilteredApartments(filtered);
  };

  // Add new apartment
  const addApartment = async (apartmentData: Omit<Apartment, "id">) => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3002/apartments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apartmentData),
      });

      if (response.ok) {
        await fetchApartments();
        setShowForm(false);
        resetForm();
        // Apply current filters after adding new apartment
        const filtered = applyFilters(apartments, filters);
        setFilteredApartments(filtered);
      }
    } catch (error) {
      console.error("Error adding apartment:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update apartment
  const updateApartment = async (
    id: string,
    apartmentData: Omit<Apartment, "id">
  ) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3002/apartments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...apartmentData }),
      });

      if (response.ok) {
        await fetchApartments();
        setShowForm(false);
        setEditingApartment(null);
        resetForm();
        // Apply current filters after updating apartment
        const filtered = applyFilters(apartments, filters);
        setFilteredApartments(filtered);
      }
    } catch (error) {
      console.error("Error updating apartment:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete apartment
  const deleteApartment = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3002/apartments/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchApartments();
        setShowDeleteModal(false);
        setDeletingApartment(null);
        // Apply current filters after deleting apartment
        const filtered = applyFilters(apartments, filters);
        setFilteredApartments(filtered);
      }
    } catch (error) {
      console.error("Error deleting apartment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (apartment: Apartment) => {
    setDeletingApartment(apartment);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deletingApartment) {
      deleteApartment(deletingApartment.id);
    }
  };

  // Handle images array
  const addImageField = () => {
    setFormData({
      ...formData,
      images: [...formData.images, ""],
    });
  };

  const removeImageField = (index: number) => {
    if (formData.images.length > 1) {
      const newImages = formData.images.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        images: newImages,
      });
    }
  };

  const updateImageField = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({
      ...formData,
      images: newImages,
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      location: "",
      area: "",
      university: "",
      nearestUniversity: "",
      rooms: "1",
      size: "",
      imageUrl: "",
      images: [""],
    });
  };

  const handleEdit = (apartment: Apartment) => {
    setEditingApartment(apartment);
    setFormData({
      title: apartment.title,
      description: apartment.description,
      price: apartment.price,
      location: apartment.location,
      area: apartment.area || "",
      university: apartment.university || "",
      nearestUniversity: apartment.nearestUniversity || "",
      rooms: apartment.rooms || "1",
      size: apartment.size || "",
      imageUrl: apartment.imageUrl,
      images: apartment.images || [apartment.imageUrl],
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingApartment) {
      await updateApartment(editingApartment.id, formData);
    } else {
      await addApartment(formData);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, []);

  // Apply filters when apartments change
  useEffect(() => {
    const filtered = applyFilters(apartments, filters);
    setFilteredApartments(filtered);
  }, [apartments, filters, applyFilters]);

  return (
    <div
      className="min-h-screen p-6"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1
              className="text-3xl font-bold"
              style={{
                color: "var(--color-text)",
                fontFamily: "Cairo, sans-serif",
              }}
            >
              إدارة الشقق
            </h1>
            <p
              className="text-lg mt-2"
              style={{ color: "var(--color-text-muted)" }}
            >
              إضافة وتعديل وحذف الشقق المتاحة
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant={showFilters ? "filled" : "outlined"}
              size="md"
              className={`shadow-lg relative ${
                Object.values(filters).some((arr) => arr.length > 0)
                  ? "ring-2 ring-blue-200"
                  : ""
              }`}
            >
              <FaFilter className="ml-2" />
              فلترة
              {Object.values(filters).some((arr) => arr.length > 0) && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {Object.values(filters).reduce(
                    (total, arr) => total + arr.length,
                    0
                  )}
                </span>
              )}
            </Button>
            <Button
              onClick={() => {
                setShowForm(true);
                setEditingApartment(null);
                resetForm();
              }}
              variant="filled"
              size="md"
              className="shadow-lg"
            >
              <FaPlus className="ml-2" />
              إضافة شقة جديدة
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div
          className={`mb-8 transition-all duration-300 ${
            showFilters ? "block" : "hidden"
          }`}
        >
          <Filters onFiltersChange={handleFiltersChange} className="max-w-md" />
        </div>

        {/* Active Filters Summary */}
        {Object.values(filters).some((arr) => arr.length > 0) &&
          !showFilters && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-blue-800 mb-2">
                    الفلاتر النشطة:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {filters.area.map((item) => (
                      <span
                        key={item}
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                      >
                        المنطقة: {item}
                      </span>
                    ))}
                    {filters.university.map((item) => (
                      <span
                        key={item}
                        className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                      >
                        الجامعة: {item}
                      </span>
                    ))}
                    {filters.rooms.map((item) => (
                      <span
                        key={item}
                        className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                      >
                        الغرف: {item}
                      </span>
                    ))}
                    {filters.size.map((item) => (
                      <span
                        key={item}
                        className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full"
                      >
                        المساحة: {item}
                      </span>
                    ))}
                  </div>
                </div>
                <Button
                  onClick={() => {
                    setFilters({
                      area: [],
                      university: [],
                      size: [],
                      rooms: [],
                    });
                    setFilteredApartments(apartments);
                  }}
                  variant="outlined"
                  size="sm"
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  مسح الكل
                </Button>
              </div>
            </div>
          )}

        {/* Add/Edit Form */}
        {showForm && (
          <Card className="mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2
                className="text-xl font-bold"
                style={{ color: "var(--color-text)" }}
              >
                {editingApartment ? "تعديل الشقة" : "إضافة شقة جديدة"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--color-text)" }}
                  >
                    عنوان الشقة
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border transition-colors"
                    style={{
                      backgroundColor: "var(--color-background)",
                      borderColor: "var(--color-border)",
                      color: "var(--color-text)",
                    }}
                    required
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--color-text)" }}
                  >
                    السعر
                  </label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border transition-colors"
                    style={{
                      backgroundColor: "var(--color-background)",
                      borderColor: "var(--color-border)",
                      color: "var(--color-text)",
                    }}
                    required
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--color-text)" }}
                  >
                    الموقع
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border transition-colors"
                    style={{
                      backgroundColor: "var(--color-background)",
                      borderColor: "var(--color-border)",
                      color: "var(--color-text)",
                    }}
                    required
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--color-text)" }}
                  >
                    المنطقة
                  </label>
                  <input
                    type="text"
                    value={formData.area}
                    onChange={(e) =>
                      setFormData({ ...formData, area: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border transition-colors"
                    style={{
                      backgroundColor: "var(--color-background)",
                      borderColor: "var(--color-border)",
                      color: "var(--color-text)",
                    }}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--color-text)" }}
                  >
                    الجامعة
                  </label>
                  <input
                    type="text"
                    value={formData.university}
                    onChange={(e) =>
                      setFormData({ ...formData, university: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border transition-colors"
                    style={{
                      backgroundColor: "var(--color-background)",
                      borderColor: "var(--color-border)",
                      color: "var(--color-text)",
                    }}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--color-text)" }}
                  >
                    أقرب جامعة
                  </label>
                  <input
                    type="text"
                    value={formData.nearestUniversity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        nearestUniversity: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl border transition-colors"
                    style={{
                      backgroundColor: "var(--color-background)",
                      borderColor: "var(--color-border)",
                      color: "var(--color-text)",
                    }}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--color-text)" }}
                  >
                    عدد الغرف
                  </label>
                  <select
                    value={formData.rooms}
                    onChange={(e) =>
                      setFormData({ ...formData, rooms: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border transition-colors"
                    style={{
                      backgroundColor: "var(--color-background)",
                      borderColor: "var(--color-border)",
                      color: "var(--color-text)",
                    }}
                  >
                    <option value="1">غرفة واحدة</option>
                    <option value="2">غرفتان</option>
                    <option value="3">3 غرف</option>
                    <option value="4">4 غرف</option>
                    <option value="5+">5+ غرف</option>
                  </select>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--color-text)" }}
                  >
                    المساحة
                  </label>
                  <input
                    type="text"
                    value={formData.size}
                    onChange={(e) =>
                      setFormData({ ...formData, size: e.target.value })
                    }
                    placeholder="مثال: 85 متر مربع"
                    className="w-full px-4 py-3 rounded-xl border transition-colors"
                    style={{
                      backgroundColor: "var(--color-background)",
                      borderColor: "var(--color-border)",
                      color: "var(--color-text)",
                    }}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--color-text)" }}
                  >
                    رابط الصورة الرئيسية
                  </label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border transition-colors"
                    style={{
                      backgroundColor: "var(--color-background)",
                      borderColor: "var(--color-border)",
                      color: "var(--color-text)",
                    }}
                    required
                  />
                  {/* Main Image Preview */}
                  {formData.imageUrl && (
                    <div className="mt-2">
                      <div className="relative h-32 w-full">
                        <Image
                          src={formData.imageUrl}
                          alt="معاينة الصورة الرئيسية"
                          fill
                          className="object-cover rounded-lg border"
                          style={{
                            borderColor: "var(--color-border)",
                          }}
                          onError={(e) => {
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                              parent.innerHTML = `
                                <div class="h-32 w-full bg-gray-100 rounded-lg border flex items-center justify-center">
                                  <span class="text-gray-500 text-sm">فشل في تحميل الصورة</span>
                                </div>
                              `;
                            }
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Images Section */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--color-text)" }}
                >
                  صور إضافية للسوايبر
                </label>
                {formData.images.map((image, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex gap-2 mb-2">
                      <input
                        type="url"
                        value={image}
                        onChange={(e) =>
                          updateImageField(index, e.target.value)
                        }
                        placeholder="رابط الصورة"
                        className="flex-1 px-4 py-3 rounded-xl border transition-colors"
                        style={{
                          backgroundColor: "var(--color-background)",
                          borderColor: "var(--color-border)",
                          color: "var(--color-text)",
                        }}
                      />
                      {formData.images.length > 1 && (
                        <Button
                          type="button"
                          variant="outlined"
                          size="sm"
                          onClick={() => removeImageField(index)}
                          className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                          <FaTrash />
                        </Button>
                      )}
                    </div>
                    {/* Image Preview */}
                    {image && (
                      <div className="mt-2">
                        <div className="relative h-32 w-full">
                          <Image
                            src={image}
                            alt={`معاينة الصورة ${index + 1}`}
                            fill
                            className="object-cover rounded-lg border"
                            style={{
                              borderColor: "var(--color-border)",
                            }}
                            onError={(e) => {
                              const parent = e.currentTarget.parentElement;
                              if (parent) {
                                parent.innerHTML = `
                                  <div class="h-32 w-full bg-gray-100 rounded-lg border flex items-center justify-center">
                                    <span class="text-gray-500 text-sm">فشل في تحميل الصورة</span>
                                  </div>
                                `;
                              }
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outlined"
                  size="sm"
                  onClick={addImageField}
                  className="mt-2"
                >
                  <FaPlus className="ml-1" />
                  إضافة صورة
                </Button>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--color-text)" }}
                >
                  الوصف
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border transition-colors h-32"
                  style={{
                    backgroundColor: "var(--color-background)",
                    borderColor: "var(--color-border)",
                    color: "var(--color-text)",
                  }}
                  required
                />
              </div>

              <div className="flex space-x-4 space-x">
                <Button
                  type="submit"
                  variant="filled"
                  size="lg"
                  disabled={loading}
                >
                  {loading
                    ? "جاري الحفظ..."
                    : editingApartment
                    ? "تحديث"
                    : "حفظ"}
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  size="lg"
                  onClick={() => {
                    setShowForm(false);
                    setEditingApartment(null);
                    resetForm();
                  }}
                >
                  إلغاء
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Apartments List */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2
              className="text-xl font-semibold"
              style={{ color: "var(--color-text)" }}
            >
              الشقق المتاحة ({filteredApartments.length})
            </h2>
            {Object.values(filters).some((arr) => arr.length > 0) && (
              <div
                className="text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                عرض {filteredApartments.length} من أصل {apartments.length} شقة
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApartments.map((apartment) => (
            <AdminListingCard
              key={apartment.id}
              id={apartment.id}
              title={apartment.title}
              description={apartment.description}
              price={apartment.price}
              location={apartment.location}
              area={apartment.area}
              nearestUniversity={apartment.nearestUniversity}
              rooms={apartment.rooms}
              size={apartment.size}
              imageUrl={apartment.imageUrl}
              onEdit={() => handleEdit(apartment)}
              onDelete={() => handleDeleteClick(apartment)}
              isLoading={loading}
            />
          ))}
        </div>

        {filteredApartments.length === 0 && apartments.length > 0 && (
          <div
            className="text-center py-12"
            style={{ color: "var(--color-text-muted)" }}
          >
            <p className="text-lg mb-4">لا توجد شقق تطابق الفلاتر المحددة</p>
            <Button
              onClick={() => {
                setFilters({
                  area: [],
                  university: [],
                  size: [],
                  rooms: [],
                });
                setFilteredApartments(apartments);
              }}
              variant="outlined"
              size="lg"
            >
              مسح الفلاتر
            </Button>
          </div>
        )}

        {apartments.length === 0 && (
          <div
            className="text-center py-12"
            style={{ color: "var(--color-text-muted)" }}
          >
            <p className="text-lg">لا توجد شقق مضافة بعد</p>
            <Button
              onClick={() => {
                setShowForm(true);
                setEditingApartment(null);
                resetForm();
              }}
              variant="filled"
              size="lg"
              className="mt-4"
            >
              إضافة أول شقة
            </Button>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && deletingApartment && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
              <div className="p-6">
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: "var(--color-text)" }}
                >
                  تأكيد الحذف
                </h3>
                <p
                  className="mb-6"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  هل أنت متأكد من حذف الشقة &ldquo;{deletingApartment.title}
                  &rdquo;؟ لا يمكن التراجع عن هذا الإجراء.
                </p>
                <div className="flex space-x-4 space-x">
                  <Button
                    onClick={confirmDelete}
                    variant="filled"
                    size="md"
                    className="flex-1 bg-red-600 hover:bg-red-700"
                    disabled={loading}
                  >
                    {loading ? "جاري الحذف..." : "حذف"}
                  </Button>
                  <Button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setDeletingApartment(null);
                    }}
                    variant="outlined"
                    size="md"
                    className="flex-1"
                  >
                    إلغاء
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
