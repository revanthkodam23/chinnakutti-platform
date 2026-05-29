import type { Enums, Json, Tables } from "@/lib/supabase/database.types";

export type AdminCategory = Tables<"categories">;
export type AdminAgeGroup = Tables<"age_groups">;
export type AdminLanguage = Tables<"languages">;
export type AdminStory = Tables<"stories">;
export type AdminStoryBlock = Tables<"story_blocks">;
export type StoryStatus = Enums<"story_status">;
export type StoryBlockType = Enums<"story_block_type">;

export type LocalizedText = {
  en?: string;
  te?: string;
};

export type StoryWithRelations = AdminStory & {
  category?: Pick<AdminCategory, "id" | "name" | "slug" | "color" | "icon"> | null;
  age_group?: Pick<AdminAgeGroup, "id" | "label" | "slug"> | null;
};

export const storyStatuses: StoryStatus[] = ["draft", "scheduled", "published", "archived"];

export const storyBlockTypes: StoryBlockType[] = [
  "heading",
  "paragraph",
  "image",
  "audio",
  "activity_prompt",
  "moral"
];

export function localizedText(value: Json, language: "en" | "te" = "en") {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return "";
  }

  const record = value as Record<string, Json | undefined>;
  const text = record[language] ?? record.en ?? record.te;
  return typeof text === "string" ? text : "";
}

export function blockTypeLabel(type: StoryBlockType) {
  return type
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function statusLabel(status: StoryStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}
