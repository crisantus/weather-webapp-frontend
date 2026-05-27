// Shape of one saved location returned by the backend.
export type SavedLocation = {
  id: string;
  name: string;
  country?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
};
