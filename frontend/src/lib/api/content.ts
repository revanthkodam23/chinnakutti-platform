import { categories as fallbackCategories, stories as fallbackStories } from "@/data/stories";
import type { Category, Story, StorySummary } from "@/lib/types";

const apiBaseUrl = process.env.CONTENT_API_BASE_URL;
const apiToken = process.env.CONTENT_API_TOKEN;

async function requestFromApi<T>(path: string): Promise<T | null> {
  if (!apiBaseUrl) {
    return null;
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    headers: {
      Accept: "application/json",
      ...(apiToken ? { Authorization: `Bearer ${apiToken}` } : {})
    },
    next: {
      revalidate: 300
    }
  });

  if (!response.ok) {
    throw new Error(`Content API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getStories(): Promise<StorySummary[]> {
  const remote = await requestFromApi<StorySummary[]>("/stories");
  return remote ?? fallbackStories.map((story) => ({
    slug: story.slug,
    title: story.title,
    excerpt: story.excerpt,
    category: story.category,
    author: story.author,
    coverImage: story.coverImage,
    publishedAt: story.publishedAt,
    readingTimeMinutes: story.readingTimeMinutes,
    ageRange: story.ageRange,
    emoji: story.emoji,
    color: story.color,
    featured: story.featured,
    tags: story.tags
  }));
}

export async function getStory(slug: string): Promise<Story | null> {
  const remote = await requestFromApi<Story>(`/stories/${slug}`);
  return remote ?? fallbackStories.find((story) => story.slug === slug) ?? null;
}

export async function getFeaturedStory(): Promise<StorySummary | null> {
  const stories = await getStories();
  return stories.find((story) => story.featured) ?? stories[0] ?? null;
}

export async function getCategories(): Promise<Category[]> {
  const remote = await requestFromApi<Category[]>("/categories");
  return remote ?? fallbackCategories;
}

export async function getCategory(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((category) => category.slug === slug) ?? null;
}

export async function getStoriesByCategory(categorySlug: string): Promise<StorySummary[]> {
  const remote = await requestFromApi<StorySummary[]>(`/categories/${categorySlug}/stories`);
  if (remote) {
    return remote;
  }

  const stories = await getStories();
  return stories.filter((story) => story.category.slug === categorySlug);
}
