import { NextResponse } from 'next/server';
import * as xlsx from 'xlsx';
import { supabase } from '@/lib/supabase';

function excelDateToJSDate(serial: number) {
  const utc_days  = Math.floor(serial - 25569);
  const date_info = new Date(utc_days * 86400 * 1000);
  return date_info.toISOString().split('T')[0];
}

function generateAvatar(name: string) {
  const initial = name ? name.charAt(0).toUpperCase() : '?';
  const colors = ['#ef4444', '#f97316', '#f59e0b', '#84cc16', '#10b981', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#d946ef', '#f43f5e'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = colors[Math.abs(hash) % colors.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="${color}"/><text x="50" y="55" font-family="sans-serif" font-size="45" fill="white" text-anchor="middle" dominant-baseline="middle">${initial}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const rawData = xlsx.utils.sheet_to_json(worksheet);

    if (!rawData || rawData.length === 0) {
       return NextResponse.json({ error: 'Excel file is empty' }, { status: 400 });
    }

    // 1. Fetch current data to maintain consistency
    const { data: existingUsers } = await supabase.from('users').select('*');
    const { data: existingProjects } = await supabase.from('projects').select('*');
    
    const usersMap = new Map();
    // Pre-process all existing users to ensure they have the new ID-based URLs
    existingUsers?.forEach(u => {
      const filename = `${u.id}.JPG`;
      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filename);
      // Update with cache-buster
      u.avatar_url = `${publicUrl}?t=${Date.now()}`;
      usersMap.set(u.name, u);
    });
    
    // Counter for new users
    let nextUserNum = (existingUsers?.length || 0) + 1;

    const projectsMap = new Map();
    existingProjects?.forEach(p => projectsMap.set(p.project_number, p));
    
    const tasks: any[] = [];
    const colorCodes = ['var(--proj-a)', 'var(--proj-b)', 'var(--proj-c)', 'var(--proj-d)'];
    let colorIndex = existingProjects?.length || 0;
    let taskIdCounter = 1;

    // Helper to find a value in a row by checking multiple possible keys
    const getValue = (row: any, keys: string[]) => {
      for (const key of keys) {
        if (row[key] !== undefined) return row[key];
        // Also check lowercase and underscored versions
        const lowerKey = key.toLowerCase();
        for (const actualKey in row) {
          if (actualKey.toLowerCase() === lowerKey || 
              actualKey.toLowerCase().replace(/\s+/g, '_') === lowerKey.replace(/\s+/g, '_')) {
            return row[actualKey];
          }
        }
      }
      return undefined;
    };

    rawData.forEach((row: any) => {
      const taskNumRaw = getValue(row, ['task_num', 'Task No.', 'Task No']);
      // Extract digits in case it's "2100 - Design"
      const taskNumMatch = String(taskNumRaw || '').match(/\d+/);
      const taskNum = taskNumMatch ? Number(taskNumMatch[0]) : NaN;
      
      // Expanded to include all relevant task codes (excluding 7300 as per user request)
      if (![2100, 2300, 2400, 4400].includes(taskNum)) return;

      const projNum = getValue(row, ['proj_num', 'Project No.', 'Project No']);
      if (!projNum) return;
      
      if (!projectsMap.has(projNum)) {
        const projectName = getValue(row, ['proj_name', 'Project Name']) || `Project ${projNum}`;
        const customer = getValue(row, ['customer', 'Customer']) || '-';
        
        projectsMap.set(projNum, {
          id: `p${projectsMap.size + 1 + (existingProjects?.length || 0)}`,
          project_number: String(projNum),
          name: String(projectName),
          customer: String(customer),
          status: 'Active',
          type: 'In-House',
          health: 'Good',
          start_date: null, 
          end_date: null, 
          color_code: colorCodes[colorIndex % colorCodes.length],
          responsibilities: {
            design: { userIds: [], plannedCost: 0, actualCost: 0 },
            program: { userIds: [], plannedCost: 0, actualCost: 0 },
            production: { userIds: [], plannedCost: 0, actualCost: 0 }
          }
        });
        colorIndex++;
      }

      const project = projectsMap.get(projNum);

      const assigneeRaw = getValue(row, ['Man_Power', 'Assignee', 'Assignee Name']);
      const assigneeName = String(assigneeRaw || '').trim();
      const hasAssignee = !!assigneeName && assigneeName !== '' && assigneeName !== '0' && assigneeName !== '-';
      
      let userId = '';
      if (hasAssignee) {
        let currentUser = usersMap.get(assigneeName);
        
        if (!currentUser) {
          userId = `u${nextUserNum++}`;
          const filename = `${userId}.JPG`;
          const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filename);
          
          currentUser = {
            id: userId,
            name: assigneeName,
            role: taskNum === 2100 ? 'Electrical Designer' : taskNum === 2400 ? 'Programmer' : taskNum === 2300 ? 'Material Procurement' : 'Production',
            department: taskNum === 2100 ? 'Design' : taskNum === 2400 ? 'Engineering' : taskNum === 2300 ? 'Materials' : 'Production',
            avatar_url: `${publicUrl}?t=${Date.now()}`
          };
          usersMap.set(assigneeName, currentUser);
        } else {
          userId = currentUser.id;
        }
      }

      if (userId) {
        if (taskNum === 2100 && !project.responsibilities.design.userIds.includes(userId)) {
          project.responsibilities.design.userIds.push(userId);
        } else if (taskNum === 2400 && !project.responsibilities.program.userIds.includes(userId)) {
          project.responsibilities.program.userIds.push(userId);
        } else if (taskNum === 4400 && !project.responsibilities.production.userIds.includes(userId)) {
          project.responsibilities.production.userIds.push(userId);
        }
      }

      const title = getValue(row, ['KPI_Detail', 'Task Name', 'Task']) || 'Task';
      const startSerial = getValue(row, ['Plan_Start_Date', 'Start', 'StartDate']); 
      const endSerial = getValue(row, ['Plan_End_Date', 'End', 'EndDate', ' Plan_End_Date']);

      if (startSerial === undefined || startSerial === null || String(startSerial).trim() === '' || 
          endSerial === undefined || endSerial === null || String(endSerial).trim() === '') {
        return;
      }
      
      const startDateStr = typeof startSerial === 'number' ? excelDateToJSDate(startSerial) : String(startSerial);
      const endDateStr = typeof endSerial === 'number' ? excelDateToJSDate(endSerial) : String(endSerial);

      if (!project.start_date || startDateStr < project.start_date) project.start_date = startDateStr;
      if (!project.end_date || endDateStr > project.end_date) project.end_date = endDateStr;

      tasks.push({
        id: `t${taskIdCounter++}`,
        project_id: project.id,
        user_id: userId || null,
        title: String(title),
        start_date: startDateStr,
        end_date: endDateStr,
        workload_percentage: row['Plan_Hours'] ? Math.min(100, (Number(row['Plan_Hours']) / 8) * 100) : 100,
        department: taskNum === 2100 ? 'Design' : taskNum === 2400 ? 'Engineering' : taskNum === 2300 ? 'Materials' : 'Production',
        hide_on_timeline: !hasAssignee
      });
    });

    // 1. Clear old tasks (since this is a full replacement import)
    await supabase.from('tasks').delete().neq('id', '0');

    // 2. Upsert Users
    const usersBatch = Array.from(usersMap.values());
    if (usersBatch.length > 0) {
        const { error: userError } = await supabase.from('users').upsert(usersBatch);
        if (userError) throw userError;
    }

    // 3. Upsert Projects
    const projectsBatch = Array.from(projectsMap.values());
    if (projectsBatch.length > 0) {
        const { error: projError } = await supabase.from('projects').upsert(projectsBatch);
        if (projError) throw projError;
    }

    // 4. Insert Tasks
    if (tasks.length > 0) {
        const { error: taskError } = await supabase.from('tasks').insert(tasks);
        if (taskError) throw taskError;
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Import Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
