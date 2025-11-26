'use client'

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function AdminToolForm() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    category: "",
    tags: "",
    pricing: "freemium",
    tool_url: "",
    rating: "",
    upvotes: "0",
    downvotes: "0",
    featured: false,
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  function updateField<K extends keyof typeof form>(key: K, value: string | boolean) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const payload = {
        ...form,
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : null,
        rating: form.rating ? Number(form.rating) : null,
        upvotes: Number(form.upvotes) || 0,
        downvotes: Number(form.downvotes) || 0,
        featured: !!form.featured,
      }

      const res = await fetch("/admin/insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error(await res.text())

      setMessage("Tool inserted successfully")
      setForm({
        name: "",
        slug: "",
        description: "",
        category: "",
        tags: "",
        pricing: "freemium",
        tool_url: "",
        rating: "",
        upvotes: "0",
        downvotes: "0",
        featured: false,
      })
      // navigate to /admin or refresh
      router.refresh()
    } catch (err: any) {
      setMessage(String(err.message || err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input value={form.name} onChange={(e) => updateField("name", e.target.value)} placeholder="Tool name" />
        <Input value={form.slug} onChange={(e) => updateField("slug", e.target.value)} placeholder="slug (seo-friendly)" />
        <Input value={form.category} onChange={(e) => updateField("category", e.target.value)} placeholder="category" />
        <Input value={form.pricing} onChange={(e) => updateField("pricing", e.target.value)} placeholder="pricing (free|open-source|freemium|paid)" />
      </div>

      <div>
        <Input value={form.tool_url} onChange={(e) => updateField("tool_url", e.target.value)} placeholder="https://example.com" />
      </div>

      <div>
        <textarea
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder="Short description"
          className="w-full min-h-[120px] rounded-md border px-3 py-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input value={form.tags} onChange={(e) => updateField("tags", e.target.value)} placeholder="comma separated tags" />
        <Input value={form.rating} onChange={(e) => updateField("rating", e.target.value)} placeholder="rating (0-5)" />
        <Input value={form.upvotes} onChange={(e) => updateField("upvotes", e.target.value)} placeholder="upvotes" />
      </div>

      <div className="flex items-center gap-3">
        <Button variant="default" type="submit" disabled={loading}>{loading ? "Saving…" : "Insert Tool"}</Button>
        <Button variant="outline" type="button" onClick={() => setForm((f) => ({ ...f, featured: !f.featured }))}>
          {form.featured ? "Featured" : "Mark as Featured"}
        </Button>
        <div className="ml-auto text-sm text-muted-foreground">{message}</div>
      </div>
    </form>
  )
}
