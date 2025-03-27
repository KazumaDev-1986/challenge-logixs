import { RegisterForm } from '@/components/auth/RegisterForm';
import styles from './page.module.scss';

export default function SignUpPage() {
  return (
    <div className={styles.container}>
      <RegisterForm />
    </div>
  );
}
