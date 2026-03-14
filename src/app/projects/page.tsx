'use client';

import { mockProjects, mockUsers } from '@/lib/mockData';
import { Briefcase, Code, PenTool, Users, Target, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

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
