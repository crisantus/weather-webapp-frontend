import Link from "next/link";

const sampleCities = [
  { city: "London", detail: "Light rain", temp: "18°C" },
  { city: "New York", detail: "Clear evening", temp: "24°C" },
  { city: "Tokyo", detail: "Humid clouds", temp: "29°C" }
];

const features = [
  {
    title: "Check live weather",
    description: "Search any city and see current temperature, humidity, wind, and conditions."
  },
  {
    title: "Track each search",
    description: "Keep a clear record of the weather checks you make from the dashboard."
  },
  {
    title: "Review your history",
    description: "Open past searches, review the full details, or delete records you no longer need."
  }
];

export default function HomePage() {
  return (
    // Public landing page shown before the user logs in.
    <main className="min-h-screen bg-[#f6fafb] text-ink">
      {/* Top navigation with the app name and account links. */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6">
        <Link href="/" className="text-lg font-bold tracking-normal text-sea">
          WeatherTrack
        </Link>
        <nav className="flex items-center gap-3 text-sm font-semibold">
          <Link href="/login" className="rounded-md px-4 py-2 text-slate-700 hover:bg-white">
            Login
          </Link>
          <Link href="/register" className="rounded-md bg-sea px-4 py-2 text-white hover:bg-teal-800">
            Create account
          </Link>
        </nav>
      </header>

      {/* Hero section: this is the first thing visitors see before logging in. */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-10 lg:grid-cols-[1fr_0.9fr] lg:pb-24 lg:pt-16">
        <div>
          <p className="text-sm font-semibold uppercase text-sun">Plan with better weather data</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-tight md:text-6xl">
            Know the weather before you make your move.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            WeatherTrack helps you check live weather and keep a clear history of the cities you
            search.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/register"
              className="rounded-md bg-sea px-5 py-3 font-semibold text-white shadow-sm hover:bg-teal-800"
            >
              Get started
            </Link>
            <Link
              href="/login"
              className="rounded-md border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:border-sea hover:text-sea"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Visual preview of what the app helps users track after login. */}
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="rounded-lg bg-ink p-6 text-white">
            <p className="text-sm font-semibold text-teal-100">Today&apos;s overview</p>
            <p className="mt-4 text-5xl font-bold">3 recent searches</p>
            <p className="mt-3 leading-7 text-slate-200">
              Compare recent weather checks before work, travel, or daily plans.
            </p>
          </div>

          <div className="mt-4 space-y-3">
            {sampleCities.map((item) => (
              <div
                key={item.city}
                className="flex items-center justify-between rounded-md border border-slate-200 bg-[#fbfdfe] p-4"
              >
                <div>
                  <p className="font-semibold text-ink">{item.city}</p>
                  <p className="text-sm text-slate-600">{item.detail}</p>
                </div>
                <p className="text-2xl font-bold text-sea">{item.temp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature cards explain what the user can do after creating an account. */}
      <section className="border-t border-slate-200 bg-white px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase text-sea">What you can do</p>
            <h2 className="mt-3 text-3xl font-bold">A simple weather workspace for your cities.</h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.title} className="rounded-lg border border-slate-200 p-5">
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final call to action before the footer area. */}
      <section className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Ready to track your weather searches?</h2>
          <p className="mt-2 text-slate-600">Create an account, then search cities and review your history.</p>
        </div>
        <Link href="/register" className="w-fit rounded-md bg-ink px-5 py-3 font-semibold text-white hover:bg-slate-800">
          Start now
        </Link>
      </section>
    </main>
  );
}
