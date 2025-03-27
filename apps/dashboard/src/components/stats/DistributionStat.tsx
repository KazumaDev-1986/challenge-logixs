import { FC, useEffect, useState } from 'react';
import { StatService } from '../../application/services/stat.service';
import { Loading } from '../atoms/Loading';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import styles from './DistributionStat.module.scss';
import { TaskDistributionItem } from '../../types/stats';

interface DistributionStatProps {
  token: string;
}

export const DistributionStat: FC<DistributionStatProps> = ({ token }) => {
  const [stats, setStats] = useState<TaskDistributionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await StatService.getDistribution(token);
        setStats(data);
      } catch (err) {
        setError('Failed to load distribution statistics');
        console.error('Error fetching distribution stats:', err);
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

  if (!stats.length) {
    return null;
  }

  const chartData = stats.map((item) => ({
    name: `${item.status}`,
    value: parseInt(item.count),
  }));

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Task Distribution</h3>
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={100}
              interval={0}
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.summary}>
        {stats.map((item, index) => (
          <div key={index} className={styles.summaryItem}>
            <span className={styles.label}>
              {item.status} ({item.due_date_category})
            </span>
            <span className={styles.value}>{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
