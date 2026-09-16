import { createAdminClient } from "@/lib/server";

export type TimelineIcon =
  | "Globe"
  | "Github"
  | "Rocket"
  | "Award"
  | "MapPin"
  | "Calendar"
  | "ShoppingCart"
  | "Server"
  | "Cpu"
  | "Star";

export const TIMELINE_ICONS: TimelineIcon[] = [
  "Globe",
  "Github",
  "Rocket",
  "Award",
  "MapPin",
  "Calendar",
  "ShoppingCart",
  "Server",
  "Cpu",
  "Star",
];

export const DEFAULT_ICON: TimelineIcon = "Globe";

export interface TimelineData {
  id?: string;
  title: string;
  heading: string;
  description?: string;
  icon?: TimelineIcon;
  sort_date: string; // ISO date string YYYY-MM-DD
  created_at?: string;
  updated_at?: string;
}

// ─── READ ────────────────────────────────────────────────────────────────────

export const getAllTimelines = async (): Promise<TimelineData[]> => {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("timelines")
      .select("*")
      .order("sort_date", { ascending: false });

    if (error) {
      console.error("Error fetching timelines from Supabase:", error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Exception in getAllTimelines:", err);
    return [];
  }
};

export const getTimelineById = async (id: string): Promise<TimelineData | null> => {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("timelines")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching timeline by id:", error);
      return null;
    }

    return data || null;
  } catch (err) {
    console.error("Exception in getTimelineById:", err);
    return null;
  }
};

// ─── CREATE ───────────────────────────────────────────────────────────────────

export const createTimeline = async (data: TimelineData) => {
  const supabase = createAdminClient();

  const { data: newEntry, error } = await supabase
    .from("timelines")
    .insert([
      {
        title: data.title,
        heading: data.heading,
        description: data.description || "",
        icon: data.icon || DEFAULT_ICON,
        sort_date: data.sort_date,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return newEntry;
};

// ─── UPDATE ───────────────────────────────────────────────────────────────────

export const updateTimeline = async (id: string, data: Partial<TimelineData>) => {
  const supabase = createAdminClient();

  const { data: updated, error } = await supabase
    .from("timelines")
    .update({
      title: data.title,
      heading: data.heading,
      description: data.description,
      icon: data.icon || DEFAULT_ICON,
      sort_date: data.sort_date,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return updated;
};

// ─── DELETE ───────────────────────────────────────────────────────────────────

export const deleteTimeline = async (id: string) => {
  const supabase = createAdminClient();

  const { error } = await supabase.from("timelines").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return true;
};
