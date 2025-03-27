'use client';

import { FC } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import styles from './page.module.scss';
import { useAuth } from '@/hooks/useAuth';
import { Loading } from '../../components/atoms/Loading';
import { OverviewStat } from '../../components/stats/OverviewStat';
import { DistributionStat } from '../../components/stats/DistributionStat';
import { ProductivityStat } from '../../components/stats/ProductivityStat';

const HomePage: FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.main}>
        <h2 className={styles.welcome}>Welcome back, {user.name}!</h2>
        <OverviewStat token={user.token} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '1rem',
          }}
        >
          <DistributionStat token={user.token} />
          <ProductivityStat token={user.token} />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
