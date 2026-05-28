import { apiClient } from "./client";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  email: string;
}

export interface AuthResponse {
  user?: AuthUser;
  access_token?: string;
  token?: string;
}

export const login = (credentials: LoginCredentials) => {
  return apiClient.post<AuthResponse>("auth/login", credentials);
};

export const logout = () => {
  return apiClient.post("auth/logout", null);
};

export const fetchCurrentUser = () => {
  return apiClient.get<any>("auth/me");
};
