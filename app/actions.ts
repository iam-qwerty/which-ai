"use server"
import { supabase } from "@/lib/client"

const columnsToBeFetched = "id, name, description, tool_url, pricing, upvotes, downvotes, slug, category, featured"

// fetch tools
export async function fetchTools() {
    const { data, error } = await supabase
        .from("tools")
        .select(columnsToBeFetched)
        .limit(9)

    if (error) {
        console.error("Error fetching tools from Supabase:", error);
    }
    return data;
}

// fetch tool by id
export async function fetchToolById(id: string) {
    const { data, error } = await supabase
        .from("tools")
        .select(columnsToBeFetched)
        .eq("id", id)
        .single();

    if (error) {
        console.error("Error fetching tools from Supabase:", error);
    }
    return data;
}