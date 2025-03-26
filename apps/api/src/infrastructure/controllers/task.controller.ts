import express, { Request, Response } from 'express';
import { TaskService } from '../../application/services/task.service';
import { CreateTaskDto, UpdateTaskDto } from '../../application/dto/task.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = express.Router();
const taskService = new TaskService();

// Apply auth middleware to all task routes
router.use(authMiddleware);

// Create a new task
router.post('/', async (req: Request, res: Response) => {
  try {
    const createTaskDto = plainToInstance(CreateTaskDto, req.body);
    const errors = await validate(createTaskDto);
    if (errors.length > 0) {
      return res
        .status(400)
        .json({ error: 'Validation failed', details: errors });
    }

    const task = await taskService.create(createTaskDto, (req as any).userId);
    return res.status(201).json(task);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all tasks for the current user
router.get('/', async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.findAll((req as any).userId);
    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a task by id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const task = await taskService.findOne(id, (req as any).userId);
    return res.json(task);
  } catch (error) {
    if (error instanceof Error && error.message === 'Task not found') {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a task
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updateTaskDto = plainToInstance(UpdateTaskDto, req.body);
    const errors = await validate(updateTaskDto);
    if (errors.length > 0) {
      return res
        .status(400)
        .json({ error: 'Validation failed', details: errors });
    }

    const task = await taskService.update(
      id,
      updateTaskDto,
      (req as any).userId
    );
    return res.json(task);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Task not found') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a task
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    await taskService.remove(id, (req as any).userId);
    return res.status(204).send();
  } catch (error) {
    if (error instanceof Error && error.message === 'Task not found') {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export { router as taskRouter };
