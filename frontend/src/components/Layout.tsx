import React from 'react';
import ComponentLibrary from './ComponentLibrary';
import PropertiesPanel from './PropertiesPanel';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Left Sidebar for Component Library */}
      <aside className="w-64 bg-white dark:bg-gray-800 p-4 shadow-md">
        <ComponentLibrary />
      </aside>

      {/* Main Content Area for Canvas */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>

      {/* Right Sidebar for Properties Panel */}
      <aside className="w-64 bg-white dark:bg-gray-800 p-4 shadow-md">
        <PropertiesPanel />
      </aside>
    </div>
  );
};

export default Layout;
