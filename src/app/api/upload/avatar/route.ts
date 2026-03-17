import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const userId = formData.get('userId') as string;

    if (!file || !userId) {
      return NextResponse.json({ error: 'File and User ID are required' }, { status: 400 });
    }

    // Standardize filename to [userId].JPG
    const fileExt = 'JPG';
    const fileName = `${userId}.${fileExt}`;

    // 1. Upload to Supabase Storage (avatars bucket)
    // We use upsert: true to overwrite if it exists
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, {
        upsert: true,
        contentType: file.type
      });

    if (uploadError) throw uploadError;

    // 2. Get Public URL
    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    // Add cache-buster to the URL to ensure frontend updates
    const avatarUrl = `${publicUrl}?t=${Date.now()}`;

    // 3. Update User record in database
    const { error: updateError } = await supabase
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
