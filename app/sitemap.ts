import type { MetadataRoute } from "next";
import { getWorkSlugs } from "@/lib/work";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/work", "/about"].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const work = getWorkSlugs().map((slug) => ({
    url: `${site.url}/work/${slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...routes, ...work];
}
