"use server"

import { InferenceClient } from "@huggingface/inference"

const hf = new InferenceClient(process.env.NEXT_PUBLIC_HF_API_KEY!);

export async function getEmbedding(text: string) {
    const output = await hf.featureExtraction({
        model: "sentence-transformers/all-MiniLM-L6-v2",
        inputs: text,
        provider: "hf-inference",
    });

    // console.log("Raw output:", output); // Check what the raw output looks like

    // Flatten it if necessary
    const embedding =
        Array.isArray(output) && Array.isArray(output[0]) ? output[0] : output;

    // console.log("Cleaned embedding:", embedding); // see cleaned embedding
    
    // console.log("Embedding dimensions:", embedding.length); // see vector length

    return embedding;
}









// backfill tool embeddings for newly added tools
// export async function backFillToolEmbeddings() {
//     const { data:tools, error } = await supabase
//     .from("tools")
//     .select("id, name, description, tags")
//     .is("embedding_minilm", null);

//     if (error) {
//         console.error("Error fetching tools for embedding backfill:", error);
//         return;
//     }

//     console.log(`Found ${tools?.length} tools to embed...`);

//     for (const tool of tools){
//         const combinedText = `${tool.name}. ${tool.description}. Tags: ${tool.tags.join(", ")}`;
//         const embedding = await getEmbedding(combinedText);
        
//         const { error: updateError } = await supabase
//             .from("tools")
//             .update({ embedding_minilm: embedding })
//             .eq("id", tool.id);
//         if (updateError) {
//             console.error(`Error updating tool ID ${tool.name}:`, updateError.message);
//         } else {
//             console.log(`✅ Embedded ${tool.name}`);
//         }
//     }
// }