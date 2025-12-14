import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { getUserFromSession, saveUserToSession, removeUserFromSession, type StoredUser } from '@/lib/sessionStorage';

interface AuthContextType {
  user: StoredUser | null;
  setUser: (user: StoredUser | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUserState] = useState<StoredUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user from session storage on mount
    const storedUser = getUserFromSession();
    if (storedUser) {
      setUserState(storedUser);
    }
    setIsLoading(false);
  }, []);

  const setUser = (newUser: StoredUser | null) => {
    setUserState(newUser);
    if (newUser) {
      saveUserToSession(newUser);
    } else {
      removeUserFromSession();
    }
  };

  const logout = () => {
    setUserState(null);
    removeUserFromSession();
  };

  const value: AuthContextType = {
    user,
    setUser,
    isAuthenticated: !!user,
    logout,
  };

  if (isLoading) {
    return null; // or a loading spinner
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
