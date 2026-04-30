import { SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseClient } from '../startup/connectToDB';
import { Request, Response, NextFunction } from 'express';
import { config } from '../config/env';

declare global {
  namespace Express {
    interface Request {
      supabase?: SupabaseClient;
    }
  }
}

export const requireSupabase = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const supabase = getSupabaseClient();

  if (!supabase) {
    if (config.DISABLE_DB) {
      next();
      return;
    }
    res.status(500).json({
      error: 'Database connection not available',
    });
    return;
  }
  req.supabase = supabase;
  next();
};
