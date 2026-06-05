import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function getAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminUser(user: User | null) {
  if (!user) {
    return false;
  }

  if (user.app_metadata?.role === "admin") {
    return true;
  }

  const email = user.email?.toLowerCase();
  return Boolean(email && getAdminEmails().includes(email));
}

export async function getCurrentAdmin() {
  let supabase;

  try {
    supabase = await createSupabaseServerClient();
  } catch {
    return null;
  }

  const { data, error } = await supabase.auth.getUser();

  if (error || !isAdminUser(data.user)) {
    return null;
  }

  return data.user;
}

export async function requireAdmin() {
  const user = await getCurrentAdmin();

  if (!user) {
    redirect("/admin");
  }

  return user;
}
