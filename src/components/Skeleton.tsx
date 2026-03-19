'use client';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

export default function Skeleton({ 
  width = '100%', 
  height = '20px', 
  borderRadius = 'var(--radius-md)', 
  className = '',
  style = {} 
}: SkeletonProps) {
  return (
    <div 
      className={`shimmer ${className}`}
      style={{ 
        width: typeof width === 'number' ? `${width}px` : width, 
        height: typeof height === 'number' ? `${height}px` : height, 
        borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
        ...style 
      }} 
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="card glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Skeleton width={48} height={48} borderRadius="12px" />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Skeleton width="60%" height={24} />
          <Skeleton width="40%" height={16} />
        </div>
      </div>
      <Skeleton width="100%" height={4} borderRadius="2px" />
    </div>
  );
}

export function SkeletonListItem() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', border: '1px solid var(--border-light)', borderRadius: '8px' }}>
      <Skeleton width={12} height={12} borderRadius="50%" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <Skeleton width="30%" height={16} />
        <Skeleton width="20%" height={12} />
      </div>
      <Skeleton width={40} height={20} borderRadius="10px" />
    </div>
  );
}
