import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export interface FeedbackItem {
  id: string;
  type: 'suggestion' | 'bug';
  title: string;
  description: string;
  author: string;
  votes: number;
  created_at: string;
  status: 'open' | 'planned' | 'in-progress' | 'done';
}

export async function GET() {
  try {
    const { data, error } = await getSupabase()
      .from('feedback')
      .select('*')
      .order('votes', { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data ?? []);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 503 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, type, author } = body;

    if (!title?.trim() || !type) {
      return NextResponse.json({ error: 'title and type are required' }, { status: 400 });
    }

    const { data, error } = await getSupabase()
      .from('feedback')
      .insert({
        type: type === 'bug' ? 'bug' : 'suggestion',
        title: String(title).slice(0, 120),
        description: String(description ?? '').slice(0, 600),
        author: String(author ?? 'Anonymous').slice(0, 50),
        votes: 0,
        status: 'open',
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 503 });
  }
}
