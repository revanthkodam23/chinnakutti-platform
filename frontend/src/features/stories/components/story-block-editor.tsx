import { Plus, Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import { createBlockAction, deleteBlockAction, updateBlockAction } from "@/app/admin/actions";
import { Field, inputClass, selectClass, textareaClass } from "@/components/admin/field";
import {
  blockTypeLabel,
  storyBlockTypes,
  type AdminLanguage,
  type AdminStoryBlock
} from "@/types/admin";
import type { Json } from "@/lib/supabase/database.types";

type BlockWithLanguage = AdminStoryBlock & {
  language?: Pick<AdminLanguage, "id" | "code" | "name" | "native_name"> | null;
};

export function StoryBlockEditor({
  storyId,
  blocks,
  languages
}: {
  storyId: string;
  blocks: BlockWithLanguage[];
  languages: AdminLanguage[];
}) {
  return (
    <section className="space-y-5">
      <div className="rounded-[28px] bg-white p-6 shadow-soft">
        <h2 className="font-display text-3xl font-black text-[#1a1a1a]">Add Story Block</h2>
        <BlockForm
          action={createBlockAction.bind(null, storyId)}
          languages={languages}
          defaultSortOrder={blocks.length + 1}
          submitLabel="Add Block"
          submitIcon={<Plus size={18} />}
        />
      </div>

      <div className="space-y-4">
        {blocks.map((block, index) => (
          <article key={block.id} className="rounded-[28px] bg-white p-6 shadow-soft">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-coral">
                  Block {index + 1} · {block.language?.native_name ?? "Language"}
                </p>
                <h3 className="font-display text-2xl font-black text-[#1a1a1a]">
                  {blockTypeLabel(block.block_type)}
                </h3>
              </div>
              <form action={deleteBlockAction.bind(null, storyId, block.id)}>
                <button className="inline-flex items-center gap-2 rounded-full bg-coral/10 px-4 py-2 text-sm font-black text-coral">
                  <Trash2 size={16} />
                  Delete
                </button>
              </form>
            </div>
            <BlockForm
              action={updateBlockAction.bind(null, storyId, block.id)}
              block={block}
              languages={languages}
              submitLabel="Save Block"
            />
          </article>
        ))}
      </div>
    </section>
  );
}

function BlockForm({
  action,
  block,
  languages,
  defaultSortOrder,
  submitLabel,
  submitIcon
}: {
  action: (formData: FormData) => void | Promise<void>;
  block?: AdminStoryBlock;
  languages: AdminLanguage[];
  defaultSortOrder?: number;
  submitLabel: string;
  submitIcon?: ReactNode;
}) {
  const metadata = metadataRecord(block?.metadata);

  return (
    <form action={action} className="mt-5 grid gap-5 lg:grid-cols-2">
      <Field label="Language">
        <select className={selectClass} name="language_id" required defaultValue={block?.language_id ?? languages[0]?.id ?? ""}>
          {languages.map((language) => (
            <option key={language.id} value={language.id}>
              {language.native_name} ({language.code})
            </option>
          ))}
        </select>
      </Field>
      <Field label="Block Type">
        <select className={selectClass} name="block_type" defaultValue={block?.block_type ?? "paragraph"}>
          {storyBlockTypes.map((type) => (
            <option key={type} value={type}>{blockTypeLabel(type)}</option>
          ))}
        </select>
      </Field>
      <Field label="Sort Order">
        <input className={inputClass} name="sort_order" type="number" min="0" defaultValue={block?.sort_order ?? defaultSortOrder ?? 0} />
      </Field>
      <Field label="Asset URL">
        <input className={inputClass} name="asset_url" defaultValue={block?.asset_url ?? ""} placeholder="Optional image/audio URL" />
      </Field>
      <Field label="Upload Image or Audio">
        <input className={inputClass} name="asset_file" type="file" accept="image/*,audio/*" />
      </Field>
      <Field label="Alt Text">
        <input className={inputClass} name="alt_text" defaultValue={stringValue(metadata.alt)} />
      </Field>
      <div className="lg:col-span-2">
        <Field label="Content">
          <textarea className={textareaClass} name="content" defaultValue={block?.content ?? ""} />
        </Field>
      </div>
      <div className="lg:col-span-2">
        <Field label="Caption">
          <input className={inputClass} name="caption" defaultValue={stringValue(metadata.caption)} />
        </Field>
      </div>
      <div className="lg:col-span-2">
        <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-coral to-amber px-6 py-3 font-black text-white shadow-candy">
          {submitIcon}
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

function metadataRecord(value: Json | undefined) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value as Record<string, Json | undefined>;
}

function stringValue(value: Json | undefined) {
  return typeof value === "string" ? value : "";
}
