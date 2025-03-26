import { Task } from '../../domain/task.entity';
import { taskRepository } from '../../infrastructure/repositories/task.repository';
import { CreateTaskDto, UpdateTaskDto } from '../dto/task.dto';

export class TaskService {
  async create(createTaskDto: CreateTaskDto, userId: number): Promise<Task> {
    const task = taskRepository.create({
      ...createTaskDto,
      userId,
    });
    return await taskRepository.save(task);
  }

  async findAll(userId: number): Promise<Task[]> {
    return await taskRepository.find({ where: { userId } });
  }

  async findOne(id: number, userId: number): Promise<Task> {
    const task = await taskRepository.findOne({ where: { id, userId } });
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
    userId: number
  ): Promise<Task> {
    const task = await this.findOne(id, userId);
    Object.assign(task, updateTaskDto);
    return await taskRepository.save(task);
  }

  async remove(id: number, userId: number): Promise<void> {
    const task = await this.findOne(id, userId);
    await taskRepository.remove(task);
  }
}
