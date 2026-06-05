import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Enums, Json, Tables } from "@/lib/supabase/database.types";

type StoryRow = Tables<"stories">;

export type PublishedStoryRow = Pick<
  StoryRow,
  | "slug"
  | "title"
  | "excerpt"
  | "cover_image_url"
  | "published_at"
  | "reading_time_minutes"
  | "author_name"
  | "is_featured"
  | "tags"
> & {
  category: {
    slug: string;
    name: Json;
    description: Json;
    icon: string | null;
    color: string;
  } | null;
  age_group: {
    label: string;
  } | null;
};

export type PublishedStoryBlockRow = {
  id: string;
  block_type: Enums<"story_block_type">;
  sort_order: number;
  content: string | null;
  asset_url: string | null;
  metadata: Json;
  language: {
    code: string;
    name: string;
    native_name: string;
  } | null;
};

export type PublishedStoryDetailRow = PublishedStoryRow & {
  blocks: PublishedStoryBlockRow[];
};

export async function listPublishedStories(): Promise<PublishedStoryRow[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("stories")
    .select(`
      slug,
      title,
      excerpt,
      cover_image_url,
      published_at,
      reading_time_minutes,
      author_name,
      is_featured,
      tags,
      category:categories!stories_category_id_fkey (
        slug,
        name,
        description,
        icon,
        color
      ),
      age_group:age_groups!stories_age_group_id_fkey (
        label
      )
    `)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as PublishedStoryRow[];
}

export async function findPublishedStoryBySlug(slug: string): Promise<PublishedStoryDetailRow | null> {
  const supabase = await createSupabaseServerClient();
  const { data: story, error: storyError } = await supabase
    .from("stories")
    .select(`
      id,
      slug,
      title,
      excerpt,
      cover_image_url,
      published_at,
      reading_time_minutes,
      author_name,
      is_featured,
      tags,
      category:categories!stories_category_id_fkey (
        slug,
        name,
        description,
        icon,
        color
      ),
      age_group:age_groups!stories_age_group_id_fkey (
        label
      )
    `)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (storyError) {
    throw storyError;
  }

  if (!story) {
    return null;
  }

  const { data: blocks, error: blocksError } = await supabase
    .from("story_blocks")
    .select(`
      id,
      block_type,
      sort_order,
      content,
      asset_url,
      metadata,
      language:languages!story_blocks_language_id_fkey (
        code,
        name,
        native_name
      )
    `)
    .eq("story_id", story.id)
    .order("sort_order", { ascending: true });

  if (blocksError) {
    throw blocksError;
  }

  const storyWithBlocks = {
    ...story,
    blocks: (blocks ?? []) as PublishedStoryBlockRow[]
  };

  return storyWithBlocks as PublishedStoryDetailRow;
}
