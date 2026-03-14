import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function blankSvg() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" fill="#f3f4f6">
    <rect width="150" height="150" fill="#f3f4f6"/>
    <svg x="35" y="35" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  </svg>`;
  return new NextResponse(svg, {
    headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'public, max-age=86400' }
  });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name');

  if (!name) {
    return blankSvg();
  }

  const publicDir = path.join(process.cwd(), 'public');
  
  if (!fs.existsSync(publicDir)) {
      return blankSvg();
  }

  try {
    const files = fs.readdirSync(publicDir);
    
    // Clean up queried name for comparison
    const cleanName = name.replace(/^(นาย|นางสาว|นาง|น\.ส\.)\s*/, '').replace(/[\s\u200B-\u200D\uFEFF]+/g, '').trim();

    let matchedFile = null;

    for (const file of files) {
      if (!/\.(jpg|jpeg|png|svg)$/i.test(file)) continue;

      const fileNameWithoutExt = file.replace(/\.[^/.]+$/, "");
      const cleanFileName = fileNameWithoutExt.replace(/^(นาย|นางสาว|นาง|น\.ส\.)\s*/, '').replace(/[\s\u200B-\u200D\uFEFF]+/g, '').trim();

      if (cleanFileName === cleanName || fileNameWithoutExt.replace(/[\s\u200B-\u200D\uFEFF]+/g, '') === name.replace(/[\s\u200B-\u200D\uFEFF]+/g, '') || file === name) {
        matchedFile = file;
        break;
      }
    }

    if (matchedFile) {
      const filePath = path.join(publicDir, matchedFile);
      const fileBuffer = fs.readFileSync(filePath);
      
      const ext = path.extname(matchedFile).toLowerCase();
      let contentType = 'image/jpeg';
      if (ext === '.png') contentType = 'image/png';
      else if (ext === '.svg') contentType = 'image/svg+xml';
      else if (ext === '.webp') contentType = 'image/webp';

      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
        }
      });
    }
  } catch (err) {
    console.error('Error reading public directory for avatars:', err);
  }

  return blankSvg();
}
