import { AdminShell } from "@/components/admin/admin-shell";
import { StoryForm } from "@/features/stories/components/story-form";
import { requireAdmin } from "@/services/admin-auth.service";
import { getStoryStudioLookups } from "@/services/story.service";

export default async function NewStoryPage() {
  await requireAdmin();
  const { categories, ageGroups } = await getStoryStudioLookups();

  return (
    <AdminShell>
      <div className="mb-6">
        <p className="text-sm font-black uppercase tracking-wide text-coral">Create</p>
        <h1 className="font-display text-5xl font-black text-[#1a1a1a]">New Story</h1>
      </div>
      <StoryForm categories={categories} ageGroups={ageGroups} />
    </AdminShell>
  );
}
