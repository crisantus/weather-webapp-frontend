import { api } from "./api";
import type { WeatherResult } from "../types/weather.type";

// Ask the backend for current weather by city name.
export const getCurrentWeather = (city: string) => {
  return api.get<{
    status: boolean;
    message: string;
    weather: WeatherResult;
    historyId: string;
  }>("/api/weather/current", { params: { city } });
};
