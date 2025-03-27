'use client';

import { FC, useRef, useState } from 'react';
import { InputField } from '../atoms/InputField';
import { MainButton } from '../atoms/MainButton';
import styles from './AuthForms.module.scss';
import Link from 'next/link';

export const RegisterForm: FC = () => {
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
      // Aquí irá la lógica de registro
      console.log('Register attempt');
    } catch (err) {
      setError('Registration failed');
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
