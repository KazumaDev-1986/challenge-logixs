import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loading } from '../atoms/Loading';

interface PublicGuardProps {
  children: React.ReactNode;
}

export const PublicGuard: FC<PublicGuardProps> = ({ children }) => {
  const [isPublic, setIsPublic] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          router.push('/home');
          return;
        }
        setIsPublic(true);
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    checkAuth();
  }, [router]);

  if (isPublic === null) {
    return <Loading />;
  }

  if (!isPublic) {
    return null;
  }

  return <>{children}</>;
};
