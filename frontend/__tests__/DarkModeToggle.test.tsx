import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DarkModeToggle from '../components/DarkModeToggle';

describe('DarkModeToggle', () => {
  it('renders the toggle switch and reflects isDarkMode prop', () => {
    const toggleThemeMock = jest.fn();

    // Test when isDarkMode is true
    const { rerender } = render(<DarkModeToggle isDarkMode={true} toggleTheme={toggleThemeMock} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();

    // Test when isDarkMode is false
    rerender(<DarkModeToggle isDarkMode={false} toggleTheme={toggleThemeMock} />);
    expect(checkbox).not.toBeChecked();
  });

  it('calls toggleTheme when the switch is clicked', () => {
    const toggleThemeMock = jest.fn();
    render(<DarkModeToggle isDarkMode={false} toggleTheme={toggleThemeMock} />);
    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);
    expect(toggleThemeMock).toHaveBeenCalledTimes(1);

    fireEvent.click(checkbox);
    expect(toggleThemeMock).toHaveBeenCalledTimes(2);
  });
});