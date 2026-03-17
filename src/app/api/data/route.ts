import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .order('project_number', { ascending: true });

    if (projectsError) throw projectsError;

    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .order('name', { ascending: true });

    if (usersError) throw usersError;

    const { data: tasks, error: tasksError } = await supabase
      .from('tasks')
      .select('*')
      .order('start_date', { ascending: true });

    if (tasksError) throw tasksError;

    // Map database fields back to camelCase for frontend compatibility
    const mappedProjects = projects?.map(p => ({
      id: p.id,
      projectNumber: p.project_number,
      name: p.name,
      customer: p.customer,
      status: p.status,
      type: p.type,
      health: p.health,
      startDate: p.start_date,
      endDate: p.end_date,
      colorCode: p.color_code,
      responsibilities: p.responsibilities,
      detailedCosts: p.detailed_costs
    }));

    const mappedUsers = users?.map(u => ({
      id: u.id,
      name: u.name,
      role: u.role,
      department: u.department,
      avatarUrl: u.avatar_url
    }));

    const mappedTasks = tasks?.map(t => ({
      id: t.id,
      projectId: t.project_id,
      userId: t.user_id,
      title: t.title,
      startDate: t.start_date,
      endDate: t.end_date,
      workloadPercentage: t.workload_percentage,
      department: t.department,
      hideOnTimeline: t.hide_on_timeline
    }));

    return NextResponse.json({
      projects: mappedProjects || [],
      users: mappedUsers || [],
      tasks: mappedTasks || []
    });

  } catch (error: any) {
    console.error('Data Fetch Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
