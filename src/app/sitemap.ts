import type { MetadataRoute } from "next";
import { SITE_URL, HEFAMAA_PATH } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/privacy/`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}${HEFAMAA_PATH}`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
