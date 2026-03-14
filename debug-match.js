const fs = require('fs');
const publicDir = './public';

const namesToTest = [
  'นายจรณินท์ ถินประสาท',
  'นายจรณินท์  ถินประสาท',
  'จรณินท์ ถินประสาท',
  'นายศิกษกะ  ปุ้งโพธิ์',
];

const files = fs.readdirSync(publicDir);

console.log("--- DEBUGGING MATCHES ---\\n");

for (const name of namesToTest) {
  console.log(`Testing Name: "${name}"`);
  const cleanName = name.replace(/^(นาย|นางสาว|นาง|น\.ส\.)\s*/, '').replace(/[\s\u200B-\u200D\uFEFF]+/g, '').trim();
  console.log(`Cleaned Name: "${cleanName}"`);
  
  let matched = false;
  for (const file of files) {
    if (!/\.(jpg|jpeg|png|svg)$/i.test(file)) continue;
    
    const fileNameWithoutExt = file.replace(/\.[^/.]+$/, "");
    const cleanFileName = fileNameWithoutExt.replace(/^(นาย|นางสาว|นาง|น\.ส\.)\s*/, '').replace(/[\s\u200B-\u200D\uFEFF]+/g, '').trim();
    
    if (file.includes('จรณินท์')) {
        console.log(`  Checking File: "${file}" -> Cleaned: "${cleanFileName}"`);
    }

    if (cleanFileName === cleanName || fileNameWithoutExt.replace(/[\s\u200B-\u200D\uFEFF]+/g, '') === name.replace(/[\s\u200B-\u200D\uFEFF]+/g, '') || file === name) {
      console.log(`  ✅ MATCHED: ${file}`);
      matched = true;
      break;
    }
  }
  
  if (!matched) {
    console.log(`  ❌ NO MATCH FOUND`);
  }
  console.log("------------------------\\n");
}
