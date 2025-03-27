'use client';

import { FC, useEffect, useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatsOverview } from '@/components/home/StatsOverview';
import styles from './page.module.scss';
import { useAuth } from '@/hooks/useAuth';

interface Stats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  productivityScore: number;
}

const HomePage: FC = () => {
  const { user, loading } = useAuth();
  const [stats, setStats] = useState<Stats>({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    productivityScore: 0,
  });

  useEffect(() => {
    // TODO: Fetch stats from API
    // This is mock data for now
    setStats({
      totalTasks: 12,
      completedTasks: 8,
      pendingTasks: 4,
      productivityScore: 85,
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.main}>
        <h2 className={styles.welcome}>Welcome back, {user.name}!</h2>
        <StatsOverview {...stats} />
        <div className={styles.grid}>
          <div className={styles.section}>
            <h3>Recent Tasks</h3>
            <p>No recent tasks to display</p>
          </div>
          <div className={styles.section}>
            <h3>Upcoming Tasks</h3>
            <p>No upcoming tasks to display</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
