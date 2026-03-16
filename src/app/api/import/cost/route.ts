import { NextResponse } from 'next/server';
import * as xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';

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

    // Path to mockData.ts
    const mockDataFilepath = path.join(process.cwd(), 'src', 'lib', 'mockData.ts');
    
    // Read current content to preserve other exports if they exist, 
    // but the current system regenerates the whole file.
    // For simplicity and matching the existing import pattern, we'll read existing mockData
    // and update the projects.
    
    const existingContent = fs.readFileSync(mockDataFilepath, 'utf8');
    
    // Extract mockUsers, mockProjects, mockTasks from existing file
    // This is a bit risky with regex, but since we know the format (Step 30), we can try.
    // However, a better way is to parse the rawData and update the existing JSON objects.
    
    // Let's use a simpler approach: extract the JSON parts
    const usersMatch = existingContent.match(/export const mockUsers: User\[\] = (\[[\s\S]*?\]);/);
    const projectsMatch = existingContent.match(/export const mockProjects: Project\[\] = (\[[\s\S]*?\]);/);
    const tasksMatch = existingContent.match(/export const mockTasks: Task\[\] = (\[[\s\S]*?\]);/);
    
    if (!usersMatch || !projectsMatch || !tasksMatch) {
       return NextResponse.json({ error: 'Could not parse existing mockData.ts' }, { status: 500 });
    }
    
    const mockUsers = JSON.parse(usersMatch[1]);
    const mockProjects = JSON.parse(projectsMatch[1]);
    const mockTasks = JSON.parse(tasksMatch[1]);
    
    const projectsMap = new Map();
    mockProjects.forEach((p: any) => projectsMap.set(p.projectNumber, p));

    rawData.forEach((row: any) => {
      const projNum = String(row['proj_num'] || '').trim();
      if (!projNum) return;
      
      let project = projectsMap.get(projNum);
      if (!project) {
        const id = `p${projectsMap.size + 1}`;
        project = {
          id,
          projectNumber: projNum,
          name: row['proj_name'] || `Project ${projNum}`,
          status: 'Active',
          type: 'In-House',
          health: 'Good',
          startDate: '',
          endDate: '',
          colorCode: 'var(--proj-a)',
          responsibilities: {
            design: { userIds: [], plannedCost: 0, actualCost: 0 },
            program: { userIds: [], plannedCost: 0, actualCost: 0 },
            production: { userIds: [], plannedCost: 0, actualCost: 0 }
          }
        };
        projectsMap.set(projNum, project);
        mockProjects.push(project);
      } else {
        // Update name if proj_name is provided
        if (row['proj_name']) {
          project.name = row['proj_name'];
        }
      }
      
      // Update customer
      if (row['customer']) {
        project.customer = row['customer'];
      }
      
      // Detailed costs
      if (!project.detailedCosts) project.detailedCosts = {};
      
      // 2100 - Design
      const p2100 = Number(row['2100 Plan_Cost']) || 0;
      const a2100 = Number(row['2100 Actl_cost']) || 0;
      project.detailedCosts['2100'] = { plan: p2100, actual: a2100 };
      project.responsibilities.design.plannedCost = p2100;
      project.responsibilities.design.actualCost = a2100;
      
      // 2300 - Additional
      const p2300 = Number(row['2300 Plan_Cost']) || 0;
      const a2300 = Number(row['2300 Actl_Cost']) || 0;
      const po2300 = Number(row['2300 PO_Cost']) || 0;
      project.detailedCosts['2300'] = { plan: p2300, actual: a2300, po: po2300 };
      
      // 2400 - Program
      const p2400 = Number(row['2400 Plan_Cost']) || 0;
      const a2400 = Number(row['2400 Actl_Cost']) || 0;
      project.detailedCosts['2400'] = { plan: p2400, actual: a2400 };
      project.responsibilities.program.plannedCost = p2400;
      project.responsibilities.program.actualCost = a2400;
      
      // 4400 - Production
      const p4400 = Number(row['4400 Plan_Cost']) || 0;
      const a4400 = Number(row['4400 Actl_Cost']) || 0;
      project.detailedCosts['4400'] = { plan: p4400, actual: a4400 };
      project.responsibilities.production.plannedCost = p4400;
      project.responsibilities.production.actualCost = a4400;
      
      // 7300 - Additional
      const p7300 = Number(row['7300 Plan_Cost']) || 0;
      const a7300 = Number(row['7300 Actl_Cost']) || 0;
      project.detailedCosts['7300'] = { plan: p7300, actual: a7300 };
    });

    // Generate new content
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
  customer?: string;
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
  detailedCosts?: {
    '2100'?: { plan: number; actual: number };
    '2300'?: { plan: number; actual: number; po: number };
    '2400'?: { plan: number; actual: number };
    '4400'?: { plan: number; actual: number };
    '7300'?: { plan: number; actual: number };
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
  department?: Department;
  hideOnTimeline?: boolean;
}

export const mockUsers: User[] = ${JSON.stringify(mockUsers, null, 2)};

export const mockProjects: Project[] = ${JSON.stringify(mockProjects, null, 2)};

export const mockTasks: Task[] = ${JSON.stringify(mockTasks, null, 2)};
`;

    try {
      fs.writeFileSync(mockDataFilepath, newMockDataContent);
    } catch (e: any) {
      if (e.code === 'EROFS') {
        return NextResponse.json({ 
          error: 'EROFS: Read-only file system. This feature only works in local development. For production, a database is required.' 
        }, { status: 500 });
      }
      throw e;
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Cost Import Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
