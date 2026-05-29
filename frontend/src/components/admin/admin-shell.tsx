import Link from "next/link";
import { BookOpen, LayoutDashboard, PlusCircle } from "lucide-react";
import type { ReactNode } from "react";

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-coral/10 bg-cream/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/admin" className="inline-flex items-center gap-3">
            <span className="text-3xl">🐘</span>
            <span>
              <span className="block font-display text-xl font-black text-coral">Story Studio</span>
              <span className="block text-[11px] font-black uppercase tracking-[0.18em] text-amber">Chinnakutti.Fun</span>
            </span>
          </Link>
          <nav className="flex items-center gap-2 text-sm font-black">
            <AdminNavLink href="/admin" icon={<LayoutDashboard size={16} />}>Home</AdminNavLink>
            <AdminNavLink href="/admin/stories" icon={<BookOpen size={16} />}>Stories</AdminNavLink>
            <AdminNavLink href="/admin/stories/new" icon={<PlusCircle size={16} />}>New</AdminNavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}

function AdminNavLink({ href, icon, children }: { href: string; icon: ReactNode; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[#555] shadow-sm transition hover:-translate-y-0.5 hover:text-coral"
    >
      {icon}
      <span className="hidden sm:inline">{children}</span>
    </Link>
  );
}
