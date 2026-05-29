import { Save } from "lucide-react";
import { Field, inputClass, selectClass, textareaClass } from "@/components/admin/field";
import { createStoryAction, updateStoryAction } from "@/app/admin/actions";
import { localizedText, storyStatuses, type AdminAgeGroup, type AdminCategory, type StoryWithRelations } from "@/types/admin";

type StoryFormProps = {
  story?: StoryWithRelations;
  categories: AdminCategory[];
  ageGroups: AdminAgeGroup[];
};

export function StoryForm({ story, categories, ageGroups }: StoryFormProps) {
  const action = story ? updateStoryAction.bind(null, story.id) : createStoryAction;
  const status = story?.status ?? "draft";

  return (
    <form action={action} className="rounded-[28px] bg-white p-6 shadow-soft">
      <div className="grid gap-5 lg:grid-cols-2">
        <Field label="Title (English)">
          <input className={inputClass} name="title_en" required defaultValue={story ? localizedText(story.title, "en") : ""} />
        </Field>
        <Field label="Title (Telugu)">
          <input className={inputClass} name="title_te" defaultValue={story ? localizedText(story.title, "te") : ""} />
        </Field>
        <Field label="Slug">
          <input className={inputClass} name="slug" required defaultValue={story?.slug ?? ""} placeholder="kind-elephant-little-mouse" />
        </Field>
        <Field label="Cover Image Upload">
          <input className={inputClass} name="cover_image" type="file" accept="image/*" />
        </Field>
        <Field label="Excerpt (English)">
          <textarea className={textareaClass} name="excerpt_en" defaultValue={story ? localizedText(story.excerpt, "en") : ""} />
        </Field>
        <Field label="Excerpt (Telugu)">
          <textarea className={textareaClass} name="excerpt_te" defaultValue={story ? localizedText(story.excerpt, "te") : ""} />
        </Field>
        <Field label="Category">
          <select className={selectClass} name="category_id" required defaultValue={story?.category_id ?? ""}>
            <option value="" disabled>Choose category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{localizedText(category.name, "en")}</option>
            ))}
          </select>
        </Field>
        <Field label="Age Group">
          <select className={selectClass} name="age_group_id" defaultValue={story?.age_group_id ?? ""}>
            <option value="">No age group</option>
            {ageGroups.map((ageGroup) => (
              <option key={ageGroup.id} value={ageGroup.id}>{ageGroup.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Difficulty Level">
          <select className={selectClass} name="difficulty_level" defaultValue={story?.difficulty_level ?? 1}>
            <option value="1">1 - Beginner</option>
            <option value="2">2 - Easy</option>
            <option value="3">3 - Intermediate</option>
            <option value="4">4 - Advanced</option>
          </select>
        </Field>
        <Field label="Status">
          <select className={selectClass} name="status" defaultValue={status}>
            {storyStatuses.filter((item) => item === "draft" || item === "published").map((item) => (
              <option key={item} value={item}>{item === "draft" ? "Draft" : "Published"}</option>
            ))}
          </select>
        </Field>
        <Field label="Reading Time">
          <input className={inputClass} name="reading_time_minutes" type="number" min="1" defaultValue={story?.reading_time_minutes ?? 4} />
        </Field>
        {story?.published_at ? (
          <input type="hidden" name="published_at" value={story.published_at} />
        ) : null}
        <label className="flex items-center gap-3 rounded-2xl bg-coral/10 px-4 py-3 text-sm font-black text-coral">
          <input name="is_featured" type="checkbox" defaultChecked={story?.is_featured ?? false} className="size-5 accent-coral" />
          Featured story
        </label>
      </div>
      <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-coral to-amber px-6 py-3 font-black text-white shadow-candy">
        <Save size={18} />
        {story ? "Save Story" : "Create Story"}
      </button>
    </form>
  );
}
