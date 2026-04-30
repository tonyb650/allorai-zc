import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from '../config/env.js';
import logger from '../utils/logger.js';

let supabaseClient: SupabaseClient | null = null;

export const connectToSupabase = (): SupabaseClient | null => {
  if (config.DISABLE_DB) {
    logger.info('ℹ️  DISABLE_DB=true — skipping Supabase initialization');
    return null;
  }

  if (supabaseClient) {
    return supabaseClient;
  }

  try {
    supabaseClient = createClient(config.SUPABASE_URL!, config.SUPABASE_KEY!, {
      auth: {
        autoRefreshToken: true,
        persistSession: false,
      },
    });

    logger.info('✅ Successfully connected to Supabase');
    return supabaseClient;
  } catch (error) {
    logger.error(error, '❌ Failed to connect to Supabase:');
    throw error;
  }
};

export const getSupabaseClient = (): SupabaseClient | null => {
  return supabaseClient;
};
