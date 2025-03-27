import { FC, useEffect, useState } from 'react';
import { StatService } from '../../application/services/stat.service';
import { Loading } from '../atoms/Loading';
import styles from './OverviewStat.module.scss';
import { TaskOverview } from '../../types/stats';

interface OverviewStatProps {
  token: string;
}

export const OverviewStat: FC<OverviewStatProps> = ({ token }) => {
  const [stats, setStats] = useState<TaskOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await StatService.getOverview(token);
        setStats(data);
      } catch (err) {
        setError('Failed to load overview statistics');
        console.error('Error fetching overview stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!stats) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <h3 className={styles.statTitle}>Total Tasks</h3>
            <p className={styles.statValue}>{stats.total_tasks}</p>
          </div>
          <div className={styles.statIcon}>📋</div>
        </div>
        <div className={`${styles.statCard} ${styles.completed}`}>
          <div className={styles.statContent}>
            <h3 className={styles.statTitle}>Completed</h3>
            <p className={styles.statValue}>{stats.completed_tasks}</p>
          </div>
          <div className={styles.statIcon}>✅</div>
        </div>
        <div className={`${styles.statCard} ${styles.pending}`}>
          <div className={styles.statContent}>
            <h3 className={styles.statTitle}>Pending</h3>
            <p className={styles.statValue}>{stats.pending_tasks}</p>
          </div>
          <div className={styles.statIcon}>⏳</div>
        </div>
      </div>
    </div>
  );
};
