import { FC } from 'react';
import Link from 'next/link';
import styles from './TaskCard.module.scss';
import { Task } from '@/types/task';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export const TaskCard: FC<TaskCardProps> = ({
  task,
  onToggleComplete,
  onDelete,
}) => {
  return (
    <div
      className={`${styles.taskCard} ${task.completed ? styles.completed : ''}`}
    >
      <div className={styles.taskContent}>
        <div className={styles.taskHeader}>
          <div className={styles.taskTitle}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleComplete(task.id)}
              className={styles.checkbox}
            />
            <h3>{task.title}</h3>
          </div>
          <span className={styles.dueDate}>
            {task.dueDate ? formatDate(task.dueDate) : 'No due date'}
          </span>
        </div>
        <p className={styles.description}>{task.description}</p>
      </div>
      <div className={styles.taskActions}>
        <Link
          href={`/tasks/${task.id}`}
          className={`${styles.actionButton} ${styles.editButton}`}
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(task.id)}
          className={`${styles.actionButton} ${styles.deleteButton}`}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
