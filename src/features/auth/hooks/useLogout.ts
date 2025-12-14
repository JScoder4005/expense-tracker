import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { logoutUser } from '../api/authApi';
import { useAuth } from '../context/AuthContext';

export const useLogout = () => {
  const navigate = useNavigate();
  const { logout: clearAuth } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      // Clear auth state and session storage
      clearAuth();
      
      // Clear all queries
      queryClient.clear();
      
      toast.success('Logged out successfully');
      navigate('/login');
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      const errorMessage = error.response?.data?.message || 'Logout failed';
      toast.error('Logout Failed', {
        description: errorMessage,
      });
      console.error('❌ Logout failed:', errorMessage);
    },
  });
};
