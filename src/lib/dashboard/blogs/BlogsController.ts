import { createClient } from "@/lib/server";
import slugify from "slugify";

export interface PostData {
  title: string;
  slug?: string;
  description: string;
  content: string;
  keywords?: string;
}

export const createBlog = async (data: PostData) => {
  const supabase = await createClient();
  const { title, content, description, keywords, slug } = data;

  let finalSlug = slug;
  if (!finalSlug) {
    finalSlug = slugify(title, { lower: true, strict: true });
  }

  // Check slug uniqueness
  const { data: existing } = await supabase
    .from("posts")
    .select("id")
    .eq("slug", finalSlug)
    .maybeSingle();

  if (existing) {
    throw new Error("Slug already exists");
  }

  const { data: newPost, error } = await supabase
    .from("posts")
    .insert([
      {
        title,
        slug: finalSlug,
        description: description || title,
        content,
        keywords: keywords || null,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return newPost;
};

export const updateBlog = async (id: string | number, data: Partial<PostData>) => {
  const supabase = await createClient();
  const numericId = typeof id === "string" ? parseInt(id, 10) : id;

  const { data: updatedPost, error } = await supabase
    .from("posts")
    .update({
      title: data.title,
      slug: data.slug,
      description: data.description,
      content: data.content,
      keywords: data.keywords || null,
    })
    .eq("id", numericId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return updatedPost;
};

export const deleteBlog = async (id: string | number) => {
  const supabase = await createClient();
  const numericId = typeof id === "string" ? parseInt(id, 10) : id;

  const { error } = await supabase.from("posts").delete().eq("id", numericId);

  if (error) {
    throw new Error(error.message);
  }

  return true;
};

export const getBlogByIdOrSlug = async (idOrSlug: string) => {
  const supabase = await createClient();
  const isNumeric = /^\d+$/.test(idOrSlug);

  const query = supabase.from("posts").select("*");
  if (isNumeric) {
    query.eq("id", parseInt(idOrSlug, 10));
  } else {
    query.eq("slug", idOrSlug);
  }

  const { data, error } = await query.maybeSingle();

  if (error) {
    console.error("Error fetching post:", error);
    return null;
  }

  return data;
};

export const getAllBlogs = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }

  return data || [];
};

export const checkSlugUnique = async (slug: string) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      console.error("Supabase error checking slug uniqueness:", error);
      return true;
    }

    return !data;
  } catch (err) {
    console.error("Exception checking slug uniqueness:", err);
    return true;
  }
};
