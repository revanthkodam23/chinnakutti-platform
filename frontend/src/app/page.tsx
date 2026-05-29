import Link from "next/link";
import { FeaturedStory } from "@/components/story/featured-story";
import { StoryGrid } from "@/components/story/story-grid";
import { getCategories, getFeaturedStory, getStories } from "@/lib/api/content";

export default async function HomePage() {
  const [featuredStory, stories, categories] = await Promise.all([
    getFeaturedStory(),
    getStories(),
    getCategories()
  ]);
  const latestStories = stories.slice(0, 3);

  return (
    <>
      {featuredStory ? <FeaturedStory story={featuredStory} /> : null}

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading title="Explore by Category" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="rounded-[24px] bg-white p-6 text-center shadow-soft transition hover:-translate-y-1.5 hover:shadow-candy dark:bg-white/10"
              style={{ borderTop: `4px solid ${category.color}` }}
            >
              <div className="mb-4 text-5xl" aria-hidden>{category.icon}</div>
              <h2 className="font-display text-xl font-black text-[#1a1a1a] dark:text-white">{category.name}</h2>
              <p className="mt-2 text-sm leading-6 text-[#888] dark:text-white/65">{category.description}</p>
              <span
                className="mt-4 inline-flex rounded-full px-3 py-1 text-xs font-black"
                style={{ backgroundColor: `${category.color}1F`, color: category.color }}
              >
                {category.countLabel}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-7 flex items-center justify-between gap-4">
          <SectionHeading title="Latest Stories" compact />
          <Link href="/stories" className="text-sm font-black text-coral hover:text-amber">
            View All →
          </Link>
        </div>
        <StoryGrid stories={latestStories} />
      </section>

      <section className="bg-[#1a1a2e] px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading title="Why Chinnakutti.Fun?" inverted centered />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["🌍", "Bilingual", "Every story can grow with Telugu and English learning."],
              ["💯", "100% Free", "Stories, rhymes, and worksheets stay free for families."],
              ["👨‍👩‍👧", "Parent Approved", "Age-appropriate, safe, and gentle for little readers."],
              ["📱", "Works Everywhere", "Phone, tablet, or laptop - read anywhere, anytime."]
            ].map(([icon, title, text]) => (
              <div key={title} className="rounded-[20px] bg-white/10 p-7">
                <div className="text-5xl" aria-hidden>{icon}</div>
                <h3 className="mt-4 font-display text-xl font-black text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl">
          <div className="text-6xl" aria-hidden>💌</div>
          <h2 className="mt-4 font-display text-4xl font-black text-[#1a1a1a] dark:text-white">
            Join 5,000+ Parents!
          </h2>
          <p className="mt-3 text-[#888] dark:text-white/65">
            Get new stories, worksheets, and rhymes every week - free.
          </p>
          <form className="mt-8 flex rounded-full border-2 border-coral/20 bg-white p-1 pl-5 shadow-[0_8px_30px_rgba(255,107,107,0.12)] dark:bg-white/10">
            <input
              type="email"
              placeholder="Enter your email..."
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#bbb]"
            />
            <button className="rounded-full bg-gradient-to-br from-coral to-amber px-5 py-3 text-sm font-black text-white">
              Subscribe Free
            </button>
          </form>
          <p className="mt-3 text-xs text-[#bbb]">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </>
  );
}

function SectionHeading({
  title,
  compact = false,
  centered = false,
  inverted = false
}: {
  title: string;
  compact?: boolean;
  centered?: boolean;
  inverted?: boolean;
}) {
  return (
    <div className={centered ? "text-center" : ""}>
      <h2 className={`font-display text-4xl font-black ${inverted ? "text-white" : "text-[#1a1a1a] dark:text-white"} ${compact ? "mb-0" : "mb-3"}`}>
        {title}
      </h2>
      {!compact ? (
        <div className={`h-1 w-14 rounded-full bg-gradient-to-br from-coral to-amber ${centered ? "mx-auto" : ""}`} />
      ) : null}
    </div>
  );
}
