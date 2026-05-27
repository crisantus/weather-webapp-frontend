# WeatherTrack Client

This is the frontend for WeatherTrack. It is a Next.js app that lets users register, log in, search weather, save locations, view history, and see their profile.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios

## Folder Structure

```txt
client/
  app/                 # Next.js pages and routes
  components/          # Reusable UI components
  services/            # API request functions
  types/               # TypeScript types
  utils/               # Shared constants
```

## API URL

For local development, the client uses this backend URL by default:

```txt
http://localhost:5000
```

That default is set in:

```txt
client/utils/constants.ts
```

For deployment, set this environment variable in Vercel:

```env
NEXT_PUBLIC_API_URL="https://your-backend-url.com"
```

You do not need a client `.env` file for local development.

## Install

From the project root:

```bash
npm install
```

Or from inside `client/`:

```bash
npm install
```

## Run Locally

From the project root:

```bash
npm run dev:client
```

Or from inside `client/`:

```bash
npm run dev
```

The client runs at:

```txt
http://localhost:3000
```

## Build

From the project root:

```bash
npm run build:client
```

Or from inside `client/`:

```bash
npm run build
```

## Start Production Build

Build first, then start:

```bash
npm run build
npm start
```

If you run `npm start` before building, Next.js will complain that `.next` does not exist.

## Typecheck

```bash
npm run typecheck
```

## Main Pages

```txt
/             # Landing page
/register     # Create account
/login        # Login
/dashboard    # Search weather
/locations    # Saved locations
/history      # Weather search history
/profile      # User profile
```

## Deployment

Deploy this folder to Vercel.

Vercel settings:

- Root Directory: `client`
- Build Command: `npm run build`
- Environment Variable: `NEXT_PUBLIC_API_URL`

The backend should be deployed separately.
