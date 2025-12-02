"use server"
import OpenAI from "openai"

const openai = new OpenAI();

export async function getEmbedding(text: string) {
    const { data } = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: text,
        encoding_format: "float"
    });

    // console.log(data[0].embedding)
    return data[0].embedding;
}



// import { InferenceClient } from "@huggingface/inference"

// const hf = new InferenceClient(process.env.NEXT_PUBLIC_HF_API_KEY!);



// MiniLM model, HF Inference
// const output = await hf.featureExtraction({
//     model: "sentence-transformers/all-MiniLM-L6-v2",
//     inputs: text,
//     provider: "hf-inference",
// });

// console.log("Raw output:", output); // Check what the raw output looks like

// Flatten it if necessary
// const embedding =
//     Array.isArray(output) && Array.isArray(output[0]) ? output[0] : output;

// console.log("Cleaned embedding:", embedding); // see cleaned embedding

// console.log("Embedding dimensions:", embedding.length); // see vector length

// return embedding;



// backfill tool embeddings for newly added tools

// import { supabase } from "../client";

// export async function backFillToolEmbeddings() {
//     const { data: tools, error } = await supabase
//         .from("tools")
//         .select("id, name, description, tags")
//         .is("embedding_openai", null);

//     if (error) {
//         console.error("Error fetching tools for embedding backfill:", error);
//         return;
//     }

//     console.log(`Found ${tools?.length} tools to embed...`);

//     for (const tool of tools) {
//         const combinedText = `${tool.name}. ${tool.description}. ${tool.tags.join(", ")}`;
//         const embedding = await getEmbedding(combinedText);

//         const { error: updateError } = await supabase
//             .from("tools")
//             .update({ embedding_openai: embedding })
//             .eq("id", tool.id);
//         if (updateError) {
//             console.error(`Error updating tool ID ${tool.name}:`, updateError.message);
//         } else {
//             console.log(`✅ Embedded ${tool.name}`);
//         }
//     }
// }


// A better approach to what's above:

// export async function backFillToolEmbeddings() {
//     const { data: tools, error } = await supabase
//         .from("tools")
//         .select("id, name, description, tags")
//         .is("embedding_openai", null);

//     if (error) {
//         console.error("Error fetching tools:", error);
//         return;
//     }

//     console.log(`Found ${tools.length} tools to embed...`);

//     // 1. Prepare text list
//     const inputs = tools.map((tool) =>
//         `${tool.name}. ${tool.description}. ${tool.tags.join(", ")}`
//     );

//     // 2. Single batch embedding call
//     const batch = await openai.embeddings.create({
//         model: "text-embedding-3-small",
//         input: inputs,
//     });

//     // 3. Store each embedding
//     for (let i = 0; i < tools.length; i++) {
//         const embedding = batch.data[i].embedding;
//         const tool = tools[i];

//         const { error } = await supabase
//             .from("tools")
//             .update({ embedding_openai: embedding })
//             .eq("id", tool.id);

//         if (error) {
//             console.error(`Error updating ${tool.name}:`, error);
//         } else {
//             console.log(`✅ Embedded ${tool.name}`);
//         }
//     }
// }
