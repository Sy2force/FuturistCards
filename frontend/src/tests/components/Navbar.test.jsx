// Unit tests for Navbar component
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import Navbar from '../../components/layout/Navbar';

// Mock components
vi.mock('../../components/DarkModeToggle', () => ({
  default: () => <div data-testid="dark-mode-toggle">Dark Mode Toggle</div>
}));

const renderWithProviders = (component, authValue, themeValue) => {
  const defaultAuthValue = {
    user: null,
    isAuthenticated: false,
    logout: vi.fn(),
    ...authValue
  };

  const defaultThemeValue = {
    isDarkMode: false,
    toggleDarkMode: vi.fn(),
    ...themeValue
  };

  return render(
    <BrowserRouter>
      <AuthContext.Provider value={defaultAuthValue}>
        <ThemeContext.Provider value={defaultThemeValue}>
          {component}
        </ThemeContext.Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

describe('Navbar', () => {
  it('renders navbar with logo', () => {
    renderWithProviders(<Navbar />);
    
    expect(screen.getByText('FuturistCards')).toBeInTheDocument();
  });

  it('shows login and register links when not authenticated', () => {
    renderWithProviders(<Navbar />);
    
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('shows user menu when authenticated', () => {
    const authValue = {
      user: { firstName: 'John', lastName: 'Doe', role: 'user' },
      isAuthenticated: true
    };

    renderWithProviders(<Navbar />, authValue);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });

  it('shows business-specific links for business users', () => {
    const authValue = {
      user: { firstName: 'John', lastName: 'Doe', role: 'business' },
      isAuthenticated: true
    };

    renderWithProviders(<Navbar />, authValue);
    
    expect(screen.getByText('My Cards')).toBeInTheDocument();
    expect(screen.getByText('Create Card')).toBeInTheDocument();
  });

  it('shows admin link for admin users', () => {
    const authValue = {
      user: { firstName: 'Admin', lastName: 'User', role: 'admin' },
      isAuthenticated: true
    };

    renderWithProviders(<Navbar />, authValue);
    
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  it('calls logout function when logout is clicked', () => {
    const mockLogout = vi.fn();
    const authValue = {
      user: { firstName: 'John', lastName: 'Doe', role: 'user' },
      isAuthenticated: true,
      logout: mockLogout
    };

    renderWithProviders(<Navbar />, authValue);
    
    // Open user menu
    fireEvent.click(screen.getByText('John Doe'));
    
    // Click logout
    fireEvent.click(screen.getByText('Logout'));
    
    expect(mockLogout).toHaveBeenCalled();
  });

  it('renders dark mode toggle', () => {
    renderWithProviders(<Navbar />);
    
    expect(screen.getByTestId('dark-mode-toggle')).toBeInTheDocument();
  });
});
