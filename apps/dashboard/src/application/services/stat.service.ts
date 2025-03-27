import {
  TaskOverview,
  CompletionRateItem,
  TaskDistributionItem,
  ProductivityMetrics,
} from '../../types/stats';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://0.0.0.0:4242';

export class StatService {
  static async getOverview(token: string): Promise<TaskOverview> {
    const response = await fetch(`${API_URL}/stats/overview`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch task overview');
    }

    return response.json();
  }

  static async getCompletionRate(token: string): Promise<CompletionRateItem[]> {
    const response = await fetch(`${API_URL}/stats/completion-rate`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch completion rate');
    }

    return response.json();
  }

  static async getDistribution(token: string): Promise<TaskDistributionItem[]> {
    const response = await fetch(`${API_URL}/stats/distribution`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch task distribution');
    }

    return response.json();
  }

  static async getProductivity(token: string): Promise<ProductivityMetrics> {
    const response = await fetch(`${API_URL}/stats/productivity`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch productivity metrics');
    }

    return response.json();
  }
}
