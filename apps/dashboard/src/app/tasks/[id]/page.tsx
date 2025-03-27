import { FC } from 'react';
import { TaskDetailClient } from '@/components/tasks/TaskDetailClient';

interface TaskDetailPageProps {
  params: {
    id: string;
  };
}

const TaskDetailPage: FC<TaskDetailPageProps> = ({ params }) => {
  return <TaskDetailClient taskId={parseInt(params.id, 10)} />;
};

export default TaskDetailPage;
