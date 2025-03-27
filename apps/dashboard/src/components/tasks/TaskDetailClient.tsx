'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { TaskForm } from './TaskForm';
import styles from './TaskDetailClient.module.scss';

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

interface TaskDetailClientProps {
  task: Task;
}

export const TaskDetailClient: FC<TaskDetailClientProps> = ({ task }) => {
  const router = useRouter();

  const handleSubmit = (data: any) => {
    // TODO: Implement API call to update task
    console.log('Updating task:', data);
    router.push('/tasks');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      // TODO: Implement API call to delete task
      console.log('Deleting task:', task.id);
      router.push('/tasks');
    }
  };

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
          dueDate: task.dueDate,
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
