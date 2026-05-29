import type { Json } from "@/lib/supabase/database.types";
import type { StoryBlockType, StoryStatus } from "@/types/admin";
import {
  createStory,
  createStoryBlock,
  deleteStoryBlock,
  getStoryBlocks,
  getStoryForEdit,
  localizedJson,
  listStories,
  updateStory,
  updateStoryBlock,
  uploadStoryAsset,
  type StoryListFilters
} from "@/repositories/story.repository";
import { listAgeGroups } from "@/repositories/age-group.repository";
import { listCategories } from "@/repositories/category.repository";
import { listLanguages } from "@/repositories/language.repository";

export async function getStoryStudioLookups() {
  const [categories, ageGroups, languages] = await Promise.all([
    listCategories(),
    listAgeGroups(),
    listLanguages()
  ]);

  return { categories, ageGroups, languages };
}

export async function getStoryStudioStories(filters: StoryListFilters = {}) {
  return listStories(filters);
}

export async function getStoryEditorData(storyId: string) {
  const [lookups, story, blocks] = await Promise.all([
    getStoryStudioLookups(),
    getStoryForEdit(storyId),
    getStoryBlocks(storyId)
  ]);

  return { lookups, story, blocks };
}

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function nullableText(formData: FormData, key: string) {
  const value = text(formData, key);
  return value.length > 0 ? value : null;
}

function numberValue(formData: FormData, key: string, fallback: number) {
  const value = Number(formData.get(key));
  return Number.isFinite(value) ? value : fallback;
}

function storyStatus(formData: FormData): StoryStatus {
  const value = text(formData, "status");
  return value === "published" || value === "scheduled" || value === "archived" ? value : "draft";
}

export async function createStoryFromForm(formData: FormData) {
  const status = storyStatus(formData);
  const coverFile = formData.get("cover_image") as File | null;
  const coverImageUrl = coverFile ? await uploadStoryAsset(coverFile, "covers") : null;
  const titleEn = text(formData, "title_en");
  const titleTe = text(formData, "title_te");
  const excerptEn = text(formData, "excerpt_en");
  const excerptTe = text(formData, "excerpt_te");

  return createStory({
    slug: text(formData, "slug"),
    title: localizedJson(titleEn, titleTe),
    excerpt: localizedJson(excerptEn, excerptTe),
    category_id: text(formData, "category_id"),
    age_group_id: nullableText(formData, "age_group_id"),
    cover_image_url: coverImageUrl,
    cover_image_alt: localizedJson(titleEn, titleTe),
    is_featured: formData.get("is_featured") === "on",
    difficulty_level: numberValue(formData, "difficulty_level", 1),
    status,
    published_at: status === "published" ? new Date().toISOString() : null,
    seo_metadata: {
      title: titleEn,
      description: excerptEn
    },
    reading_time_minutes: numberValue(formData, "reading_time_minutes", 4)
  });
}

export async function updateStoryFromForm(id: string, formData: FormData) {
  const status = storyStatus(formData);
  const coverFile = formData.get("cover_image") as File | null;
  const coverImageUrl = coverFile ? await uploadStoryAsset(coverFile, "covers") : null;
  const titleEn = text(formData, "title_en");
  const titleTe = text(formData, "title_te");
  const excerptEn = text(formData, "excerpt_en");
  const excerptTe = text(formData, "excerpt_te");

  await updateStory(id, {
    slug: text(formData, "slug"),
    title: localizedJson(titleEn, titleTe),
    excerpt: localizedJson(excerptEn, excerptTe),
    category_id: text(formData, "category_id"),
    age_group_id: nullableText(formData, "age_group_id"),
    ...(coverImageUrl ? { cover_image_url: coverImageUrl } : {}),
    cover_image_alt: localizedJson(titleEn, titleTe),
    is_featured: formData.get("is_featured") === "on",
    difficulty_level: numberValue(formData, "difficulty_level", 1),
    status,
    published_at: status === "published" ? (nullableText(formData, "published_at") ?? new Date().toISOString()) : null,
    seo_metadata: {
      title: titleEn,
      description: excerptEn
    },
    reading_time_minutes: numberValue(formData, "reading_time_minutes", 4)
  });
}

export async function createBlockFromForm(storyId: string, formData: FormData) {
  const assetFile = formData.get("asset_file") as File | null;
  const assetUrl = assetFile ? await uploadStoryAsset(assetFile, "blocks") : nullableText(formData, "asset_url");

  await createStoryBlock({
    story_id: storyId,
    language_id: text(formData, "language_id"),
    block_type: text(formData, "block_type") as StoryBlockType,
    sort_order: numberValue(formData, "sort_order", 0),
    content: nullableText(formData, "content"),
    asset_url: assetUrl,
    metadata: blockMetadata(formData)
  });
}

export async function updateBlockFromForm(blockId: string, formData: FormData) {
  const assetFile = formData.get("asset_file") as File | null;
  const assetUrl = assetFile ? await uploadStoryAsset(assetFile, "blocks") : nullableText(formData, "asset_url");

  await updateStoryBlock(blockId, {
    language_id: text(formData, "language_id"),
    block_type: text(formData, "block_type") as StoryBlockType,
    sort_order: numberValue(formData, "sort_order", 0),
    content: nullableText(formData, "content"),
    asset_url: assetUrl,
    metadata: blockMetadata(formData)
  });
}

export async function deleteBlock(blockId: string) {
  await deleteStoryBlock(blockId);
}

function blockMetadata(formData: FormData): Json {
  return {
    alt: text(formData, "alt_text"),
    caption: text(formData, "caption")
  };
}
