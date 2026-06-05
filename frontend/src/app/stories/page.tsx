import type { Metadata } from "next";
import { StoryGrid } from "@/components/story/story-grid";
import { createMetadata } from "@/lib/seo";
import { getPublishedStorySummaries } from "@/services/public-story.service";

export const metadata: Metadata = createMetadata({
  title: "Stories",
  description: "Browse the latest stories from Chinnakutti.",
  path: "/stories"
});

export default async function StoriesPage() {
  const stories = await getPublishedStorySummaries();

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-9 max-w-2xl">
        <p className="inline-flex rounded-full border-2 border-coral/20 bg-coral/10 px-4 py-2 text-sm font-black text-coral">
          📚 Story time
        </p>
        <h1 className="mt-4 font-display text-5xl font-black leading-tight text-[#1a1a1a] dark:text-white">
          Pick a happy story
        </h1>
        <p className="mt-4 text-lg leading-8 text-[#777] dark:text-white/65">
          Friendly Telugu and English stories for kids aged 2-10, made for bedtime, playtime, and family reading.
        </p>
      </div>
      <StoryGrid stories={stories} />
    </section>
  );
}
