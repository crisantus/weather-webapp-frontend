"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginUser } from "../../services/auth.service";
import { ACCESS_TOKEN_KEY } from "../../utils/constants";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Runs when the login form is submitted.
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(event.currentTarget);

    try {
      // Send the email and password to the backend login endpoint.
      const response = await loginUser({
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? "")
      });

      // Save the token so future API requests can prove the user is logged in.
      window.localStorage.setItem(ACCESS_TOKEN_KEY, response.data.accessToken);
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Main page wrapper. Tailwind classes center the form on the screen.
    <main className="grid min-h-screen place-items-center bg-[#f6fafb] px-4">
      {/* onSubmit calls the submit function when the user presses the Login button. */}
      <form onSubmit={submit} className="w-full max-w-md rounded-lg bg-white p-6 shadow-sm">
        {/* Page title shown at the top of the form. */}
        <h1 className="text-3xl font-bold text-ink">Login</h1>

        {/* Form fields. The name values are used by FormData inside submit(). */}
        <div className="mt-6 space-y-4">
          <input name="email" required type="email" placeholder="Email address" className="w-full rounded-md border border-slate-300 px-4 py-3" />
          <input name="password" required type="password" placeholder="Password" className="w-full rounded-md border border-slate-300 px-4 py-3" />
        </div>

        {/* Show an error message only when the error state has text. */}
        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

        {/* Disable the button during the API request so the user cannot submit twice. */}
        <button disabled={loading} className="mt-6 w-full rounded-md bg-sea px-4 py-3 font-semibold text-white disabled:opacity-60">
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Link to the register page for users who do not have an account yet. */}
        <p className="mt-4 text-center text-sm text-slate-600">
          Need an account? <Link href="/register" className="font-semibold text-sea">Register</Link>
        </p>
      </form>
    </main>
  );
}
