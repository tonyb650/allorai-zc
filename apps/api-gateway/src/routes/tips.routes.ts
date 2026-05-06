import { Router } from 'express';
import { agentCallLimiter } from '../middleware/rateLimit.middleware';
import asyncError from '../middleware/asyncError.middleware';
import { tipsHandler } from '../controllers/tips.controller';

const tipsRouter: Router = Router();

// POST /tips - Send a message and get response with travel tips
tipsRouter.post('/api/tips', agentCallLimiter, asyncError(tipsHandler));

export default tipsRouter;
