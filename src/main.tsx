
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Function to initialize the client widget
const initClientWidget = (config: { projectId: string }) => {
  console.log('Initializing Client Widget with config:', config);
  
  // Store project ID in sessionStorage for use throughout the app
  sessionStorage.setItem('widget_project_id', config.projectId);
  
  // Render the React app
  const rootElement = document.getElementById("root");
  if (rootElement) {
    createRoot(rootElement).render(<App />);
  }
};

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get project ID from parent container
  const projectId = document.getElementById('lef-client-root')?.dataset?.projectId;
  
  // Initialize your app with the project ID
  if (projectId) {
    console.log('Initializing Client Widget with project ID:', projectId);
    
    // Initialize the client widget
    initClientWidget({
      projectId: projectId
    });
    
    // Confirm ready state to WordPress
    window.postMessage({
      type: 'lef-widget-ready',
      widget: 'client',
      projectId: projectId
    }, '*');
  } else {
    console.error('Missing project ID for Client Widget');
    
    // Fallback: try to initialize anyway for development
    const rootElement = document.getElementById("root");
    if (rootElement) {
      createRoot(rootElement).render(<App />);
    }
  }
});

// Make initClientWidget available globally for potential manual initialization
(window as any).initClientWidget = initClientWidget;
