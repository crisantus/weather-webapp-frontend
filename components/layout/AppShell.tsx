"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ACCESS_TOKEN_KEY } from "../../utils/constants";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/history", label: "History" },
  { href: "/profile", label: "Profile" }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Logging out means removing the saved token and sending the user back to login.
  const logout = () => {
    window.localStorage.removeItem(ACCESS_TOKEN_KEY);
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-[#f6fafb]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <Link href="/dashboard" className="text-xl font-bold text-ink">
            WeatherTrack
          </Link>
          <nav className="flex flex-wrap items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium ${
                  pathname === item.href
                    ? "bg-sea text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={logout}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
    </main>
  );
}
