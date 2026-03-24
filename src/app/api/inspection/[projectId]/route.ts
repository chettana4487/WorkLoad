import { NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';

export async function GET(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = params;
    const client = supabaseAdmin || supabase;

    console.log(`Fetching inspections for projectId: ${projectId}`);

    const { data, error } = await client
      .from('inspections')
      .select('*')
      .eq('project_id', projectId)
      .order('uploaded_at', { ascending: false });

    if (error) {
      console.error('Database error fetching inspections:', error);
      throw error;
    }

    console.log(`Found ${data?.length || 0} inspection records for ${projectId}`);

    // Separate latest for EEP and EEW for status display
    const latestEEP = data?.find(i => i.type === 'EEP');
    const latestEEW = data?.find(i => i.type === 'EEW');

    // Generate public URLs for downloads
    const history = await Promise.all((data || []).map(async (item) => {
      // Handle legacy 'inspections/' path prefixes
      let filePath = item.file_path;
      if (filePath && !filePath.startsWith('inspections/')) {
        filePath = `inspections/${filePath}`;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('inspections')
        .getPublicUrl(filePath);
      
      return {
        ...item,
        downloadUrl: publicUrl
      };
    }));

    return NextResponse.json({
      projectId,
      history,
      latest: {
        EEP: latestEEP || null,
        EEW: latestEEW || null
      }
    });

  } catch (error: any) {
    console.error('Inspection Fetch Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
