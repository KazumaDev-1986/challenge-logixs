'use client';

import { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';
import { useAuth } from '@/hooks/useAuth';
import { TaskService } from '@/application/services/task.service';
import { Task } from '@/types/task';
import { TaskCard } from '@/components/tasks/TaskCard';
import { Loading } from '@/components/atoms/Loading';

const TasksPage: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (!user?.token) return;

        const data = await TaskService.getAll(user.token);
        setTasks(data);
      } catch (error) {
        if (error instanceof Error && error.message.includes('401')) {
          localStorage.removeItem('user');
          router.push('/sign-in');
        }
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user, router]);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        if (!user?.token) return;

        await TaskService.delete(id, user.token);
        setTasks(tasks.filter((task) => task.id !== id));
      } catch (error) {
        if (error instanceof Error && error.message.includes('401')) {
          localStorage.removeItem('user');
          router.push('/sign-in');
        }
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleToggleComplete = async (id: number) => {
    try {
      if (!user?.token) return;

      const task = tasks.find((t) => t.id === id);
      if (!task) return;

      const updatedTask = await TaskService.update(
        id,
        { completed: !task.completed },
        user.token
      );

      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: updatedTask.completed } : task
        )
      );
    } catch (error) {
      if (error instanceof Error && error.message.includes('401')) {
        localStorage.removeItem('user');
        router.push('/sign-in');
      }
      console.error('Error updating task:', error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Tasks</h1>
        <Link href="/tasks/new" className={styles.newTaskButton}>
          New Task
        </Link>
      </div>
      <div className={styles.taskList}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TasksPage;
