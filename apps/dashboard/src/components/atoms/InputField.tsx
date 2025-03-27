'use client';

import { forwardRef } from 'react';
import styles from './InputField.module.scss';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className={styles.inputContainer}>
        <label className={styles.label}>{label}</label>
        <input
          ref={ref}
          className={`${styles.input} ${error ? styles.error : ''} ${
            className || ''
          }`}
          {...props}
        />
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  }
);

InputField.displayName = 'InputField';
