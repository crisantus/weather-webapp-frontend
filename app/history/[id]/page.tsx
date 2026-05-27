"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AppShell } from "../../../components/layout/AppShell";
import {
  deleteWeatherHistoryItem,
  getWeatherHistoryItem
} from "../../../services/history.service";
import type { WeatherHistory } from "../../../types/weather.type";

const formatDate = (value: string) => {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  });
};

const detailRows = (history: WeatherHistory) => [
  { label: "Condition", value: history.condition },
  { label: "Temperature", value: `${Math.round(history.temperature)}°C` },
  { label: "Feels like", value: history.feelsLike !== null && history.feelsLike !== undefined ? `${Math.round(history.feelsLike)}°C` : "Not recorded" },
  { label: "Humidity", value: `${history.humidity}%` },
  { label: "Wind speed", value: `${history.windSpeed} m/s` },
  { label: "Pressure", value: history.pressure !== null && history.pressure !== undefined ? `${history.pressure} hPa` : "Not recorded" },
  { label: "Checked", value: formatDate(history.createdAt) }
];

export default function HistoryDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [history, setHistory] = useState<WeatherHistory | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!params.id) {
      return;
    }

    getWeatherHistoryItem(params.id)
      .then((response) => setHistory(response.data.history))
      .catch(() => setError("Unable to load that history item."))
      .finally(() => setLoading(false));
  }, [params.id]);

  const deleteItem = async () => {
    if (!params.id || !window.confirm("Delete this history item?")) {
      return;
    }

    setDeleting(true);
    setError("");

    try {
      await deleteWeatherHistoryItem(params.id);
      router.push("/history");
    } catch (err) {
      setError("Unable to delete that history item.");
      setDeleting(false);
    }
  };

  return (
    <AppShell>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/history" className="text-sm font-semibold text-sea hover:underline">
            Back to history
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-ink">History details</h1>
        </div>
        <button
          type="button"
          onClick={deleteItem}
          disabled={!history || deleting}
          className="rounded-md border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
      {loading ? <p className="mt-6 text-sm text-slate-600">Loading history item...</p> : null}

      {history ? (
        <section className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <p className="text-sm font-medium uppercase text-sea">Saved weather search</p>
              <h2 className="mt-2 text-3xl font-bold text-ink">
                {history.locationName}
                {history.country ? `, ${history.country}` : ""}
              </h2>
              <p className="mt-1 capitalize text-slate-600">{history.condition}</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-5xl font-bold text-ink">{Math.round(history.temperature)}°C</p>
              <p className="mt-1 text-sm text-slate-600">
                {history.feelsLike !== null && history.feelsLike !== undefined
                  ? `Feels like ${Math.round(history.feelsLike)}°C`
                  : "Feels-like value not recorded"}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {detailRows(history).map((row) => (
              <div key={row.label} className="rounded-md bg-skyglass p-4">
                <p className="text-sm text-slate-600">{row.label}</p>
                <p className="mt-1 font-semibold capitalize text-ink">{row.value}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </AppShell>
  );
}
