import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { registerSW } from 'virtual:pwa-register';
import App from './App';
import { LanguageProvider } from './contexts/LanguageContext';
import { AppErrorBoundary } from './components/ErrorBoundary';

registerSW({ immediate: true });

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <AppErrorBoundary>
        <App />
      </AppErrorBoundary>
    </LanguageProvider>
  </React.StrictMode>
);