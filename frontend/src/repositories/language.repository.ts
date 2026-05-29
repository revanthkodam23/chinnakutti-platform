import { getAdminDataSource } from "@/repositories/supabase-data-source";
import type { AdminLanguage } from "@/types/admin";

export async function listLanguages() {
  const supabase = getAdminDataSource();
  const { data, error } = await supabase.from("languages").select("*").order("sort_order");

  if (error) {
    throw error;
  }

  return data as AdminLanguage[];
}
