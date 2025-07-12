import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { useState, useEffect } from 'react'
import DarkModeToggle from '../components/DarkModeToggle'
import ComponentLibrary from '../components/ComponentLibrary'
import dynamic from 'next/dynamic';

const DynamicHarnessCanvas = dynamic(() => import('../components/HarnessCanvas'), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState('light-mode');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
      document.body.classList.add(storedTheme);
    } else {
      document.body.classList.add('light-mode');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light-mode') {
      setTheme('dark-mode');
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark-mode');
    } else {
      setTheme('light-mode');
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light-mode');
    }
  };

  return (
    <>
      <header>
        <h1>WireForge</h1>
        <nav>
            <a href="#">Dashboard</a>
            <a href="#">Projects</a>
            <a href="#">Settings</a>
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
            <Component {...pageProps} />
        </main>
    </div>
    <footer>
        &copy; 2025 WireForge. All rights reserved.
    </footer>
      <DarkModeToggle isDarkMode={theme === 'dark-mode'} toggleTheme={toggleTheme} />
    </>
  )
}
