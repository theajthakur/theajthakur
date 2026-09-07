import { createAdminClient } from "@/lib/server";

export interface ProjectData {
  id?: string;
  name: string;
  category?: string;
  slug: string;
  live_link?: string;
  github?: string;
  link?: string;
  description?: string;
  thumbnail?: string[];
  tags?: string[];
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

export const getAllProjects = async (): Promise<ProjectData[]> => {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching projects from Supabase:", error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Exception in getAllProjects:", err);
    return [];
  }
};

export const getProjectBySlug = async (slug: string): Promise<ProjectData | null> => {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      console.error("Error fetching project by slug:", error);
      return null;
    }

    return data || null;
  } catch (err) {
    console.error("Exception in getProjectBySlug:", err);
    return null;
  }
};

export const getProjectByIdOrSlug = async (idOrSlug: string): Promise<ProjectData | null> => {
  try {
    const supabase = createAdminClient();
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);

    const query = supabase.from("projects").select("*");
    if (isUuid) {
      query.eq("id", idOrSlug);
    } else {
      query.eq("slug", idOrSlug);
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
      console.error("Error fetching project:", error);
      return null;
    }

    return data || null;
  } catch (err) {
    console.error("Exception in getProjectByIdOrSlug:", err);
    return null;
  }
};

export const createProject = async (data: ProjectData) => {
  const supabase = createAdminClient();
  const { name, slug, category, description, live_link, github, link, thumbnail, tags, featured } = data;

  const { data: existing } = await supabase
    .from("projects")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (existing) {
    throw new Error("Slug already exists");
  }

  const { data: newProject, error } = await supabase
    .from("projects")
    .insert([
      {
        name,
        slug,
        category: category || null,
        description: description || null,
        live_link: live_link || null,
        github: github || null,
        link: link || null,
        thumbnail: thumbnail || [],
        tags: tags || [],
        featured: !!featured,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return newProject;
};

export const updateProject = async (idOrSlug: string, data: Partial<ProjectData>) => {
  const supabase = createAdminClient();
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);

  const query = supabase.from("projects").update({
    name: data.name,
    slug: data.slug,
    category: data.category || null,
    description: data.description || null,
    live_link: data.live_link || null,
    github: data.github || null,
    link: data.link || null,
    thumbnail: data.thumbnail || [],
    tags: data.tags || [],
    featured: data.featured,
    updated_at: new Date().toISOString(),
  });

  if (isUuid) {
    query.eq("id", idOrSlug);
  } else {
    query.eq("slug", idOrSlug);
  }

  const { data: updatedProject, error } = await query.select().single();

  if (error) {
    throw new Error(error.message);
  }

  return updatedProject;
};

export const deleteProject = async (idOrSlug: string) => {
  const supabase = createAdminClient();
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);

  const query = supabase.from("projects").delete();
  if (isUuid) {
    query.eq("id", idOrSlug);
  } else {
    query.eq("slug", idOrSlug);
  }

  const { error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return true;
};

export const checkProjectSlugUnique = async (slug: string, excludeId?: string) => {
  try {
    const supabase = createAdminClient();
    let query = supabase.from("projects").select("id").eq("slug", slug);

    if (excludeId) {
      query = query.neq("id", excludeId);
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
      console.error("Error checking project slug uniqueness:", error);
      return true;
    }

    return !data;
  } catch (err) {
    console.error("Exception checking project slug uniqueness:", err);
    return true;
  }
};
