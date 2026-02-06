import type { MetadataRoute } from "next";
import { coutPages } from "@/app/lib/cout-content";

const BASE_URL = "https://dreep.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const coutEntries: MetadataRoute.Sitemap = coutPages.map((page) => ({
    url: `${BASE_URL}/cout/${page.problem}/${page.industry}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...coutEntries,
  ];
}
