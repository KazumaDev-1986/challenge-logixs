'use client';

import { FC, ReactNode } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import styles from './layout.module.scss';

interface TasksLayoutProps {
  children: ReactNode;
}

const TasksLayout: FC<TasksLayoutProps> = ({ children }) => {
  // TODO: Get user data from auth context
  const userName = 'John Doe';

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logout clicked');
  };

  return (
    <div className={styles.container}>
      <Sidebar userName={userName} onLogout={handleLogout} />
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default TasksLayout;
