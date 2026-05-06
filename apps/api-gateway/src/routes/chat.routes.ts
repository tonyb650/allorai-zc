import { Router } from 'express';
import { chatMessageHandler } from '../controllers/chat.controller';
import { agentCallLimiter } from '../middleware/rateLimit.middleware';
import asyncError from '../middleware/asyncError.middleware';

const chatRouter: Router = Router();

// POST /chat/message - Send a message and get LLM response
chatRouter.post('/api/chat/message', agentCallLimiter, asyncError(chatMessageHandler));

export default chatRouter;
