'use client';

import { useState, useEffect, useMemo } from 'react';
import { format, parseISO, differenceInDays, startOfMonth, endOfMonth, eachDayOfInterval, addDays, isWeekend, nextDay } from 'date-fns';
import { Project, User, Task } from '@/lib/mockData';
import { Users, FolderKanban, AlertCircle, CheckCircle, Building, MapPin, AlertTriangle, Target, TrendingUp, TrendingDown, Eye, Calendar, Activity } from 'lucide-react';
import Skeleton from '@/components/Skeleton';
import UserAvatar from '@/components/UserAvatar';
import { useWorkloadLimits } from '@/lib/useWorkloadLimits';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

export default function Dashboard() {
  const [data, setData] = useState<{ projects: Project[], users: User[], tasks: Task[] }>({ projects: [], users: [], tasks: [] });
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [showAllAlerts, setShowAllAlerts] = useState(false);
  const { limits, isLoaded } = useWorkloadLimits();

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    return d;
  }, []);

  useEffect(() => {
    setMounted(true);
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
  }, []);

  // Calculate Task Overload Alerts
  const overloadAlerts = useMemo(() => {
    const alerts: any[] = [];
    const daysToCheck = Array.from({ length: 14 }).map((_, i) => addDays(today, i));

    data.users.forEach(user => {
      const userTasks = data.tasks.filter(t => t.userId === user.id);
      
      daysToCheck.forEach(day => {
        const dayTime = new Date(day);
        dayTime.setHours(12, 0, 0, 0);

        const dayTasks = userTasks.filter(task => {
          const tStart = parseISO(task.startDate);
          const tEnd = parseISO(task.endDate);
          tEnd.setHours(23, 59, 59, 999);
          return dayTime >= tStart && dayTime <= tEnd;
        });

        if (dayTasks.length > 1) {
          alerts.push({
            userId: user.id,
            userName: user.name,
            userAvatar: user.avatarUrl,
            date: dayTime,
            count: dayTasks.length,
            taskTitles: dayTasks.map(t => t.title)
          });
        }
      });
    });
    return alerts.sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [data.users, data.tasks, today]);
  
  // Calculate 7-Day Capacity Forecast (Working Days Only)
  const forecastData = useMemo(() => {
    if (!data.tasks.length || !isLoaded) return [];

    const workingDays: Date[] = [];
    let current = addDays(today, 1); // Start from tomorrow
    
    while (workingDays.length < 7) {
      if (!isWeekend(current)) {
        workingDays.push(new Date(current));
      }
      current = addDays(current, 1);
    }

    return workingDays.map(day => {
      day.setHours(12, 0, 0, 0);
      const dayData: any = {
        name: format(day, 'EEE d'),
        fullDate: format(day, 'MMM d, yyyy')
      };

      ['Engineering', 'Design', 'Production'].forEach(dept => {
        const deptLimit = limits[dept as keyof typeof limits] || 10;
        const deptTasks = data.tasks.filter(t => t.department === dept);
        
        let activeCount = 0;
        deptTasks.forEach(task => {
          const tStart = parseISO(task.startDate);
          const tEnd = parseISO(task.endDate);
          tEnd.setHours(23, 59, 59, 999);
          
          if (day >= tStart && day <= tEnd) {
            activeCount++;
          }
        });

        dayData[dept] = Math.round((activeCount / deptLimit) * 100);
      });

      return dayData;
    });
  }, [data.tasks, today, limits, isLoaded]);
  if (loading || !mounted || !isLoaded) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          <Skeleton height={100} borderRadius="12px" />
          <Skeleton height={100} borderRadius="12px" />
          <Skeleton height={100} borderRadius="12px" />
          <Skeleton height={100} borderRadius="12px" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          <Skeleton height={120} borderRadius="12px" />
          <Skeleton height={120} borderRadius="12px" />
          <Skeleton height={120} borderRadius="12px" />
          <Skeleton height={120} borderRadius="12px" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
          <div className="card" style={{ height: '400px' }}>
            <Skeleton width="60%" height={24} style={{ marginBottom: '24px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Skeleton height={40} />
              <Skeleton height={40} />
              <Skeleton height={40} />
              <Skeleton height={40} />
            </div>
          </div>
          <div className="card" style={{ height: '400px' }}>
            <Skeleton width="40%" height={24} style={{ marginBottom: '24px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Skeleton height={60} />
              <Skeleton height={60} />
              <Skeleton height={60} />
              <Skeleton height={60} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { projects } = data;

  // Helper to calculate project cost ratio (Actual / Plan)
  const getProjectMetrics = (project: Project) => {
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

    const ratio = totalPlan > 0 ? (totalActual / totalPlan) * 100 : 0;
    
    let status: 'Normal' | 'Warning' | 'Focus' | 'Over' = 'Normal';
    if (ratio > 100) status = 'Over';
    else if (ratio >= 90) status = 'Warning';
    else if (ratio >= 70) status = 'Focus';
    
    return { ratio, status, totalPlan, totalActual };
  };

  const projectWithMetrics = projects.map((p: Project) => ({ ...p, metrics: getProjectMetrics(p) }));

  // Filter only active projects for the urgency list
  const activeProjects = projectWithMetrics.filter((p: any) => p.status === 'Active');

  // Urgency Counts
  const counts = {
    Normal: activeProjects.filter((p: any) => p.metrics.status === 'Normal').length,
    Warning: activeProjects.filter((p: any) => p.metrics.status === 'Warning').length,
    Focus: activeProjects.filter((p: any) => p.metrics.status === 'Focus').length,
    Over: activeProjects.filter((p: any) => p.metrics.status === 'Over').length,
  };

  // Sort by urgency: Over > Warning > Focus > Normal, then by ratio desc
  const sortedProjects = [...activeProjects].sort((a: any, b: any) => {
    const priority: Record<string, number> = { Over: 0, Warning: 1, Focus: 2, Normal: 3 };
    if (priority[a.metrics.status] !== priority[b.metrics.status]) {
      return priority[a.metrics.status] - priority[b.metrics.status];
    }
    return b.metrics.ratio - a.metrics.ratio;
  });


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      

      {/* Top Value Cards & Status Summary Combined */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        {/* Row 2: Overload/Urgency Summary (Small Badges style) */}
        <div className="card glass-panel" style={{ background: 'rgba(239, 68, 68, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
          <div>
            <div style={{ color: 'var(--danger)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Over Budgets</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{counts.Over}</div>
          </div>
          <AlertCircle size={24} color="var(--danger)" />
        </div>

        <div className="card glass-panel" style={{ background: 'rgba(249, 115, 22, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
          <div>
            <div style={{ color: '#f97316', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Warning</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{counts.Warning}</div>
          </div>
          <AlertTriangle size={24} color="#f97316" />
        </div>

        <div className="card glass-panel" style={{ background: 'rgba(234, 179, 8, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
          <div>
            <div style={{ color: '#eab308', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Focus</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{counts.Focus}</div>
          </div>
          <Eye size={24} color="#eab308" />
        </div>

        <div className="card glass-panel" style={{ background: 'rgba(34, 197, 94, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
          <div>
            <div style={{ color: 'var(--success)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Normal</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{counts.Normal}</div>
          </div>
          <CheckCircle size={24} color="var(--success)" />
        </div>
      </div>

      {/* Overload Alerts Section */}
      {overloadAlerts.length > 0 && (
        <div className="card glass-panel" style={{ background: 'rgba(239, 68, 68, 0.03)', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ color: 'var(--danger)' }}><AlertCircle size={24} /></div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>การแจ้งเตือน: ภาระงานเกินกำหนด (Task Overload)</h2>
            </div>
            {overloadAlerts.length > 4 && (
              <button 
                onClick={() => setShowAllAlerts(!showAllAlerts)}
                className="btn-secondary"
                style={{ fontSize: '0.85rem', padding: '6px 12px', borderRadius: '8px' }}
              >
                {showAllAlerts ? 'Show Less' : `Show More (${overloadAlerts.length - 4})`}
              </button>
            )}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {(showAllAlerts ? overloadAlerts : overloadAlerts.slice(0, 4)).map((alert, idx) => (
              <div key={idx} style={{ 
                padding: '12px 16px', 
                background: 'var(--bg-secondary)', 
                border: '1px solid var(--border-light)', 
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <UserAvatar src={alert.userAvatar} name={alert.userName} size={32} />
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{alert.userName}</span>
                  </div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'white', background: 'var(--danger)', padding: '2px 8px', borderRadius: '6px' }}>
                    {alert.count} Tasks
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={14} color="var(--text-tertiary)" /> {format(alert.date, 'EEEE, d MMM yyyy')}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontStyle: 'italic', padding: '6px', background: 'var(--bg-tertiary)', borderRadius: '6px' }}>
                  {alert.taskTitles.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Grid Content */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(500px, 2fr)', gap: '24px', alignItems: 'start' }}>
        
        {/* Department Capacity Summary */}
        <div className="card glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Target size={24} color="var(--brand-primary)" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Today's Capacity</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1, justifyContent: 'center' }}>
            {['Design', 'Engineering', 'Production'].map(dept => {
              const deptTasks = data.tasks.filter(t => t.department === dept);
              const deptLimit = isLoaded ? limits[dept as keyof typeof limits] || 10 : 10;
              const deptColor = dept === 'Design' ? '#10b981' : dept === 'Engineering' ? '#3b82f6' : '#ec4899';
              const displayName = dept === 'Design' ? 'Elec. Design' : dept === 'Engineering' ? 'Programmer' : dept;

              let activeTasksToday = 0;
              deptTasks.forEach(task => {
                const tStart = new Date(task.startDate);
                const tEnd = new Date(task.endDate);
                tStart.setHours(0,0,0,0);
                tEnd.setHours(23,59,59,999);
                if (today >= tStart && today <= tEnd) activeTasksToday++;
              });
              
              const progress = Math.round((activeTasksToday / deptLimit) * 100);
              const isOver = progress >= 100;
              const isWarning = progress >= 80 && progress < 100;
              
              return (
                <div key={dept}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: deptColor }}></div>
                      <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{displayName}</span>
                    </div>
                    <span style={{ 
                      fontSize: '0.85rem', 
                      fontWeight: 700, 
                      color: isOver ? 'var(--danger)' : isWarning ? '#f59e0b' : 'var(--text-secondary)',
                      background: isOver ? 'var(--danger-bg)' : isWarning ? 'rgba(245, 158, 11, 0.1)' : 'transparent',
                      padding: '2px 8px',
                      borderRadius: '12px'
                    }}>
                      {progress}%
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '10px', background: 'var(--bg-tertiary)', borderRadius: '5px', overflow: 'hidden', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)' }}>
                    <div style={{ 
                      width: `${Math.min(progress, 100)}%`, 
                      height: '100%', 
                      background: deptColor,
                      borderRadius: '5px',
                      transition: 'width 0.5s ease-out',
                      position: 'relative'
                    }}>
                      {isOver && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.4), transparent)', animation: 'shimmer 2s infinite' }}></div>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontStyle: 'italic', textAlign: 'center' }}>
            * Capacity is calculated based on daily task load vs department limit
          </div>
        </div>

        {/* Project Status Urgency List */}
        <div className="card glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '500px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <AlertTriangle size={24} color="#f97316" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Project Urgency (Actual vs Plan)</h2>
          </div>
          
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, overflowY: 'auto', paddingRight: '8px' }}>
            {sortedProjects.map(p => {
              const statusColor = p.metrics.status === 'Over' ? 'var(--danger)' : 
                                p.metrics.status === 'Warning' ? '#f97316' : 
                                p.metrics.status === 'Focus' ? '#eab308' : 'var(--success)';
              
              return (
                <li key={p.id} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  padding: '12px', 
                  border: '1px solid var(--border-light)', 
                  borderRadius: '12px', 
                  background: p.metrics.status === 'Over' ? 'rgba(239, 68, 68, 0.05)' : 'rgba(255,255,255,0.02)',
                  transition: 'background 0.2s ease'
                }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: p.colorCode, boxShadow: `0 0 10px ${p.colorCode}44` }}></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ color: 'var(--brand-primary)', fontSize: '0.75rem', fontWeight: 700 }}>{p.projectNumber}</span>
                      <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>{p.name}</span>
                      <span style={{ 
                        fontSize: '0.6rem', 
                        padding: '1px 6px', 
                        borderRadius: '4px', 
                        background: statusColor, 
                        color: 'white',
                        fontWeight: 700,
                        textTransform: 'uppercase'
                      }}>
                        {p.metrics.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'flex', gap: '8px', marginTop: '2px' }}>
                      {p.customer && <span>{p.customer}</span>}
                      <span>•</span>
                      <span>Due: {p.endDate}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: statusColor }}>
                      {p.metrics.ratio.toFixed(0)}%
                    </div>
                  </div>
                </li>
              );
            })}
            {sortedProjects.length === 0 && (
              <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-tertiary)' }}>No active projects found.</div>
            )}
          </ul>
        </div>
      </div>

      {/* 7-Day Capacity Forecast Section (Full Width at bottom) */}
      <div className="card glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ color: 'var(--brand-primary)' }}><Activity size={24} /></div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>7-Day Capacity Forecast (Working Days)</h2>
        </div>
        
        <div style={{ width: '100%', height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={forecastData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                fontSize={12} 
                tick={{ fill: 'var(--text-tertiary)' }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                fontSize={12} 
                tick={{ fill: 'var(--text-tertiary)' }}
                tickFormatter={(val) => `${val}%`}
                domain={[0, (data: any) => Math.max(100, Math.ceil(data * 1.1))]}
              />
              <Tooltip 
                cursor={{ fill: 'var(--bg-tertiary)', opacity: 0.4 }}
                contentStyle={{ 
                  backgroundColor: 'var(--bg-primary)', 
                  borderColor: 'var(--border-light)', 
                  borderRadius: '12px',
                  boxShadow: 'var(--shadow-lg)',
                  padding: '12px'
                }}
                itemStyle={{ fontSize: '0.85rem', padding: '2px 0' }}
                labelStyle={{ fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}
                formatter={(value: any, name: any) => {
                  const val = Number(value) || 0;
                  const color = val >= 100 ? 'var(--danger)' : val >= 80 ? '#f97316' : 'var(--brand-primary)';
                  return [<span style={{ color, fontWeight: 700 }}>{val}%</span>, name];
                }}
              />
              <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px', fontSize: '0.85rem' }} />
              
              <Bar dataKey="Design" name="Elec. Design" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20}>
                {forecastData.map((entry, index) => (
                  <Cell key={`cell-design-${index}`} fill="#10b981" fillOpacity={entry.Design >= 100 ? 1 : entry.Design >= 80 ? 0.8 : 0.6} />
                ))}
              </Bar>
              <Bar dataKey="Engineering" name="Engineering" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20}>
                {forecastData.map((entry, index) => (
                  <Cell key={`cell-eng-${index}`} fill="#3b82f6" fillOpacity={entry.Engineering >= 100 ? 1 : entry.Engineering >= 80 ? 0.8 : 0.6} />
                ))}
              </Bar>
              <Bar dataKey="Production" name="Production" fill="#ec4899" radius={[4, 4, 0, 0]} barSize={20}>
                {forecastData.map((entry, index) => (
                  <Cell key={`cell-prod-${index}`} fill="#ec4899" fillOpacity={entry.Production >= 100 ? 1 : entry.Production >= 80 ? 0.8 : 0.6} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
    </div>
  );
}
