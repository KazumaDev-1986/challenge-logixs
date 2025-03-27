'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { TaskForm } from '@/components/tasks/TaskForm';
import { TaskService } from '@/application/services/task.service';
import { useAuth } from '@/application/hooks/useAuth';
import styles from './page.module.scss';

const NewTaskPage: FC = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleSubmit = async (data: any) => {
    try {
      if (!user?.token) return;

      await TaskService.create(
        {
          title: data.title,
          description: data.description,
          dueDate: data.dueDate,
          completed: false,
        },
        user.token
      );

      router.push('/tasks');
    } catch (error) {
      if (error instanceof Error && error.message.includes('401')) {
        logout();
      }
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Create New Task</h1>
      <TaskForm onSubmit={handleSubmit} />
    </div>
  );
};

export default NewTaskPage;
