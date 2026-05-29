import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CategoryPill } from "@/components/story/category-pill";
import { getStories, getStory } from "@/lib/api/content";
import { createMetadata } from "@/lib/seo";

type StoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const stories = await getStories();
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStory(slug);

  if (!story) {
    return createMetadata({ title: "Story not found" });
  }

  return createMetadata({
    title: story.title,
    description: story.excerpt,
    path: `/stories/${story.slug}`,
    image: story.coverImage
  });
}

export default async function StoryDetailPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = await getStory(slug);

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
        className="mb-10 flex min-h-72 items-center justify-center rounded-[32px] border-[3px] border-dashed text-9xl shadow-soft"
        style={{
          background: `linear-gradient(135deg, ${story.color}20, ${story.color}0D)`,
          borderColor: `${story.color}55`
        }}
      >
        <span aria-hidden>{story.emoji}</span>
      </div>
      <div className="prose prose-lg max-w-none rounded-[28px] bg-white p-6 prose-headings:font-display prose-headings:text-[#1a1a1a] prose-p:text-[#555] sm:p-9 dark:bg-white/10 dark:prose-invert dark:prose-p:text-white/75">
        {story.content.split("\n\n").map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
