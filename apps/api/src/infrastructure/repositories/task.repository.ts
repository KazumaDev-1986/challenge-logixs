import { Repository } from 'typeorm';
import { PostgresDataSource } from '../database/postgres';
import { Task } from '../../domain/task.entity';

export const taskRepository: Repository<Task> =
  PostgresDataSource.getRepository(Task);
