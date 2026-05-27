"use client";

import { useEffect, useState } from "react";
import { AppShell } from "../../components/layout/AppShell";
import { getWeatherHistory } from "../../services/history.service";
import type { WeatherHistory } from "../../types/weather.type";

export default function HistoryPage() {
  // histories stores the table rows returned by the backend.
  const [histories, setHistories] = useState<WeatherHistory[]>([]);

  // Load the user's weather search history when the page opens.
  useEffect(() => {
    getWeatherHistory()
      .then((response) => setHistories(response.data.histories))
      .catch(() => setHistories([]));
  }, []);

  return (
    <AppShell>
      <h1 className="text-3xl font-bold text-ink">Weather history</h1>
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
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Empty state shown if the backend returns no history records. */}
        {!histories.length ? <p className="p-4 text-sm text-slate-600">No history yet.</p> : null}
      </div>
    </AppShell>
  );
}
