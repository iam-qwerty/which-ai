import { Modal } from "@/components/modal"
import { fetchToolById } from "@/app/actions"
import { ToolDetails } from "@/components/tool-details";
import { notFound } from "next/navigation";

export default async function ToolModal({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const tool = await fetchToolById(id)

    if (!tool) {
        notFound()
    }

    return (
        <Modal>
            <ToolDetails tool={tool} />
        </Modal>
    )
}
