'use client';

import { Wrench, ShieldAlert } from 'lucide-react';

export default function MaintenancePage() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-inter), system-ui, -apple-system, sans-serif',
      overflow: 'hidden'
    }}>
      {/* Background visual light leaks/glows */}
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
        top: '-10%',
        left: '-10%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
        bottom: '-10%',
        right: '-10%',
        pointerEvents: 'none'
      }} />

      {/* Main Container Card */}
      <div className="card glass-panel" style={{
        maxWidth: '580px',
        width: '100%',
        textAlign: 'center',
        padding: '56px 40px',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        background: 'rgba(30, 41, 59, 0.4)',
        backdropFilter: 'blur(20px)',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '28px',
        animation: 'fadeIn 0.6s ease'
      }}>
        
        {/* Animated Icon and Maintenance Badge */}
        <div style={{ position: 'relative', display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{
            width: '96px',
            height: '96px',
            borderRadius: '50%',
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--brand-primary)',
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.15)'
          }}>
            <Wrench size={40} className="animate-spin-slow" style={{ animationDuration: '6s' }} />
          </div>
          
          <div style={{
            position: 'absolute',
            bottom: '-4px',
            right: '-4px',
            background: '#eab308',
            color: '#0f172a',
            padding: '4px',
            borderRadius: '50%',
            border: '3px solid #1e293b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ShieldAlert size={16} />
          </div>
        </div>

        {/* Header Titles */}
        <div>
          <span style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            background: 'linear-gradient(90deg, #fbbf24, #f59e0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '10px',
            display: 'inline-block'
          }}>
            System Maintenance
          </span>
          <h1 style={{
            fontSize: '2.25rem',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            lineHeight: 1.2,
            background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '8px 0'
          }}>
            ปิดปรับปรุงระบบชั่วคราว
          </h1>
          <p style={{
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginTop: '16px',
            maxWidth: '480px'
          }}>
            ขออภัยในความไม่สะดวก ขณะนี้เรากำลังอัปเดตระบบเพื่อเพิ่มประสิทธิภาพและความรวดเร็วในการใช้งาน และจะกลับมาเปิดให้บริการอีกครั้งในเร็ว ๆ นี้
          </p>
        </div>

      </div>
    </div>
  );
}
