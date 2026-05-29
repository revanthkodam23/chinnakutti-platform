import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import type { StorySummary } from "@/lib/types";

export function FeaturedStory({ story }: { story: StorySummary }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF5F5] via-[#FFFBEB] to-[#F0FDF4] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="absolute -right-16 -top-20 size-80 rounded-full bg-coral/10" />
      <div className="absolute -bottom-20 -left-16 size-64 rounded-full bg-amber/10" />
      <div className="absolute left-1/3 top-14 size-40 rounded-full bg-mint/10" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="mb-5 inline-flex rounded-full border-2 border-coral/25 bg-gradient-to-br from-coral/10 to-amber/10 px-4 py-2 text-sm font-extrabold text-coral">
            ✨ Telugu + English · Ages 2-10
          </div>
          <h1 className="font-display text-5xl font-black leading-[1.05] text-[#1a1a1a] sm:text-6xl dark:text-white">
            Stories & Fun
            <span className="ck-gradient-text block">for Little Ones!</span>
          </h1>
          <p className="mt-5 max-w-md text-lg leading-8 text-[#666] dark:text-white/70">
            Telugu and English stories, rhymes, and activities for kids aged 2-10. 100% free, always.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={`/stories/${story.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-coral to-amber px-8 py-4 text-base font-black text-white shadow-candy transition hover:-translate-y-1"
            >
              Start Reading
              <ArrowRight aria-hidden size={18} />
            </Link>
            <Link
              href="/categories/worksheets"
              className="rounded-full border-2 border-coral/25 bg-white px-7 py-4 text-sm font-extrabold text-coral transition hover:border-coral hover:bg-coral/5 dark:bg-white/10"
            >
              Browse Worksheets
            </Link>
          </div>
          <div className="mt-9 flex gap-8">
            {[
              ["5K+", "Families"],
              ["80+", "Stories"],
              ["100%", "Free"]
            ].map(([value, label]) => (
              <div key={label}>
                <div className="font-display text-3xl font-black leading-none text-coral">{value}</div>
                <div className="mt-1 text-xs font-extrabold text-[#999]">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <div className="ck-float relative flex size-72 items-center justify-center rounded-full border-[3px] border-dashed border-coral/25 bg-gradient-to-br from-[#FFF5F5] to-[#FFFBEB] text-9xl shadow-[0_20px_60px_rgba(255,107,107,0.14)] sm:size-80">
            <span aria-hidden>🐘</span>
            <FloatingDot className="left-3 top-3 bg-coral shadow-[0_4px_14px_rgba(255,107,107,0.5)]">📖</FloatingDot>
            <FloatingDot className="right-3 top-3 bg-amber shadow-[0_4px_14px_rgba(245,158,11,0.5)]">⭐</FloatingDot>
            <FloatingDot className="bottom-5 left-5 bg-mint shadow-[0_4px_14px_rgba(16,185,129,0.5)]">🎵</FloatingDot>
            <FloatingDot className="bottom-4 right-4 bg-berry shadow-[0_4px_14px_rgba(99,102,241,0.5)]">🐭</FloatingDot>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-12 max-w-6xl rounded-full bg-gradient-to-br from-coral to-amber px-5 py-3 text-center text-sm font-extrabold text-white shadow-candy">
        🌟 Featured This Week: <Link href={`/stories/${story.slug}`} className="underline">The Kind Elephant & The Little Mouse - Read Now →</Link>
      </div>
    </section>
  );
}

function FloatingDot({ children, className }: { children: ReactNode; className: string }) {
  return (
    <span className={`absolute flex size-14 items-center justify-center rounded-full text-2xl ${className}`}>
      {children}
    </span>
  );
}
