import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ThemeProvider } from './context/ThemeContext';
import './styles/index.css'
import './styles/animations.css'

// Production-ready main.jsx

// Render the complete React app
const renderApp = () => {
  const rootElement = document.getElementById('root')
  
  if (!rootElement) {
    throw new Error('Root element not found')
  }

  const root = ReactDOM.createRoot(rootElement)
    
  root.render(
    <React.StrictMode>
      <HelmetProvider>
        <ThemeProvider>
          <BrowserRouter future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}>
            <AuthProvider>
              <FavoritesProvider>
                <App />
                <Toaster 
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    className: 'text-sm',
                    style: {
                      borderRadius: '8px',
                      backgroundColor: 'var(--toast-bg)',
                      color: 'var(--toast-color)',
                    }
                  }} 
                />
              </FavoritesProvider>
            </AuthProvider>
          </BrowserRouter>
        </ThemeProvider>
      </HelmetProvider>
    </React.StrictMode>
  )
}

// Initialize app
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp)
} else {
  renderApp()
}
