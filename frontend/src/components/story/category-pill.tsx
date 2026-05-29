import Link from "next/link";
import type { Category } from "@/lib/types";

export function CategoryPill({ category }: { category: Category }) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="inline-flex w-fit items-center gap-1 rounded-full px-3 py-1 text-xs font-black transition hover:-translate-y-0.5"
      style={{
        backgroundColor: `${category.color}1F`,
        color: category.color
      }}
    >
      <span aria-hidden>{category.icon}</span>
      {category.name}
    </Link>
  );
}
