import { FC, useEffect, useState } from 'react';
import { StatService } from '../../application/services/stat.service';
import { Loading } from '../atoms/Loading';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import styles from './ProductivityStat.module.scss';
import { ProductivityMetrics } from '../../types/stats';

interface ProductivityStatProps {
  token: string;
}

export const ProductivityStat: FC<ProductivityStatProps> = ({ token }) => {
  const [stats, setStats] = useState<ProductivityMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await StatService.getProductivity(token);
        setStats(data);
      } catch (err) {
        setError('Failed to load productivity statistics');
        console.error('Error fetching productivity stats:', err);
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

  // Data for the gauge chart
  const gaugeData = [
    { name: 'Productivity', value: stats.productivityScore },
    { name: 'Remaining', value: 100 - stats.productivityScore },
  ];

  // Colors based on productivity score
  const getGaugeColor = (score: number) => {
    if (score >= 70) return '#22c55e'; // Green
    if (score >= 40) return '#eab308'; // Yellow
    return '#ef4444'; // Red
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Productivity Score</h3>
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={gaugeData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              startAngle={90}
              endAngle={-270}
              paddingAngle={0}
              dataKey="value"
            >
              <Cell fill={getGaugeColor(stats.productivityScore)} />
              <Cell fill="#e5e7eb" />
            </Pie>
            <Tooltip
              formatter={(value: number) => [`${value}%`, 'Score']}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className={styles.scoreValue}>{stats.productivityScore}%</div>
      </div>
      <div className={styles.metrics}>
        <div className={styles.metricItem}>
          <span className={styles.metricLabel}>Total Tasks</span>
          <span className={styles.metricValue}>{stats.total_tasks}</span>
        </div>
        <div className={styles.metricItem}>
          <span className={styles.metricLabel}>Completed</span>
          <span className={styles.metricValue}>{stats.completed_tasks}</span>
        </div>
        <div className={styles.metricItem}>
          <span className={styles.metricLabel}>Completed on Time</span>
          <span className={styles.metricValue}>{stats.completed_on_time}</span>
        </div>
      </div>
    </div>
  );
};
