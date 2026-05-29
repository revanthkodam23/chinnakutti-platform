import Link from "next/link";
import { siteConfig } from "@/lib/constants";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-coral/10 bg-cream/95 px-4 backdrop-blur-xl dark:border-white/10 dark:bg-[#1a1a2e]/95">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-3 no-underline">
          <span className="text-3xl leading-none">🐘</span>
          <span className="leading-none">
            <span className="block font-display text-xl font-black text-coral">Chinnakutti</span>
            <span className="block text-[11px] font-black uppercase tracking-[0.2em] text-amber">.Fun</span>
          </span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-1 text-sm font-extrabold text-[#555] md:flex dark:text-white/75">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-full px-3 py-2 transition hover:bg-coral/10 hover:text-coral dark:hover:bg-white/10 dark:hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageToggle />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
