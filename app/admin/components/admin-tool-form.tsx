"use client"
import React from "react"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { insertToolAction } from "../actions"
import { useActionState } from "react"
import { toast } from "sonner"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function AdminToolForm() {
  const [state, formAction, isPending] = useActionState(insertToolAction, null)

  return (
    <form action={formAction} className="space-y-6">
      {/* name, slug, category, pricing model */}
      <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input type="text" name="name" placeholder="Tool name" required />
        <Input type="text" name="slug" placeholder="slug (seo-friendly)" required />
        <Input type="text" name="category" placeholder="category" required />
        <Select name="pricing_model">
          <SelectTrigger>
            <SelectValue placeholder="Select pricing model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="freemium">Freemium</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
          </SelectContent>
        </Select>
      </FieldGroup>
      {/* tool url */}
      <Field>
        <Input name="tool_url" placeholder="https://example.com" required />
      </Field>
      {/* description */}
      <Field>
        <Textarea name="description" placeholder="Tool description" required className="min-h-[120px]" />
      </Field>
      {/* tags */}
      <Field>
        <Input name="tags" placeholder="comma separated tags" />
      </Field>
      <Button type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Insert Tool"}
      </Button>
      {state?.success && toast("Submitted successfully")}
      {state?.error && toast("Error submitting tool")}
    </form>
  )
}
