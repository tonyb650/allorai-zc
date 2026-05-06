import { rateLimit } from 'express-rate-limit';

const minutes = (n: number) => n * 60 * 1000;

export const agentCallLimiter = rateLimit({
  windowMs: minutes(1),
  limit: 30,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many requests. Please slow down.' },
});
