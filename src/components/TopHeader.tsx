'use client';

import { Bell, Search } from 'lucide-react';

export default function TopHeader() {
  return (
    <header className="top-header">
      <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--bg-tertiary)', padding: '8px 16px', borderRadius: 'var(--radius-full)', width: '300px' }}>
        <Search size={18} color="var(--text-tertiary)" />
        <input 
          type="text" 
          placeholder="Search projects or members..." 
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

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button style={{ position: 'relative' }}>
          <Bell size={20} color="var(--text-secondary)" />
          <span style={{ 
            position: 'absolute', 
            top: '-2px', left: '10px', 
            width: '8px', height: '8px', 
            backgroundColor: 'var(--danger)', 
            borderRadius: '50%' 
          }}></span>
        </button>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '1px solid var(--border-light)', paddingLeft: '20px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>Admin User</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>Director</div>
          </div>
          <img 
            src="https://i.pravatar.cc/150?u=admin" 
            alt="Current User" 
            style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
          />
        </div>
      </div>
    </header>
  );
}
