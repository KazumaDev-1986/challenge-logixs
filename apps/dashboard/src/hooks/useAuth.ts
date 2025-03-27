import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
        router.push('/auth/sign-in');
      }
    } else {
      router.push('/auth/sign-in');
    }
    setLoading(false);
  }, [router]);

  const login = (userData: User) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    router.push('/home');
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/auth/sign-in');
  };

  return { user, loading, login, logout };
};
