import { getAdminDataSource, STORY_ASSETS_BUCKET } from "@/repositories/supabase-data-source";
import type {
  AdminLanguage,
  AdminStoryBlock,
  StoryStatus,
  StoryWithRelations
} from "@/types/admin";
import type { Database, Json, TablesInsert, TablesUpdate } from "@/lib/supabase/database.types";

type StoryInsert = TablesInsert<"stories">;
type StoryUpdate = TablesUpdate<"stories">;
type StoryBlockInsert = TablesInsert<"story_blocks">;
type StoryBlockUpdate = TablesUpdate<"story_blocks">;

export type StoryListFilters = {
  search?: string;
  status?: StoryStatus | "all";
  categoryId?: string;
  languageId?: string;
};

export async function listStories(filters: StoryListFilters = {}) {
  const supabase = getAdminDataSource();
  let storyIdsForLanguage: string[] | null = null;

  if (filters.languageId) {
    const { data, error } = await supabase
      .from("story_blocks")
      .select("story_id")
      .eq("language_id", filters.languageId);

    if (error) {
      throw error;
    }

    storyIdsForLanguage = [...new Set(data.map((row) => row.story_id))];
  }

  let query = supabase
    .from("stories")
    .select("*, category:categories(id, name, slug, color, icon), age_group:age_groups(id, label, slug)")
    .order("updated_at", { ascending: false });

  if (filters.status && filters.status !== "all") {
    query = query.eq("status", filters.status);
  }

  if (filters.categoryId) {
    query = query.eq("category_id", filters.categoryId);
  }

  if (storyIdsForLanguage) {
    if (storyIdsForLanguage.length === 0) {
      return [];
    }
    query = query.in("id", storyIdsForLanguage);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  const stories = (data ?? []) as StoryWithRelations[];
  const search = filters.search?.trim().toLowerCase();

  if (!search) {
    return stories;
  }

  return stories.filter((story) => {
    const title = story.title as Record<string, string | undefined>;
    const excerpt = story.excerpt as Record<string, string | undefined>;
    return [story.slug, title.en, title.te, excerpt.en, excerpt.te]
      .filter(Boolean)
      .some((value) => value?.toLowerCase().includes(search));
  });
}

export async function getStoryForEdit(id: string) {
  const supabase = getAdminDataSource();
  const { data, error } = await supabase
    .from("stories")
    .select("*, category:categories(id, name, slug, color, icon), age_group:age_groups(id, label, slug)")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data as StoryWithRelations;
}

export async function getStoryBlocks(storyId: string) {
  const supabase = getAdminDataSource();
  const { data, error } = await supabase
    .from("story_blocks")
    .select("*, language:languages(id, code, name, native_name)")
    .eq("story_id", storyId)
    .order("sort_order");

  if (error) {
    throw error;
  }

  return data as (AdminStoryBlock & {
    language?: Pick<AdminLanguage, "id" | "code" | "name" | "native_name"> | null;
  })[];
}

export async function createStory(payload: StoryInsert) {
  const supabase = getAdminDataSource();
  const { data, error } = await supabase.from("stories").insert(payload).select("id").single();

  if (error) {
    throw error;
  }

  return data.id;
}

export async function updateStory(id: string, payload: StoryUpdate) {
  const supabase = getAdminDataSource();
  const { error } = await supabase.from("stories").update(payload).eq("id", id);

  if (error) {
    throw error;
  }
}

export async function createStoryBlock(payload: StoryBlockInsert) {
  const supabase = getAdminDataSource();
  const { error } = await supabase.from("story_blocks").insert(payload);

  if (error) {
    throw error;
  }
}

export async function updateStoryBlock(id: string, payload: StoryBlockUpdate) {
  const supabase = getAdminDataSource();
  const { error } = await supabase.from("story_blocks").update(payload).eq("id", id);

  if (error) {
    throw error;
  }
}

export async function deleteStoryBlock(id: string) {
  const supabase = getAdminDataSource();
  const { error } = await supabase.from("story_blocks").delete().eq("id", id);

  if (error) {
    throw error;
  }
}

export async function uploadStoryAsset(file: File, folder: "covers" | "blocks") {
  if (file.size === 0) {
    return null;
  }

  const supabase = getAdminDataSource();
  const extension = file.name.split(".").pop() ?? "bin";
  const path = `${folder}/${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage
    .from(STORY_ASSETS_BUCKET)
    .upload(path, file, {
      contentType: file.type || "application/octet-stream",
      upsert: false
    });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage.from(STORY_ASSETS_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export function localizedJson(en: string, te?: string): Json {
  return {
    en: en.trim(),
    te: te?.trim() ?? ""
  };
}

export type StoryPayload = Database["public"]["Tables"]["stories"]["Insert"];
