import { Search } from "lucide-react";
import { localizedText, storyStatuses, type AdminCategory, type AdminLanguage } from "@/types/admin";
import { inputClass, selectClass } from "@/components/admin/field";

export function StoryFilters({
  categories,
  languages,
  searchParams
}: {
  categories: AdminCategory[];
  languages: AdminLanguage[];
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return (
    <form className="grid gap-3 rounded-[24px] bg-white p-4 shadow-soft md:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-coral" size={18} />
        <input className={`${inputClass} pl-11`} name="search" placeholder="Search stories..." defaultValue={single(searchParams.search)} />
      </div>
      <select className={selectClass} name="status" defaultValue={single(searchParams.status) || "all"}>
        <option value="all">All statuses</option>
        {storyStatuses.map((status) => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>
      <select className={selectClass} name="categoryId" defaultValue={single(searchParams.categoryId)}>
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>{localizedText(category.name, "en")}</option>
        ))}
      </select>
      <select className={selectClass} name="languageId" defaultValue={single(searchParams.languageId)}>
        <option value="">All languages</option>
        {languages.map((language) => (
          <option key={language.id} value={language.id}>{language.native_name}</option>
        ))}
      </select>
      <button className="rounded-full bg-gradient-to-br from-coral to-amber px-5 py-3 font-black text-white shadow-candy">
        Filter
      </button>
    </form>
  );
}

function single(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value ?? "";
}
