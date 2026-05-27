// Shape of the current weather object returned by /api/weather/current.
export type WeatherResult = {
  locationName: string;
  country?: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  feelsLike: number;
  latitude: number;
  longitude: number;
  checkedAt: string;
};

// Shape of one saved weather history record returned by /api/weather-history.
export type WeatherHistory = {
  id: string;
  locationId?: string | null;
  locationName: string;
  country?: string | null;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  pressure?: number | null;
  feelsLike?: number | null;
  createdAt: string;
};
