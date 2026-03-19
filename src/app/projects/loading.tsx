import Skeleton, { SkeletonCard, SkeletonListItem } from '@/components/Skeleton';

export default function ProjectsLoading() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Header Skeleton */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Skeleton width={300} height={32} />
        <Skeleton width={120} height={40} borderRadius="8px" />
      </div>

      {/* Grid Layout Skeleton */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '24px' }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', width: '70%' }}>
                <Skeleton width={12} height={12} borderRadius="50%" />
                <Skeleton width="100%" height={24} />
              </div>
              <Skeleton width={40} height={20} borderRadius="10px" />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Skeleton width="40%" height={16} />
              <Skeleton width="90%" height={14} />
            </div>

            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Skeleton width="100%" height={40} borderRadius="8px" />
              <Skeleton width="100%" height={40} borderRadius="8px" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
