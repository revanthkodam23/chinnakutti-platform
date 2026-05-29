"use client";

import { useState } from "react";
import { LogIn } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function LoginForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    let supabase;

    try {
      supabase = createSupabaseBrowserClient();
    } catch {
      setMessage("Supabase environment variables are not configured yet.");
      setIsLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setMessage(error.message);
      setIsLoading(false);
      return;
    }

    window.location.href = "/admin";
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto mt-8 max-w-md rounded-[28px] bg-white p-6 shadow-soft">
      <label className="block text-sm font-black text-[#555]" htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        required
        className="mt-2 w-full rounded-2xl border-2 border-coral/15 px-4 py-3 outline-none focus:border-coral"
      />
      <label className="mt-5 block text-sm font-black text-[#555]" htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        required
        className="mt-2 w-full rounded-2xl border-2 border-coral/15 px-4 py-3 outline-none focus:border-coral"
      />
      {message ? <p className="mt-4 rounded-2xl bg-coral/10 px-4 py-3 text-sm font-bold text-coral">{message}</p> : null}
      <button
        type="submit"
        disabled={isLoading}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-coral to-amber px-6 py-3 font-black text-white shadow-candy disabled:opacity-60"
      >
        <LogIn size={18} />
        {isLoading ? "Signing in..." : "Enter Story Studio"}
      </button>
    </form>
  );
}
