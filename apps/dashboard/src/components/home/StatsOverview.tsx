import { FC } from 'react';
import styles from './StatsOverview.module.scss';

interface StatsOverviewProps {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  productivityScore: number;
}

export const StatsOverview: FC<StatsOverviewProps> = ({
  totalTasks,
  completedTasks,
  pendingTasks,
  productivityScore,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3 className={styles.title}>Total Tasks</h3>
        <p className={styles.value}>{totalTasks}</p>
      </div>
      <div className={styles.card}>
        <h3 className={styles.title}>Completed</h3>
        <p className={`${styles.value} ${styles.completed}`}>
          {completedTasks}
        </p>
      </div>
      <div className={styles.card}>
        <h3 className={styles.title}>Pending</h3>
        <p className={`${styles.value} ${styles.pending}`}>{pendingTasks}</p>
      </div>
      <div className={styles.card}>
        <h3 className={styles.title}>Productivity Score</h3>
        <p className={`${styles.value} ${styles.productivity}`}>
          {productivityScore}%
        </p>
      </div>
    </div>
  );
};
