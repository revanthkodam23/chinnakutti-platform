import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Parents",
  description: "Parent-friendly reading guidance from Chinnakutti.Fun.",
  path: "/parents"
});

export default function ParentsPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[32px] bg-gradient-to-br from-[#FFF5F5] via-[#FFFBEB] to-[#F0FDF4] p-8 shadow-soft sm:p-12">
        <p className="inline-flex rounded-full bg-coral/10 px-4 py-2 text-sm font-black text-coral">
          👨‍👩‍👧 Parent corner
        </p>
        <h1 className="mt-5 font-display text-5xl font-black text-[#1a1a1a]">
          Safe stories for little hearts
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-[#666]">
          Chinnakutti.Fun is built for shared family reading: gentle themes, age-friendly language, bilingual learning, and free access for every child.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {[
            ["🧸", "Ages 2-10", "Simple stories for early readers and read-aloud time."],
            ["🌍", "Telugu + English", "Designed to support language, culture, and confidence."],
            ["💯", "Always Free", "Stories, rhymes, and worksheets without paywalls."]
          ].map(([icon, title, text]) => (
            <div key={title} className="rounded-[24px] bg-white p-6 shadow-soft">
              <div className="text-4xl" aria-hidden>{icon}</div>
              <h2 className="mt-3 font-display text-xl font-black text-[#1a1a1a]">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#777]">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
