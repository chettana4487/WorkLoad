'use client';

import { mockProjects, mockUsers, mockTasks } from '@/lib/mockData';
import { Briefcase, Code, PenTool, Users, Target, Activity, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect, useMemo } from 'react';
import { format, parseISO, differenceInDays, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

export default function ProjectsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial state
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    // Listen for changes
    const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', { 
      style: 'currency', 
      currency: 'THB',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getResponsibleUsers = (userIds: string[]) => {
    return userIds.map(id => mockUsers.find(u => u.id === id)).filter(Boolean);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '8px' }}>Projects Portfolio</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Track project construction responsibilities and budget allocations across Design, Program, and Production.</p>
        </div>
      </div>

      {/* Projects Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {mockProjects.map(project => {
          const totalPlan = project.responsibilities.design.plannedCost + project.responsibilities.program.plannedCost + project.responsibilities.production.plannedCost;
          const totalActual = project.responsibilities.design.actualCost + project.responsibilities.program.actualCost + project.responsibilities.production.actualCost;
          const isOverBudgetOverall = totalActual > totalPlan;

          const chartData = [
            { name: 'Design', Plan: project.responsibilities.design.plannedCost, Actual: project.responsibilities.design.actualCost },
            { name: 'Program', Plan: project.responsibilities.program.plannedCost, Actual: project.responsibilities.program.actualCost },
            { name: 'Production', Plan: project.responsibilities.production.plannedCost, Actual: project.responsibilities.production.actualCost },
          ];

          return (
            <div key={project.id} className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', borderLeft: `4px solid ${project.colorCode}` }}>
              
              {/* Project Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brand-primary)', letterSpacing: '0.05em' }}>{project.projectNumber}</span>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>{project.name}</h2>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Activity size={14} /> {project.status}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Target size={14} /> {project.health}
                    </span>
                  </div>
                </div>
                
                {/* Overall Financials */}
                <div style={{ display: 'flex', gap: '24px', textAlign: 'right' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Plan</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{formatCurrency(totalPlan)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Actual</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 600, color: isOverBudgetOverall ? 'var(--danger)' : 'var(--success)' }}>
                      {formatCurrency(totalActual)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Responsibilities & Chart Section */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                
                {/* Responsibilities Grid */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Design Section */}
                <ResponsibilityCard 
                  title="Design" 
                  icon={<PenTool size={18} />} 
                  data={project.responsibilities.design} 
                  users={getResponsibleUsers(project.responsibilities.design.userIds)} 
                  formatCurrency={formatCurrency}
                />

                {/* Program Section */}
                <ResponsibilityCard 
                  title="Program" 
                  icon={<Code size={18} />} 
                  data={project.responsibilities.program} 
                  users={getResponsibleUsers(project.responsibilities.program.userIds)} 
                  formatCurrency={formatCurrency}
                />

                {/* Production Section */}
                <ResponsibilityCard 
                  title="Production" 
                  icon={<Briefcase size={18} />} 
                  data={project.responsibilities.production} 
                  users={getResponsibleUsers(project.responsibilities.production.userIds)} 
                  formatCurrency={formatCurrency}
                />
                </div>

                {/* Vertical Separator */}
                <div style={{ display: 'none', width: '1px', background: 'var(--border-light)' }}></div>

                {/* Chart Section */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', minHeight: '300px', background: 'var(--bg-secondary)', borderRadius: '12px', padding: '16px', border: '1px solid var(--border-light)' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>Cost Comparison (Plan vs Actual)</h3>
                  <div style={{ flex: 1 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                        <XAxis dataKey="name" stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis 
                          tickFormatter={(val) => `฿${(val/1000).toFixed(0)}k`} 
                          stroke="var(--text-tertiary)" 
                          fontSize={12} 
                          tickLine={false} 
                          axisLine={false} 
                        />
                        <Tooltip 
                          formatter={(value: any) => [formatCurrency(Number(value) || 0), '']}
                          contentStyle={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-light)', borderRadius: '8px', boxShadow: 'var(--shadow-md)' }}
                          itemStyle={{ fontSize: '0.9rem', fontWeight: 500 }}
                        />
                        <Legend wrapperStyle={{ fontSize: '0.85rem' }} />
                        <Bar dataKey="Plan" fill={isDarkMode ? "#475569" : "#cbd5e1"} radius={[4, 4, 0, 0]} />
                        <Bar 
                          dataKey="Actual" 
                          fill="var(--brand-primary)" 
                          radius={[4, 4, 0, 0]} 
                          // Highlight bars red directly if they exceed plan
                          shape={(props: any) => {
                            const isOver = props.payload.Actual > props.payload.Plan;
                            return <rect x={props.x} y={props.y} width={props.width} height={props.height} fill={isOver ? 'var(--danger)' : 'var(--brand-primary)'} rx={4} ry={4} />;
                          }}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>

              {/* Project Timeline Section */}
              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <Calendar size={18} className="text-secondary" />
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>Project Timeline Schedule</h3>
                </div>
                <ProjectTimeline projectId={project.id} />
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}

// Sub-component for rendering each responsibility section
function ResponsibilityCard({ title, icon, data, users, formatCurrency }: any) {
  const isOverBudget = data.actualCost > data.plannedCost;

  return (
    <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Category Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', fontWeight: 600 }}>
        <div style={{ padding: '8px', background: 'var(--bg-tertiary)', borderRadius: '8px', color: 'var(--brand-primary)' }}>
          {icon}
        </div>
        {title}
      </div>

      {/* Users */}
      <div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Users size={12} /> ผู้รับผิดชอบ (Assignees)
        </div>
        {users.length > 0 ? (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {users.map((user: any) => (
              <div key={user.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-primary)', padding: '4px 10px', borderRadius: '20px', border: '1px solid var(--border-light)', fontSize: '0.8rem', fontWeight: 500 }}>
                <img src={user.avatarUrl} alt={user.name} style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
                {user.name}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>Unassigned</div>
        )}
      </div>

      {/* Financials */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: 'auto', paddingTop: '16px', borderTop: '1px dashed var(--border-light)' }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Plan Cost</div>
          <div style={{ fontWeight: 500, fontSize: '0.95rem' }}>{formatCurrency(data.plannedCost)}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Actual Cost</div>
          <div style={{ fontWeight: 600, fontSize: '0.95rem', color: isOverBudget ? 'var(--danger)' : 'var(--success)' }}>
            {formatCurrency(data.actualCost)}
          </div>
        </div>
      </div>

    </div>
  );
}

// Sub-component for rendering the project-specific timeline
function ProjectTimeline({ projectId }: { projectId: string }) {
  const projectTasks = useMemo(() => mockTasks.filter(t => t.projectId === projectId), [projectId]);
  
  // Use a fixed range for March 2026 for consistency with Dashboard
  const baseDate = parseISO('2026-03-01');
  const monthStart = startOfMonth(baseDate);
  const monthEnd = endOfMonth(baseDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  if (projectTasks.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-tertiary)', background: 'var(--bg-secondary)', borderRadius: '12px', fontSize: '0.9rem', border: '1px dashed var(--border-light)' }}>
        No tasks scheduled for this project.
      </div>
    );
  }

  const colWidth = 24; // Compact view

  return (
    <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-light)', overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto', padding: '16px' }}>
        <div style={{ minWidth: 'fit-content' }}>
          
          {/* Timeline Header - Dates */}
          <div style={{ display: 'flex', marginBottom: '8px', paddingLeft: '200px' }}>
            {days.map((day, idx) => {
              const isWeekend = day.getDay() === 0 || day.getDay() === 6;
              return (
                <div key={idx} style={{ 
                  minWidth: `${colWidth}px`, 
                  textAlign: 'center', 
                  fontSize: '0.65rem', 
                  color: isWeekend ? 'var(--danger)' : 'var(--text-tertiary)' 
                }}>
                  {format(day, 'd')}
                </div>
              );
            })}
          </div>

          {/* Task Rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {projectTasks.map((task) => {
              const tStart = parseISO(task.startDate);
              const tEnd = parseISO(task.endDate);
              
              // Bounds to month
              const drawStart = tStart < monthStart ? monthStart : tStart;
              const drawEnd = tEnd > monthEnd ? monthEnd : tEnd;
              
              if (drawEnd < monthStart || drawStart > monthEnd) return null;

              const leftOffset = differenceInDays(drawStart, monthStart) * colWidth;
              const width = (differenceInDays(drawEnd, drawStart) + 1) * colWidth;
              const user = mockUsers.find(u => u.id === task.userId);

              return (
                <div key={task.id} style={{ display: 'flex', alignItems: 'center', height: '32px' }}>
                  {/* Task Label / Assignee */}
                  <div style={{ 
                    width: '200px', 
                    fontSize: '0.8rem', 
                    color: 'var(--text-secondary)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    paddingRight: '12px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    <img src={user?.avatarUrl} alt="" style={{ width: '18px', height: '18px', borderRadius: '50%' }} />
                    <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{user?.name.split(' ')[1] || 'User'}</span>: {task.title}
                  </div>
                  
                  {/* Timeline Bar Container */}
                  <div style={{ position: 'relative', flex: 1, height: '12px', background: 'var(--bg-tertiary)', borderRadius: '6px' }}>
                    <div style={{ 
                      position: 'absolute', 
                      left: `${leftOffset}px`, 
                      width: `${width}px`, 
                      height: '100%', 
                      background: 'var(--brand-primary)', 
                      borderRadius: '6px',
                      opacity: 0.8
                    }} 
                    title={`${task.title} (${task.startDate} to ${task.endDate})`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
      <div style={{ padding: '8px 16px', background: 'var(--bg-tertiary)', borderTop: '1px solid var(--border-light)', fontSize: '0.7rem', color: 'var(--text-tertiary)', textAlign: 'right' }}>
        Viewing Schedule for {format(monthStart, 'MMMM yyyy')}
      </div>
    </div>
  );
}
