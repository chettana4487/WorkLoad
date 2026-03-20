export const getDepartmentColor = (dept?: string) => {
  if (dept === 'Design') return '#10b981'; // Green
  if (dept === 'Engineering') return '#3b82f6'; // Blue
  if (dept === 'Production') return '#ec4899'; // Pink
  return '#6366f1'; // Default Indigo
};
