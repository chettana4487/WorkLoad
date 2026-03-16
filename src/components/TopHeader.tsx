'use client';

import { Search, Sun, Moon, Menu } from 'lucide-react';
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
          backgroundColor: 'var(--bg-tertiary)', 
          padding: '8px 16px', 
          borderRadius: 'var(--radius-full)', 
          width: isMobile ? '100%' : '300px',
          maxWidth: isMobile ? '200px' : '300px'
        }}>
          <Search size={18} color="var(--text-tertiary)" style={{ flexShrink: 0 }} />
          <input 
            type="text" 
            placeholder={isMobile ? "Search..." : "Search projects or members..."} 
            style={{ 
              border: 'none', 
              background: 'transparent', 
              marginLeft: '8px',
              outline: 'none',
              color: 'var(--text-primary)',
              width: '100%',
              fontSize: '0.9rem'
            }} 
          />
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
