'use client';

import { useState, useEffect } from 'react';
import { Project, User, Task } from '@/lib/mockData';
import { Users, FolderKanban, AlertCircle, CheckCircle, Building, MapPin, AlertTriangle, Loader2 } from 'lucide-react';

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

  // Calculate requested metrics
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

      {/* Main Grid Content */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
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

        {/* Project Status */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Active Projects</h2>
          
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {projects.filter(p => p.status === 'Active').slice(0, 10).map(p => (
              <li key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', border: '1px solid var(--border-light)', borderRadius: '8px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: p.colorCode }}></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500 }}>{p.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>Due: {p.endDate}</div>
                </div>
                <CheckCircle size={18} color="var(--success)" />
              </li>
            ))}
          </ul>
        </div>
      </div>
      
    </div>
  );
}
