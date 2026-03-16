'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, CalendarDays, Users, FolderKanban, Settings, X } from 'lucide-react';
import { useSidebar } from './SidebarContext';

export default function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, isMobile, isDrawerOpen, closeDrawer } = useSidebar();

  const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Machine', href: '/dashboard', icon: FolderKanban },
    { name: 'Team Workload', href: '/team', icon: Users },
    { name: 'Planning', href: '/timeline', icon: CalendarDays },
  ];

  const handleLinkClick = () => {
    if (isMobile) {
      closeDrawer();
    }
  };

  return (
    <>
      <div className={`sidebar-backdrop ${isMobile && isDrawerOpen ? 'show' : ''}`} onClick={closeDrawer} />
      
      <aside className={`sidebar ${isCollapsed && !isMobile ? 'collapsed' : ''} ${isMobile && isDrawerOpen ? 'mobile-open' : ''}`}>
        <div style={{ padding: isCollapsed && !isMobile ? '24px 16px' : '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ minWidth: '32px', width: '32px', height: '32px', borderRadius: '8px', background: 'var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', flexShrink: 0 }}>
              A.I.
            </div>
            {(!isCollapsed || isMobile) && (
              <h1 className="sidebar-label" style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>E.E. Workload</h1>
            )}
          </div>
          {isMobile && (
            <button onClick={closeDrawer} style={{ color: 'var(--text-secondary)' }}>
              <X size={24} />
            </button>
          )}
        </div>

        <nav style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, overflowX: 'hidden' }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                title={isCollapsed && !isMobile ? item.name : ''}
                onClick={handleLinkClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  color: isActive ? 'white' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--brand-primary)' : 'transparent',
                  fontWeight: isActive ? 500 : 400,
                  transition: 'all 0.2s ease',
                  minWidth: 'fit-content'
                }}
                onMouseEnter={(e) => {
                  if (!isActive && !isMobile) {
                    e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive && !isMobile) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }
                }}
              >
                <Icon size={20} style={{ flexShrink: 0 }} />
                {(!isCollapsed || isMobile) && <span className="sidebar-label">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: '16px', borderTop: '1px solid var(--border-light)', overflow: 'hidden' }}>
          <Link 
            href="/settings" 
            title={isCollapsed && !isMobile ? 'Settings' : ''}
            onClick={handleLinkClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              width: '100%',
              borderRadius: '8px',
              color: pathname === '/settings' ? 'white' : 'var(--text-secondary)',
              backgroundColor: pathname === '/settings' ? 'var(--brand-primary)' : 'transparent',
              fontWeight: pathname === '/settings' ? 500 : 400,
              transition: 'all 0.2s ease',
              minWidth: 'fit-content'
            }}
            onMouseEnter={(e) => {
              if (pathname !== '/settings' && !isMobile) {
                e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }
            }}
            onMouseLeave={(e) => {
              if (pathname !== '/settings' && !isMobile) {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }
            }}
          >
            <Settings size={20} style={{ flexShrink: 0 }} />
            {(!isCollapsed || isMobile) && <span className="sidebar-label">Settings</span>}
          </Link>
        </div>
      </aside>
    </>
  );
}
