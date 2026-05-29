import type { Route } from "next";

type NavItem = {
  href: Route;
  label: string;
};

export const siteConfig = {
  name: "Chinnakutti.Fun",
  description:
    "Telugu and English stories, rhymes, and activities for kids aged 2-10.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  nav: [
    { href: "/", label: "Home" },
    { href: "/stories", label: "Stories" },
    { href: "/categories/rhymes", label: "Rhymes" },
    { href: "/categories/worksheets", label: "Worksheets" },
    { href: "/parents", label: "Parents" }
  ] satisfies NavItem[]
};
