import { FC, use } from 'react';
import { TaskDetailClient } from '@/components/tasks/TaskDetailClient';

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

// Mock data - replace with API call
const mockTask: Task = {
  id: 1,
  title: 'Complete project documentation',
  description:
    'Write comprehensive documentation for the project including setup instructions and API endpoints.',
  dueDate: '2024-03-30T10:00:00',
  completed: false,
};

interface TaskDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const TaskDetailPage: FC<TaskDetailPageProps> = ({ params }) => {
  const { id } = use(params);

  // TODO: Replace with actual API call
  const task = mockTask;

  return <TaskDetailClient task={task} />;
};

export default TaskDetailPage;
