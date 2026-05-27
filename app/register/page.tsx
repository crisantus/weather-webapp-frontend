"use client";

import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { registerUser } from "../../services/auth.service";
import { ACCESS_TOKEN_KEY } from "../../utils/constants";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Runs when the user submits the create-account form.
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(event.currentTarget);

    // Send the form values to the backend register endpoint.
    const response = await registerUser({
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      confirmPassword: String(formData.get("confirmPassword") ?? "")
    }).catch((err) => {
      // Show the backend error when the API sends one. This makes debugging easier.
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message;
        setError(typeof message === "string" ? message : "Unable to create account. Check your details and try again.");
        return null;
      }

      setError("Unable to create account. Check your details and try again.");
      return null;
    });

    if (!response) {
      setLoading(false);
      return;
    }

    if (!response.data.accessToken) {
      setError("Account created, but no login token was returned.");
      setLoading(false);
      return;
    }

    // Save the returned token so the user is logged in immediately.
    window.localStorage.setItem(ACCESS_TOKEN_KEY, response.data.accessToken);

    // Use a full browser navigation so the dashboard reads the saved token fresh.
    window.location.assign("/dashboard");
  };

  return (
    // Full-screen wrapper that centers the register form.
    <main className="grid min-h-screen place-items-center bg-[#f6fafb] px-4">
      {/* The form calls submit() when the Create account button is clicked. */}
      <form onSubmit={submit} className="w-full max-w-md rounded-lg bg-white p-6 shadow-sm">
        {/* Form title. */}
        <h1 className="text-3xl font-bold text-ink">Create account</h1>

        {/* Each input name is read from FormData inside submit(). */}
        <div className="mt-6 space-y-4">
          <input name="name" required placeholder="Full name" className="w-full rounded-md border border-slate-300 px-4 py-3" />
          <input name="email" required type="email" placeholder="Email address" className="w-full rounded-md border border-slate-300 px-4 py-3" />
          <input name="password" required type="password" placeholder="Password" className="w-full rounded-md border border-slate-300 px-4 py-3" />
          <input name="confirmPassword" required type="password" placeholder="Confirm password" className="w-full rounded-md border border-slate-300 px-4 py-3" />
        </div>

        {/* Only show this paragraph when an error message exists. */}
        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

        {/* Disable the button while the API request is running. */}
        <button disabled={loading} className="mt-6 w-full rounded-md bg-sea px-4 py-3 font-semibold text-white disabled:opacity-60">
          {loading ? "Creating..." : "Create account"}
        </button>

        {/* Link back to login for users who already have an account. */}
        <p className="mt-4 text-center text-sm text-slate-600">
          Already registered? <Link href="/login" className="font-semibold text-sea">Login</Link>
        </p>
      </form>
    </main>
  );
}
