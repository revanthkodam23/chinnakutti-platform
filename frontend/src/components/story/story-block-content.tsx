import type { PublishedStoryBlockRow } from "@/repositories/public-story.repository";
import type { Json } from "@/lib/supabase/database.types";

export function StoryBlockContent({ block }: { block: PublishedStoryBlockRow }) {
  const metadata = metadataRecord(block.metadata);

  switch (block.block_type) {
    case "heading":
      return <h2 className="font-display text-3xl font-black text-[#1a1a1a] dark:text-white">{block.content}</h2>;
    case "image":
      return block.asset_url ? (
        <figure>
          {/* Supabase Storage project hostnames vary by deployment. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.asset_url}
            alt={stringValue(metadata.alt) || ""}
            className="w-full rounded-[24px] object-cover shadow-soft"
          />
          {stringValue(metadata.caption) ? (
            <figcaption className="mt-2 text-center text-sm text-[#888]">{stringValue(metadata.caption)}</figcaption>
          ) : null}
        </figure>
      ) : null;
    case "audio":
      return block.asset_url ? (
        <div className="rounded-[24px] bg-amber/10 p-5">
          <p className="mb-3 font-display text-xl font-black text-[#1a1a1a] dark:text-white">
            {block.content || "Listen to the story"}
          </p>
          <audio controls className="w-full" src={block.asset_url}>
            Your browser does not support audio playback.
          </audio>
        </div>
      ) : null;
    case "activity_prompt":
      return (
        <div className="rounded-[24px] border-2 border-dashed border-berry/30 bg-berry/10 p-5">
          <p className="font-display text-xl font-black text-berry">Try this</p>
          <p className="mt-2 text-lg leading-8 text-[#555] dark:text-white/75">{block.content}</p>
        </div>
      );
    case "moral":
      return (
        <div className="rounded-[24px] bg-gradient-to-br from-coral/10 to-amber/10 p-5 text-center">
          <p className="font-display text-xl font-black text-coral">Story Moral</p>
          <p className="mt-2 text-lg font-bold leading-8 text-[#555] dark:text-white/75">{block.content}</p>
        </div>
      );
    case "paragraph":
    default:
      return <p className="text-lg leading-9 text-[#555] dark:text-white/75">{block.content}</p>;
  }
}

function metadataRecord(value: Json) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value as Record<string, Json | undefined>;
}

function stringValue(value: Json | undefined) {
  return typeof value === "string" ? value : "";
}
