import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../services/auth.service';

interface User {
  name: string;
  email: string;
  token: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, [router]);

  const signIn = async (email: string, password: string) => {
    try {
      await authService.signIn({ email, password });
      router.push('/home');
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    try {
      await authService.signUp({ name, email, password });
      alert('User created successfully');
      router.push('/auth/sign-in');
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/auth/sign-in');
  };

  return {
    loading,
    user,
    signIn,
    signUp,
    logout,
  };
};
