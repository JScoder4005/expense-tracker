import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { registerUser } from '../api/authApi';
import type { RegisterRequest } from '../types/auth.types';

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterRequest) => registerUser(data),
    onSuccess: () => {
      toast.success('Account Created!', {
        description: 'Your account has been created successfully. Please sign in.',
      });
      navigate('/login');
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error('Registration Failed', {
        description: errorMessage,
      });
    },
  });
};
