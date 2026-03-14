'use client';

import { useState, useRef } from 'react';
import { mockUsers } from '@/lib/mockData';
import { useUserColors } from '@/lib/useUserColors';
import { useWorkloadLimits } from '@/lib/useWorkloadLimits';
import { Upload, Loader2, Settings, Lock } from 'lucide-react';

export default function SettingsPage() {
  const { colors, updateColor } = useUserColors();
  const { limits, updateLimit, isLoaded } = useWorkloadLimits();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check - in a real app this should be more secure
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('รหัสผ่านไม่ถูกต้อง (Incorrect password)');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/import', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Data imported successfully! The page will now refresh.');
        window.location.reload();
      } else {
        const errorData = await response.json();
        alert('Failed to import file: ' + (errorData.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('An error occurred during upload.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
      }}>
        <div className="card" style={{
          padding: '40px',
          maxWidth: '400px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '8px'
          }}>
            <Lock size={32} color="var(--primary-color, #3b82f6)" />
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '8px' }}>Restricted Access</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Please enter the password to access settings.
            </p>
          </div>

          <form onSubmit={handleLogin} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: `1px solid ${error ? 'var(--error-color, #ef4444)' : 'var(--border-light)'}`,
                  background: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                }}
                autoFocus
              />
              {error && (
                <p style={{ color: 'var(--error-color, #ef4444)', fontSize: '0.8rem', marginTop: '8px' }}>
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: 'var(--primary-color, #3b82f6)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'opacity 0.2s ease',
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            >
              Unlock Settings
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '8px' }}>Settings</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Manage application preferences and user data.</p>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Import Data (Excel)</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Upload a new Excel (.xlsx) workload schedule file to replace the current system data. The page will refresh upon successful import.
        </p>

        <div>
          <input
            type="file"
            accept=".xlsx"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              backgroundColor: isUploading ? 'var(--text-secondary)' : 'var(--primary-color, #3b82f6)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 500,
              cursor: isUploading ? 'wait' : 'pointer',
              opacity: isUploading ? 0.8 : 1,
              transition: 'all 0.2s ease',
            }}
          >
            {isUploading ? (
              <span style={{ display: 'flex', alignItems: 'center', animation: 'spin 1s linear infinite' }}>
                <Loader2 size={18} />
              </span>
            ) : (
              <Upload size={18} />
            )}
            <style>{`
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}</style>
            {isUploading ? 'กำลังนำเข้าข้อมูล กรุณารอสักครู่...' : 'Select Excel File'}
          </button>
        </div>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Settings size={20} /> Department Capacity Limits
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Set the maximum number of simultaneous tasks a department can handle per day. This limit acts as the 100% capacity threshold on the Timeline chart.
        </p>

        {isLoaded && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {(['Design', 'Engineering', 'Production'] as const).map(dept => (
              <div key={dept} style={{ 
                padding: '16px', 
                border: '1px solid var(--border-light)', 
                borderRadius: '8px',
                background: 'var(--bg-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ fontWeight: 500 }}>
                  {dept === 'Design' ? 'Elec. Design' : dept === 'Engineering' ? 'Programmer' : 'Production'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input 
                    type="number"
                    min="1"
                    max="100"
                    value={limits[dept] || ''}
                    onChange={(e) => updateLimit(dept, parseInt(e.target.value) || 1)}
                    style={{
                      width: '60px',
                      padding: '8px',
                      borderRadius: '6px',
                      border: '1px solid var(--border-light)',
                      background: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      textAlign: 'center',
                      fontWeight: 600
                    }}
                  />
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>tasks/day</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
