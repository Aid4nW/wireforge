"use client";

import React from 'react';
import { useSelectionStore } from '@/store/useSelectionStore';

const PropertiesPanel = () => {
  const { selectedComponent } = useSelectionStore();

  if (!selectedComponent) {
    return (
      <div>
        <h2 className="text-lg font-semibold mb-4">Properties</h2>
        <p>Select a component to view its properties.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Properties</h2>
      <div className="space-y-2">
        <p><strong>Name:</strong> {selectedComponent.name}</p>
        <p><strong>X:</strong> {selectedComponent.x.toFixed(2)}</p>
        <p><strong>Y:</strong> {selectedComponent.y.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default PropertiesPanel;
