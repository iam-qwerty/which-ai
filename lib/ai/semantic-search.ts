"use server"

import type { NewAITool } from "@/lib/types"
import { getEmbedding } from "@/lib/ai/embedding"
import { supabase } from "@/lib/client"

export async function semanticSearch(query: string) {
        const queryEmbedding = await getEmbedding(query);
        const { data, error } = await supabase.rpc("match_tools", {
            query_embedding: queryEmbedding,
            match_threshold: 0.4,
            match_count: 3,
        });

        if (error) {
            console.error("Error performing semantic search:", error);
            return [];
        }

        console.log("Semantic search results:", data, data.length);
        return data as NewAITool[];
    } 