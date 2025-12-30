import '@testing-library/jest-dom';
import { beforeAll, afterAll, vi } from 'vitest';

// Mock IntersectionObserver
Object.defineProperty(globalThis, 'IntersectionObserver', {
  writable: true,
  value: class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
  },
});

// Mock fetch for API calls
Object.defineProperty(globalThis, 'fetch', {
  writable: true,
  value: vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({}),
    })
  ),
});

// Mock ResizeObserver
Object.defineProperty(globalThis, 'ResizeObserver', {
  writable: true,
  value: class ResizeObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
  },
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: vi.fn(),
});

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(() => null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  writable: true,
  value: localStorageMock,
});

// Mock sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(() => null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'sessionStorage', {
  writable: true,
  value: sessionStorageMock,
});

// Suppress console warnings during tests
beforeAll(() => {
  // Suppress specific React warnings during tests
  const suppressedWarnings = [
    'ReactDOM.render is no longer supported',
    'Warning: componentWillMount has been renamed',
    'Warning: componentWillReceiveProps has been renamed'
  ];
  
  const originalWarn = console.warn;
  console.warn = (...args) => {
    const message = typeof args[0] === 'string' ? args[0] : '';
    const shouldSuppress = suppressedWarnings.some(warning => message.includes(warning));
    
    if (!shouldSuppress) {
      originalWarn(...args);
    }
  };
});

afterAll(() => {
});
