import type { Metadata } from "next";
import "./globals.css";

// Metadata controls the browser tab title and page description.
export const metadata: Metadata = {
  title: "WeatherTrack",
  description: "Track current weather and save your search history."
};

// RootLayout wraps every page in the Next.js app.
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
