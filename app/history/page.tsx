"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AppShell } from "../../components/layout/AppShell";
import {
  clearWeatherHistory,
  deleteWeatherHistoryItem,
  getWeatherHistory
} from "../../services/history.service";
import type { WeatherHistory } from "../../types/weather.type";

export default function HistoryPage() {
  // histories stores the table rows returned by the backend.
  const [histories, setHistories] = useState<WeatherHistory[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState("");
  const [clearing, setClearing] = useState(false);

  // Load the user's weather search history when the page opens.
  const loadHistory = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await getWeatherHistory();
      setHistories(response.data.histories);
    } catch (err) {
      setError("Unable to load weather history.");
      setHistories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const deleteOne = async (id: string) => {
    const shouldDelete = window.confirm("Delete this history item?");

    if (!shouldDelete) {
      return;
    }

    setError("");
    setDeletingId(id);

    try {
      await deleteWeatherHistoryItem(id);
      setHistories((current) => current.filter((item) => item.id !== id));
    } catch (err) {
      setError("Unable to delete that history item.");
    } finally {
      setDeletingId("");
    }
  };

  const clearAll = async () => {
    const shouldClear = window.confirm("Delete all weather history?");

    if (!shouldClear) {
      return;
    }

    setError("");
    setClearing(true);

    try {
      await clearWeatherHistory();
      setHistories([]);
    } catch (err) {
      setError("Unable to clear weather history.");
    } finally {
      setClearing(false);
    }
  };

  return (
    <AppShell>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-ink">Weather history</h1>
          <p className="mt-1 text-sm text-slate-600">
            {histories.length} saved {histories.length === 1 ? "search" : "searches"}
          </p>
        </div>
        <button
          type="button"
          onClick={clearAll}
          disabled={!histories.length || clearing}
          className="rounded-md border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {clearing ? "Clearing..." : "Clear all"}
        </button>
      </div>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

      {/* The wrapper allows the table to scroll horizontally on small screens. */}
      <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-skyglass text-slate-700">
            <tr>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Condition</th>
              <th className="px-4 py-3">Temperature</th>
              <th className="px-4 py-3">Humidity</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Create one table row for each weather history item. */}
            {histories.map((item) => (
              <tr key={item.id} className="border-t border-slate-200">
                <td className="px-4 py-3 font-medium text-ink">
                  {item.locationName}
                  {item.country ? `, ${item.country}` : ""}
                </td>
                <td className="px-4 py-3 capitalize text-slate-600">{item.condition}</td>
                <td className="px-4 py-3 text-slate-600">{Math.round(item.temperature)}°C</td>
                <td className="px-4 py-3 text-slate-600">{item.humidity}%</td>
                <td className="px-4 py-3 text-slate-600">
                  {new Date(item.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/history/${item.id}`}
                      className="rounded-md border border-slate-300 px-3 py-1.5 font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      View
                    </Link>
                    <button
                      type="button"
                      onClick={() => deleteOne(item.id)}
                      disabled={deletingId === item.id}
                      className="rounded-md border border-red-200 px-3 py-1.5 font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deletingId === item.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Empty state shown if the backend returns no history records. */}
        {loading ? <p className="p-4 text-sm text-slate-600">Loading history...</p> : null}
        {!loading && !histories.length ? <p className="p-4 text-sm text-slate-600">No history yet.</p> : null}
      </div>
    </AppShell>
  );
}
