import type { ReactNode } from "react";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-black text-[#555]">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

export const inputClass =
  "w-full rounded-2xl border-2 border-coral/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-coral";

export const textareaClass =
  "min-h-28 w-full rounded-2xl border-2 border-coral/15 bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-coral";

export const selectClass =
  "w-full rounded-2xl border-2 border-coral/15 bg-white px-4 py-3 text-sm font-bold outline-none transition focus:border-coral";
