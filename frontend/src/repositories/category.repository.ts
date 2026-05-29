import { getAdminDataSource } from "@/repositories/supabase-data-source";
import type { AdminCategory } from "@/types/admin";

export async function listCategories() {
  const supabase = getAdminDataSource();
  const { data, error } = await supabase.from("categories").select("*").order("sort_order");

  if (error) {
    throw error;
  }

  return data as AdminCategory[];
}
