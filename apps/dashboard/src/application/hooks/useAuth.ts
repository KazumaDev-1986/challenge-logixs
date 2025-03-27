import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../services/auth.service';

interface User {
  name: string;
  email: string;
  token: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

export const useAuth = () => {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    const user = authService.getUser();
    if (user) {
      setAuthState({
        isAuthenticated: true,
        user,
        isLoading: false,
      });
    } else {
      setAuthState({
        isAuthenticated: false,
        user: null,
        isLoading: false,
      });
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await authService.signIn({ email, password });
      setAuthState({
        isAuthenticated: true,
        user: response.user,
        isLoading: false,
      });
      router.push('/home');
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    try {
      await authService.signUp({ name, email, password });
      router.push('/auth/sign-in');
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    await authService.signOut();
    setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false,
    });
    router.push('/auth/sign-in');
  };

  return {
    ...authState,
    signIn,
    signUp,
    signOut,
  };
};
