'use client';

import React from 'react';
import { useSelectionStore } from '@/store/useSelectionStore';

const Toolbar = () => {
  const { saveDesignToLocalStorage, loadDesignFromLocalStorage } = useSelectionStore();

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-2">
        <button
          onClick={saveDesignToLocalStorage}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save
        </button>
        <button
          onClick={loadDesignFromLocalStorage}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Load
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
