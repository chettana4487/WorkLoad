'use client';

import { mockProjects, mockUsers, mockTasks } from '@/lib/mockData';
import { Briefcase, Code, PenTool, Users, Target, Activity, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect, useMemo } from 'react';
import { format, parseISO, differenceInDays, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

export default function ProjectsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Check initial state
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    // Listen for changes
    const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const getResponsibleUsers = (userIds: string[]) => {
    return userIds.map(id => mockUsers.find(u => u.id === id)).filter(Boolean);
  };

  const filteredProjects = useMemo(() => {
    if (!searchQuery) {
      return mockProjects;
    }
    return mockProjects.filter(project => {
      const responsibleUsers = getResponsibleUsers([
        ...project.responsibilities.design.userIds,
        ...project.responsibilities.program.userIds,
        ...project.responsibilities.production.userIds
      ]);
      const responsibleUsersNames = responsibleUsers.map(user => user?.name.toLowerCase()).join(' ');
      
      return (
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.projectNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        responsibleUsersNames.includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery]);

  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProjects.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProjects, currentPage]);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Scroll to top when page or search changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, searchQuery]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', { 
      style: 'currency', 
      currency: 'THB',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '8px' }}>Projects Portfolio</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Track project construction responsibilities and budget allocations across Design, Program, and Production.</p>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <input 
                type="text" 
                placeholder="Search by project, number, or assignee..."
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1); // Reset to first page on new search
                }}
                style={{
                    padding: '10px 16px',
                    fontSize: '0.9rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-light)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    minWidth: '300px'
                }}
            />
        </div>
      </div>

      {/* Projects Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {paginatedProjects.map(project => {
          const totalPlan = project.responsibilities.design.plannedCost + project.responsibilities.program.plannedCost + project.responsibilities.production.plannedCost;
          const totalActual = project.responsibilities.design.actualCost + project.responsibilities.program.actualCost + project.responsibilities.production.actualCost;
          const isOverBudgetOverall = totalActual > totalPlan;

          const chartData = [
            { name: 'Design', Plan: project.detailedCosts?.['2100']?.plan ?? project.responsibilities.design.plannedCost, Actual: project.detailedCosts?.['2100']?.actual ?? project.responsibilities.design.actualCost },
            { name: 'Program', Plan: project.detailedCosts?.['2400']?.plan ?? project.responsibilities.program.plannedCost, Actual: project.detailedCosts?.['2400']?.actual ?? project.responsibilities.program.actualCost },
            { name: 'Production', Plan: project.detailedCosts?.['4400']?.plan ?? project.responsibilities.production.plannedCost, Actual: project.detailedCosts?.['4400']?.actual ?? project.responsibilities.production.actualCost },
          ];

          if (project.detailedCosts?.['2300']?.plan || project.detailedCosts?.['2300']?.actual) {
            chartData.push({ 
              name: 'Materials', 
              Plan: project.detailedCosts['2300'].plan, 
              Actual: project.detailedCosts['2300'].actual 
            });
          }
          if (project.detailedCosts?.['7300']?.plan || project.detailedCosts?.['7300']?.actual) {
            chartData.push({ 
              name: 'Other', 
              Plan: project.detailedCosts['7300'].plan, 
              Actual: project.detailedCosts['7300'].actual 
            });
          }

          return (
            <div key={project.id} className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', borderLeft: `4px solid ${project.colorCode}` }}>
              
              {/* Project Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brand-primary)', letterSpacing: '0.05em' }}>{project.projectNumber}</span>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>{project.name}</h2>
                  {project.customer && (
                    <div style={{ fontSize: '0.9rem', color: 'var(--primary-color)', fontWeight: 500, marginTop: '-4px' }}>
                      Customer: {project.customer}
                    </div>
                  )}
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
                
                {/* Design Section (2100) */}
                <ResponsibilityCard 
                  title="Design (2100)" 
                  icon={<PenTool size={18} />} 
                  data={{
                    plannedCost: project.detailedCosts?.['2100']?.plan ?? project.responsibilities.design.plannedCost,
                    actualCost: project.detailedCosts?.['2100']?.actual ?? project.responsibilities.design.actualCost
                  }} 
                  users={getResponsibleUsers(project.responsibilities.design.userIds)} 
                  formatCurrency={formatCurrency}
                />

                {/* Program Section (2400) */}
                <ResponsibilityCard 
                  title="Program (2400)" 
                  icon={<Code size={18} />} 
                  data={{
                    plannedCost: project.detailedCosts?.['2400']?.plan ?? project.responsibilities.program.plannedCost,
                    actualCost: project.detailedCosts?.['2400']?.actual ?? project.responsibilities.program.actualCost
                  }} 
                  users={getResponsibleUsers(project.responsibilities.program.userIds)} 
                  formatCurrency={formatCurrency}
                />

                {/* Production Section (4400) */}
                <ResponsibilityCard 
                  title="Production (4400)" 
                  icon={<Briefcase size={18} />} 
                  data={{
                    plannedCost: project.detailedCosts?.['4400']?.plan ?? project.responsibilities.production.plannedCost,
                    actualCost: project.detailedCosts?.['4400']?.actual ?? project.responsibilities.production.actualCost
                  }} 
                  users={getResponsibleUsers(project.responsibilities.production.userIds)} 
                  formatCurrency={formatCurrency}
                />

                {/* Additional Sections (2300, 7300) */}
                {(project.detailedCosts?.['2300']?.plan || project.detailedCosts?.['2300']?.actual) && (
                  <div style={{ padding: '12px', background: 'var(--bg-tertiary)', borderRadius: '8px', fontSize: '0.85rem' }}>
                    <div style={{ fontWeight: 600, marginBottom: '4px' }}>Materials (2300)</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Plan: {formatCurrency(project.detailedCosts['2300'].plan)}</span>
                      <span style={{ color: project.detailedCosts['2300'].actual > project.detailedCosts['2300'].plan ? 'var(--danger)' : 'var(--success)' }}>
                        Actual: {formatCurrency(project.detailedCosts['2300'].actual)}
                      </span>
                    </div>
                    {project.detailedCosts['2300'].po > 0 && (
                      <div style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', marginTop: '2px' }}>
                        PO Cost: {formatCurrency(project.detailedCosts['2300'].po)}
                      </div>
                    )}
                  </div>
                )}
                {(project.detailedCosts?.['7300']?.plan || project.detailedCosts?.['7300']?.actual) && (
                  <div style={{ padding: '12px', background: 'var(--bg-tertiary)', borderRadius: '8px', fontSize: '0.85rem' }}>
                    <div style={{ fontWeight: 600, marginBottom: '4px' }}>Task 7300</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Plan: {formatCurrency(project.detailedCosts['7300'].plan)}</span>
                      <span style={{ color: project.detailedCosts['7300'].actual > project.detailedCosts['7300'].plan ? 'var(--danger)' : 'var(--success)' }}>
                        Actual: {formatCurrency(project.detailedCosts['7300'].actual)}
                      </span>
                    </div>
                  </div>
                )}
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

        {filteredProjects.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px dashed var(--border-light)' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>No Projects Found</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Try adjusting your search query.</p>
            </div>
        )}
      </div>

       {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', padding: '24px 0' }}>
            <button 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1}
                style={{ 
                    padding: '8px 16px', 
                    borderRadius: '8px', 
                    border: '1px solid var(--border-light)', 
                    background: 'var(--bg-secondary)', 
                    cursor: 'pointer',
                    opacity: currentPage === 1 ? 0.5 : 1
                }}
            >
                Previous
            </button>
            <span style={{ color: 'var(--text-secondary)' }}>
                Page {currentPage} of {totalPages}
            </span>
            <button 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages}
                style={{ 
                    padding: '8px 16px', 
                    borderRadius: '8px', 
                    border: '1px solid var(--border-light)', 
                    background: 'var(--bg-secondary)', 
                    cursor: 'pointer',
                    opacity: currentPage === totalPages ? 0.5 : 1
                }}
            >
                Next
            </button>
        </div>
      )}
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
  
  const { monthStart, monthEnd, days, months } = useMemo(() => {
    if (projectTasks.length === 0) {
      const baseDate = parseISO('2026-03-01');
      return { monthStart: startOfMonth(baseDate), monthEnd: endOfMonth(baseDate), days: [], months: [] };
    }
    
    const startDates = projectTasks.map(t => parseISO(t.startDate).getTime());
    const endDates = projectTasks.map(t => parseISO(t.endDate).getTime());
    
    const minDate = new Date(Math.min(...startDates));
    const maxDate = new Date(Math.max(...endDates));
    
    const mStart = startOfMonth(minDate);
    const mEnd = endOfMonth(maxDate);
    const d = eachDayOfInterval({ start: mStart, end: mEnd });
    
    const m: { name: string, count: number }[] = [];
    let currentMonth = '';
    let currentMonthCount = 0;
    
    d.forEach(day => {
      const monthName = format(day, 'MMMM yyyy');
      if (monthName !== currentMonth) {
        if (currentMonth) m.push({ name: currentMonth, count: currentMonthCount });
        currentMonth = monthName;
        currentMonthCount = 1;
      } else {
        currentMonthCount++;
      }
    });
    if (currentMonth) m.push({ name: currentMonth, count: currentMonthCount });

    return { monthStart: mStart, monthEnd: mEnd, days: d, months: m };
  }, [projectTasks]);

  const todayOffset = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (today < monthStart || today > monthEnd) return -1;
    return differenceInDays(today, monthStart) * 24; // 24 is colWidth
  }, [monthStart, monthEnd]);

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
        <div style={{ minWidth: 'fit-content', position: 'relative' }}>
          
          {/* Today Indicator Line */}
          {todayOffset >= 0 && (
            <div 
              style={{
                position: 'absolute',
                left: `${450 + todayOffset + (colWidth / 2)}px`,
                top: '50px',
                bottom: 0,
                borderLeft: '2px dashed var(--danger, #ef4444)',
                opacity: 0.4,
                zIndex: 5,
                pointerEvents: 'none'
              }}
              title="Today"
            />
          )}

          {/* Timeline Header - Months */}
          <div style={{ display: 'flex', marginBottom: '4px' }}>
            <div style={{ width: '450px', flexShrink: 0, position: 'sticky', left: 0, background: 'var(--bg-secondary)', zIndex: 10, borderRight: '1px solid var(--border-light)' }}></div>
            {months.map((m, idx) => (
              <div key={idx} style={{ 
                width: `${m.count * colWidth}px`,
                flexShrink: 0,
                textAlign: 'center', 
                fontSize: '0.75rem', 
                fontWeight: 600,
                color: 'var(--text-secondary)',
                borderBottom: '1px solid var(--border-light)',
                paddingBottom: '4px'
              }}>
                {m.name}
              </div>
            ))}
          </div>

          {/* Timeline Header - Dates */}
          <div style={{ display: 'flex', marginBottom: '8px' }}>
            <div style={{ width: '450px', flexShrink: 0, position: 'sticky', left: 0, background: 'var(--bg-secondary)', zIndex: 10, borderRight: '1px solid var(--border-light)' }}></div>
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
                    width: '450px',
                    flexShrink: 0,
                    fontSize: '0.8rem', 
                    color: 'var(--text-secondary)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    paddingRight: '12px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    position: 'sticky',
                    left: 0,
                    background: 'var(--bg-secondary)',
                    zIndex: 10,
                    borderRight: '1px solid var(--border-light)'
                  }}>
                    <img src={user?.avatarUrl} alt="" style={{ width: '18px', height: '18px', borderRadius: '50%' }} />
                    <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{user?.name || 'User'}</span>
                    <span style={{ color: 'var(--text-tertiary)', margin: '0 4px' }}>:</span>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }} title={task.title}>{task.title}</span>
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
        Viewing Schedule from {format(monthStart, 'd MMM yyyy')} to {format(monthEnd, 'd MMM yyyy')}
      </div>
    </div>
  );
}
