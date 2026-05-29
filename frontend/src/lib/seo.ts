import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants";
import { absoluteUrl } from "@/lib/utils";

type SeoInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
};

export function createMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image
}: SeoInput = {}): Metadata {
  const resolvedTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const url = absoluteUrl(path);
  const images = image ? [{ url: image, width: 1200, height: 630 }] : undefined;

  return {
    title: resolvedTitle,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: resolvedTitle,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      images
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: image ? [image] : undefined
    }
  };
}
