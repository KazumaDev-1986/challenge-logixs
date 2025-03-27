import { LoginForm } from '@/components/auth/LoginForm';
import styles from './page.module.scss';

export default function SignInPage() {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
}
