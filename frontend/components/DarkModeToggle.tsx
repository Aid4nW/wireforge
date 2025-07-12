import React from 'react';

interface DarkModeToggleProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <div className="theme-switch-wrapper">
      <span>Dark Mode</span>
      <label className="theme-switch" htmlFor="checkbox">
        <input type="checkbox" id="checkbox" checked={isDarkMode} onChange={toggleTheme} />
        <div className="slider round"></div>
      </label>
    </div>
  );
};

export default DarkModeToggle;