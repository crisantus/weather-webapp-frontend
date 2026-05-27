"use client";

import { useEffect, useState } from "react";
import { AppShell } from "../../components/layout/AppShell";
import { createLocation, getLocations } from "../../services/location.service";
import type { SavedLocation } from "../../types/location.type";

export default function LocationsPage() {
  // locations stores the list returned by the backend.
  const [locations, setLocations] = useState<SavedLocation[]>([]);
  // name and country store the current form input values.
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");

  // Fetch all saved locations for the logged-in user.
  const loadLocations = async () => {
    const response = await getLocations();
    setLocations(response.data.locations);
  };

  // Load saved locations once when this page first appears.
  useEffect(() => {
    loadLocations().catch(() => undefined);
  }, []);

  // Create a new location, clear the form, then refresh the list.
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createLocation({ name, country: country || undefined });
    setName("");
    setCountry("");
    await loadLocations();
  };

  return (
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        {/* Left column: form for adding a saved location. */}
        <form onSubmit={submit} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h1 className="text-2xl font-bold text-ink">Add location</h1>
          <div className="mt-5 space-y-3">
            <input value={name} onChange={(event) => setName(event.target.value)} required placeholder="City name" className="w-full rounded-md border border-slate-300 px-4 py-3" />
            <input value={country} onChange={(event) => setCountry(event.target.value)} placeholder="Country" className="w-full rounded-md border border-slate-300 px-4 py-3" />
          </div>
          <button className="mt-5 w-full rounded-md bg-sea px-4 py-3 font-semibold text-white">
            Save location
          </button>
        </form>

        {/* Right column: cards showing locations loaded from the backend. */}
        <section>
          <h2 className="text-3xl font-bold text-ink">Saved locations</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {locations.map((location) => (
              <div key={location.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <p className="font-bold text-ink">{location.name}</p>
                <p className="text-sm text-slate-600">{location.country ?? "No country set"}</p>
                {location.isDefault ? <p className="mt-3 text-sm font-semibold text-sea">Default</p> : null}
              </div>
            ))}
            {/* Empty state shown when the user has not saved any locations yet. */}
            {!locations.length ? <p className="text-sm text-slate-600">No saved locations yet.</p> : null}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
