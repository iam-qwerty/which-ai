"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

export function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    const onDismiss = React.useCallback(() => {
        router.back()
    }, [router])

    return (
        <Dialog open={true} onOpenChange={(open) => !open && onDismiss()}>
            <DialogContent className="sm:max-w-lg">
                <VisuallyHidden>
                    <DialogTitle>Tool Details</DialogTitle>
                </VisuallyHidden>
                {children}
            </DialogContent>
        </Dialog>
    )
}
