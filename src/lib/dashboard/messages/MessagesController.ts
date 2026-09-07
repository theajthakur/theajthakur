import { createAdminClient } from "@/lib/server";

export interface MessageData {
  id: string;
  name: string;
  email: string;
  mobile?: string | null;
  message: string;
  created_at: string;
}

export const getAllMessages = async (): Promise<MessageData[]> => {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching messages from Supabase:", error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Exception in getAllMessages:", err);
    return [];
  }
};

export const deleteMessage = async (id: string) => {
  const supabase = createAdminClient();
  const { error } = await supabase.from("messages").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return true;
};
