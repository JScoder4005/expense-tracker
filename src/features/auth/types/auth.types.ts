// User type
export interface User {
  id: number;
  email: string;
}

// Auth request types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

// Auth response types
export interface AuthResponse {
  message: string;
  userId?: number;
}

export interface LoginResponse {
  message: string;
  user?: User;
}
