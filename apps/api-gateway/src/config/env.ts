import { z } from 'zod';

const environmentSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().min(1000),
    AGENTS_URL: z.url(),

    CORS_ORIGIN: z.string(),
    LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']),

    DISABLE_DB: z
      .enum(['true', 'false'])
      .default('false')
      .transform((v) => v === 'true'),

    SUPABASE_URL: z.url().optional(),
    SUPABASE_KEY: z.string().min(1).optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.DISABLE_DB) {
      if (!data.SUPABASE_URL) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['SUPABASE_URL'],
          message: 'SUPABASE_URL is required when DISABLE_DB is not true',
        });
      }
      if (!data.SUPABASE_KEY) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['SUPABASE_KEY'],
          message: 'SUPABASE_KEY is required when DISABLE_DB is not true',
        });
      }
    }
  });

const parsedResults = environmentSchema.safeParse(process.env);

if (!parsedResults.success) {
  console.error('Environment variable validation failed:', parsedResults.error.format());
  throw new Error('Invalid environment variables');
}

export const config = parsedResults.data;
