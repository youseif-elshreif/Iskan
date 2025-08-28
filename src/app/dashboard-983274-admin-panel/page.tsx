"use client";

import { useState, useEffect } from "react";
import { Filters } from "@/components/common";
import { DeleteConfirmationModal } from "@/components/common";
import {
  ApartmentForm,
  ApartmentsHeader,
  ApartmentsList,
} from "@/components/admin";
import { FiltersSummary } from "@/components/common";
import { useApartments } from "@/services/hooks";
import { CreateApartmentData, UpdateApartmentData, Apartment } from "@/types";

interface FiltersData {
  area: string[];
  university: string[];
  size: string[];
  rooms: string[];
}

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

export default function ApartmentsPage() {
  // استخدام الـ custom hook
  const {
    apartments,
    loading,
    error,
    createApartment,
    updateApartment,
    deleteApartment,
    clearError,
  } = useApartments();

  // Local state للـ UI
  const [showForm, setShowForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingApartment, setEditingApartment] = useState<Apartment | null>(
    null
  );
  const [deletingApartment, setDeletingApartment] = useState<Apartment | null>(
    null
  );
  const [filteredApartments, setFilteredApartments] = useState<Apartment[]>([]);
  const [activeFilters, setActiveFilters] = useState<FiltersData>({
    area: [],
    university: [],
    size: [],
    rooms: [],
  });
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  // Show message function
  const showMessage = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  // Update filtered apartments when apartments change
  useEffect(() => {
    setFilteredApartments(apartments);
  }, [apartments]);

  // Handle apartment creation
  const handleAddApartment = async (apartmentData: ApartmentFormData) => {
    try {
      // Convert form data to CreateApartmentData format
      const createData: CreateApartmentData = {
        title: apartmentData.title,
        description: apartmentData.description,
        price: apartmentData.price,
        location: apartmentData.location,
        area: apartmentData.area,
        nearestUniversity:
          apartmentData.nearestUniversity || apartmentData.university,
        rooms: apartmentData.rooms,
        size: apartmentData.size,
        imageUrl: apartmentData.imageUrl,
        images: apartmentData.images || [],
        amenities: [],
      };

      await createApartment(createData);
      setShowForm(false);
      showMessage("تم إضافة الشقة بنجاح", "success");
    } catch {
      showMessage("فشل في إضافة الشقة", "error");
    }
  };

  // Handle apartment update
  const handleUpdateApartment = async (apartmentData: ApartmentFormData) => {
    if (!editingApartment) return;

    try {
      // Convert form data to UpdateApartmentData format
      const updateData: UpdateApartmentData = {
        title: apartmentData.title,
        description: apartmentData.description,
        price: apartmentData.price,
        location: apartmentData.location,
        area: apartmentData.area,
        nearestUniversity:
          apartmentData.nearestUniversity || apartmentData.university,
        rooms: apartmentData.rooms,
        size: apartmentData.size,
        imageUrl: apartmentData.imageUrl,
        images: apartmentData.images || [],
        amenities: [],
      };

      await updateApartment(editingApartment.id, updateData);
      setEditingApartment(null);
      setShowForm(false);
      showMessage("تم تحديث الشقة بنجاح", "success");
    } catch {
      showMessage("فشل في تحديث الشقة", "error");
    }
  };

  // Handle apartment deletion
  const handleDeleteApartment = async () => {
    if (!deletingApartment) return;

    try {
      await deleteApartment(deletingApartment.id);
      setDeletingApartment(null);
      setShowDeleteModal(false);
      showMessage("تم حذف الشقة بنجاح", "success");
    } catch {
      showMessage("فشل في حذف الشقة", "error");
    }
  };

  // Handle filter changes
  const handleFiltersChange = (newFilters: FiltersData) => {
    setActiveFilters(newFilters);

    // Apply filters locally for now (you can use API filtering later)
    const filtered = apartments.filter((apartment) => {
      // Filter by area
      if (newFilters.area?.length > 0) {
        if (!newFilters.area.includes(apartment.area || "")) {
          return false;
        }
      }

      // Filter by university
      if (newFilters.university?.length > 0) {
        if (
          !newFilters.university.includes(apartment.nearestUniversity || "")
        ) {
          return false;
        }
      }

      // Filter by size
      if (newFilters.size?.length > 0) {
        if (!newFilters.size.includes(apartment.size || "")) {
          return false;
        }
      }

      // Filter by rooms
      if (newFilters.rooms?.length > 0) {
        if (!newFilters.rooms.includes(apartment.rooms || "")) {
          return false;
        }
      }

      return true;
    });

    setFilteredApartments(filtered);
  };

  // Clear filters
  const clearFilters = () => {
    setActiveFilters({
      area: [],
      university: [],
      size: [],
      rooms: [],
    });
    setFilteredApartments(apartments);
  };

  // Prepare edit
  const handleEditClick = (apartment: Apartment) => {
    setEditingApartment(apartment);
    setShowForm(true);
  };

  // Prepare delete
  const handleDeleteClick = (apartment: Apartment) => {
    setDeletingApartment(apartment);
    setShowDeleteModal(true);
  };

  // Close forms
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingApartment(null);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingApartment(null);
  };

  return (
    <div>
      {/* Header */}
      <ApartmentsHeader
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
        onAddApartment={() => setShowForm(true)}
        filters={activeFilters}
      />

      {/* Error Message */}
      {error && (
        <div
          className="p-4 rounded-lg text-center"
          style={{
            backgroundColor: "#fee2e2",
            color: "#dc2626",
          }}
        >
          {error}
          <button onClick={clearError} className="ml-2 underline">
            إخفاء
          </button>
        </div>
      )}

      {/* Success/Error Messages */}
      {message && (
        <div
          className="p-4 rounded-lg text-center"
          style={{
            backgroundColor: message.type === "success" ? "#d1fae5" : "#fee2e2",
            color: message.type === "success" ? "#059669" : "#dc2626",
          }}
        >
          {message.text}
        </div>
      )}

      {/* Filters */}
      {showFilters && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Filters onFiltersChange={handleFiltersChange} />
          </div>
          <div className="lg:col-span-3">
            <FiltersSummary
              filters={activeFilters}
              onClearFilters={clearFilters}
              totalResults={apartments.length}
              filteredResults={filteredApartments.length}
            />
          </div>
        </div>
      )}

      {/* Apartment Form */}
      {showForm && (
        <ApartmentForm
          isOpen={showForm}
          onClose={handleCloseForm}
          onSubmit={
            editingApartment ? handleUpdateApartment : handleAddApartment
          }
          initialData={editingApartment || undefined}
          isEditing={!!editingApartment}
          loading={loading}
        />
      )}

      {/* Apartments List */}
      <ApartmentsList
        apartments={filteredApartments}
        totalApartments={apartments.length}
        loading={loading}
        hasActiveFilters={Object.values(activeFilters).some(
          (arr) => arr.length > 0
        )}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        onClearFilters={clearFilters}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteModal && deletingApartment && (
        <DeleteConfirmationModal
          isOpen={showDeleteModal}
          onClose={handleCloseDeleteModal}
          onConfirm={handleDeleteApartment}
          title="حذف الشقة"
          message={`هل أنت متأكد من حذف "${deletingApartment.title}"؟`}
          loading={loading}
        />
      )}
    </div>
  );
}
