import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { useState, useEffect } from 'react'
import DarkModeToggle from '../components/DarkModeToggle'
import ComponentLibrary from '../components/ComponentLibrary'
import { loadDesignFromLocalStorage, saveDesignToLocalStorage } from '../utils/localStorage';
import { useBOMGenerator } from '../components/BOMGenerator';
import React from 'react';

// Define Wire and Component types
type Wire = {
  id: string;
  startComponentId: string;
  startPinId: string;
  endComponentId: string;
  endPinId: string;
};

type Pin = {
  id: string;
  xOffset: number;
  yOffset: number;
};

type Component = {
  id: string;
  type: string;
  x: number;
  y: number;
  pins: Pin[];
};

interface CustomAppProps extends AppProps {
  Component: AppProps['Component'] & {
    components: Component[];
    setComponents: React.Dispatch<React.SetStateAction<Component[]>>;
    wires: Wire[];
    setWires: React.Dispatch<React.SetStateAction<Wire[]>>;
  };
}

import dynamic from 'next/dynamic';

const DynamicHarnessCanvas = dynamic(() => import('../components/HarnessCanvas'), {
  ssr: false,
});

export default function App({ Component, pageProps }: CustomAppProps) {
  const [theme, setTheme] = useState('light-mode');
  const [components, setComponents] = useState<Component[]>([]);
  const [wires, setWires] = useState<Wire[]>([]);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSettingsMenuOpen, setSettingsMenuOpen] = useState(false);

  // Load theme and design from local storage on initial render
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
      document.body.classList.add(storedTheme);
    } else {
      document.body.classList.add('light-mode');
    }

    const { components: savedComponents, wires: savedWires } = loadDesignFromLocalStorage();
    setComponents(savedComponents);
    setWires(savedWires);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light-mode' ? 'dark-mode' : 'light-mode';
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  const { downloadBOM } = useBOMGenerator(components, wires);

  const handleSave = () => {
    saveDesignToLocalStorage(components, wires);
    
    setMenuOpen(false);
  };

  const handleLoad = () => {
    const loadedDesign = loadDesignFromLocalStorage();
    setComponents(loadedDesign.components);
    setWires(loadedDesign.wires);
    
    setMenuOpen(false);
  };

  const handlePrint = () => {
    window.print();
    setMenuOpen(false);
  }

  return (
    <>
      <header>
        <h1>WireForge</h1>
        <nav>
            <div className="file-menu">
              <button onClick={() => setMenuOpen(!isMenuOpen)} className="file-menu-button">
                File
              </button>
              {isMenuOpen && (
                <div className="file-menu-dropdown">
                  <a href="#" onClick={handleSave}>Save</a>
                  <a href="#" onClick={handleLoad}>Load</a>
                  <a href="#" onClick={downloadBOM}>Export BOM</a>
                  <a href="#" onClick={handlePrint}>Print</a>
                </div>
              )}
            </div>
            <a href="#">Dashboard</a>
            <a href="#">Projects</a>
            <div className="settings-menu">
              <button onClick={() => setSettingsMenuOpen(!isSettingsMenuOpen)} className="settings-menu-button">
                Settings
              </button>
              {isSettingsMenuOpen && (
                <div className="settings-menu-dropdown">
                  <DarkModeToggle isDarkMode={theme === 'dark-mode'} toggleTheme={toggleTheme} />
                </div>
              )}
            </div>
            <a href="#">Help</a>
        </nav>
    </header>
    <div className="container">
        <aside>
            <h3>Components</h3>
            <ComponentLibrary />
            <h3>Tools</h3>
            <ul>
                <li><a href="#">Wire Tool</a></li>
                <li><a href="#">Text Tool</a></li>
                <li><a href="#">Measure Tool</a></li>
            </ul>
        </aside>
        <main>
            <Component {...pageProps} components={components} setComponents={setComponents} wires={wires} setWires={setWires} />
        </main>
    </div>
    <footer>
        &copy; 2025 WireForge. All rights reserved.
    </footer>
    </>
  )
}
