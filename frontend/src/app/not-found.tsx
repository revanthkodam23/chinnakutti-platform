import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl" aria-hidden>🔎</p>
      <p className="mt-4 text-sm font-black uppercase tracking-wide text-coral">404</p>
      <h1 className="mt-3 font-display text-5xl font-black text-[#1a1a1a] dark:text-white">Story not found</h1>
      <p className="mt-4 text-[#777] dark:text-white/65">
        This little page may have wandered away.
      </p>
      <Link
        href="/stories"
        className="mt-7 rounded-full bg-gradient-to-br from-coral to-amber px-6 py-3 text-sm font-black text-white shadow-candy"
      >
        Browse stories
      </Link>
    </div>
  );
}
