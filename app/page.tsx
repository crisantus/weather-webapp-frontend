import Link from "next/link";

export default function HomePage() {
  return (
    // Public landing page shown before login.
    <main className="min-h-screen bg-[#f6fafb]">
      <section className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-4 py-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left side: main message and links to auth pages. */}
        <div>
          <p className="text-sm font-semibold uppercase text-sea">WeatherTrack</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-tight text-ink md:text-6xl">
            Weather records for the cities you care about.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Search current weather, save each check automatically, and keep a clean history tied to
            your account.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/register"
              className="rounded-md bg-sea px-5 py-3 font-semibold text-white hover:bg-teal-800"
            >
              Create account
            </Link>
            <Link
              href="/login"
              className="rounded-md border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-white"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Right side: static preview card showing what weather data looks like. */}
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="rounded-lg bg-ink p-6 text-white">
            <p className="text-sm text-teal-100">Lagos, NG</p>
            <p className="mt-4 text-7xl font-bold">31°C</p>
            <p className="mt-2 text-xl text-teal-50">Cloudy with steady wind</p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-md bg-skyglass p-4">
              <p className="text-sm text-slate-600">Humidity</p>
              <p className="font-bold text-ink">75%</p>
            </div>
            <div className="rounded-md bg-skyglass p-4">
              <p className="text-sm text-slate-600">Wind</p>
              <p className="font-bold text-ink">12 m/s</p>
            </div>
            <div className="rounded-md bg-skyglass p-4">
              <p className="text-sm text-slate-600">Feels</p>
              <p className="font-bold text-ink">35°C</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
