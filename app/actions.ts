"use server"
import { supabase } from "@/lib/client"

// fetch all tools
export async function fetchTools() {
    const { data, error } = await supabase
        .from("tools")
        .select("*");

    if (error) {
        console.error("Error fetching tools from Supabase:", error);
    }
    return data;
}