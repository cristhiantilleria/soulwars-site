import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export interface NewsItem {
  id: string;
  title: string;
  body: string;
  date: string;
}

// Reads from a `news` table in Supabase.
// SQL to create it:
//   create table news (
//     id uuid primary key default gen_random_uuid(),
//     title text not null,
//     body text not null,
//     date timestamptz not null default now()
//   );
export async function POST(req: Request) {
  const auth   = req.headers.get('Authorization');
  const secret = process.env.ADMIN_SECRET;
  if (!secret || auth !== `Bearer ${secret}`)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { title, body, date } = await req.json();
    if (!title?.trim() || !body?.trim())
      return NextResponse.json({ error: 'title and body are required' }, { status: 400 });

    const { data, error } = await getSupabase()
      .from('news')
      .insert({ title: String(title).slice(0, 200), body: String(body).slice(0, 2000), date: date ?? new Date().toISOString() })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await getSupabase()
      .from('news')
      .select('id, title, body, date')
      .order('date', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data ?? [], {
      headers: {
        'Cache-Control': 's-maxage=60, stale-while-revalidate=30',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch {
    return NextResponse.json([], {
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  }
}
