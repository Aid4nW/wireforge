"use client";

import React from 'react';

const DraggableComponent = ({ name }: { name: string }) => {
  return (
    <div
      className="p-2 border rounded bg-gray-100 dark:bg-gray-700 cursor-pointer"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', name);
      }}
    >
      {name}
    </div>
  );
};

const ComponentLibrary = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Component Library</h2>
      <div className="space-y-2">
        <DraggableComponent name="Connector" />
        <DraggableComponent name="Fuse" />
        <DraggableComponent name="Relay" />
      </div>
    </div>
  );
};

export default ComponentLibrary;
