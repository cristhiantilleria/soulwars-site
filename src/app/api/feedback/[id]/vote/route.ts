import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sb = getSupabase();

    // Atomic increment via Postgres function (preferred)
    const { data: rpcData, error: rpcError } = await sb.rpc('increment_votes', { item_id: id });
    if (!rpcError) return NextResponse.json({ votes: rpcData });

    // Fallback: select then update
    const { data: item, error: fetchError } = await sb
      .from('feedback')
      .select('votes')
      .eq('id', id)
      .single();

    if (fetchError || !item) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const { data: updated, error: updateError } = await sb
      .from('feedback')
      .update({ votes: item.votes + 1 })
      .eq('id', id)
      .select('votes')
      .single();

    if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });
    return NextResponse.json({ votes: updated.votes });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 503 });
  }
}
