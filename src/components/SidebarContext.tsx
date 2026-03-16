'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  isMobile: boolean;
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  closeDrawer: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Initialize state and handle resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      const tablet = window.innerWidth > 768 && window.innerWidth <= 1024;
      
      setIsMobile(mobile);
      
      // Auto-collapse on tablet
      if (tablet) {
        setIsCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const saved = localStorage.getItem('sidebarCollapsed');
    if (saved !== null) {
      setIsCollapsed(saved === 'true');
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsDrawerOpen(!isDrawerOpen);
    } else {
      setIsCollapsed(prev => {
        const newState = !prev;
        localStorage.setItem('sidebarCollapsed', String(newState));
        return newState;
      });
    }
  };

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <SidebarContext.Provider value={{ 
      isCollapsed, 
      toggleSidebar, 
      isMobile, 
      isDrawerOpen, 
      toggleDrawer, 
      closeDrawer 
    }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
