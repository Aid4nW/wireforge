// REQ-FUNC-LIB-001: Pre-populated Component Library
import React from 'react';

const ComponentLibrary: React.FC = () => {
  return (
    <div style={{ border: '1px solid lightgray', padding: '10px', width: '200px', height: '500px', overflowY: 'auto' }}>
      <h3>Component Library</h3>
      <ul>
        <li draggable="true" onDragStart={(e) => e.dataTransfer.setData('component/type', 'Connector A')}>Connector A</li>
        <li draggable="true" onDragStart={(e) => e.dataTransfer.setData('component/type', 'Sensor B')}>Sensor B</li>
        
      </ul>
    </div>
  );
};

export default ComponentLibrary;
