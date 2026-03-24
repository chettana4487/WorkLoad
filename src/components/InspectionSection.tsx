'use client';

import { useState, useEffect } from 'react';
import { Upload, Download, History, CheckCircle, XCircle, Loader2, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';

interface Inspection {
  id: string;
  project_id: string;
  type: string;
  file_name: string;
  file_path: string;
  passed_items: number;
  dept_status: Record<string, string>;
  uploaded_at: string;
  downloadUrl?: string;
}

interface InspectionSectionProps {
  projectId: string;
  projectName: string;
}

export default function InspectionSection({ projectId, projectName }: InspectionSectionProps) {
  const [data, setData] = useState<{ history: Inspection[], latest: { EEP?: Inspection, EEW?: Inspection } }>({ history: [], latest: {} });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null); // 'EEP' or 'EEW'
  const [expandedType, setExpandedType] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const fetchInspections = async () => {
    try {
      const res = await fetch(`/api/inspection/${projectId}`);
      const d = await res.json();
      console.log('Inspection Data fetched:', d);
      if (res.ok) {
        setData(d);
      } else {
        console.error('API Error:', d.error);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInspections();
  }, [projectId]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(type);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('projectId', projectId);
    formData.append('type', type);

    try {
      const res = await fetch('/api/inspection/upload', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const result = await res.json();
        alert(`Success: ${result.msg}`);
        await fetchInspections();
      } else {
        const error = await res.json();
        alert(`Upload failed: ${error.error}`);
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(null);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}>
        <Loader2 className="animate-spin" size={24} />
      </div>
    );
  }

  const renderStatus = (inspection?: Inspection) => {
    if (!inspection) return <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>No data available</span>;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Passed Items</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--brand-primary)' }}>
              {inspection.passed_items} <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)' }}>topics</span>
            </div>
          </div>
          <a 
            href={inspection.downloadUrl} 
            download 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', padding: '6px 12px' }}
          >
            <Download size={14} /> Download
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {Object.entries(inspection.dept_status).map(([dept, status]) => (
            <div key={dept} style={{ 
              padding: '8px 12px', 
              background: 'var(--bg-tertiary)', 
              borderRadius: '8px', 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '1px solid var(--border-light)'
            }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>{dept}</span>
              <span style={{ 
                fontSize: '0.75rem', 
                fontWeight: 700, 
                color: status.toLowerCase().includes('pass') ? 'var(--success)' : 'var(--danger)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                {status.toLowerCase().includes('pass') ? <CheckCircle size={12} /> : <XCircle size={12} />}
                {status}
              </span>
            </div>
          ))}
        </div>
        
        <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontStyle: 'italic', borderTop: '1px dashed var(--border-light)', paddingTop: '8px' }}>
          Last updated: {format(new Date(inspection.uploaded_at), 'PPP HH:mm')}
        </div>
      </div>
    );
  };

  const types = ['EEP', 'EEW'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileText size={20} className="text-secondary" />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Inspection Check</h3>
        </div>
        <button 
          onClick={() => setShowHistory(!showHistory)} 
          className="btn-secondary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}
        >
          <History size={16} /> {showHistory ? 'Show Summary' : 'View History'}
        </button>
      </div>

      {!showHistory ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {types.map(type => (
            <div key={type} className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', background: 'var(--bg-secondary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>{type} Inspection</h4>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="file" 
                    id={`upload-${type}`} 
                    style={{ display: 'none' }} 
                    onChange={(e) => handleUpload(e, type)}
                    accept=".xlsx, .xls"
                  />
                  <label 
                    htmlFor={`upload-${type}`} 
                    className="btn-primary"
                    style={{ 
                        cursor: uploading === type ? 'not-allowed' : 'pointer', 
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px'
                    }}
                  >
                    {uploading === type ? <Loader2 className="animate-spin" size={14} /> : <Upload size={14} />}
                    {uploading === type ? 'Uploading...' : 'Upload File'}
                  </label>
                </div>
              </div>
              
              <div style={{ flex: 1 }}>
                {data.latest && renderStatus(data.latest[type as keyof typeof data.latest])}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-panel" style={{ background: 'var(--bg-secondary)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead style={{ background: 'var(--bg-tertiary)', borderBottom: '2px solid var(--border-light)' }}>
              <tr>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Date & Time</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Type</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>File Name</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Passed Items</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.history.length > 0 ? (
                data.history.map((item, idx) => (
                  <tr key={item.id} style={{ borderBottom: idx === data.history.length - 1 ? 'none' : '1px solid var(--border-light)' }}>
                    <td style={{ padding: '12px 16px' }}>{format(new Date(item.uploaded_at), 'yyyy-MM-dd HH:mm')}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ 
                        padding: '2px 8px', 
                        borderRadius: '4px', 
                        fontSize: '0.75rem', 
                        fontWeight: 700, 
                        background: item.type === 'EEP' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                        color: item.type === 'EEP' ? '#3b82f6' : 'var(--success)'
                      }}>
                        {item.type}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>{item.file_name}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600 }}>{item.passed_items}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <a 
                        href={item.downloadUrl} 
                        download 
                        className="btn-secondary"
                        style={{ padding: '4px 8px', fontSize: '0.8rem' }}
                      >
                        <Download size={14} />
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-tertiary)' }}>No history available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
