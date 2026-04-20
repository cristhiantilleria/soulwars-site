import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { direction = 'up' } = await req.json().catch(() => ({}));
    const delta = direction === 'down' ? -1 : 1;
    const sb = getSupabase();

    // Try atomic RPC first
    const { data: rpcData, error: rpcError } = await sb.rpc('vote_feedback', {
      item_id: id,
      delta,
    });
    if (!rpcError) return NextResponse.json({ votes: rpcData });

    // Fallback: select + update
    const { data: item, error: fetchError } = await sb
      .from('feedback')
      .select('votes')
      .eq('id', id)
      .single();

    if (fetchError || !item) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const { data: updated, error: updateError } = await sb
      .from('feedback')
      .update({ votes: item.votes + delta })
      .eq('id', id)
      .select('votes')
      .single();

    if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });
    return NextResponse.json({ votes: updated.votes });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 503 });
  }
}
