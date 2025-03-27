'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import styles from './page.module.scss';

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Complete project documentation',
    description:
      'Write comprehensive documentation for the project including setup instructions and API endpoints.',
    dueDate: '2024-03-30T10:00:00',
    completed: false,
  },
  {
    id: 2,
    title: 'Review pull requests',
    description: 'Review and merge pending pull requests for the main branch.',
    dueDate: '2024-03-28T15:00:00',
    completed: true,
  },
  {
    id: 3,
    title: 'Team meeting',
    description: 'Weekly sync meeting with the development team.',
    dueDate: '2024-03-29T09:00:00',
    completed: false,
  },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return (
    date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0]
  );
};

const TasksPage: FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const handleToggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Tasks</h1>
        <Link href="/tasks/new" className={styles.newButton}>
          New Task
        </Link>
      </div>

      <div className={styles.tasksList}>
        {tasks.map((task) => (
          <div key={task.id} className={styles.taskCard}>
            <div className={styles.taskHeader}>
              <div className={styles.taskTitle}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task.id)}
                  className={styles.checkbox}
                />
                <h3 className={task.completed ? styles.completed : ''}>
                  {task.title}
                </h3>
              </div>
              <div className={styles.taskActions}>
                <Link href={`/tasks/${task.id}`} className={styles.editButton}>
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(task.id)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </div>
            <p className={styles.description}>{task.description}</p>
            <div className={styles.taskFooter}>
              <span className={styles.dueDate}>
                Due: {formatDate(task.dueDate)}
              </span>
              <span
                className={`${styles.status} ${
                  task.completed ? styles.completed : styles.pending
                }`}
              >
                {task.completed ? 'Completed' : 'Pending'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksPage;
