import { z } from 'zod';

const environmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().min(1000),
  AGENTS_URL: z.url(),
  INTERNAL_API_KEY: z.string().min(1),

  CORS_ORIGIN: z.string(),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']),
});

const parsedResults = environmentSchema.safeParse(process.env);

if (!parsedResults.success) {
  console.error('Environment variable validation failed:', parsedResults.error.format());
  throw new Error('Invalid environment variables');
}

export const config = parsedResults.data;
