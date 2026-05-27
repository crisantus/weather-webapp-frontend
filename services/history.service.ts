import { api } from "./api";
import type { WeatherHistory } from "../types/weather.type";

// Get the logged-in user's saved weather search history.
export const getWeatherHistory = () => {
  return api.get<{ status: boolean; message: string; histories: WeatherHistory[] }>(
    "/api/weather-history"
  );
};

// Get one saved weather history record.
export const getWeatherHistoryItem = (id: string) => {
  return api.get<{ status: boolean; message: string; history: WeatherHistory }>(
    `/api/weather-history/${id}`
  );
};

// Delete one saved weather history record.
export const deleteWeatherHistoryItem = (id: string) => {
  return api.delete<{ status: boolean; message: string }>(`/api/weather-history/${id}`);
};

// Delete every saved weather history record for the logged-in user.
export const clearWeatherHistory = () => {
  return api.delete<{ status: boolean; message: string }>("/api/weather-history");
};
