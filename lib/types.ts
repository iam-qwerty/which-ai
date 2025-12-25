import { Database } from "./supabase/supabase-types";

export type AITool = Database["public"]["Tables"]["tools"]["Row"];
export type NewAITool = Database["public"]["Tables"]["tools"]["Insert"];

export type PricingModel = "free" | "open-source" | "freemium" | "paid";