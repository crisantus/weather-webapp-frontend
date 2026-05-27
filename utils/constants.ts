// Key used to store and read the login token from browser localStorage.
export const ACCESS_TOKEN_KEY = "weathertrack_access_token";

// Backend API URL. The environment variable can override this in production.
export const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ;
