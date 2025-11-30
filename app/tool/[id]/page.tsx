import { fetchToolById } from "@/app/actions";
import { ToolDetails } from "@/components/tool-details";
import { notFound } from "next/navigation";

export default async function Tool({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const tool = await fetchToolById(id)

    if (!tool) {
        notFound()
    }

    return (
        <div className="container mx-auto max-w-2xl py-16 px-4">
            <div className="bg-card border border-border/50 rounded-xl p-8 shadow-2xl backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 texture-overlay opacity-20" />
                <div className="relative z-10">
                    <ToolDetails tool={tool} />
                </div>
            </div>
        </div>
    )
}