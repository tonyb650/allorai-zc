import express, { Express, Request, Response } from 'express';
import { corsMiddleware } from '../middleware/cors.middleware';
import { errorHandler } from '../middleware/error.middleware';
import { loggerMiddleware } from '../middleware/logger.middleware';
import chatRouter from '../routes/chat.routes';
import tipsRouter from '../routes/tips.routes';

const createApp = () => {
  const app: Express = express(); // Express 'app' instance
  // Trust the first proxy hop so req.ip reflects the real client behind Railway's
  // load balancer; without this, every request shares one rate-limit bucket.
  app.set('trust proxy', 1);
  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(corsMiddleware);
  app.use(loggerMiddleware);

  // Root endpoint
  app.get('/', (req: Request, res: Response) => {
    res.json({
      name: 'Allorai API Gateway',
      version: '1.0.0',
      description: 'Gateway for multi-agent travel orchestration',
      endpoints: {
        chat: '/api/chat',
        tips: '/api/tips',
      },
    });
  });

  // Health check endpoint
  app.get('/health', (req: Request, res: Response) => {
    res.json({
      status: 'healthy',
      service: 'api-gateway',
      timestamp: new Date().toISOString(),
    });
  });

  app.use(chatRouter);
  app.use(tipsRouter);
  // Add additional routers here as needed

  // Error handling middleware (must be last)
  app.use(errorHandler);

  return app;
};
export default createApp;
