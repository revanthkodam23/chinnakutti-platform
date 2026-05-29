import Link from "next/link";
import { BookOpen, PlusCircle, Sparkles } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { LoginForm } from "@/components/admin/login-form";
import { getCurrentAdmin } from "@/services/admin-auth.service";

export default async function AdminPage() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF5F5] via-[#FFFBEB] to-[#F0FDF4] px-4 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-7xl" aria-hidden>🐘</div>
          <h1 className="mt-4 font-display text-5xl font-black text-[#1a1a1a]">Story Studio</h1>
          <p className="mx-auto mt-3 max-w-xl text-lg leading-8 text-[#666]">
            Admin-only space for creating safe, colorful Telugu and English stories for little readers.
          </p>
          <LoginForm />
        </div>
      </div>
    );
  }

  return (
    <AdminShell>
      <div className="rounded-[32px] bg-gradient-to-br from-[#FFF5F5] via-[#FFFBEB] to-[#F0FDF4] p-8 shadow-soft">
        <p className="inline-flex rounded-full bg-coral/10 px-4 py-2 text-sm font-black text-coral">
          <Sparkles size={16} className="mr-2" />
          Welcome back
        </p>
        <h1 className="mt-4 font-display text-5xl font-black text-[#1a1a1a]">Story Studio</h1>
        <p className="mt-3 max-w-2xl text-lg leading-8 text-[#666]">
          Create stories, rhymes, worksheets, and puzzles with bilingual blocks, audio, images, and parent-friendly metadata.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/admin/stories" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-black text-coral shadow-soft">
            <BookOpen size={18} />
            Manage Stories
          </Link>
          <Link href="/admin/stories/new" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-coral to-amber px-6 py-3 font-black text-white shadow-candy">
            <PlusCircle size={18} />
            New Story
          </Link>
        </div>
      </div>
    </AdminShell>
  );
}
