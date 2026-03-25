import { NextResponse } from 'next/server';
import * as xlsx from 'xlsx';
import { supabase } from '@/lib/supabase';

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

    // 1. Fetch current projects to update them
    const { data: existingProjects, error: fetchError } = await supabase
        .from('projects')
        .select('*');
        
    if (fetchError) throw fetchError;
    
    const projectsMap = new Map();
    existingProjects?.forEach(p => projectsMap.set(p.project_number, p));

    const updates: any[] = [];

    // Helper to find a value in a row by checking multiple possible keys
    const getValue = (row: any, keys: string[]) => {
      for (const key of keys) {
        if (row[key] !== undefined) return row[key];
        // Also check lowercase, underscored, and space-based versions
        const lowerKey = key.toLowerCase();
        for (const actualKey in row) {
          const normalizedActual = actualKey.toLowerCase().trim().replace(/[_\s]+/g, '_');
          const normalizedTarget = lowerKey.trim().replace(/[_\s]+/g, '_');
          if (normalizedActual === normalizedTarget) {
            return row[actualKey];
          }
        }
      }
      return undefined;
    };

    rawData.forEach((row: any) => {
      const projNumRaw = getValue(row, ['proj_num', 'Project No', 'Project No.', 'Project_No']);
      const projNum = String(projNumRaw || '').trim();
      if (!projNum) return;
      
      let project = projectsMap.get(projNum);
      if (!project) return; 
      
      // Update basic info if present
      const importedName = getValue(row, ['proj_name', 'Project Name', 'Project_Name']);
      if (importedName) project.name = String(importedName);
      
      const importedCustomer = getValue(row, ['customer', 'Customer']);
      if (importedCustomer) project.customer = String(importedCustomer);
      
      if (!project.detailed_costs) project.detailed_costs = {};
      
      // 2100 - Design
      const p2100 = Number(getValue(row, ['2100 Plan_Cost', '2100 Plan Cost', '2100_Plan_Cost', 'Design Plan Cost', 'Design_Plan_Cost'])) || 0;
      const a2100 = Number(getValue(row, ['2100 Actl_cost', '2100 Actual Cost', '2100_Actl_Cost', '2100 Actl_Cost', 'Design Actual Cost', 'Design_Actual_Cost'])) || 0;
      project.detailed_costs['2100'] = { plan: p2100, actual: a2100 };
      project.responsibilities.design.plannedCost = p2100;
      project.responsibilities.design.actualCost = a2100;
      
      // 2300 - Materials
      const p2300 = Number(getValue(row, ['2300 Plan_Cost', '2300 Plan Cost', '2300_Plan_Cost', 'Materials Plan Cost', 'Materials_Plan_Cost'])) || 0;
      const a2300 = Number(getValue(row, ['2300 Actl_Cost', '2300 Actual Cost', '2300_Actl_Cost', '2300 Actl_cost', 'Materials Actual Cost', 'Materials_Actual_Cost'])) || 0;
      const po2300 = Number(getValue(row, ['2300 PO_Cost', '2300 PO Cost', '2300_PO_Cost', 'Materials PO Cost', 'Materials_PO_Cost'])) || 0;
      project.detailed_costs['2300'] = { plan: p2300, actual: Math.max(a2300, po2300), po: po2300 };
      
      // 2400 - Program
      const p2400 = Number(getValue(row, ['2400 Plan_Cost', '2400 Plan Cost', '2400_Plan_Cost', 'Program Plan Cost', 'Program_Plan_Cost'])) || 0;
      const a2400 = Number(getValue(row, ['2400 Actl_Cost', '2400 Actual Cost', '2400_Actl_Cost', '2400 Actl_cost', 'Program Actual Cost', 'Program_Actual_Cost'])) || 0;
      project.detailed_costs['2400'] = { plan: p2400, actual: a2400 };
      project.responsibilities.program.plannedCost = p2400;
      project.responsibilities.program.actualCost = a2400;
      
      // 4400 - Production
      const p4400 = Number(getValue(row, ['4400 Plan_Cost', '4400 Plan Cost', '4400_Plan_Cost', 'Production Plan Cost', 'Production_Plan_Cost'])) || 0;
      const a4400 = Number(getValue(row, ['4400 Actl_Cost', '4400 Actual Cost', '4400_Actl_Cost', '4400 Actl_cost', 'Production Actual Cost', 'Production_Actual_Cost'])) || 0;
      project.detailed_costs['4400'] = { plan: p4400, actual: a4400 };
      project.responsibilities.production.plannedCost = p4400;
      project.responsibilities.production.actualCost = a4400;

      updates.push(project);
    });

    if (updates.length > 0) {
        const { error: updateError } = await supabase.from('projects').upsert(updates);
        if (updateError) throw updateError;
    }

    // 2. Update last upload timestamp
    const { data: globalData } = await supabase
      .from('workload_limits')
      .select('limits')
      .eq('id', 'global')
      .single();
    
    const currentLimits = globalData?.limits || { Design: 10, Engineering: 10, Production: 10 };
    const updatedLimits = { 
      ...currentLimits, 
      lastCostUpload: new Date().toISOString() 
    };
    
    await supabase
      .from('workload_limits')
      .upsert({ id: 'global', limits: updatedLimits }, { onConflict: 'id' });

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Cost Import Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
