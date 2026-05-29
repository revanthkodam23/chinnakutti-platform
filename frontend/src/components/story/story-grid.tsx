import { StoryCard } from "@/components/story/story-card";
import type { StorySummary } from "@/lib/types";

export function StoryGrid({ stories }: { stories: StorySummary[] }) {
  if (stories.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-ink-950/20 p-8 text-center text-ink-500 dark:border-white/20 dark:text-white/60">
        New stories are coming soon.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {stories.map((story) => (
        <StoryCard key={story.slug} story={story} />
      ))}
    </div>
  );
}
