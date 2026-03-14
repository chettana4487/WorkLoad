'use client';

import { useState, useEffect } from 'react';
import { mockUsers } from './mockData';

const STORAGE_KEY = 'employee_colors';

// Helper to generate a distinct hex color from a string (user ID)
const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Use HSL to ensure colors are bright and distinct
  const h = Math.abs(hash) % 360; // Hue between 0 and 360
  const s = 70 + (Math.abs(hash) % 20); // Saturation between 70% and 90%
  const l = 55 + (Math.abs(hash) % 15); // Lightness between 55% and 70%
  
  // Convert HSL to Hex
  const lNorm = l / 100;
  const a = s * Math.min(lNorm, 1 - lNorm) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = lNorm - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

export function useUserColors() {
  const [colors, setColors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Load from local storage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setColors(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse user colors from local storage', e);
      }
    } else {
      // Initialize with locally deterministic distinct colors
      const initial: Record<string, string> = {};
      mockUsers.forEach((user) => {
        initial[user.id] = stringToColor(user.id);
      });
      setColors(initial);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    }
  }, []);

  const updateColor = (userId: string, color: string) => {
    const newColors = { ...colors, [userId]: color };
    setColors(newColors);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newColors));
  };

  const getColor = (userId: string) => {
    return colors[userId] || stringToColor(userId); // fallback dynamically distinct
  };

  return { colors, updateColor, getColor };
}
