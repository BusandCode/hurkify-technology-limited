import type { Metadata } from "next";
import { SITE_URL } from "./site";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Hurkify Technology Limited",
      type: "website",
      locale: "en_NG",
      images: [
        {
          url: `${SITE_URL}/hurkify-icon.png`,
          width: 1254,
          height: 1254,
          alt: "Hurkify Technology Limited",
        },
      ],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [`${SITE_URL}/hurkify-icon.png`],
    },
  };
}
