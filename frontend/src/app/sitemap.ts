import type { MetadataRoute } from "next";
import { getCategories, getStories } from "@/lib/api/content";
import { siteConfig } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [stories, categories] = await Promise.all([getStories(), getCategories()]);
  const now = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1
    },
    {
      url: `${siteConfig.url}/stories`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9
    },
    ...stories.map((story) => ({
      url: `${siteConfig.url}/stories/${story.slug}`,
      lastModified: new Date(story.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8
    })),
    ...categories.map((category) => ({
      url: `${siteConfig.url}/categories/${category.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7
    }))
  ];
}
