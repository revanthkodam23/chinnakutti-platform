import { getAdminDataSource } from "@/repositories/supabase-data-source";
import type { AdminAgeGroup } from "@/types/admin";

export async function listAgeGroups() {
  const supabase = getAdminDataSource();
  const { data, error } = await supabase.from("age_groups").select("*").order("sort_order");

  if (error) {
    throw error;
  }

  return data as AdminAgeGroup[];
}
