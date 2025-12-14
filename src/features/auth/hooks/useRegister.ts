import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { registerUser } from '../api/authApi';
import type { RegisterRequest } from '../types/auth.types';

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterRequest) => {
      console.log('🔵 [useRegister] Attempting registration with:', { email: data.email });
      return registerUser(data);
    },
    onSuccess: (data) => {
      console.log('✅ [useRegister] Registration successful:', data);
      toast.success('Account Created!', {
        description: 'Your account has been created successfully. Please sign in.',
      });
      navigate('/login');
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error('Registration Failed', {
        description: errorMessage,
      });
      console.error('❌ [useRegister] Registration failed:', errorMessage);
    },
  });
};
