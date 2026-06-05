import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CategoryPill } from "@/components/story/category-pill";
import { StoryBlockContent } from "@/components/story/story-block-content";
import { createMetadata } from "@/lib/seo";
import { getPublishedStoryDetail } from "@/services/public-story.service";

export const dynamic = "force-dynamic";

type StoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = await getPublishedStoryDetail(slug);

  if (!story) {
    return createMetadata({ title: "Story not found" });
  }

  return createMetadata({
    title: story.title,
    description: story.excerpt,
    path: `/stories/${story.slug}`,
    image: story.coverImage || undefined
  });
}

export default async function StoryDetailPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = await getPublishedStoryDetail(slug);

  if (!story) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <CategoryPill category={story.category} />
        <h1 className="mt-5 font-display text-5xl font-black leading-tight text-[#1a1a1a] sm:text-6xl dark:text-white">
          {story.title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#777] dark:text-white/65">{story.excerpt}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm font-bold text-[#999] dark:text-white/55">
          <span>👶 {story.ageRange}</span>
          <span aria-hidden>&middot;</span>
          <span>⏱ {story.readingTimeMinutes} min read</span>
          <span aria-hidden>&middot;</span>
          <span>By {story.author.name}</span>
        </div>
      </div>

      <div
        className="mb-10 flex min-h-72 items-center justify-center overflow-hidden rounded-[32px] border-[3px] border-dashed text-9xl shadow-soft"
        style={{
          background: `linear-gradient(135deg, ${story.color}20, ${story.color}0D)`,
          borderColor: `${story.color}55`
        }}
      >
        {story.coverImage ? (
          // Supabase Storage project hostnames vary by deployment.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={story.coverImage} alt={story.title} className="h-full min-h-72 w-full object-cover" />
        ) : (
          <span aria-hidden>{story.emoji}</span>
        )}
      </div>

      {story.blocksByLanguage.length > 0 ? (
        <div className="space-y-8">
          {story.blocksByLanguage.map((language) => (
            <section key={language.code} className="rounded-[28px] bg-white p-6 shadow-soft sm:p-9 dark:bg-white/10">
              <div className="mb-7 flex items-center justify-between gap-4 border-b border-coral/10 pb-4">
                <h2 className="font-display text-3xl font-black text-[#1a1a1a] dark:text-white">{language.nativeName}</h2>
                <span className="rounded-full bg-coral/10 px-3 py-1 text-xs font-black uppercase text-coral">{language.code}</span>
              </div>
              <div className="space-y-7">
                {language.blocks.map((block) => (
                  <StoryBlockContent key={block.id} block={block} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="rounded-[28px] bg-white p-8 text-center font-bold text-[#777] shadow-soft dark:bg-white/10 dark:text-white/65">
          This story has been published, but its reading blocks are still being prepared.
        </div>
      )}
    </article>
  );
}
