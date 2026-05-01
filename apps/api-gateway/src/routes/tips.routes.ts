import { Router } from 'express';
import { extractSessionFromCookie } from '../middleware/chatSession.middleware';
import { agentCallLimiter } from '../middleware/rateLimit.middleware';
import asyncError from '../middleware/asyncError.middleware';
import { tipsHandler } from '../controllers/tips.controller';

const tipsRouter: Router = Router();

// POST /chat/message - Send a message and get LLM response
tipsRouter.post('/api/tips', agentCallLimiter, extractSessionFromCookie, asyncError(tipsHandler));

export default tipsRouter;
