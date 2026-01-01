import { prisma } from "@/lib/prisma";
import slugify from "slugify";

export interface CreateBlogData {
  title: string;
  content: string;
  tags?: string[];
  thumbnail?: string;
  slug?: string;
}

export const createBlog = async (data: CreateBlogData) => {
  const { title, content, tags, thumbnail, slug } = data;

  // Use provided slug or generate from title
  let finalSlug = slug;
  if (!finalSlug) {
    finalSlug = slugify(title, { lower: true, strict: true });
  }

  // Ensure slug is unique
  const existing = await prisma.post.findUnique({ where: { slug: finalSlug } });
  if (existing) {
    throw new Error("Slug already exists");
  }

  return await prisma.post.create({
    data: {
      title,
      content,
      slug: finalSlug!,
      tags: tags || [],
      thumbnail,
      published: false, // Default to draft
    },
  });
};

export const updateBlog = async (id: string | number, data: any) => {
  return await prisma.post.update({
    where: { id: typeof id === "string" ? parseInt(id) : id },
    data,
  });
};

export const deleteBlog = async (id: string | number) => {
  return await prisma.post.delete({
    where: { id: typeof id === "string" ? parseInt(id) : id },
  });
};

export const getBlogBySlug = async (slug: string) => {
  return await prisma.post.findUnique({
    where: { slug },
  });
};
export const getBlogById = async (id: string | number) => {
  return await prisma.post.findUnique({
    where: { id: typeof id === "string" ? parseInt(id) : id },
  });
};

export const getAllBlogs = async () => {
  return await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const togglePublishStatus = async (id: string | number) => {
  const blog = await prisma.post.findUnique({
    where: { id: typeof id === "string" ? parseInt(id) : id },
  });
  if (!blog) throw new Error("Blog not found");

  return await prisma.post.update({
    where: { id: typeof id === "string" ? parseInt(id) : id },
    data: { published: !blog.published },
  });
};

export const checkSlugUnique = async (slug: string) => {
  const existing = await prisma.post.findUnique({ where: { slug } });
  return !existing;
};
