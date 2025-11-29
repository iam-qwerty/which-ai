"use server"
import { supabase } from "@/lib/client"

export async function insertToolAction(_prevState: {success: boolean, message: string} | null, formData: FormData) {
    // parse tags
    const rawTags = formData.get("tags") as string | null;
    const tags = rawTags ? rawTags.split(",").map((tag: string) => tag.trim()) : [];

    const { data, error } = await supabase
        .from("tools")
        .insert([
            {
                name: formData.get("name") as string,
                description: formData.get("description") as string,
                tool_url: formData.get("tool_url") as string,
                slug: formData.get("slug") as string,
                category: formData.get("category") as string,
                pricing: formData.get("pricing_model") as string,
                tags: tags,
            },
        ])
    if (error) {
        return {
            success: false,
            message: "Error inserting tool into Supabase",
            error: error.message
        }
    }
    return {
        success: true,
        message: "Tool inserted successfully",
        error: null,
        data: data
    }
}