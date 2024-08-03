import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bvdqdnmabdoznllagshc.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Supabase URL or Key is not defined in environment variables"
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
