import { createSupabaseAdminClient } from "@/lib/supabase/server";

export const STORY_ASSETS_BUCKET = "story-assets";

export function getAdminDataSource() {
  return createSupabaseAdminClient();
}
