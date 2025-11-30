import { Skeleton } from "@/components/ui/skeleton"
import { Modal } from "@/components/modal"

export default function Loading() {
    return (
        <Modal>
            <div className="space-y-6">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-10 w-2/3" />
                        <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>

                <div className="flex items-center gap-6">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                </div>

                <div className="pt-4">
                    <Skeleton className="h-12 w-full rounded-md" />
                </div>
            </div>
        </Modal>
    )
}
