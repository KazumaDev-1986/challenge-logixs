'use client';

import { FC, useRef, useState } from 'react';
import { InputField } from '../atoms/InputField';
import { MainButton } from '../atoms/MainButton';
import styles from './AuthForms.module.scss';
import Link from 'next/link';
import { useAuth } from '@/application/hooks/useAuth';

export const LoginForm: FC = () => {
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;

      if (!email || !password) {
        throw new Error('Please fill in all fields');
      }

      await signIn(email, password);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An error occurred during sign in'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Sign In</h2>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <InputField
          ref={emailRef}
          label="Email"
          type="email"
          required
          placeholder="Enter your email"
        />

        <InputField
          ref={passwordRef}
          label="Password"
          type="password"
          required
          placeholder="Enter your password"
        />

        <MainButton type="submit" fullWidth isLoading={isLoading}>
          Sign In
        </MainButton>

        <div className={styles.footer}>
          <p>
            Don't have an account?{' '}
            <Link href="/auth/sign-up" className={styles.link}>
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
