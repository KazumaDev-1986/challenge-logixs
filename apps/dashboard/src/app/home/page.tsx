'use client';

import { FC } from 'react';
import styles from './page.module.scss';

const HomePage: FC = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.sidebar}>
        <div className={styles.logo}>
          <h1>Dashboard</h1>
        </div>
        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <a href="#" className={styles.menuLink}>
              Dashboard
            </a>
          </li>
          <li className={styles.menuItem}>
            <a href="#" className={styles.menuLink}>
              Profile
            </a>
          </li>
          <li className={styles.menuItem}>
            <a href="#" className={styles.menuLink}>
              Settings
            </a>
          </li>
          <li className={styles.menuItem}>
            <a href="#" className={styles.menuLink}>
              Logout
            </a>
          </li>
        </ul>
      </nav>
      <main className={styles.main}>
        <h2>Welcome to your Dashboard</h2>
        <p>This is the main content area.</p>
      </main>
    </div>
  );
};

export default HomePage;
