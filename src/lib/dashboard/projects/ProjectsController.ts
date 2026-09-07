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
