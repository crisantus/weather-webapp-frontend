import axios from "axios";
import { ACCESS_TOKEN_KEY, apiBaseUrl } from "../utils/constants";

// Shared Axios client. All service files use this so the backend URL is in one place.
export const api = axios.create({
  baseURL: apiBaseUrl
});

// Before every API request, attach the saved login token if one exists.
api.interceptors.request.use((config) => {
  if (typeof window === "undefined") {
    return config;
  }

  const token = window.localStorage.getItem(ACCESS_TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
