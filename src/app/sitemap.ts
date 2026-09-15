import { MetadataRoute } from "next";
import { getAllBlogs } from "@/lib/dashboard/blogs/BlogsController";
import { getAllProjects } from "@/lib/dashboard/projects/ProjectsController";

// Always regenerate fresh — never serve a stale cached sitemap
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dev.vijstack.com";

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/p/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/p/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/p/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Dynamic blog post routes fetched live from Supabase
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getAllBlogs();
    blogRoutes = posts.map((post) => ({
      url: `${baseUrl}/blogs/${post.slug}`,
      lastModified: post.updated_at
        ? new Date(post.updated_at)
        : post.created_at
        ? new Date(post.created_at)
        : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (err) {
    console.error("Error generating blog sitemap entries:", err);
  }

  // Dynamic project routes fetched live from Supabase
  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const projects = await getAllProjects();
    projectRoutes = projects
      .filter((p) => p.slug) // only projects with a slug
      .map((project) => ({
        url: `${baseUrl}/p/projects/${project.slug}`,
        lastModified: project.updated_at
          ? new Date(project.updated_at)
          : project.created_at
          ? new Date(project.created_at)
          : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
  } catch (err) {
    console.error("Error generating project sitemap entries:", err);
  }

  return [...staticRoutes, ...blogRoutes, ...projectRoutes];
}
