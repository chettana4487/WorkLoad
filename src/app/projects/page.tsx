'use client';

import { Briefcase, Code, PenTool, Users, Target, Activity, Calendar, Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect, useMemo } from 'react';
import { format, parseISO, differenceInDays, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { Project, User, Task } from '@/lib/mockData';
import UserAvatar from '@/components/UserAvatar';

export default function ProjectsPage() {
  const [data, setData] = useState<{ projects: Project[], users: User[], tasks: Task[] }>({ projects: [], users: [], tasks: [] });
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setLoading(false);
      });

    // Dark mode detection
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const getResponsibleUsers = (userIds: string[]) => {
    return userIds.map(id => data.users.find(u => u.id === id)).filter(Boolean) as User[];
  };

  const filteredProjects = useMemo(() => {
    if (!searchQuery) return data.projects;
    return data.projects.filter(project => {
      const respUsers = getResponsibleUsers([
        ...project.responsibilities.design.userIds,
        ...project.responsibilities.program.userIds,
        ...project.responsibilities.production.userIds
      ]);
      const respNames = respUsers.map(user => user.name.toLowerCase()).join(' ');
      
      return (
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.projectNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        respNames.includes(searchQuery.toLowerCase()) ||
        (project.customer?.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
  }, [searchQuery, data.projects, data.users]);

  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProjects.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProjects, currentPage]);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', { 
      style: 'currency', 
      currency: 'THB',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loader2 className="animate-spin" size={48} color="var(--brand-primary)" />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '8px' }}>Projects Portfolio</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Track project construction responsibilities and budget allocations across Design, Program, and Production.</p>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <select
                value={paginatedProjects[0]?.id || ''}
                onChange={(e) => {
                    const index = filteredProjects.findIndex(p => p.id === e.target.value);
                    if (index !== -1) {
                        setCurrentPage(index + 1);
                    }
                }}
                style={{
                    padding: '10px 16px',
                    fontSize: '0.9rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-light)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    minWidth: '250px',
                    cursor: 'pointer'
                }}
            >
                {filteredProjects.map((project, idx) => (
                    <option key={project.id} value={project.id}>
                        {idx + 1}. {project.projectNumber} - {project.name}
                    </option>
                ))}
            </select>
            <input 
                type="text" 
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                }}
                style={{
                    padding: '10px 16px',
                    fontSize: '0.9rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-light)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    minWidth: '200px'
                }}
            />
        </div>
      </div>

      {/* Projects Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
        {paginatedProjects.map(project => {
          const totalPlan = (project.detailedCosts?.['2100']?.plan || project.responsibilities.design.plannedCost) + 
                            (project.detailedCosts?.['2400']?.plan || project.responsibilities.program.plannedCost) + 
                            (project.detailedCosts?.['4400']?.plan || project.responsibilities.production.plannedCost) +
                            (project.detailedCosts?.['2300']?.plan || 0) +
                            (project.detailedCosts?.['7301']?.plan || 0) +
                            (project.detailedCosts?.['7302']?.plan || 0) +
                            (project.detailedCosts?.['7303']?.plan || 0);

          const totalActual = (project.detailedCosts?.['2100']?.actual || project.responsibilities.design.actualCost) + 
                              (project.detailedCosts?.['2400']?.actual || project.responsibilities.program.actualCost) + 
                              (project.detailedCosts?.['4400']?.actual || project.responsibilities.production.actualCost) +
                              (project.detailedCosts?.['2300']?.actual || 0) +
                              (project.detailedCosts?.['7301']?.actual || 0) +
                              (project.detailedCosts?.['7302']?.actual || 0) +
                              (project.detailedCosts?.['7303']?.actual || 0);

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

          if (project.detailedCosts?.['7301']?.plan || project.detailedCosts?.['7301']?.actual) {
            chartData.push({ name: 'Install Design', Plan: project.detailedCosts['7301']?.plan || 0, Actual: project.detailedCosts['7301']?.actual || 0 });
          }
          if (project.detailedCosts?.['7302']?.plan || project.detailedCosts?.['7302']?.actual) {
            chartData.push({ name: 'Install Program', Plan: project.detailedCosts['7302']?.plan || 0, Actual: project.detailedCosts['7302']?.actual || 0 });
          }
          if (project.detailedCosts?.['7303']?.plan || project.detailedCosts?.['7303']?.actual) {
            chartData.push({ name: 'Install Produc', Plan: project.detailedCosts['7303']?.plan || 0, Actual: project.detailedCosts['7303']?.actual || 0 });
          }

          return (
            <div key={project.id} className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', borderLeft: `8px solid ${project.colorCode}` }}>
              
              {/* Project Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brand-primary)', letterSpacing: '0.05em' }}>{project.projectNumber}</span>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>{project.name}</h2>
                  {project.customer && (
                    <div style={{ fontSize: '1rem', color: 'var(--primary-color)', fontWeight: 500 }}>
                      Customer: {project.customer}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Activity size={14} /> {project.status}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Target size={14} /> {project.health}
                    </span>
                  </div>
                </div>
                
                {/* Overall Financials */}
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ 
                    padding: '12px 24px', 
                    background: 'var(--bg-tertiary)', 
                    borderRadius: '12px', 
                    border: '1px solid var(--border-light)',
                    minWidth: '180px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px', fontWeight: 700 }}>Total Plan</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>{formatCurrency(totalPlan)}</div>
                  </div>
                  <div style={{ 
                    padding: '12px 24px', 
                    background: isOverBudgetOverall ? 'rgba(239, 68, 68, 0.08)' : 'rgba(16, 185, 129, 0.08)', 
                    borderRadius: '12px', 
                    border: `2px solid ${isOverBudgetOverall ? 'var(--danger)' : 'var(--success)'}`,
                    minWidth: '180px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}>
                    <div style={{ fontSize: '0.7rem', color: isOverBudgetOverall ? 'var(--danger)' : 'var(--success)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px', fontWeight: 800 }}>Total Actual</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: isOverBudgetOverall ? 'var(--danger)' : 'var(--success)' }}>{formatCurrency(totalActual)}</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: isOverBudgetOverall ? 'var(--danger)' : 'var(--success)', marginTop: '2px' }}>
                       {totalPlan > 0 ? `${((totalActual / totalPlan) * 100).toFixed(1)}%` : '0%'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Responsibilities & Chart Section */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
                
                {/* Responsibilities Grid */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Materials Details (2300) - Moved to top */}
                {(project.detailedCosts?.['2300']?.plan || project.detailedCosts?.['2300']?.actual) && (
                  <div style={{ padding: '16px', background: 'var(--bg-tertiary)', borderRadius: '12px', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.95rem' }}>
                      <div style={{ padding: '6px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '6px', color: '#3b82f6' }}><Briefcase size={16} /></div>
                      Materials (2300)
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '0 4px' }}>
                      <div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Plan</div>
                        <div style={{ fontWeight: 600 }}>{formatCurrency(project.detailedCosts['2300'].plan)}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Actual</div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: project.detailedCosts['2300'].actual > project.detailedCosts['2300'].plan ? 'var(--danger)' : 'var(--success)' }}>
                            ({project.detailedCosts['2300'].plan > 0 ? ((project.detailedCosts['2300'].actual / project.detailedCosts['2300'].plan) * 100).toFixed(1) : 0}%)
                          </span>
                          <span style={{ fontWeight: 700, color: project.detailedCosts['2300'].actual > project.detailedCosts['2300'].plan ? 'var(--danger)' : 'var(--success)' }}>
                            {formatCurrency(project.detailedCosts['2300'].actual)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
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

                {/* Installation Costs (7301, 7302, 7303) */}
                {(project.detailedCosts?.['7301'] || project.detailedCosts?.['7302'] || project.detailedCosts?.['7303']) && (
                  <div style={{ padding: '16px', background: 'var(--bg-tertiary)', borderRadius: '12px', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '12px', border: '1px solid var(--border-light)' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--brand-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
                      Installation Costs
                    </div>
                    
                    {[
                      { code: '7301', label: 'Install Design' },
                      { code: '7302', label: 'Install Programmer' },
                      { code: '7303', label: 'Install Production' }
                    ].map(item => {
                      const cost = project.detailedCosts?.[item.code as keyof typeof project.detailedCosts];
                      if (!cost) return null;
                      const ratio = cost.plan > 0 ? (cost.actual / cost.plan) * 100 : 0;
                      return (
                        <div key={item.code} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <div style={{ fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
                            <span>{item.label} ({item.code})</span>
                            <span style={{ color: cost.actual > cost.plan ? 'var(--danger)' : 'var(--success)' }}>
                              {ratio.toFixed(0)}%
                            </span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.9 }}>
                            <span>Plan: {formatCurrency(cost.plan)}</span>
                            <span>Actual: {formatCurrency(cost.actual)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                </div>

                {/* Chart Section */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minHeight: '350px', background: 'var(--bg-secondary)', borderRadius: '12px', padding: '16px', border: '1px solid var(--border-light)' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>Cost Comparison (Plan vs Actual)</h3>
                  <div style={{ flex: 1 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "rgba(255,255,255,0.08)" : "var(--border-light)"} />
                        <XAxis 
                          dataKey="name" 
                          stroke={isDarkMode ? "#94a3b8" : "var(--text-tertiary)"} 
                          fontSize={12} 
                          tickLine={false} 
                          axisLine={false} 
                          dy={10}
                        />
                        <YAxis 
                          tickFormatter={(val) => `฿${(val/1000).toFixed(0)}k`} 
                          stroke={isDarkMode ? "#94a3b8" : "var(--text-tertiary)"} 
                          fontSize={12} 
                          tickLine={false} 
                          axisLine={false} 
                        />
                        <Tooltip 
                          itemSorter={(item) => (item.name === 'Plan' ? -1 : 1)}
                          formatter={(value: any, name: any) => [formatCurrency(Number(value) || 0), String(name)]}
                          contentStyle={{ 
                            backgroundColor: isDarkMode ? '#1e293b' : 'var(--bg-primary)', 
                            borderColor: isDarkMode ? '#334155' : 'var(--border-light)', 
                            borderRadius: '12px', 
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4)',
                            border: '1px solid var(--border-light)',
                            color: 'var(--text-primary)'
                          }}
                          itemStyle={{ color: 'var(--text-primary)' }}
                          cursor={{ fill: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }}
                        />
                        <Legend 
                          wrapperStyle={{ fontSize: '0.85rem', paddingTop: '20px' }} 
                          align="center"
                          verticalAlign="bottom"
                          iconType="rect"
                        />
                        <Bar 
                          name="Plan"
                          dataKey="Plan" 
                          fill="#3b82f6" 
                          radius={[6, 6, 0, 0]} 
                          barSize={32}
                        />
                        <Bar 
                          name="Actual"
                          dataKey="Actual" 
                          fill="var(--success)" 
                          radius={[6, 6, 0, 0]} 
                          barSize={32}
                          shape={(props: any) => {
                            const isOver = props.payload.Actual > props.payload.Plan;
                            const fill = isOver ? 'var(--danger)' : 'var(--success)';
                            return <rect x={props.x} y={props.y} width={props.width} height={props.height} fill={fill} rx={6} ry={6} />;
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
                <ProjectTimeline projectId={project.id} tasks={data.tasks} users={data.users} />
              </div>

            </div>
          );
        })}

        {filteredProjects.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px dashed var(--border-light)' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600 }}>No Projects Found</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Try adjusting your search query.</p>
            </div>
        )}
      </div>

       {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', padding: '48px 0', borderTop: '1px solid var(--border-light)', marginTop: '24px' }}>
            <button 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 1} 
              className="btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}
            >
                ← Previous Project
            </button>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>Project {currentPage} of {totalPages}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{filteredProjects.length} total projects found</span>
            </div>

            <button 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage === totalPages} 
              className="btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}
            >
                Next Project →
            </button>
        </div>
      )}
    </div>
  );
}

function ResponsibilityCard({ title, icon, data, users, formatCurrency }: any) {
  const isOverBudget = data.actualCost > data.plannedCost;

  return (
    <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', fontWeight: 600 }}>
        <div style={{ padding: '8px', background: 'var(--bg-tertiary)', borderRadius: '8px', color: 'var(--brand-primary)' }}>{icon}</div>
        {title}
      </div>
      <div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Users size={12} /> ผู้รับผิดชอบ (Assignees)
        </div>
        {users.length > 0 ? (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {users.map((user: any) => (
              <div key={user.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-primary)', padding: '4px 10px', borderRadius: '20px', border: '1px solid var(--border-light)', fontSize: '0.8rem', fontWeight: 500 }}>
                <UserAvatar src={user.avatarUrl} name={user.name} size={20} />
                {user.name}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>Unassigned</div>
        )}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: 'auto', paddingTop: '16px', borderTop: '1px dashed var(--border-light)' }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Plan Cost</div>
          <div style={{ fontWeight: 500, fontSize: '0.95rem' }}>{formatCurrency(data.plannedCost)}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Actual Cost</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <div style={{ fontWeight: 600, fontSize: '0.95rem', color: isOverBudget ? 'var(--danger)' : 'var(--success)' }}>
              {formatCurrency(data.actualCost)}
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 500, color: isOverBudget ? 'var(--danger)' : 'var(--success)', opacity: 0.8 }}>
              {data.plannedCost > 0 ? `${((data.actualCost / data.plannedCost) * 100).toFixed(1)}%` : '0%'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectTimeline({ projectId, tasks, users }: { projectId: string, tasks: Task[], users: User[] }) {
  const projectTasks = useMemo(() => tasks.filter(t => t.projectId === projectId), [projectId, tasks]);
  
  const { monthStart, monthEnd, days, months } = useMemo(() => {
    if (projectTasks.length === 0) {
      const baseDate = new Date();
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

  if (projectTasks.length === 0) return null;

  const colWidth = 32;

  const todayOffset = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (today < monthStart || today > monthEnd) return -1;
    return differenceInDays(today, monthStart) * colWidth;
  }, [monthStart, monthEnd, colWidth]);

  return (
    <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-light)', overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto', padding: '16px' }}>
        <div style={{ minWidth: 'fit-content', position: 'relative' }}>
          {todayOffset >= 0 && (
            <div style={{ position: 'absolute', left: `${500 + todayOffset + (colWidth / 2)}px`, top: '60px', bottom: 0, borderLeft: '2px dashed var(--danger)', opacity: 0.4, zIndex: 11, pointerEvents: 'none' }} title="Today" />
          )}
          <div style={{ display: 'flex', marginBottom: '8px' }}>
            <div style={{ width: '500px', flexShrink: 0, position: 'sticky', left: 0, background: 'var(--bg-secondary)', zIndex: 10, borderRight: '1px solid var(--border-light)' }}></div>
            {months.map((m, idx) => (
              <div key={idx} style={{ width: `${m.count * colWidth}px`, flexShrink: 0, textAlign: 'center', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-light)', paddingBottom: '6px' }}>{m.name}</div>
            ))}
          </div>
          <div style={{ display: 'flex', marginBottom: '12px' }}>
            <div style={{ width: '500px', flexShrink: 0, position: 'sticky', left: 0, background: 'var(--bg-secondary)', zIndex: 10, borderRight: '1px solid var(--border-light)' }}></div>
            {days.map((day, idx) => (
              <div key={idx} style={{ minWidth: `${colWidth}px`, textAlign: 'center', fontSize: '0.75rem', fontWeight: 500, color: day.getDay() === 0 || day.getDay() === 6 ? 'var(--danger)' : 'var(--text-tertiary)' }}>{format(day, 'd')}</div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {projectTasks.map((task, idx) => {
              const tStart = parseISO(task.startDate);
              const tEnd = parseISO(task.endDate);
              const drawStart = tStart < monthStart ? monthStart : tStart;
              const drawEnd = tEnd > monthEnd ? monthEnd : tEnd;
              if (drawEnd < monthStart || drawStart > monthEnd) return null;
              const leftOffset = differenceInDays(drawStart, monthStart) * colWidth;
              const width = (differenceInDays(drawEnd, drawStart) + 1) * colWidth;
              const user = users.find(u => u.id === task.userId);
              return (
                <div key={task.id} style={{ display: 'flex', alignItems: 'center', height: '48px', background: idx % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)', borderRadius: '8px' }}>
                  <div style={{ width: '500px', flexShrink: 0, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '10px', paddingRight: '16px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', position: 'sticky', left: 0, background: idx % 2 === 0 ? 'var(--bg-secondary)' : 'var(--bg-tertiary)', zIndex: 10, borderRight: '1px solid var(--border-light)' }}>
                    <UserAvatar src={user?.avatarUrl} name={user?.name || 'User'} size={24} />
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{user?.name || 'User'}</span>
                    <span style={{ color: 'var(--text-tertiary)', fontWeight: 400 }}>|</span>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--text-secondary)', fontWeight: 500 }}>{task.title}</span>
                  </div>
                  <div style={{ position: 'relative', flex: 1, height: '24px', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
                    <div 
                      style={{ 
                        position: 'absolute', 
                        left: `${leftOffset}px`, 
                        width: `${width}px`, 
                        height: '100%', 
                        background: 'linear-gradient(90deg, var(--brand-primary), var(--brand-secondary))', 
                        borderRadius: '12px', 
                        opacity: 0.9,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.65rem',
                        fontWeight: 600,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap'
                      }} 
                    >
                      {width > 60 && `${differenceInDays(tEnd, tStart) + 1}d`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
