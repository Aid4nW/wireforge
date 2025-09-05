'use client';

import React, { useRef } from 'react';
import { useSelectionStore } from '@/store/useSelectionStore';

const Toolbar = () => {
  const { components, wires, setComponents, setWires, saveDesignToLocalStorage, loadDesignFromLocalStorage } = useSelectionStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const design = { components, wires, timestamp: new Date().toISOString() };
    const dataStr = JSON.stringify(design, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = 'wireforge-design.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        if (typeof text === 'string') {
          try {
            const { components, wires } = JSON.parse(text);
            setComponents(components);
            setWires(wires);
          } catch (error) {
            console.error("Error parsing JSON file:", error);
            alert('Invalid JSON file.');
          }
        }
      };
      reader.readAsText(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-2">
        <button
          onClick={saveDesignToLocalStorage}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save to Local
        </button>
        <button
          onClick={loadDesignFromLocalStorage}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Load from Local
        </button>
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Export Design
        </button>
        <button
          onClick={triggerFileInput}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Import Design
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImport}
          className="hidden"
          accept=".json"
        />
      </div>
    </div>
  );
};

export default Toolbar;
