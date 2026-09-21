


// The Supabase dependency is supplied by the project runtime, but may be absent
// from the local TypeScript module-resolution environment.
// @ts-expect-error: Supabase is an optional runtime dependency in this setup.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
