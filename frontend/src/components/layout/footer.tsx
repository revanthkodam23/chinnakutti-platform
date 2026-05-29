import Link from "next/link";
import { siteConfig } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-[#1a1a2e] px-4 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 text-sm sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-2xl">🐘</span>
            <span className="font-display text-lg font-black text-coral">{siteConfig.name}</span>
          </Link>
          <p className="mt-1 text-xs text-slate-400">Making learning fun, one story at a time.</p>
        </div>
        <div className="flex flex-wrap gap-5">
          <Link href="/stories" className="font-bold text-slate-300 hover:text-coral">Stories</Link>
          <Link href="/categories/worksheets" className="font-bold text-slate-300 hover:text-coral">Worksheets</Link>
          <Link href="/parents" className="font-bold text-slate-300 hover:text-coral">Parents</Link>
        </div>
        <p className="text-xs text-slate-500">&copy; {new Date().getFullYear()} {siteConfig.name}</p>
      </div>
    </footer>
  );
}
