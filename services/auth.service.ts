import { api } from "./api";
import type { User } from "../types/user.type";

type AuthResponse = {
  status: boolean;
  message: string;
  accessToken: string;
  user: User;
};

// Create a new user account.
export const registerUser = (data: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => api.post<AuthResponse>("/api/auth/register", data);

// Log in and receive an access token from the backend.
export const loginUser = (data: { email: string; password: string }) => {
  return api.post<AuthResponse>("/api/auth/login", data);
};

// Get the currently logged-in user's profile using the saved token.
export const getMe = () => {
  return api.get<{ status: boolean; message: string; user: User }>("/api/auth/me");
};
