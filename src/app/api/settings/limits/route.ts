import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { limits } = await request.json();

    if (!limits) {
      return NextResponse.json({ error: 'Limits data is required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('workload_limits')
      .upsert({ id: 'global', limits }, { onConflict: 'id' });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Update Limits Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
