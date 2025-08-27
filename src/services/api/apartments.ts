import api from "./config";
import type {
  Apartment,
  CreateApartmentData,
  UpdateApartmentData,
  ApartmentFilters,
} from "@/types";

export const apartmentsApi = {
  // Get all apartments
  getAll: async (): Promise<Apartment[]> => {
    try {
      const response = await api.get("/apartments");
      return response.data;
    } catch (error) {
      console.error("Error fetching apartments:", error);
      throw new Error("Failed to fetch apartments");
    }
  },

  // Get apartment by ID
  getById: async (id: string): Promise<Apartment> => {
    try {
      const response = await api.get(`/apartments/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching apartment:", error);
      throw new Error("Failed to fetch apartment");
    }
  },

  // Create new apartment
  create: async (apartmentData: CreateApartmentData): Promise<Apartment> => {
    try {
      const response = await api.post("/apartments", {
        ...apartmentData,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return response.data;
    } catch (error) {
      console.error("Error creating apartment:", error);
      throw new Error("Failed to create apartment");
    }
  },

  // Update apartment
  update: async (
    id: string,
    apartmentData: UpdateApartmentData
  ): Promise<Apartment> => {
    try {
      const response = await api.patch(`/apartments/${id}`, {
        ...apartmentData,
        updatedAt: new Date().toISOString(),
      });
      return response.data;
    } catch (error) {
      console.error("Error updating apartment:", error);
      throw new Error("Failed to update apartment");
    }
  },

  // Delete apartment
  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/apartments/${id}`);
    } catch (error) {
      console.error("Error deleting apartment:", error);
      throw new Error("Failed to delete apartment");
    }
  },

  // Search apartments
  search: async (query: string): Promise<Apartment[]> => {
    try {
      if (!query.trim()) {
        return await apartmentsApi.getAll();
      }

      const response = await api.get("/apartments", {
        params: { q: query },
      });
      return response.data;
    } catch (error) {
      console.error("Error searching apartments:", error);
      throw new Error("Failed to search apartments");
    }
  },

  // Filter apartments
  filter: async (filters: ApartmentFilters): Promise<Apartment[]> => {
    try {
      const params: Record<string, string> = {};

      if (filters.area && filters.area.length > 0) {
        params.area_like = filters.area.join("|");
      }
      if (filters.university && filters.university.length > 0) {
        params.university_like = filters.university.join("|");
      }
      if (filters.size && filters.size.length > 0) {
        params.size_like = filters.size.join("|");
      }
      if (filters.rooms && filters.rooms.length > 0) {
        params.rooms_like = filters.rooms.join("|");
      }

      const response = await api.get("/apartments", { params });
      return response.data;
    } catch (error) {
      console.error("Error filtering apartments:", error);
      throw new Error("Failed to filter apartments");
    }
  },
};
