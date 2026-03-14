import { NextResponse } from 'next/server';
import * as xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';

function excelDateToJSDate(serial: number) {
  const utc_days  = Math.floor(serial - 25569);
  const date_info = new Date(utc_days * 86400 * 1000);
  return date_info.toISOString().split('T')[0];
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
    
    // Parse it with xlsx
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    // Read raw data
    const rawData = xlsx.utils.sheet_to_json(worksheet);

    if (!rawData || rawData.length === 0) {
       return NextResponse.json({ error: 'Excel file is empty' }, { status: 400 });
    }

    const usersMap = new Map();
    const projectsMap = new Map();
    const tasks: any[] = [];

    const colorCodes = ['var(--proj-a)', 'var(--proj-b)', 'var(--proj-c)', 'var(--proj-d)'];
    let colorIndex = 0;
    let taskIdCounter = 1;

    rawData.forEach((row: any) => {
      // Only process rows with relevant task_num
      const taskNum = row['task_num'];
      if (![2100, 2400, 4400].includes(Number(taskNum))) return;

      // Project mapping
      const projNum = row['proj_num'];
      if (!projNum) return;
      
      if (!projectsMap.has(projNum)) {
        projectsMap.set(projNum, {
          id: `p${projectsMap.size + 1}`,
          projectNumber: projNum,
          name: `Project ${projNum}`,
          status: 'Active',
          type: 'In-House',
          health: 'Good',
          startDate: '', 
          endDate: '', 
          colorCode: colorCodes[colorIndex % colorCodes.length],
          responsibilities: {
            design: { userIds: [], plannedCost: 0, actualCost: 0 },
            program: { userIds: [], plannedCost: 0, actualCost: 0 },
            production: { userIds: [], plannedCost: 0, actualCost: 0 }
          }
        });
        colorIndex++;
      }

      const project = projectsMap.get(projNum);

      // User mapping
      const assigneeName = row['Man_Power'];
      const hasAssignee = !!assigneeName && assigneeName.trim() !== '';
      
      let userId = '';
      if (hasAssignee) {
        for (const [id, u] of usersMap.entries()) {
          if (u.name === assigneeName) {
            userId = id;
            break;
          }
        }
        
        if (!userId) {
          userId = `u${usersMap.size + 1}`;
          usersMap.set(userId, {
            id: userId,
            name: assigneeName,
            role: Number(taskNum) === 2100 ? 'Electrical Designer' : Number(taskNum) === 2400 ? 'Programmer' : 'Electrical Production',
            department: Number(taskNum) === 2100 ? 'Design' : Number(taskNum) === 2400 ? 'Engineering' : 'Production',
            avatarUrl: `https://i.pravatar.cc/150?u=${userId}`
          });
        }
      }

      // Add user to project responsibilities based on task_num (only if valid user)
      if (userId) {
        if (Number(taskNum) === 2100 && !project.responsibilities.design.userIds.includes(userId)) {
          project.responsibilities.design.userIds.push(userId);
        } else if (Number(taskNum) === 2400 && !project.responsibilities.program.userIds.includes(userId)) {
          project.responsibilities.program.userIds.push(userId);
        } else if (Number(taskNum) === 4400 && !project.responsibilities.production.userIds.includes(userId)) {
          project.responsibilities.production.userIds.push(userId);
        }
      }

      // Task mapping
      const title = row['KPI_Detail'] || 'Task';
      const startSerial = row['Plan_Start_Date']; 
      const endSerial = row['Plan_End_Date'] || row[' Plan_End_Date'];

      // Skip rows that do not have a start date or end date
      if (startSerial === undefined || startSerial === null || String(startSerial).trim() === '' || 
          endSerial === undefined || endSerial === null || String(endSerial).trim() === '') {
        return;
      }
      
      const startDateStr = typeof startSerial === 'number' ? excelDateToJSDate(startSerial) : String(startSerial);
      const endDateStr = typeof endSerial === 'number' ? excelDateToJSDate(endSerial) : String(endSerial);

      if (!project.startDate || startDateStr < project.startDate) project.startDate = startDateStr;
      if (!project.endDate || endDateStr > project.endDate) project.endDate = endDateStr;

      // Status tracking based on completed flag
      const completedFlag = row['completed'];

      // You can add more specific title modifications to Task if you wish to track completion status visually, 
      // but strictly adhering to Task interface we modify the title conceptually to signify if it's done. 
      const finalTitle = completedFlag == 1 ? `[Completed] ${title}` : title;
      const taskDepartment = Number(taskNum) === 2100 ? 'Design' : Number(taskNum) === 2400 ? 'Engineering' : 'Production';

      tasks.push({
        id: `t${taskIdCounter++}`,
        projectId: project.id,
        userId: userId,
        title: finalTitle,
        startDate: startDateStr,
        endDate: endDateStr,
        workloadPercentage: row['Plan_Hours'] ? Math.min(100, (Number(row['Plan_Hours']) / 8) * 100) : 100,
        hideOnTimeline: !hasAssignee,
        department: taskDepartment
      });
    });

    const mockUsers = Array.from(usersMap.values());
    const mockProjects = Array.from(projectsMap.values());

    const newMockDataContent = `export type Department = 'Engineering' | 'Design' | 'Marketing' | 'Product' | 'HR' | 'Production';

export interface User {
  id: string;
  name: string;
  role: string;
  department: Department;
  avatarUrl: string;
}

export interface Project {
  id: string;
  projectNumber: string;
  name: string;
  status: 'Planning' | 'Active' | 'On Hold' | 'Completed' | 'Closed';
  type: 'In-House' | 'On-Site';
  health: 'Good' | 'Warning' | 'Delay';
  startDate: string;
  endDate: string;
  colorCode: string;
  responsibilities: {
    design: { userIds: string[]; plannedCost: number; actualCost: number };
    program: { userIds: string[]; plannedCost: number; actualCost: number };
    production: { userIds: string[]; plannedCost: number; actualCost: number };
  };
}

export interface Task {
  id: string;
  projectId: string;
  userId: string;
  title: string;
  startDate: string; 
  endDate: string;
  workloadPercentage: number;
  hideOnTimeline?: boolean;
}

export const mockUsers: User[] = ${JSON.stringify(mockUsers, null, 2)};

export const mockProjects: Project[] = ${JSON.stringify(mockProjects, null, 2)};

export const mockTasks: Task[] = ${JSON.stringify(tasks, null, 2)};
`;

    const mockDataFilepath = path.join(process.cwd(), 'src', 'lib', 'mockData.ts');
    fs.writeFileSync(mockDataFilepath, newMockDataContent);

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Import Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
