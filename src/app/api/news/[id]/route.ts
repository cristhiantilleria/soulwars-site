import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

function authorized(req: Request) {
  const secret = process.env.ADMIN_SECRET;
  return secret && req.headers.get('Authorization') === `Bearer ${secret}`;
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!authorized(req))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const patch: Record<string, string> = {};
  if (body.title) patch.title = String(body.title).slice(0, 200);
  if (body.body)  patch.body  = String(body.body).slice(0, 2000);
  if (body.date)  patch.date  = body.date;

  const { data, error } = await getSupabaseAdmin()
    .from('news').update(patch).eq('id', id).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!authorized(req))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const { error } = await getSupabaseAdmin().from('news').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
