'use client';

import { Sun, Moon, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSidebar } from './SidebarContext';

export default function TopHeader() {
  const { toggleSidebar, isMobile } = useSidebar();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;
    
    setTheme(initialTheme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
  };

  return (
    <header className="top-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '16px', flex: 1 }}>
        <button 
          onClick={toggleSidebar}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-secondary)',
            transition: 'all 0.2s ease'
          }}
          title="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>

        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: 'var(--brand-primary)', 
          padding: '8px 20px', 
          borderRadius: 'var(--radius-lg)', 
          width: isMobile ? '100%' : 'auto',
          minWidth: isMobile ? '200px' : '300px',
          fontSize: '0.9rem',
          color: 'white',
          fontWeight: '700',
          letterSpacing: '0.5px',
          boxShadow: 'var(--shadow-sm)',
          textShadow: '0 1px 2px rgba(0,0,0,0.1)'
        }}>
          ELECTRICAL ENGINEERING (PPNs)
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '20px' }}>
        <button 
          onClick={toggleTheme}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-secondary)',
            transition: 'all 0.2s ease'
          }}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </header>
  );
}
