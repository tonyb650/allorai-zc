import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env['NX_PUBLIC_SUPABASE_URL'] as string,
  process.env['NX_PUBLIC_SUPABASE_ANON_KEY'] as string
);
