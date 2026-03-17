import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const userId = formData.get('userId') as string;

    if (!file || !userId) {
      return NextResponse.json({ error: 'File and User ID are required' }, { status: 400 });
    }

    if (!supabaseAdmin) {
      return NextResponse.json({ 
        error: 'Supabase Service Role Key is missing. Please add SUPABASE_SERVICE_ROLE_KEY to your .env.local file.' 
      }, { status: 500 });
    }

    // Standardize filename to [userId].JPG
    const fileExt = 'JPG';
    const fileName = `${userId}.${fileExt}`;

    // 1. Upload to Supabase Storage (avatars bucket) using Admin client to bypass RLS
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from('avatars')
      .upload(fileName, file, {
        upsert: true,
        contentType: file.type
      });

    if (uploadError) throw uploadError;

    // 2. Get Public URL (can use admin or anon client for public URLs)
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('avatars')
      .getPublicUrl(fileName);

    // Add cache-buster to the URL to ensure frontend updates
    const avatarUrl = `${publicUrl}?t=${Date.now()}`;

    // 3. Update User record in database using Admin client to bypass RLS
    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({ avatar_url: avatarUrl })
      .eq('id', userId);

    if (updateError) throw updateError;

    return NextResponse.json({ success: true, avatarUrl });

  } catch (error: any) {
    console.error('Avatar Upload Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
