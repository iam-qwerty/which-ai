"use server"

import type { AITool } from "@/lib/types"
import { getEmbedding } from "@/lib/ai/embedding"
import { supabase } from "@/lib/supabase/client"

export async function semanticSearch(query: string) {
    const queryEmbedding = await getEmbedding(query);
    const { data, error } = await supabase.rpc("semantic_search_openai", {
        query_embedding: queryEmbedding,
        match_threshold: 0.4,
        match_count: 5,
    });

    if (error) {
        console.error("Error performing semantic search:", error);
        return [];
    }

    console.log("Semantic search results:", data, data.length);
    return data as AITool[];
}