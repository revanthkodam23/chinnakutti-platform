import {
  findPublishedStoryBySlug,
  listPublishedStories,
  type PublishedStoryBlockRow
} from "@/repositories/public-story.repository";
import type { StorySummary } from "@/lib/types";
import type { Json } from "@/lib/supabase/database.types";

export async function getPublishedStorySummaries(): Promise<StorySummary[]> {
  const stories = await listPublishedStories();
  return stories.map(mapStorySummary);
}

export async function getPublishedStoryDetail(slug: string) {
  const story = await findPublishedStoryBySlug(slug);

  if (!story) {
    return null;
  }

  const summary = mapStorySummary(story);
  return {
    ...summary,
    blocksByLanguage: groupBlocksByLanguage(story.blocks)
  };
}

function mapStorySummary(story: Awaited<ReturnType<typeof listPublishedStories>>[number]): StorySummary {
  return {
    slug: story.slug,
    title: localizedValue(story.title),
    excerpt: localizedValue(story.excerpt),
    category: {
      slug: story.category?.slug ?? "stories",
      name: localizedValue(story.category?.name),
      description: localizedValue(story.category?.description),
      icon: story.category?.icon ?? "📖",
      color: story.category?.color ?? "#FF6B6B",
      countLabel: ""
    },
    author: {
      name: story.author_name ?? "Chinnakutti Team",
      role: "Story Maker"
    },
    coverImage: story.cover_image_url ?? "",
    publishedAt: story.published_at ?? "",
    readingTimeMinutes: story.reading_time_minutes,
    ageRange: story.age_group?.label ?? "Ages 2-10",
    emoji: story.category?.icon ?? "📖",
    color: story.category?.color ?? "#FF6B6B",
    featured: story.is_featured,
    tags: story.tags
  };
}

function groupBlocksByLanguage(blocks: PublishedStoryBlockRow[]) {
  const groups = new Map<string, {
    code: string;
    name: string;
    nativeName: string;
    blocks: PublishedStoryBlockRow[];
  }>();

  for (const block of blocks) {
    const code = block.language?.code ?? "unknown";
    const group = groups.get(code) ?? {
      code,
      name: block.language?.name ?? "Story",
      nativeName: block.language?.native_name ?? "Story",
      blocks: []
    };
    group.blocks.push(block);
    groups.set(code, group);
  }

  return [...groups.values()].sort((a, b) => {
    if (a.code === "en") return -1;
    if (b.code === "en") return 1;
    return a.name.localeCompare(b.name);
  });
}

function localizedValue(value: Json | undefined, language = "en") {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return "";
  }

  const localized = value as Record<string, Json | undefined>;
  const text = localized[language] ?? localized.en ?? localized.te;
  return typeof text === "string" ? text : "";
}
