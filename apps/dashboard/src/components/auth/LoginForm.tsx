'use client';

import { FC, useRef, useState } from 'react';
import { InputField } from '../atoms/InputField';
import { MainButton } from '../atoms/MainButton';
import styles from './AuthForms.module.scss';
import Link from 'next/link';

export const LoginForm: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Aquí irá la lógica de autenticación
      console.log('Login attempt');
    } catch (err) {
      setError('Invalid credentials');
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
