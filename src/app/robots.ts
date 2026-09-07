import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://theajthakur.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard",
          "/dashboard/*",
          "/api/*",
          "/login",
          "/pending-approval",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
