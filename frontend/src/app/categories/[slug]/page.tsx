import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { StoryGrid } from "@/components/story/story-grid";
import { getCategories, getCategory, getStoriesByCategory } from "@/lib/api/content";
import { createMetadata } from "@/lib/seo";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    return createMetadata({ title: "Category not found" });
  }

  return createMetadata({
    title: category.name,
    description: category.description,
    path: `/categories/${category.slug}`
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [category, stories] = await Promise.all([getCategory(slug), getStoriesByCategory(slug)]);

  if (!category) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-2xl">
        <p
          className="inline-flex rounded-full px-4 py-2 text-sm font-black"
          style={{ backgroundColor: `${category.color}1F`, color: category.color }}
        >
          <span className="mr-2" aria-hidden>{category.icon}</span>
          Category
        </p>
        <h1 className="mt-4 font-display text-5xl font-black text-[#1a1a1a] dark:text-white">{category.name}</h1>
        <p className="mt-4 text-lg leading-8 text-[#777] dark:text-white/65">{category.description}</p>
      </div>
      <StoryGrid stories={stories} />
    </section>
  );
}
