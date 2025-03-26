import 'reflect-metadata';
import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { json } from 'body-parser';
import dotenv from 'dotenv';
import { authRouter } from './infrastructure/controllers/auth.controller';
import { PostgresDataSource } from './infrastructure/database/postgres';

// Load environment variables first
dotenv.config();

// Environment configuration
const config = {
  host: process.env.HOST ?? 'localhost',
  port: process.env.PORT ? Number(process.env.PORT) : 4242,
  nodeEnv: process.env.NODE_ENV ?? 'development',
};

// Initialize express app
const app: Express = express();

// Initialize database
const initializeDatabase = async () => {
  try {
    await PostgresDataSource.initialize();
    console.log('Database connection established successfully');
    await PostgresDataSource.runMigrations();
    console.log('Database migrations completed');
  } catch (error) {
    console.error('Error during Data Source initialization:', error);
    process.exit(1);
  }
};

// Middleware configuration
const configureMiddleware = (app: Express): void => {
  app.use(cors());
  app.use(helmet());
  app.use(json());
};

// Route configuration
const configureRoutes = (app: Express): void => {
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use('/auth', authRouter);
};

// Error handling middleware
const configureErrorHandling = (app: Express): void => {
  app.use(
    (
      err: Error,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      console.error(err.stack);
      res.status(500).json({
        error:
          config.nodeEnv === 'development'
            ? err.message
            : 'Internal Server Error',
        status: 'error',
      });
    }
  );
};

// Initialize database and start server
const startServer = async (): Promise<void> => {
  try {
    await initializeDatabase();
    configureMiddleware(app);
    configureRoutes(app);
    configureErrorHandling(app);

    app.listen(config.port, config.host, () => {
      console.log(`[ ready ] http://${config.host}:${config.port}`);
      console.log(`Environment: ${config.nodeEnv}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Start the server
startServer();
