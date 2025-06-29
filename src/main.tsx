
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App.tsx';
import './index.css';

// Register service worker for offline functionality only (no install prompts)
const updateSW = registerSW({
  onNeedRefresh() {
    // Auto-update without user prompt for better offline experience
    updateSW(true);
  },
  onOfflineReady() {
    console.log('App ready to work offline');
    // Optional: Show a subtle notification that offline mode is ready
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
