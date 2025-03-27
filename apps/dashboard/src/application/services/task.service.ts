import { Task } from '../../types/task';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4242';

export class TaskService {
  private static getHeaders(token: string) {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }

  static async getAll(token: string): Promise<Task[]> {
    const response = await fetch(`${API_URL}/tasks`, {
      headers: this.getHeaders(token),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }

    return response.json();
  }

  static async getById(id: number, token: string): Promise<Task> {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      headers: this.getHeaders(token),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch task');
    }

    return response.json();
  }

  static async create(task: Omit<Task, 'id'>, token: string): Promise<Task> {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error('Failed to create task');
    }

    return response.json();
  }

  static async update(
    id: number,
    task: Partial<Task>,
    token: string
  ): Promise<Task> {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PATCH',
      headers: this.getHeaders(token),
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error('Failed to update task');
    }

    return response.json();
  }

  static async delete(id: number, token: string): Promise<void> {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(token),
    });

    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
  }
}
