import { NextResponse } from 'next/server'
import { supabase } from '@/lib/client'

export async function POST(req: Request) {
  try {
    const payload = await req.json()

    // basic validation / normalization
    const insertObj = {
      name: payload.name,
      slug: payload.slug || payload.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: payload.description || '',
      category: payload.category || null,
      tags: payload.tags ?? null,
      pricing: payload.pricing || 'freemium',
      tool_url: payload.tool_url || '',
      rating: typeof payload.rating === 'number' ? payload.rating : payload.rating ? Number(payload.rating) : null,
      upvotes: Number(payload.upvotes) || 0,
      downvotes: Number(payload.downvotes) || 0,
      featured: !!payload.featured,
    }

    const { data, error } = await supabase.from('tools').insert(insertObj)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    return NextResponse.json({ error: String(err.message || err) }, { status: 500 })
  }
}
