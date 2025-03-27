'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { TaskForm } from '@/components/tasks/TaskForm';
import styles from './page.module.scss';

const NewTaskPage: FC = () => {
  const router = useRouter();

  const handleSubmit = (data: any) => {
    // TODO: Implement API call to create task
    console.log('Creating task:', data);
    router.push('/tasks');
  };

  return (
    <div className={styles.container}>
      <h1>Create New Task</h1>
      <TaskForm onSubmit={handleSubmit} />
    </div>
  );
};

export default NewTaskPage;
