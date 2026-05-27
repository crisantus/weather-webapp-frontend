"use client";

import { useEffect, useState } from "react";
import { AppShell } from "../../components/layout/AppShell";
import { WeatherCard } from "../../components/weather/WeatherCard";
import { getWeatherHistory } from "../../services/history.service";
import { getCurrentWeather } from "../../services/weather.service";
import type { WeatherHistory, WeatherResult } from "../../types/weather.type";

export default function DashboardPage() {
  const [city, setCity] = useState("Lagos");
  const [weather, setWeather] = useState<WeatherResult | null>(null);
  const [histories, setHistories] = useState<WeatherHistory[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Load the latest weather searches for the right-side history panel.
  const loadHistory = async () => {
    const response = await getWeatherHistory();
    setHistories(response.data.histories.slice(0, 5));
  };

  useEffect(() => {
    loadHistory().catch(() => undefined);
  }, []);

  const searchWeather = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Call the backend through the weather service, then show the result on the page.
      const response = await getCurrentWeather(city);
      setWeather(response.data.weather);
      await loadHistory();
    } catch (err) {
      setError("Unable to fetch weather for that city.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <section>
            <h1 className="text-3xl font-bold text-ink">Dashboard</h1>
            <form onSubmit={searchWeather} className="mt-4 flex gap-3">
              <input
                value={city}
                onChange={(event) => setCity(event.target.value)}
                className="min-w-0 flex-1 rounded-md border border-slate-300 px-4 py-3"
                placeholder="Search city"
              />
              <button className="rounded-md bg-sea px-5 py-3 font-semibold text-white disabled:opacity-60" disabled={loading}>
                {loading ? "Checking..." : "Search"}
              </button>
            </form>
            {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
          </section>
          {weather ? (
            <WeatherCard weather={weather} />
          ) : (
            <section className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-slate-600">
              Search a city to see current weather and save it to history.
            </section>
          )}
        </div>
        <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-ink">Recent history</h2>
          <div className="mt-4 space-y-3">
            {histories.map((item) => (
              <div key={item.id} className="rounded-md bg-skyglass p-3">
                <p className="font-semibold text-ink">{item.locationName}</p>
                <p className="text-sm capitalize text-slate-600">
                  {item.condition} · {Math.round(item.temperature)}°C
                </p>
              </div>
            ))}
            {!histories.length ? <p className="text-sm text-slate-600">No weather checks yet.</p> : null}
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
