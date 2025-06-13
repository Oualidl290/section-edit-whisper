
import { useState, useEffect } from 'react';

export const useProjectId = () => {
  const [projectId, setProjectId] = useState<string | null>(null);

  useEffect(() => {
    // Try to get project ID from sessionStorage first (set by postMessage or DOM)
    const storedProjectId = sessionStorage.getItem('widget_project_id');
    
    if (storedProjectId) {
      setProjectId(storedProjectId);
      return;
    }

    // Fallback: try to get from DOM element
    const rootContainer = document.getElementById('lef-client-root') || 
                          document.querySelector('[data-project-id]') ||
                          document.getElementById('root')?.parentElement;
    
    const domProjectId = rootContainer?.dataset?.projectId;
    
    if (domProjectId) {
      setProjectId(domProjectId);
      sessionStorage.setItem('widget_project_id', domProjectId);
    }

    // Listen for project ID updates via postMessage
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'init-client-widget' && event.data.projectId) {
        setProjectId(event.data.projectId);
        sessionStorage.setItem('widget_project_id', event.data.projectId);
      }
    };

    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return projectId;
};
