export interface TaskOverview {
  total_tasks: string;
  completed_tasks: string;
  pending_tasks: string;
  overdue_tasks: string;
  upcoming_tasks: string;
  tasks_without_due_date: string;
}

export interface CompletionRateItem {
  month: string;
  total_tasks: string;
  completed_tasks: string;
  completion_rate: string;
}

export interface TaskDistributionItem {
  status: string;
  due_date_category: string;
  count: string;
}

export interface ProductivityMetrics {
  total_tasks: string;
  completed_tasks: string;
  completed_on_time: string;
  avg_completion_time_hours: number | null;
  productivityScore: number;
}
