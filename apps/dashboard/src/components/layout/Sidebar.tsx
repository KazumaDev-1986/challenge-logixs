import { FC } from 'react';
import styles from './Sidebar.module.scss';
import { useAuth } from '@/application/hooks/useAuth';

export const Sidebar: FC = () => {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    return null;
  }

  return (
    <nav className={styles.sidebar}>
      <div className={styles.userSection}>
        <div className={styles.userAvatar}>
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{user.name}</span>
        </div>
      </div>

      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <a href="/home" className={styles.menuLink}>
            Home
          </a>
        </li>
        <li className={styles.menuItem}>
          <a href="/tasks" className={styles.menuLink}>
            Tasks
          </a>
        </li>
      </ul>

      <div className={styles.bottomSection}>
        <button onClick={logout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
    </nav>
  );
};
