'use client';

import { Loader2 } from 'lucide-react';

interface LoadingProps {
  fullScreen?: boolean;
  message?: string;
  transparent?: boolean;
}

export default function Loading({ 
  fullScreen = true, 
  message = 'กำลังโหลดข้อมูล...', 
  transparent = false 
}: LoadingProps) {
  return (
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: fullScreen ? '100vh' : '100%',
        width: '100%',
        gap: '24px',
        background: transparent ? 'transparent' : (fullScreen ? 'var(--bg-primary)' : 'rgba(255, 255, 255, 0.05)'),
        backdropFilter: fullScreen && !transparent ? 'none' : 'blur(8px)',
        zIndex: 1000,
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      className="animate-fade-in"
    >
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* Animated Background Glow */}
        <div style={{
          position: 'absolute',
          width: '120px',
          height: '120px',
          background: 'radial-gradient(circle, var(--brand-primary) 0%, transparent 70%)',
          opacity: 0.15,
          borderRadius: '50%',
          filter: 'blur(20px)'
        }} className="animate-pulse-soft" />

        {/* Outer slow spinning ring with gradient */}
        <div style={{ 
          position: 'absolute',
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          border: '3px solid transparent',
          borderTopColor: 'var(--brand-primary)',
          borderRightColor: 'rgba(59, 130, 246, 0.1)',
          opacity: 0.6
        }} className="animate-spin-slow" />
        
        {/* Inner faster spinner */}
        <div style={{ 
          width: '64px',
          height: '64px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'var(--bg-secondary)',
          borderRadius: '50%',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-light)',
          zIndex: 1
        }}>
          <Loader2 
            className="animate-spin" 
            size={36} 
            color="var(--brand-primary)" 
            style={{ 
              filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.3))' 
            }} 
          />
        </div>
      </div>
      
      {message && (
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{ 
            color: 'var(--text-primary)', 
            fontSize: '1.1rem', 
            fontWeight: 600,
            letterSpacing: '0.025em',
            textShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }} className="animate-pulse-soft">
            {message}
          </div>
          <div style={{ 
            width: '140px', 
            height: '3px', 
            background: 'var(--bg-tertiary)', 
            borderRadius: 'var(--radius-full)',
            overflow: 'hidden',
            marginTop: '4px'
          }}>
            <div 
              style={{ 
                width: '60%', 
                height: '100%', 
                background: 'linear-gradient(90deg, var(--brand-primary), var(--brand-secondary))',
                borderRadius: 'inherit' 
              }} 
              className="shimmer"
            />
          </div>
        </div>
      )}
    </div>
  );
}
