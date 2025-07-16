import React from 'react';

const ComponentLibrary: React.FC = () => {
  return (
    <ul data-testid="component-library">
      <li draggable="true" onDragStart={(e) => e.dataTransfer.setData('component/type', 'Connector A')}>Connector A</li>
      <li draggable="true" onDragStart={(e) => e.dataTransfer.setData('component/type', 'Sensor B')}>Sensor B</li>
      
    </ul>
  );
};

export default ComponentLibrary;
