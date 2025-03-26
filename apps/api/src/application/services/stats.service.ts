import { taskRepository } from '../../infrastructure/repositories/task.repository';

export class StatsService {
  async getOverview(userId: number) {
    return taskRepository
      .createQueryBuilder('task')
      .select([
        'COUNT(*) as total_tasks',
        'COUNT(CASE WHEN completed = true THEN 1 END) as completed_tasks',
        'COUNT(CASE WHEN completed = false THEN 1 END) as pending_tasks',
        'COUNT(CASE WHEN "dueDate" IS NOT NULL AND "dueDate" < NOW() AND completed = false THEN 1 END) as overdue_tasks',
        'COUNT(CASE WHEN "dueDate" IS NOT NULL AND "dueDate" >= NOW() AND "dueDate" <= NOW() + INTERVAL \'7 days\' AND completed = false THEN 1 END) as upcoming_tasks',
        'COUNT(CASE WHEN "dueDate" IS NULL THEN 1 END) as tasks_without_due_date',
      ])
      .where('task.userId = :userId', { userId })
      .getRawOne();
  }

  async getCompletionRate(userId: number) {
    return taskRepository
      .createQueryBuilder('task')
      .select([
        'DATE_TRUNC(\'month\', "createdAt") as month',
        'COUNT(*) as total_tasks',
        'COUNT(CASE WHEN completed = true THEN 1 END) as completed_tasks',
        'ROUND((COUNT(CASE WHEN completed = true THEN 1 END)::numeric / NULLIF(COUNT(*), 0)::numeric * 100)::numeric, 2) as completion_rate',
      ])
      .where('task.userId = :userId', { userId })
      .groupBy('month')
      .orderBy('month', 'DESC')
      .limit(12)
      .getRawMany();
  }

  async getDistribution(userId: number) {
    return taskRepository
      .createQueryBuilder('task')
      .select([
        "CASE WHEN completed = true THEN 'Completed' ELSE 'Pending' END as status",
        "CASE WHEN \"dueDate\" IS NULL THEN 'No Due Date' WHEN \"dueDate\" < NOW() THEN 'Overdue' WHEN \"dueDate\" >= NOW() AND \"dueDate\" <= NOW() + INTERVAL '7 days' THEN 'Upcoming' ELSE 'Future' END as due_date_category",
        'COUNT(*) as count',
      ])
      .where('task.userId = :userId', { userId })
      .groupBy('status, due_date_category')
      .getRawMany();
  }

  async getProductivity(userId: number) {
    const stats = await taskRepository
      .createQueryBuilder('task')
      .select([
        'COUNT(*) as total_tasks',
        'COUNT(CASE WHEN completed = true THEN 1 END) as completed_tasks',
        'COUNT(CASE WHEN completed = true AND "completedAt" <= "dueDate" AND "dueDate" IS NOT NULL THEN 1 END) as completed_on_time',
        'ROUND(AVG(CASE WHEN completed = true THEN EXTRACT(EPOCH FROM ("completedAt" - "createdAt")) / 3600 END)) as avg_completion_time_hours',
      ])
      .where('task.userId = :userId', { userId })
      .getRawOne();

    // Calculate productivity score (0-100)
    const productivityScore =
      stats.total_tasks > 0
        ? Math.round(
            ((stats.completed_tasks / stats.total_tasks) * 0.6 +
              (stats.completed_on_time / stats.total_tasks) * 0.4) *
              100
          )
        : 0;

    return {
      ...stats,
      productivityScore,
    };
  }
}
