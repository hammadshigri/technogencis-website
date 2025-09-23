// Server-only Supabase client (service role)
import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const supabaseServer = createClient(supabaseUrl, serviceRole, {
  auth: { persistSession: false, autoRefreshToken: false },
});

export default supabaseServer;
