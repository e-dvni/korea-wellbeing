import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

// Service-role client — server-side only (route handlers, server actions).
// Never expose the service role key to the browser.
export function createServerClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}
