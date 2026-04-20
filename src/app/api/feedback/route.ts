import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export interface FeedbackItem {
  id: string;
  type: 'suggestion' | 'bug';
  title: string;
  description: string;
  author: string;
  votes: number;
  createdAt: string;
  status: 'open' | 'planned' | 'in-progress' | 'done';
}

export async function GET() {
  try {
    const ids = await kv.lrange<string>('feedback:ids', 0, -1);
    if (!ids.length) return NextResponse.json([]);
    const items = await Promise.all(
      ids.map((id) => kv.get<FeedbackItem>(`feedback:item:${id}`))
    );
    const sorted = (items.filter(Boolean) as FeedbackItem[]).sort(
      (a, b) => b.votes - a.votes
    );
    return NextResponse.json(sorted);
  } catch {
    return NextResponse.json(
      { error: 'KV not configured. Set up Vercel KV in your project dashboard.' },
      { status: 503 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, type, author } = body;

    if (!title?.trim() || !type) {
      return NextResponse.json({ error: 'title and type are required' }, { status: 400 });
    }

    const item: FeedbackItem = {
      id: crypto.randomUUID(),
      type: type === 'bug' ? 'bug' : 'suggestion',
      title: String(title).slice(0, 120),
      description: String(description ?? '').slice(0, 600),
      author: String(author ?? 'Anonymous').slice(0, 50),
      votes: 0,
      createdAt: new Date().toISOString(),
      status: 'open',
    };

    await kv.set(`feedback:item:${item.id}`, item);
    await kv.lpush('feedback:ids', item.id);
    return NextResponse.json(item, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'KV not configured' }, { status: 503 });
  }
}
