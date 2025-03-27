'use client';

import { FC, ReactNode } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import styles from './layout.module.scss';
import { useAuth } from '@/application/hooks/useAuth';

interface TasksLayoutProps {
  children: ReactNode;
}

const TasksLayout: FC<TasksLayoutProps> = ({ children }) => {
  const { loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default TasksLayout;
