import { ipKeyGenerator, rateLimit } from 'express-rate-limit';
import type { Request } from 'express';

const minutes = (n: number) => n * 60 * 1000;

export const sessionCreateLimiter = rateLimit({
  windowMs: minutes(1),
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many session requests. Please try again shortly.' },
});

export const agentCallLimiter = rateLimit({
  windowMs: minutes(1),
  limit: 30,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  keyGenerator: (req: Request) =>
    req.cookies?.chat_session_id ?? ipKeyGenerator(req.ip ?? ''),
  message: { error: 'Too many requests. Please slow down.' },
});
