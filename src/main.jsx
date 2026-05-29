import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const baseUrl = import.meta.env.BASE_URL || '/';
    const swUrl = new URL(`${baseUrl}sw.js`, window.location.origin);

    navigator.serviceWorker.register(swUrl.href, { scope: baseUrl })
      .catch((error) => {
        console.warn('Service worker registration failed', error);
      });
  });
}
