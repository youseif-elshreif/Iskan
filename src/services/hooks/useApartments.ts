import { useState, useEffect, useCallback } from "react";
import { apartmentsApi } from "../api/apartments";
import type {
  UseApartmentsReturn,
  Apartment,
  CreateApartmentData,
  UpdateApartmentData,
  ApartmentFilters,
} from "@/types";

export const useApartments = (): UseApartmentsReturn => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState<string | null>(null);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Fetch all apartments
  const fetchApartments = useCallback(async (): Promise<Apartment[]> => {
    setLoading(true);
    setError(null);
    try {
      const data = await apartmentsApi.getAll();
      setApartments(data);
      return data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch apartments";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create apartment
  const createApartment = useCallback(
    async (data: CreateApartmentData): Promise<Apartment> => {
      setLoading(true);
      setError(null);
      try {
        const newApartment = await apartmentsApi.create(data);
        setApartments((prev) => [newApartment, ...prev]);
        return newApartment;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create apartment";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Update apartment
  const updateApartment = useCallback(
    async (id: string, data: UpdateApartmentData): Promise<Apartment> => {
      setLoading(true);
      setError(null);
      try {
        const updatedApartment = await apartmentsApi.update(id, data);
        setApartments((prev) =>
          prev.map((apt) => (apt.id === id ? updatedApartment : apt))
        );
        return updatedApartment;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update apartment";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Delete apartment
  const deleteApartment = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await apartmentsApi.delete(id);
      setApartments((prev) => prev.filter((apt) => apt.id !== id));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete apartment";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Search apartments
  const searchApartments = useCallback(
    async (query: string): Promise<Apartment[]> => {
      setLoading(true);
      setError(null);
      try {
        const data = await apartmentsApi.search(query);
        setApartments(data);
        return data;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to search apartments";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Filter apartments
  const filterApartments = useCallback(
    async (filters: ApartmentFilters): Promise<Apartment[]> => {
      setLoading(true);
      setError(null);
      try {
        const data = await apartmentsApi.filter(filters);
        setApartments(data);
        return data;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to filter apartments";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Refresh apartments
  const refreshApartments = useCallback(async (): Promise<Apartment[]> => {
    return await fetchApartments();
  }, [fetchApartments]);

  // Load apartments on mount
  useEffect(() => {
    fetchApartments();
  }, [fetchApartments]);

  return {
    apartments,
    loading,
    error,
    createApartment,
    updateApartment,
    deleteApartment,
    searchApartments,
    filterApartments,
    refreshApartments,
    clearError,
  };
};
