import Skeleton from '@/components/Skeleton';

export default function TimelineLoading() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%' }}>
      {/* Header Controls Skeleton */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Skeleton width={40} height={40} />
          <Skeleton width={120} height={40} />
          <Skeleton width={40} height={40} />
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Skeleton width={300} height={36} borderRadius="8px" />
          <Skeleton width={200} height={36} borderRadius="8px" />
          <Skeleton width={150} height={36} borderRadius="8px" />
        </div>
      </div>

      {/* Main Timeline Card Skeleton */}
      <div className="card" style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Skeleton width="200px" height="24px" />
        
        {/* Chart Skeleton */}
        <div style={{ flex: 1, minHeight: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '300px', paddingBottom: '20px', borderBottom: '1px solid var(--border-light)' }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} width="6%" height={`${20 + Math.random() * 60}%`} borderRadius="4px 4px 0 0" />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} width="12%" height="12px" />
            ))}
          </div>
        </div>

        {/* Legend Skeleton */}
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Skeleton width={12} height={12} borderRadius="50%" />
            <Skeleton width={80} height={12} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Skeleton width={12} height={12} borderRadius="50%" />
            <Skeleton width={80} height={12} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Skeleton width={12} height={12} borderRadius="50%" />
            <Skeleton width={80} height={12} />
          </div>
        </div>
      </div>
    </div>
  );
}
