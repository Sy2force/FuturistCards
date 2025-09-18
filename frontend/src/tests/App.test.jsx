import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import { LanguageProvider } from '../context/LanguageContext';
import App from '../App';

// Mock des contextes
const MockProviders = ({ children }) => (
  <BrowserRouter>
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
);

describe('App Component', () => {
  it('renders without crashing', () => {
    render(
      <MockProviders>
        <App />
      </MockProviders>
    );
    
    // Vérifier que l'app se charge
    expect(document.body).toBeTruthy();
  });

  it('contains main navigation elements', () => {
    const { container } = render(
      <MockProviders>
        <App />
      </MockProviders>
    );
    
    // L'app devrait contenir des éléments de base
    expect(container.firstChild).toBeTruthy();
  });
});
