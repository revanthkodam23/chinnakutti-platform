import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { StoryFilters } from "@/features/stories/components/story-filters";
import { requireAdmin } from "@/services/admin-auth.service";
import { getStoryStudioLookups, getStoryStudioStories } from "@/services/story.service";
import { localizedText, statusLabel, type StoryStatus } from "@/types/admin";

type StoriesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function StoriesPage({ searchParams }: StoriesPageProps) {
  await requireAdmin();
  const params = await searchParams;
  const lookups = await getStoryStudioLookups();
  const stories = await getStoryStudioStories({
    search: single(params.search),
    status: (single(params.status) || "all") as StoryStatus | "all",
    categoryId: single(params.categoryId),
    languageId: single(params.languageId)
  });

  return (
    <AdminShell>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-coral">Story list</p>
          <h1 className="font-display text-5xl font-black text-[#1a1a1a]">Stories</h1>
        </div>
        <Link href="/admin/stories/new" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-coral to-amber px-6 py-3 font-black text-white shadow-candy">
          <PlusCircle size={18} />
          Create Story
        </Link>
      </div>

      <StoryFilters categories={lookups.categories} languages={lookups.languages} searchParams={params} />

      <div className="mt-6 overflow-hidden rounded-[28px] bg-white shadow-soft">
        <div className="grid grid-cols-[1.5fr_1fr_0.8fr_0.8fr_0.6fr] gap-4 border-b border-coral/10 px-5 py-4 text-xs font-black uppercase tracking-wide text-[#999]">
          <span>Story</span>
          <span>Category</span>
          <span>Status</span>
          <span>Views</span>
          <span>Edit</span>
        </div>
        {stories.map((story) => (
          <div key={story.id} className="grid grid-cols-[1.5fr_1fr_0.8fr_0.8fr_0.6fr] gap-4 border-b border-coral/10 px-5 py-4 text-sm last:border-b-0">
            <div>
              <p className="font-display text-lg font-black text-[#1a1a1a]">{localizedText(story.title, "en")}</p>
              <p className="text-xs font-bold text-[#999]">{story.slug}</p>
            </div>
            <span className="font-bold text-[#666]">{story.category ? localizedText(story.category.name, "en") : "Uncategorized"}</span>
            <span className="w-fit rounded-full bg-coral/10 px-3 py-1 text-xs font-black text-coral">{statusLabel(story.status)}</span>
            <span className="font-black text-[#555]">{story.view_count}</span>
            <Link href={`/admin/stories/${story.id}/edit`} className="font-black text-coral hover:text-amber">Edit →</Link>
          </div>
        ))}
        {stories.length === 0 ? (
          <div className="px-5 py-12 text-center font-bold text-[#777]">No stories match these filters yet.</div>
        ) : null}
      </div>
    </AdminShell>
  );
}

function single(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value ?? "";
}
