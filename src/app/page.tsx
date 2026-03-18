'use client';

import { useState, useEffect } from 'react';
import { Project, User, Task } from '@/lib/mockData';
import { Users, FolderKanban, AlertCircle, CheckCircle, Building, MapPin, AlertTriangle, Loader2, Target, TrendingUp, TrendingDown, Eye } from 'lucide-react';

export default function Dashboard() {
  const [data, setData] = useState<{ projects: Project[], users: User[], tasks: Task[] }>({ projects: [], users: [], tasks: [] });
  const [loading, setLoading] = useState(true);

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
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loader2 className="animate-spin" size={48} color="var(--brand-primary)" />
      </div>
    );
  }

  const { projects } = data;

  // Helper to calculate project cost ratio (Actual / Plan)
  const getProjectMetrics = (project: Project) => {
    const totalPlan = (project.detailedCosts?.['2100']?.plan || project.responsibilities.design.plannedCost) + 
                      (project.detailedCosts?.['2400']?.plan || project.responsibilities.program.plannedCost) + 
                      (project.detailedCosts?.['4400']?.plan || project.responsibilities.production.plannedCost) +
                      (project.detailedCosts?.['2300']?.plan || 0);

    const totalActual = (project.detailedCosts?.['2100']?.actual || project.responsibilities.design.actualCost) + 
                        (project.detailedCosts?.['2400']?.actual || project.responsibilities.program.actualCost) + 
                        (project.detailedCosts?.['4400']?.actual || project.responsibilities.production.actualCost) +
                        (project.detailedCosts?.['2300']?.actual || 0);

    const ratio = totalPlan > 0 ? (totalActual / totalPlan) * 100 : 0;
    
    let status: 'Normal' | 'Warning' | 'Focus' | 'Over' = 'Normal';
    if (ratio > 100) status = 'Over';
    else if (ratio >= 90) status = 'Warning';
    else if (ratio >= 70) status = 'Focus';
    
    return { ratio, status, totalPlan, totalActual };
  };

  const projectWithMetrics = projects.map(p => ({ ...p, metrics: getProjectMetrics(p) }));

  // Filter only active projects for the urgency list
  const activeProjects = projectWithMetrics.filter(p => p.status === 'Active');

  // Urgency Counts
  const counts = {
    Normal: activeProjects.filter(p => p.metrics.status === 'Normal').length,
    Warning: activeProjects.filter(p => p.metrics.status === 'Warning').length,
    Focus: activeProjects.filter(p => p.metrics.status === 'Focus').length,
    Over: activeProjects.filter(p => p.metrics.status === 'Over').length,
  };

  // Sort by urgency: Over > Warning > Focus > Normal, then by ratio desc
  const sortedProjects = [...activeProjects].sort((a, b) => {
    const priority = { Over: 0, Warning: 1, Focus: 2, Normal: 3 };
    if (priority[a.metrics.status] !== priority[b.metrics.status]) {
      return priority[a.metrics.status] - priority[b.metrics.status];
    }
    return b.metrics.ratio - a.metrics.ratio;
  });

  const closedProjectsCount = projects.filter(p => p.status === 'Closed' || p.status === 'Completed').length;
  const inHouseCount = projects.filter(p => p.type === 'In-House').length;
  const onSiteCount = projects.filter(p => p.type === 'On-Site').length;
  const warningDelayCount = projects.filter(p => p.health === 'Warning' || p.health === 'Delay').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Header Area */}
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '8px' }}>Dashboard Overview</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Welcome back. Here is the current workload status for your departments.</p>
      </div>

      {/* Top Value Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
        
        <div className="card glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '12px', background: 'var(--success-bg)', borderRadius: '12px', color: 'var(--success)' }}>
            <CheckCircle size={28} />
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 700 }}>{closedProjectsCount}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>โครงการที่ปิด (Closed)</div>
          </div>
        </div>

        <div className="card glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '12px', background: 'var(--info-bg)', borderRadius: '12px', color: 'var(--info)' }}>
            <Building size={28} />
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 700 }}>{inHouseCount}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>โครงการ In-House</div>
          </div>
        </div>

        <div className="card glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '12px', background: 'var(--brand-primary)', borderRadius: '12px', color: 'white' }}>
            <MapPin size={28} />
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 700 }}>{onSiteCount}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>โครงการ On-Site</div>
          </div>
        </div>

        <div className="card glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '12px', background: 'var(--danger-bg)', borderRadius: '12px', color: 'var(--danger)' }}>
            <AlertTriangle size={28} />
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 700 }}>{warningDelayCount}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Warning / Delay</div>
          </div>
        </div>

      </div>

      {/* Project Status Urgency Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
        
        <div className="card glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '4px solid var(--danger)' }}>
          <div style={{ padding: '12px', background: 'var(--danger-bg)', borderRadius: '12px', color: 'var(--danger)' }}>
            <AlertCircle size={28} />
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 700 }}>{counts.Over}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Over (&gt;100%)</div>
          </div>
        </div>

        <div className="card glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '4px solid #f97316' }}>
          <div style={{ padding: '12px', background: 'rgba(249, 115, 22, 0.15)', borderRadius: '12px', color: '#f97316' }}>
            <AlertTriangle size={28} />
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 700 }}>{counts.Warning}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Warning (&gt;=90%)</div>
          </div>
        </div>

        <div className="card glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '4px solid #eab308' }}>
          <div style={{ padding: '12px', background: 'rgba(234, 179, 8, 0.15)', borderRadius: '12px', color: '#eab308' }}>
            <Eye size={28} />
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 700 }}>{counts.Focus}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Focus (&gt;=70%)</div>
          </div>
        </div>

        <div className="card glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '4px solid var(--success)' }}>
          <div style={{ padding: '12px', background: 'var(--success-bg)', borderRadius: '12px', color: 'var(--success)' }}>
            <CheckCircle size={28} />
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 700 }}>{counts.Normal}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Normal (&lt;70%)</div>
          </div>
        </div>

      </div>

      {/* Main Grid Content */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(500px, 2fr)', gap: '24px', alignItems: 'start' }}>
        
        {/* Department Workload Summary */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Department Workload</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {['Engineering', 'Design', 'Production'].map(dept => {
              // Calculate real workload or use fallback
              const deptTasks = data.tasks.filter(t => t.department === dept);
              const totalWorkload = deptTasks.reduce((acc, t) => acc + (t.workloadPercentage || 0), 0);
              const avgWorkload = deptTasks.length > 0 ? Math.round(totalWorkload / deptTasks.length) : 0;
              
              const progress = avgWorkload || (dept === 'Engineering' ? 85 : dept === 'Design' ? 60 : 45);
              const isOver = progress > 80;
              return (
                <div key={dept}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 500 }}>{dept}</span>
                    <span style={{ color: isOver ? 'var(--danger)' : 'var(--text-secondary)' }}>{progress}% Utilized</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ 
                      width: `${progress}%`, 
                      height: '100%', 
                      background: isOver ? 'var(--danger)' : 'var(--brand-primary)',
                      borderRadius: '4px'
                    }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Project Status Urgency List */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Project Urgency (Actual vs Plan)</h2>
          
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, maxHeight: 'calc(100vh - 420px)', minHeight: '400px', overflowY: 'auto', paddingRight: '4px' }}>
            {sortedProjects.map(p => {
              const statusColor = p.metrics.status === 'Over' ? 'var(--danger)' : 
                                p.metrics.status === 'Warning' ? '#f97316' : 
                                p.metrics.status === 'Focus' ? '#eab308' : 'var(--success)';
              
              return (
                <li key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', border: '1px solid var(--border-light)', borderRadius: '8px', background: p.metrics.status === 'Over' ? 'rgba(239, 68, 68, 0.05)' : 'transparent' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: p.colorCode }}></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {p.name}
                      <span style={{ 
                        fontSize: '0.65rem', 
                        padding: '2px 8px', 
                        borderRadius: '10px', 
                        background: statusColor, 
                        color: 'white',
                        textTransform: 'uppercase'
                      }}>
                        {p.metrics.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', display: 'flex', gap: '12px', marginTop: '4px' }}>
                      {p.customer && <span>Customer: <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{p.customer}</span></span>}
                      {p.customer && <span>•</span>}
                      <span>Budget: {p.metrics.ratio.toFixed(1)}%</span>
                      <span>•</span>
                      <span>Due: {p.endDate}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: statusColor }}>
                      {p.metrics.ratio.toFixed(1)}%
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
      
    </div>
  );
}
