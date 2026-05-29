import Link from "next/link";
import { CategoryPill } from "@/components/story/category-pill";
import type { StorySummary } from "@/lib/types";

export function StoryCard({ story }: { story: StorySummary }) {
  return (
    <article className="group overflow-hidden rounded-[24px] bg-white shadow-soft transition hover:-translate-y-1.5 hover:shadow-candy dark:bg-white/10">
      <Link href={`/stories/${story.slug}`} className="block">
        <div
          className="flex h-40 items-center justify-center text-7xl transition duration-300 group-hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${story.color}22, ${story.color}10)`
          }}
        >
          <span aria-hidden>{story.emoji}</span>
        </div>
      </Link>
      <div className="flex min-h-48 flex-col gap-3 p-5">
        <CategoryPill category={story.category} />
        <div className="space-y-2">
          <h2 className="font-display text-xl font-black leading-tight text-[#1a1a1a] dark:text-white">
            <Link href={`/stories/${story.slug}`} className="hover:text-coral">
              {story.title}
            </Link>
          </h2>
          <p className="line-clamp-2 text-sm leading-6 text-[#777] dark:text-white/65">{story.excerpt}</p>
        </div>
        <div className="mt-auto flex items-center gap-3 text-xs font-bold text-[#999] dark:text-white/55">
          <span>👶 {story.ageRange}</span>
          <span>⏱ {story.readingTimeMinutes} min</span>
          <span className="ml-auto font-black" style={{ color: story.color }}>Read →</span>
        </div>
      </div>
    </article>
  );
}
