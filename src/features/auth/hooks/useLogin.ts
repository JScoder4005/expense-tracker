import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { loginUser } from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import type { LoginRequest } from '../types/auth.types';

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: (data: LoginRequest) => loginUser(data),
    onSuccess: (response) => {
      // Save user to session storage
      if (response.user) {
        setUser(response.user);
      }
      
      toast.success('Welcome back!', {
        description: 'You have successfully logged in.',
      });
      navigate('/dashboard');
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error('Login Failed', {
        description: errorMessage,
      });
      console.error('❌ Login failed:', errorMessage);
    },
  });
};
