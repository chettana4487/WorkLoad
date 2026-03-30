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
  console.log('Listing root of inspections bucket:');
  const { data: rootList } = await supabase.storage.from('inspections').list('');
  console.log(JSON.stringify(rootList, null, 2));

  // If there's an 'inspections' folder, list its content
  if (rootList.find(i => i.name === 'inspections' && i.id === null)) {
      console.log('Listing inspections/ folder:');
      const { data: nestedList } = await supabase.storage.from('inspections').list('inspections');
      console.log(JSON.stringify(nestedList, null, 2));
  }
}

check();
