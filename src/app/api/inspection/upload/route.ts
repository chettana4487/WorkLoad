import { NextResponse } from 'next/server';
import * as xlsx from 'xlsx';
import { supabase, supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const projectId = formData.get('projectId') as string;
    const type = formData.get('type') as string; // 'EEP' or 'EEW'

    if (!file || !projectId || !type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    
    // Use header: 1 to get a raw array of arrays for more robust scanning
    const rows = xlsx.utils.sheet_to_json<any[]>(worksheet, { header: 1 });

    if (!rows || rows.length === 0) {
       return NextResponse.json({ error: 'Excel file is empty' }, { status: 400 });
    }

    // Extraction logic: scan both headers and raw cells
    let passedItems = 0;
    const deptStatus: Record<string, string> = {};

    const passedItemsKeys = ['ผลรวมหัวข้อที่ตรวจสอบผ่าน', 'Passed Items', 'Total Pass'];

    // Iterating through ALL sheets to find status and passed items
    workbook.SheetNames.forEach(sheetName => {
      const worksheet = workbook.Sheets[sheetName];
      const sheetRows = xlsx.utils.sheet_to_json<any[]>(worksheet, { header: 1 });
      
      let sheetPassed = 0;
      let sheetFound = false;

      // Scan rows for "ผลรวมหัวข้อที่ตรวจสอบผ่าน" or similar
      for (let r = 0; r < sheetRows.length; r++) {
        const row = sheetRows[r];
        if (!Array.isArray(row)) continue;
        
        row.forEach((cell, idx) => {
          const val = String(cell || '').trim();
          // Check for label like "ผลรวมหัวข้อที่ตรวจสอบผ่าน"
          if (passedItemsKeys.some(k => val.includes(k))) {
            const possibleVal = row[idx + 1] || row[idx + 2] || val.match(/\d+/)?.[0];
            if (possibleVal !== undefined && !isNaN(Number(possibleVal))) {
              sheetPassed = Math.max(sheetPassed, Number(possibleVal));
              sheetFound = true;
            }
          }
        });
      }

      // If we found a sum in this sheet, add it to the total
      if (sheetFound) {
        passedItems += sheetPassed;
        deptStatus[sheetName] = `${sheetPassed} items passed`;
      } else {
        // Fallback: If no sum label, maybe count 'O' marks in columns?
        // For now, just mark the sheet as found if it has rows
        if (sheetRows.length > 5) {
          deptStatus[sheetName] = "In Progress";
        }
      }
    });

    console.log(`Final Extracted: Passed Items=${passedItems}, Depts=${Object.keys(deptStatus).length}`);

    // Use admin client if available to bypass RLS, otherwise fallback to regular
    const client = supabaseAdmin || supabase;

    // Storage: Delete old files for this project/type
    const storagePath = `inspections/${projectId}/${type}`;
    const { data: existingFiles } = await client.storage.from('inspections').list(storagePath);
    
    if (existingFiles && existingFiles.length > 0) {
      const filesToDelete = existingFiles.map(f => `${storagePath}/${f.name}`);
      await client.storage.from('inspections').remove(filesToDelete);
    }

    // Upload new file
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    const fullPath = `${storagePath}/${fileName}`;
    
    const { error: uploadError } = await client.storage.from('inspections').upload(fullPath, buffer, {
      contentType: file.type,
      upsert: true
    });

    if (uploadError) throw uploadError;

    // Save metadata to DB
    const { error: dbError } = await client.from('inspections').insert({
      project_id: projectId,
      type: type,
      file_name: file.name,
      file_path: fullPath,
      passed_items: Math.round(passedItems), // Ensure integer
      dept_status: deptStatus,
      uploaded_at: new Date().toISOString()
    });

    if (dbError) throw dbError;

    return NextResponse.json({ 
      success: true, 
      passedItems, 
      deptStatus,
      msg: `Extracted ${passedItems} passed items and ${Object.keys(deptStatus).length} department statuses.`
    });

  } catch (error: any) {
    console.error('Inspection Upload Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
