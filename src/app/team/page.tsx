'use client';

import { useState, useMemo } from 'react';
import { mockUsers, mockProjects } from '@/lib/mockData';
import { Users, Briefcase, Activity, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { useUserColors } from '@/lib/useUserColors';

export default function UsersPage() {
  const { colors } = useUserColors();
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('All');

  // Compute workload per user
  const userWorkloads = useMemo(() => {
    return mockUsers.map(user => {
      // Find all projects where this user is assigned in any responsibility area
      const assignedProjects = mockProjects.filter(p => {
        const { design, program, production } = p.responsibilities;
        return design.userIds.includes(user.id) || 
               program.userIds.includes(user.id) || 
               production.userIds.includes(user.id);
      }).map(p => {
        // Determine in which roles they are assigned for this specific project
        const roles = [];
        if (p.responsibilities.design.userIds.includes(user.id)) roles.push('Design');
        if (p.responsibilities.program.userIds.includes(user.id)) roles.push('Program');
        if (p.responsibilities.production.userIds.includes(user.id)) roles.push('Production');
        
        return {
          ...p,
          assignedRoles: roles
        };
      });

      return {
        ...user,
        assignedProjects,
        totalProjects: assignedProjects.length
      };
    });
  }, []);

  // Filter users based on search and department
  const filteredUsers = useMemo(() => {
    return userWorkloads.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            user.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = departmentFilter === 'All' || user.department === departmentFilter;
      return matchesSearch && matchesDept;
    }).sort((a, b) => b.totalProjects - a.totalProjects); // Sort by most projects first
  }, [userWorkloads, searchTerm, departmentFilter]);

  // Data for the workload comparison chart
  const chartData = useMemo(() => {
    return filteredUsers.map(u => ({
      name: u.name,
      projects: u.totalProjects,
      department: u.department,
      id: u.id
    })).slice(0, 15); // Show top 15 in chart to avoid overcrowding
  }, [filteredUsers]);

  // Available departments for filter
  const departments = ['All', ...Array.from(new Set(mockUsers.map(u => u.department)))];

  const totalActiveProjects = new Set(userWorkloads.flatMap(u => u.assignedProjects.map(p => p.id))).size;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '8px' }}>Team Workload</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Overview of project assignments and current workload distribution among team members.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '16px' }}>
          <div className="card" style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ padding: '12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', color: '#3b82f6' }}>
              <Users size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Total Team Members</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{mockUsers.length}</div>
            </div>
          </div>
          
          <div className="card" style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', color: '#10b981' }}>
              <Briefcase size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Active Assignments</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{totalActiveProjects}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card" style={{ padding: '16px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <input 
          type="text" 
          placeholder="Search by name or role..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            minWidth: '200px',
            padding: '10px 16px',
            borderRadius: '8px',
            border: '1px solid var(--border-light)',
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)'
          }}
        />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Department:</span>
          <select 
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              border: '1px solid var(--border-light)',
              background: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Workload Comparison Chart */}
      <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', height: '400px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Workload Comparison (Top 15)</h2>
        <div style={{ flex: 1 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--text-tertiary)" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                angle={-45}
                textAnchor="end"
              />
              <YAxis 
                stroke="var(--text-tertiary)" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                contentStyle={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-light)', borderRadius: '8px' }}
                itemStyle={{ color: 'var(--text-primary)' }}
              />
              <Bar dataKey="projects" name="Assigned Projects" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[entry.id] || 'var(--brand-primary)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* User List & Projects Details */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '24px' }}>
        {filteredUsers.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            No team members found matching your filters.
          </div>
        ) : (
          filteredUsers.map(user => (
            <div key={user.id} className="card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              
              {/* User Header */}
              <div style={{ 
                padding: '20px', 
                borderBottom: '1px solid var(--border-light)', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '16px',
                background: 'var(--bg-secondary)',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: '4px',
                  backgroundColor: colors[user.id] || 'var(--brand-primary)'
                }} />
                
                <img 
                  src={user.avatarUrl} 
                  alt={user.name} 
                  style={{ width: '56px', height: '56px', borderRadius: '50%', border: '2px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} 
                />
                
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{user.name}</h3>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', gap: '8px', marginTop: '4px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--bg-tertiary)', padding: '2px 8px', borderRadius: '4px' }}>
                      {user.role}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--bg-tertiary)', padding: '2px 8px', borderRadius: '4px' }}>
                      {user.department}
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: user.totalProjects > 10 ? 'var(--danger)' : 'var(--brand-primary)' }}>
                    {user.totalProjects}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Projects</div>
                </div>
              </div>

              {/* Projects List */}
              <div style={{ padding: '20px', flex: 1, maxHeight: '300px', overflowY: 'auto' }}>
                {user.totalProjects === 0 ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-tertiary)', fontStyle: 'italic', gap: '8px' }}>
                    <AlertCircle size={16} /> No active assignments
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {user.assignedProjects.map(project => (
                      <div key={project.id} style={{ 
                        padding: '12px', 
                        border: '1px solid var(--border-light)', 
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '2px' }}>{project.projectNumber}</div>
                          <div style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-primary)' }}>{project.name}</div>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '4px' }}>
                          {project.assignedRoles.map(role => (
                            <span key={role} style={{ 
                              fontSize: '0.75rem', 
                              padding: '2px 6px', 
                              borderRadius: '4px',
                              backgroundColor: role === 'Design' ? 'rgba(59, 130, 246, 0.1)' : role === 'Program' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                              color: role === 'Design' ? '#2563eb' : role === 'Program' ? '#059669' : '#d97706',
                              fontWeight: 500
                            }}>
                              {role.slice(0, 3)}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
