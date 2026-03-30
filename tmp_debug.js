const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envContent = fs.readFileSync('.env.local', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, ...val] = line.split('=');
  if (key) env[key.trim()] = val.join('=').trim();
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const { data: buckets, error: bError } = await supabase.storage.listBuckets();
  console.log('Buckets:', buckets);
  if (bError) console.error('Bucket list error:', bError);

  const { data: inspections } = await supabase.from('inspections').select('*').order('uploaded_at', { ascending: false }).limit(1);
  if (inspections && inspections.length > 0) {
    const item = inspections[0];
    const path = item.file_path; // Use the path from DB directly as it already has the prefix
    console.log('Inspecting file from DB record:', item.file_path);
    
    const { data: fileData, error } = await supabase.storage.from('inspections').download(path);
    if (error) {
      console.error('Download error:', error);
      // Try to list the bucket contents to see what's actually there
      const { data: list } = await supabase.storage.from('inspections').list(path.substring(0, path.lastIndexOf('/')));
      console.log('Contents of folder:', list);
      return;
    }
    const buffer = Buffer.from(await fileData.arrayBuffer());
    const xlsx = require('xlsx');
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    console.log('Sheet Names:', workbook.SheetNames);
    workbook.SheetNames.forEach(name => {
      console.log(`--- Sheet: ${name} ---`);
      const sheet = workbook.Sheets[name];
      const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });
      rows.slice(0, 150).forEach((row, i) => {
        if (Array.isArray(row) && row.some(c => c !== null && c !== '')) {
           console.log(`${i}:`, JSON.stringify(row));
        }
      });
    });
  } else {
    console.log('No inspections found');
  }
}

check();
