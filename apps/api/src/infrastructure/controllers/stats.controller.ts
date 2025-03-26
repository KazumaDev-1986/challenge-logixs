import express, { Request, Response } from 'express';
import { authMiddleware } from '../../middleware/auth.middleware';
import { StatsService } from '../../application/services/stats.service';

const router = express.Router();
const statsService = new StatsService();

// Get overall task statistics
router.get('/overview', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const stats = await statsService.getOverview(userId);
    return res.json(stats);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: 'An unknown error occurred' });
  }
});

// Get task completion rate by month
router.get(
  '/completion-rate',
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;
      const stats = await statsService.getCompletionRate(userId);
      return res.json(stats);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
);

// Get task distribution by completion status and due date
router.get(
  '/distribution',
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;
      const stats = await statsService.getDistribution(userId);
      return res.json(stats);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
);

// Get productivity score (based on completed tasks and timeliness)
router.get(
  '/productivity',
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;
      const stats = await statsService.getProductivity(userId);
      return res.json(stats);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
);

export { router as statsRouter };
