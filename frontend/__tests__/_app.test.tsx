import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../pages/_app';
import { act } from 'react';

// Mock Next.js Component and pageProps
const MockComponent = () => <div>Mock Page</div>;
const mockPageProps = {};

describe('App', () => {
  const localStorageMock = (() => {
    let store: { [key: string]: string } = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();

  Object.defineProperty(window, 'localStorage', { value: localStorageMock });

  beforeEach(() => {
    localStorage.clear();
    document.body.className = ''; // Clear body classes before each test
  });

  it('initializes with light mode if no preference is stored in localStorage', () => {
    render(<App Component={MockComponent} pageProps={mockPageProps} />);
    expect(document.body).toHaveClass('light-mode');
    expect(document.body).not.toHaveClass('dark-mode');
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('initializes with dark mode if preference is stored in localStorage', () => {
    localStorage.setItem('theme', 'dark-mode');
    render(<App Component={MockComponent} pageProps={mockPageProps} />);
    expect(document.body).toHaveClass('dark-mode');
    expect(document.body).not.toHaveClass('light-mode');
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('toggles to dark mode and saves preference to localStorage when switch is clicked', () => {
    render(<App Component={MockComponent} pageProps={mockPageProps} />);
    const toggle = screen.getByRole('checkbox');

    act(() => {
      fireEvent.click(toggle);
    });

    expect(document.body).toHaveClass('dark-mode');
    expect(document.body).not.toHaveClass('light-mode');
    expect(localStorage.getItem('theme')).toBe('dark-mode');
    expect(toggle).toBeChecked();
  });

  it('toggles to light mode and saves preference to localStorage when switch is clicked again', () => {
    // Start in dark mode
    localStorage.setItem('theme', 'dark-mode');
    render(<App Component={MockComponent} pageProps={mockPageProps} />);
    const toggle = screen.getByRole('checkbox');

    act(() => {
      fireEvent.click(toggle);
    });

    expect(document.body).toHaveClass('light-mode');
    expect(document.body).not.toHaveClass('dark-mode');
    expect(localStorage.getItem('theme')).toBe('light-mode');
    expect(toggle).not.toBeChecked();
  });
});
