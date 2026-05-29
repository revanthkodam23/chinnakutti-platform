import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { StoryBlockEditor } from "@/features/stories/components/story-block-editor";
import { StoryForm } from "@/features/stories/components/story-form";
import { requireAdmin } from "@/services/admin-auth.service";
import { getStoryEditorData } from "@/services/story.service";
import { localizedText } from "@/types/admin";

type EditStoryPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditStoryPage({ params }: EditStoryPageProps) {
  await requireAdmin();
  const { id } = await params;

  try {
    const { lookups, story, blocks } = await getStoryEditorData(id);

    return (
      <AdminShell>
        <div className="mb-6">
          <p className="text-sm font-black uppercase tracking-wide text-coral">Edit story</p>
          <h1 className="font-display text-5xl font-black text-[#1a1a1a]">{localizedText(story.title, "en") || "Untitled Story"}</h1>
        </div>
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <StoryForm story={story} categories={lookups.categories} ageGroups={lookups.ageGroups} />
          <StoryBlockEditor storyId={story.id} blocks={blocks} languages={lookups.languages} />
        </div>
      </AdminShell>
    );
  } catch {
    notFound();
  }
}
