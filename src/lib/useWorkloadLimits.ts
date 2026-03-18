'use client';

import { useState, useEffect } from 'react';
import { supabase } from './supabase';

export type DepartmentLimits = {
  Design: number;
  Engineering: number;
  Production: number;
};

const DEFAULT_LIMITS: DepartmentLimits = {
  Design: 8,
  Engineering: 8,
  Production: 8
};

export function useWorkloadLimits() {
  const [limits, setLimits] = useState<DepartmentLimits>(DEFAULT_LIMITS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 1. Initial Fetch
    const fetchLimits = async () => {
      try {
        const response = await fetch('/api/data');
        const data = await response.json();
        if (data.workloadLimits) {
          setLimits(data.workloadLimits);
        }
      } catch (err) {
        console.error('Failed to fetch global workload limits:', err);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchLimits();

    // 2. Real-time Subscription
    const channel = supabase
      .channel('public:workload_limits')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'workload_limits',
          filter: 'id=eq.global'
        },
        (payload: any) => {
          if (payload.new && payload.new.limits) {
            setLimits(payload.new.limits);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateLimit = async (department: keyof DepartmentLimits, newLimit: number) => {
    // Optimistic update
    const updated = { ...limits, [department]: newLimit };
    setLimits(updated);

    try {
      const response = await fetch('/api/settings/limits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ limits: updated }),
      });

      if (!response.ok) {
        throw new Error('Failed to update limits on server');
      }
    } catch (err) {
      console.error('Update limit error:', err);
      // Revert if failed? (Optional: maybe notify user instead)
    }
  };

  return { limits, updateLimit, isLoaded };
}
