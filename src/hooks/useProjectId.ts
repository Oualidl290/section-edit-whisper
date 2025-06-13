
import { useState, useEffect } from 'react';

export const useProjectId = () => {
  const [projectId, setProjectId] = useState<string | null>(null);

  useEffect(() => {
    // Try to get project ID from sessionStorage first
    const storedProjectId = sessionStorage.getItem('widget_project_id');
    
    if (storedProjectId) {
      setProjectId(storedProjectId);
      return;
    }

    // Fallback: try to get from DOM element
    const domProjectId = document.getElementById('lef-client-root')?.dataset?.projectId;
    
    if (domProjectId) {
      setProjectId(domProjectId);
      sessionStorage.setItem('widget_project_id', domProjectId);
    }
  }, []);

  return projectId;
};
