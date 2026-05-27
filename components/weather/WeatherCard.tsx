import type { WeatherResult } from "../../types/weather.type";

// Reusable card for displaying one current-weather response.
export function WeatherCard({ weather }: { weather: WeatherResult }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      {/* Top section: city, condition, temperature, and feels-like value. */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase text-sea">Current weather</p>
          <h2 className="mt-2 text-3xl font-bold text-ink">
            {weather.locationName}
            {weather.country ? `, ${weather.country}` : ""}
          </h2>
          <p className="mt-1 capitalize text-slate-600">{weather.condition}</p>
        </div>
        <div className="text-right">
          <p className="text-5xl font-bold text-ink">{Math.round(weather.temperature)}°C</p>
          <p className="mt-1 text-sm text-slate-600">
            Feels like {Math.round(weather.feelsLike)}°C
          </p>
        </div>
      </div>

      {/* Bottom section: smaller weather details. */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-md bg-skyglass p-4">
          <p className="text-sm text-slate-600">Humidity</p>
          <p className="text-xl font-semibold text-ink">{weather.humidity}%</p>
        </div>
        <div className="rounded-md bg-skyglass p-4">
          <p className="text-sm text-slate-600">Wind</p>
          <p className="text-xl font-semibold text-ink">{weather.windSpeed} m/s</p>
        </div>
        <div className="rounded-md bg-skyglass p-4">
          <p className="text-sm text-slate-600">Pressure</p>
          <p className="text-xl font-semibold text-ink">{weather.pressure} hPa</p>
        </div>
      </div>
    </section>
  );
}
