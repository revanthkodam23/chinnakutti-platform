import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeScript } from "@/components/theme/theme-script";
import { siteConfig } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  ...createMetadata(),
  metadataBase: new URL(siteConfig.url)
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#f8faf7] font-sans antialiased dark:bg-ink-950">
        <ThemeScript />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
