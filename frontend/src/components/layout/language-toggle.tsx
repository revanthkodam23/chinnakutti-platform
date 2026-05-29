"use client";

import { useState } from "react";

export function LanguageToggle() {
  const [label, setLabel] = useState("తెలుగు");

  return (
    <button
      type="button"
      onClick={() => setLabel((current) => (current === "తెలుగు" ? "English" : "తెలుగు"))}
      className="rounded-full bg-gradient-to-br from-coral to-amber px-5 py-2 text-sm font-black text-white shadow-candy transition hover:-translate-y-0.5"
    >
      {label}
    </button>
  );
}
