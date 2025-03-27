'use client';

import { FC, useRef, useState } from 'react';
import { InputField } from '../atoms/InputField';
import { MainButton } from '../atoms/MainButton';
import styles from './AuthForms.module.scss';
import Link from 'next/link';
import { useAuth } from '@/application/hooks/useAuth';

export const RegisterForm: FC = () => {
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const name = nameRef.current?.value;
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;
      const confirmPassword = confirmPasswordRef.current?.value;

      if (!name || !email || !password || !confirmPassword) {
        throw new Error('Please fill in all fields');
      }

      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      await signUp(name, email, password);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An error occurred during sign up'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Sign Up</h2>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <InputField
          ref={nameRef}
          label="Name"
          type="text"
          required
          placeholder="Enter your name"
        />

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

        <InputField
          ref={confirmPasswordRef}
          label="Confirm Password"
          type="password"
          required
          placeholder="Confirm your password"
        />

        <MainButton type="submit" fullWidth isLoading={isLoading}>
          Sign Up
        </MainButton>

        <div className={styles.footer}>
          <p>
            Already have an account?{' '}
            <Link href="/auth/sign-in" className={styles.link}>
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
