import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './context/ThemeProvider'
import { AuthProvider } from './context/AuthContext'
import { FavoritesProvider } from './context/FavoritesContext'
import ErrorBoundary from './components/common/ErrorBoundary'
import './utils/errorHandler' // Global error handling
import App from './App'
import './index.css'

// Main application entry point

console.log('🚀 [Main] Starting application...');

let root = null;
try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found in DOM');
  }
  console.log('✅ [Main] Root element found');

  root = ReactDOM.createRoot(rootElement);
  console.log('✅ [Main] React Root created');

  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <HelmetProvider>
          <BrowserRouter>
            <AuthProvider>
              <ThemeProvider>
                <FavoritesProvider>
                  <App />
                </FavoritesProvider>
              </ThemeProvider>
            </AuthProvider>
          </BrowserRouter>
        </HelmetProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
  console.log('✅ [Main] Render called successfully');
} catch (error) {
  console.error('❌ [Main] CRITICAL ERROR during application startup:', error);
  // Attempt to show error on screen if React fails completely
  const errorDiv = document.createElement('div');
  errorDiv.style.padding = '20px';
  errorDiv.style.color = 'red';
  errorDiv.style.background = '#fff';
  errorDiv.innerHTML = `<h1>Critical Startup Error</h1><pre>${error.toString()}\n${error.stack}</pre>`;
  document.body.prepend(errorDiv);
}
