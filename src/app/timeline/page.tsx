'use client';

import { Project, User, Task } from '@/lib/mockData';
import { format, eachDayOfInterval, eachWeekOfInterval, eachMonthOfInterval, startOfWeek, endOfWeek, parseISO, addDays, addWeeks, addMonths, startOfMonth, endOfMonth, differenceInDays } from 'date-fns';
import { useState, useRef, useMemo, useEffect, Fragment } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Layout, Activity, Loader2 } from 'lucide-react';
import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from 'recharts';
import { useUserColors } from '@/lib/useUserColors';
import { useWorkloadLimits } from '@/lib/useWorkloadLimits';
import UserAvatar from '@/components/UserAvatar';

type ViewMode = 'Day' | 'Week' | 'Month';

export default function TimelinePage() {
  const [data, setData] = useState<{ projects: Project[], users: User[], tasks: Task[] }>({ projects: [], users: [], tasks: [] });
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('Day');
  const [displayType, setDisplayType] = useState<'timeline' | 'capacity'>('capacity');
  const [baseDate, setBaseDate] = useState(startOfMonth(new Date()));
  const [departmentFilter, setDepartmentFilter] = useState<string>('All');
  const { getColor } = useUserColors();
  const { limits, isLoaded } = useWorkloadLimits();

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

  // Determine the timespan and column width based on ViewMode
  let timeSpans: Date[] = [];
  let colWidth = 60; // Pixels per column

  if (viewMode === 'Day') {
    timeSpans = eachDayOfInterval({ start: baseDate, end: addDays(baseDate, 30) });
    colWidth = 60;
  } else if (viewMode === 'Week') {
    // Show 12 weeks
    const start = startOfWeek(baseDate, { weekStartsOn: 1 });
    timeSpans = eachWeekOfInterval({ start, end: addWeeks(start, 11) }, { weekStartsOn: 1 });
    colWidth = 100;
  } else if (viewMode === 'Month') {
    // Show 6 months
    const start = startOfMonth(baseDate);
    timeSpans = eachMonthOfInterval({ start, end: addMonths(start, 5) });
    colWidth = 150;
  }

  const filteredUsers = useMemo(() => {
    if (departmentFilter === 'All') return data.users;
    return data.users.filter(user => user.department === departmentFilter);
  }, [departmentFilter, data.users]);

  // Use the departments we're currently viewing
  const activeDepartments = useMemo(() => {
    if (departmentFilter === 'All') return ['Design', 'Engineering', 'Production'] as const;
    return [departmentFilter] as const;
  }, [departmentFilter]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loader2 className="animate-spin" size={48} color="var(--brand-primary)" />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%' }}>
      
      {/* Header Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button 
            className="card" 
            style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => {
              if (viewMode === 'Day') setBaseDate(addDays(baseDate, -14));
              if (viewMode === 'Week') setBaseDate(addWeeks(baseDate, -4));
              if (viewMode === 'Month') setBaseDate(addMonths(baseDate, -2));
            }}
          >
            <ChevronLeft size={20} />
          </button>
          <div className="card" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500 }}>
            <Calendar size={18} color="var(--brand-primary)" />
            {format(baseDate, 'MMM yyyy')}
          </div>
          <button 
            className="card" 
            style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => {
              if (viewMode === 'Day') setBaseDate(addDays(baseDate, 14));
              if (viewMode === 'Week') setBaseDate(addWeeks(baseDate, 4));
              if (viewMode === 'Month') setBaseDate(addMonths(baseDate, 2));
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          
          {/* Department Filter */}
          <div style={{ display: 'flex', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '8px', overflow: 'hidden' }}>
            {['All', 'Design', 'Engineering', 'Production'].map(dept => (
              <button 
                key={dept}
                onClick={() => setDepartmentFilter(dept)}
                style={{ 
                  flex: 1,
                  padding: '6px 12px', 
                  fontSize: '0.80rem',
                  fontWeight: departmentFilter === dept ? 600 : 400,
                  background: departmentFilter === dept ? 'var(--brand-primary)' : 'transparent',
                  color: departmentFilter === dept ? 'white' : 'var(--text-secondary)',
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {dept === 'All' ? 'All Departments' : dept === 'Design' ? 'Elec. Design' : dept === 'Engineering' ? 'Programmer' : 'Production'}
              </button>
            ))}
          </div>

          <div style={{ width: '1px', height: '24px', background: 'var(--border-light)' }}></div>
          {/* Display Type Toggle */}
          <div style={{ display: 'flex', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '8px', overflow: 'hidden' }}>
            <button 
              onClick={() => setDisplayType('timeline')}
              style={{ 
                padding: '6px 16px', 
                fontSize: '0.85rem',
                fontWeight: displayType === 'timeline' ? 600 : 400,
                background: displayType === 'timeline' ? 'var(--brand-primary)' : 'transparent',
                color: displayType === 'timeline' ? 'white' : 'var(--text-secondary)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Layout size={14} /> Timeline
            </button>
            <button 
              onClick={() => setDisplayType('capacity')}
              style={{ 
                padding: '6px 16px', 
                fontSize: '0.85rem',
                fontWeight: displayType === 'capacity' ? 600 : 400,
                background: displayType === 'capacity' ? 'var(--brand-primary)' : 'transparent',
                color: displayType === 'capacity' ? 'white' : 'var(--text-secondary)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Activity size={14} /> Capacity
            </button>
          </div>

          <div style={{ width: '1px', height: '24px', background: 'var(--border-light)' }}></div>

          {/* View Mode Toggle */}
          <div style={{ display: 'flex', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '8px', overflow: 'hidden' }}>
            {['Day', 'Week', 'Month'].map(mode => (
              <button 
                key={mode}
                onClick={() => setViewMode(mode as ViewMode)}
                style={{ 
                  padding: '6px 16px', 
                  fontSize: '0.85rem',
                  fontWeight: viewMode === mode ? 600 : 400,
                  background: viewMode === mode ? 'var(--brand-primary)' : 'transparent',
                  color: viewMode === mode ? 'white' : 'var(--text-secondary)',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {mode}
              </button>
            ))}
          </div>

      </div>
    </div>

      {/* Main Timeline View */}
      <div className="card" style={{ padding: displayType === 'capacity' ? '24px' : 0, overflowX: 'auto', overflowY: 'auto', display: 'flex', flexDirection: 'column', flex: 1, minHeight: '600px' }}>
        
        {displayType === 'capacity' ? (
          <div style={{ width: '100%', height: '100%', minHeight: '500px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '24px' }}>Capacity Overview</h2>
            <div style={{ flex: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart 
                  data={timeSpans.map(spanDate => {
                    let name = '';
                    let fullDateRange = '';
              
                    if (viewMode === 'Day') {
                      name = format(spanDate, 'd MMM');
                      fullDateRange = format(spanDate, 'EEEE, d MMM yyyy');
                    } else if (viewMode === 'Week') {
                      name = `W${format(spanDate, 'ww')}`;
                      const weekEnd = endOfWeek(spanDate, { weekStartsOn: 1 });
                      fullDateRange = `Week ${format(spanDate, 'ww')} (${format(spanDate, 'd MMM')} - ${format(weekEnd, 'd MMM yyyy')})`;
                    } else if (viewMode === 'Month') {
                      name = format(spanDate, 'MMM yyyy');
                      fullDateRange = format(spanDate, 'MMMM yyyy');
                    }
              
                    const dataPoint: any = { name, fullDateRange };
                    
                    activeDepartments.forEach(dept => {
                      const deptLimit = isLoaded ? limits[dept as keyof typeof limits] || 8 : 8;

                      let daysInSpan = [spanDate];
                      if (viewMode === 'Week') daysInSpan = eachDayOfInterval({ start: spanDate, end: endOfWeek(spanDate, { weekStartsOn: 1 }) });
                      if (viewMode === 'Month') daysInSpan = eachDayOfInterval({ start: spanDate, end: endOfMonth(spanDate) });
              
                      // Gather tasks belonging to this department
                      const usersInDept = data.users.filter(u => u.department === dept).map(u => u.id);
                      const deptTasks = data.tasks.filter(t => t.department === dept || usersInDept.includes(t.userId));

                      let peakLoadTasks = 0;
                      let installPeakLoadTasks = 0;
                      let totalLoadTasks = 0;
                      let installTotalLoadTasks = 0;
                      let workingDaysCount = 0;
                      
                      daysInSpan.forEach(day => {
                        const isWeekend = day.getDay() === 0 || day.getDay() === 6;
                        if (!isWeekend) workingDaysCount++;

                        let dayLoadTasks = 0;
                        let dayInstallLoadTasks = 0;
                        deptTasks.forEach(task => {
                          const tStart = parseISO(task.startDate);
                          const tEnd = parseISO(task.endDate);
                          tEnd.setHours(23, 59, 59, 999);
                          const currentDay = new Date(day);
                          currentDay.setHours(12, 0, 0, 0); // Middle of day to avoid TZ issues
                          if (currentDay >= tStart && currentDay <= tEnd) {
                            dayLoadTasks += 1;
                            const titleLower = task.title.toLowerCase();
                            if (titleLower.includes('install') || titleLower.includes('730')) {
                              dayInstallLoadTasks += 1;
                            }
                          }
                        });
                        
                        if (!isWeekend) {
                          totalLoadTasks += dayLoadTasks;
                          installTotalLoadTasks += dayInstallLoadTasks;
                        }
                        if (dayLoadTasks > peakLoadTasks) peakLoadTasks = dayLoadTasks;
                        if (dayInstallLoadTasks > installPeakLoadTasks) installPeakLoadTasks = dayInstallLoadTasks;
                      });
              
                      let percentage = 0;
                      let installPercentage = 0;
                      let installRatio = 0;
                      if (viewMode === 'Week') {
                        percentage = Math.round((totalLoadTasks / (deptLimit * 5)) * 100);
                        installPercentage = Math.round((installTotalLoadTasks / (deptLimit * 5)) * 100);
                        installRatio = totalLoadTasks > 0 ? Math.round((installTotalLoadTasks / totalLoadTasks) * 100) : 0;
                      } else if (viewMode === 'Month') {
                        const monthlyLimit = deptLimit * (workingDaysCount > 0 ? workingDaysCount : 1);
                        percentage = Math.round((totalLoadTasks / monthlyLimit) * 100);
                        installPercentage = Math.round((installTotalLoadTasks / monthlyLimit) * 100);
                        installRatio = totalLoadTasks > 0 ? Math.round((installTotalLoadTasks / totalLoadTasks) * 100) : 0;
                      } else {
                        percentage = Math.round((peakLoadTasks / deptLimit) * 100);
                        installPercentage = Math.round((installPeakLoadTasks / deptLimit) * 100);
                        installRatio = peakLoadTasks > 0 ? Math.round((installPeakLoadTasks / peakLoadTasks) * 100) : 0;
                      }
                      
                      dataPoint[dept] = percentage;
                      dataPoint[`${dept}_Install`] = installPercentage;
                      dataPoint[`${dept}_Install_Ratio`] = installRatio;
                    });
                    return dataPoint;
                  })}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                  <XAxis dataKey="name" stroke="var(--text-tertiary)" fontSize={12} tickMargin={10} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={(val) => `${val}%`} stroke="var(--text-tertiary)" fontSize={12} tickMargin={10} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-light)', borderRadius: '8px', boxShadow: 'var(--shadow-md)' }}
                    itemStyle={{ fontSize: '0.85rem', fontWeight: 500 }}
                    labelStyle={{ color: 'var(--text-secondary)', marginBottom: '8px' }}
                    formatter={(value: any, name: any, props: any) => {
                      const isInstall = String(name).includes('_Install');
                      const baseName = String(name).replace('_Install', '');
                      const displayName = baseName === 'Design' ? 'Elec. Design' : baseName === 'Engineering' ? 'Programmer' : 'Production';
                      const installCode = baseName === 'Design' ? '7301' : baseName === 'Engineering' ? '7302' : '7303';
                      if (isInstall) {
                        const ratio = props?.payload?.[`${baseName}_Install_Ratio`] || 0;
                        return [`${value}% Capacity (${ratio}% ของงานทั้งหมด)`, `${displayName} (Install ${installCode})`];
                      }
                      return [`${value}% Capacity`, displayName];
                    }}
                    labelFormatter={(label, payload) => {
                      if (payload && payload.length > 0 && payload[0].payload.fullDateRange) {
                        return payload[0].payload.fullDateRange;
                      }
                      return label;
                    }}
                  />
                  <Legend 
                    verticalAlign="top" 
                    height={36} 
                    iconType="circle" 
                    wrapperStyle={{ fontSize: '0.85rem' }} 
                    formatter={(value) => {
                      const isInstall = String(value).includes('_Install');
                      const baseName = String(value).replace('_Install', '');
                      const displayName = baseName === 'Design' ? 'Elec. Design' : baseName === 'Engineering' ? 'Programmer' : 'Production';
                      const installCode = baseName === 'Design' ? '7301' : baseName === 'Engineering' ? '7302' : '7303';
                      return isInstall ? `${displayName} (Install ${installCode})` : displayName;
                    }} 
                  />
                  <ReferenceLine y={100} stroke="#ef4444" strokeDasharray="3 3" strokeWidth={2} label={{ position: 'insideBottomLeft', value: `100% Capacity Limit`, fill: '#ef4444', fontSize: 12, offset: 10, fontWeight: 600 }} />
                  
                  {activeDepartments.map((dept) => {
                    const deptColor = dept === 'Design' ? '#10b981' : dept === 'Engineering' ? '#3b82f6' : '#ec4899';
                    return (
                      <Fragment key={dept}>
                        <Area 
                          type="monotone" 
                          dataKey={dept} 
                          stroke={deptColor} 
                          strokeWidth={2}
                          fill={deptColor} 
                          fillOpacity={0.4}
                          activeDot={{ r: 6, strokeWidth: 0 }}
                          dot={{ r: 4, fill: 'var(--bg-primary)', strokeWidth: 2, stroke: deptColor }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey={`${dept}_Install`} 
                          stroke={deptColor} 
                          strokeWidth={3}
                          strokeDasharray="5 5"
                          dot={false}
                          activeDot={{ r: 4 }}
                        />
                      </Fragment>
                    );
                  })}
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
        <div style={{ minWidth: `${250 + (timeSpans.length * colWidth)}px`, display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
          
          {/* Top Header - Dates */}
          <div style={{ 
            display: 'flex', 
            borderBottom: '1px solid var(--border-light)', 
            background: 'var(--bg-tertiary)',
            position: 'sticky',
            top: 0,
            zIndex: 30
          }}>
            {/* Sticky Top-Left Corner */}
            <div style={{ 
              width: '250px', 
              minWidth: '250px', 
              padding: '16px 20px', 
              borderRight: '1px solid var(--border-light)',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              position: 'sticky',
              left: 0,
              background: 'var(--bg-tertiary)',
              zIndex: 40
            }}>
              Team Member
            </div>
            
            <div style={{ display: 'flex', flex: 1 }}>
              {timeSpans.map((spanDate, idx) => {
                const isWeekend = viewMode === 'Day' && (spanDate.getDay() === 0 || spanDate.getDay() === 6);
                
                let topLabel = '';
                let mainLabel = '';

                if (viewMode === 'Day') {
                  topLabel = format(spanDate, 'EEE');
                  mainLabel = format(spanDate, 'd');
                } else if (viewMode === 'Week') {
                  topLabel = `W${format(spanDate, 'w')}`;
                  mainLabel = format(spanDate, 'MMM d');
                } else if (viewMode === 'Month') {
                  topLabel = format(spanDate, 'yyyy');
                  mainLabel = format(spanDate, 'MMM');
                }

                return (
                  <div key={idx} style={{ 
                    minWidth: `${colWidth}px`, 
                    maxWidth: `${colWidth}px`,
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    padding: '8px 0',
                    borderRight: '1px solid var(--border-light)',
                    background: isWeekend ? 'rgba(0,0,0,0.02)' : 'transparent',
                    color: isWeekend ? 'var(--text-tertiary)' : 'var(--text-primary)'
                  }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 500 }}>{topLabel}</div>
                    <div style={{ fontSize: '1rem', fontWeight: 600 }}>{mainLabel}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rows for Users */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {filteredUsers.map(user => {
              const userTasks = data.tasks.filter(t => t.userId === user.id);
              
              return (
                <div key={user.id} style={{ 
                  display: 'flex', 
                  borderBottom: '1px solid var(--border-light)',
                  minHeight: '100px',
                  height: 'max-content'
                }}>
                  {/* Sticky User Info Sidebar */}
                  <div style={{ 
                    width: '250px', 
                    minWidth: '250px', 
                    padding: '16px 20px', 
                    borderRight: '1px solid var(--border-light)',
                    background: 'var(--bg-secondary)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    position: 'sticky',
                    left: 0,
                    zIndex: 20
                  }}>
                    <UserAvatar 
                      src={user.avatarUrl} 
                      name={user.name} 
                      size={36} 
                      style={{ border: `2px solid ${getColor(user.id)}` }} 
                    />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', color: getColor(user.id) }}>{user.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{user.role}</div>
                    </div>
                  </div>

                  {/* Timeline Grid for User */}
                  <div style={{ position: 'relative', display: 'flex', flex: 1 }}>
                    {/* Grid Background */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex' }}>
                    {timeSpans.map((spanDate, idx) => {
                      const isWeekend = viewMode === 'Day' && (spanDate.getDay() === 0 || spanDate.getDay() === 6);
                      return (
                        <div key={idx} style={{ 
                          minWidth: `${colWidth}px`, 
                          maxWidth: `${colWidth}px`,
                          borderRight: '1px solid var(--border-light)',
                          background: isWeekend ? 'rgba(0,0,0,0.02)' : 'transparent',
                          height: '100%'
                        }}></div>
                      );
                    })}
                    </div>
                    
                    {/* Tasks */}
                    <div style={{ position: 'relative', flex: 1, minHeight: '80px', height: '100%', overflow: 'hidden' }}>
                    {userTasks.filter(t => !t.hideOnTimeline).map((task, idx) => {
                      const tStart = parseISO(task.startDate);
                      const tEnd = parseISO(task.endDate);
                      const project = data.projects.find(p => p.id === task.projectId);
                      
                      const viewStartDate = timeSpans[0];
                      const viewEndDate = viewMode === 'Day' ? timeSpans[timeSpans.length - 1] 
                                        : viewMode === 'Week' ? endOfWeek(timeSpans[timeSpans.length - 1], { weekStartsOn: 1 })
                                        : endOfMonth(timeSpans[timeSpans.length - 1]);
                      
                      if (tEnd < viewStartDate || tStart > viewEndDate) return null;

                      const drawStart = tStart < viewStartDate ? viewStartDate : tStart;
                      const drawEnd = tEnd > viewEndDate ? viewEndDate : tEnd;

                      let pixelsPerDay = colWidth;
                      if (viewMode === 'Week') pixelsPerDay = colWidth / 7;
                      if (viewMode === 'Month') pixelsPerDay = colWidth / 30;

                      const daysFromStart = differenceInDays(drawStart, viewStartDate);
                      const durationDays = differenceInDays(drawEnd, drawStart) + 1;

                      const left = daysFromStart * pixelsPerDay;
                      const width = durationDays * pixelsPerDay;
                      
                      let overlapLevel = 0;
                      for (let i = 0; i < idx; i++) {
                        const otherTask = userTasks[i];
                        const otherStart = parseISO(otherTask.startDate);
                        const otherEnd = parseISO(otherTask.endDate);
                        if (tStart <= otherEnd && tEnd >= otherStart) overlapLevel++;
                      }
                      
                      const topOffset = 10 + (overlapLevel * 45); 

                      return (
                        <div key={task.id} style={{
                          position: 'absolute',
                          left: `${left}px`,
                          top: `${topOffset}px`,
                          width: `${width - 4}px`,
                          height: '42px',
                          marginLeft: '2px',
                          background: project?.colorCode || 'var(--brand-primary)',
                          borderRadius: '6px',
                          color: 'white',
                          padding: '4px 8px',
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          justifyContent: 'center',
                          boxShadow: 'var(--shadow-sm)',
                          cursor: 'pointer',
                          transition: 'transform 0.1s ease',
                          zIndex: 10
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                        title={`${project?.projectNumber || ''} | ${project?.name || ''} | Customer: ${project?.customer || 'Unknown'}\nTask: ${task.title}\nDuration: ${differenceInDays(tEnd, tStart) + 1} Days`}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.65rem', opacity: 0.9, fontWeight: 700 }}>{project?.projectNumber || 'Unknown'}</span>
                            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '1px 3px', borderRadius: '4px', fontSize: '0.55rem', whiteSpace: 'nowrap' }}>
                              {differenceInDays(tEnd, tStart) + 1} d
                            </span>
                          </div>
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>{task.title}</span>
                        </div>
                      );
                    })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
        )}
      </div>
    </div>
  );
}
