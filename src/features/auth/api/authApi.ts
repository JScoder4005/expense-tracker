import { axiosInstance } from '@/lib/axios';
import type { LoginRequest, RegisterRequest, AuthResponse, LoginResponse } from '../types/auth.types';

/**
 * Register a new user
 */
export const registerUser = async (data: RegisterRequest): Promise<AuthResponse> => {
  console.log('🔵 [API] Calling /auth/register with:', { email: data.email });
  try {
    const response = await axiosInstance.post<AuthResponse>('/auth/register', data);
    console.log('✅ [API] Register response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ [API] Register error:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Login user
 */
export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>('/auth/login', data);
  return response.data;
};

/**
 * Logout user
 */
export const logoutUser = async (): Promise<{ message: string }> => {
  const response = await axiosInstance.post<{ message: string }>('/auth/logout');
  return response.data;
};

/**
 * Refresh access token
 */
export const refreshToken = async (): Promise<{ accessToken: string }> => {
  const response = await axiosInstance.post<{ accessToken: string }>('/auth/refresh-token');
  return response.data;
};
