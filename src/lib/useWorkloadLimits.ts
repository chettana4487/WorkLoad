'use client';

import { useState, useEffect } from 'react';

type DepartmentLimits = {
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
    try {
      const stored = localStorage.getItem('workload-limits');
      if (stored) {
        setLimits(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse workload limits from local storage', e);
    }
    setIsLoaded(true);
  }, []);

  const updateLimit = (department: keyof DepartmentLimits, newLimit: number) => {
    const updated = { ...limits, [department]: newLimit };
    setLimits(updated);
    localStorage.setItem('workload-limits', JSON.stringify(updated));
  };

  return { limits, updateLimit, isLoaded };
}
