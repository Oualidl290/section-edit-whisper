
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

// Listen for WordPress Bridge messages
window.addEventListener('message', function(event) {
  // Only listen to messages from the parent window
  if (event.source !== window.parent) return;
  
  // Handle widget initialization from WordPress Bridge
  if (event.data.type === 'init-client-widget' && event.data.projectId) {
    console.log('Received init message from WordPress Bridge:', event.data);
    
    initClientWidget({
      projectId: event.data.projectId
    });
    
    // Confirm ready state back to WordPress
    window.parent.postMessage({
      type: 'lef-widget-ready',
      widget: 'client',
      projectId: event.data.projectId
    }, '*');
  }
});

// Initialize on DOM content loaded (fallback method)
document.addEventListener('DOMContentLoaded', function() {
  // First, check if we already have a project ID from postMessage
  const storedProjectId = sessionStorage.getItem('widget_project_id');
  if (storedProjectId) {
    console.log('Widget already initialized with project ID:', storedProjectId);
    return;
  }
  
  // Fallback: Get project ID from parent container data attribute
  const rootContainer = document.getElementById('lef-client-root') || 
                        document.querySelector('[data-project-id]') ||
                        document.getElementById('root')?.parentElement;
  
  const projectId = rootContainer?.dataset?.projectId;
  
  if (projectId) {
    console.log('Initializing Client Widget with project ID from data attribute:', projectId);
    
    // Initialize the client widget
    initClientWidget({
      projectId: projectId
    });
    
    // Confirm ready state to WordPress
    window.parent.postMessage({
      type: 'lef-widget-ready',
      widget: 'client',
      projectId: projectId
    }, '*');
  } else {
    console.warn('No project ID found. Widget will initialize without project context.');
    
    // Initialize anyway for development/testing
    const rootElement = document.getElementById("root");
    if (rootElement) {
      createRoot(rootElement).render(<App />);
    }
  }
});

// Make initClientWidget available globally for potential manual initialization
(window as any).initClientWidget = initClientWidget;
