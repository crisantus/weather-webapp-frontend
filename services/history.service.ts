import { api } from "./api";
import type { WeatherHistory } from "../types/weather.type";

// Get the logged-in user's saved weather search history.
export const getWeatherHistory = () => {
  return api.get<{ status: boolean; message: string; histories: WeatherHistory[] }>(
    "/api/weather-history"
  );
};
