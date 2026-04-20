import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';
import type { FeedbackItem } from '../../route';

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const item = await kv.get<FeedbackItem>(`feedback:item:${id}`);
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    item.votes += 1;
    await kv.set(`feedback:item:${id}`, item);
    return NextResponse.json({ votes: item.votes });
  } catch {
    return NextResponse.json({ error: 'KV not configured' }, { status: 503 });
  }
}
