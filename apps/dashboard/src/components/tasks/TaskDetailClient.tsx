'use client';

import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TaskForm } from './TaskForm';
import { TaskService } from '@/application/services/task.service';
import { useAuth } from '@/hooks/useAuth';
import styles from './TaskDetailClient.module.scss';
import { Loading } from '@/components/atoms/Loading';

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

interface TaskDetailClientProps {
  taskId: number;
}

const formatDateForInput = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const TaskDetailClient: FC<TaskDetailClientProps> = ({ taskId }) => {
  const router = useRouter();
  const { user, loading: authLoading, logout } = useAuth();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        if (authLoading) return;

        if (!user?.token) {
          logout();
          return;
        }

        const data = await TaskService.getById(taskId, user.token);
        console.log('data', data);
        setTask(data);
      } catch (error) {
        if (error instanceof Error && error.message.includes('401')) {
          logout();
        }
        console.error('Error fetching task:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId, user, router, authLoading]);

  const handleSubmit = async (data: any) => {
    try {
      if (!user?.token) return;

      await TaskService.update(
        taskId,
        {
          title: data.title,
          description: data.description,
          dueDate: data.dueDate,
        },
        user.token
      );

      router.push('/tasks');
    } catch (error) {
      if (error instanceof Error && error.message.includes('401')) {
        logout();
      }
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        if (!user?.token) return;

        await TaskService.delete(taskId, user.token);
        router.push('/tasks');
      } catch (error) {
        if (error instanceof Error && error.message.includes('401')) {
          logout();
        }
        console.error('Error deleting task:', error);
      }
    }
  };

  if (authLoading || loading) {
    return <Loading />;
  }

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Edit Task</h1>
        <button onClick={handleDelete} className={styles.deleteButton}>
          Delete Task
        </button>
      </div>
      <TaskForm
        initialData={{
          title: task.title,
          description: task.description,
          dueDate: task.dueDate ? formatDateForInput(task.dueDate) : '',
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
