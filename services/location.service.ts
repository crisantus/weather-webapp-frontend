import { api } from "./api";
import type { SavedLocation } from "../types/location.type";

// Get all saved locations for the logged-in user.
export const getLocations = () => {
  return api.get<{ status: boolean; message: string; locations: SavedLocation[] }>(
    "/api/locations"
  );
};

// Save a new location for the logged-in user.
export const createLocation = (data: {
  name: string;
  country?: string;
  isDefault?: boolean;
}) => api.post<{ status: boolean; message: string; location: SavedLocation }>("/api/locations", data);
