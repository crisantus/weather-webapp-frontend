"use client";

import { useEffect, useState } from "react";
import { AppShell } from "../../components/layout/AppShell";
import { getMe } from "../../services/auth.service";
import type { User } from "../../types/user.type";

export default function ProfilePage() {
  // user is null until the profile request succeeds.
  const [user, setUser] = useState<User | null>(null);

  // Fetch the logged-in user's profile when this page opens.
  useEffect(() => {
    getMe()
      .then((response) => setUser(response.data.user))
      .catch(() => setUser(null));
  }, []);

  return (
    <AppShell>
      <section className="max-w-xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-ink">Profile</h1>
        {/* If user exists, show their details; otherwise show a fallback message. */}
        {user ? (
          <div className="mt-6 space-y-4">
            <div>
              <p className="text-sm text-slate-600">Full name</p>
              <p className="font-semibold text-ink">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Email address</p>
              <p className="font-semibold text-ink">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Joined</p>
              <p className="font-semibold text-ink">{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm text-slate-600">Profile unavailable.</p>
        )}
      </section>
    </AppShell>
  );
}
