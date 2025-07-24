import React, { useState, useEffect } from 'react';
import useCustomComponentStore from '../store/useCustomComponentStore';

const ComponentLibrary: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { customComponents, loadComponents } = useCustomComponentStore();

  useEffect(() => {
    loadComponents();
  }, [loadComponents]);

  const toggleMenu = (menuName: string) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  return (
    <div data-testid="component-library">
      <h3>Components</h3>
      
      <div className="component-category">
        <button onClick={() => toggleMenu('Connector')}>Connector</button>
        {openMenu === 'Connector' && (
          <ul>
            <li draggable="true" onDragStart={(e) => e.dataTransfer.setData('component/type', 'Connector A')}>Connector A</li>
            <li draggable="true" onDragStart={(e) => e.dataTransfer.setData('component/type', 'Connector B')}>Connector B</li>
          </ul>
        )}
      </div>

      <div className="component-category">
        <button onClick={() => toggleMenu('ECU')}>ECU</button>
        {openMenu === 'ECU' && (
          <ul>
            <li draggable="true" onDragStart={(e) => e.dataTransfer.setData('component/type', 'ECU A')}>ECU A</li>
            <li draggable="true" onDragStart={(e) => e.dataTransfer.setData('component/type', 'ECU B')}>ECU B</li>
          </ul>
        )}
      </div>

      <div className="component-category">
        <button onClick={() => toggleMenu('Fuel')}>Fuel</button>
        {openMenu === 'Fuel' && (
          <ul>
            <li draggable="true" onDragStart={(e) => e.dataTransfer.setData('component/type', 'Fuel Pump')}>Fuel Pump</li>
            <li draggable="true" onDragStart={(e) => e.dataTransfer.setData('component/type', 'Fuel Injector')}>Fuel Injector</li>
          </ul>
        )}
      </div>

      <div className="component-category">
        <button onClick={() => toggleMenu('Ignition')}>Ignition</button>
        {openMenu === 'Ignition' && (
          <ul>
            <li draggable="true" onDragStart={(e) => e.dataTransfer.setData('component/type', 'Ignition Coil')}>Ignition Coil</li>
            <li draggable="true" onDragStart={(e) => e.dataTransfer.setData('component/type', 'Spark Plug')}>Spark Plug</li>
          </ul>
        )}
      </div>

      {customComponents.length > 0 && (
        <div className="component-category">
          <button onClick={() => toggleMenu('Custom')}>Custom Components</button>
          {openMenu === 'Custom' && (
            <ul>
              {customComponents.map((comp) => (
                <li key={comp.id} draggable="true" onDragStart={(e) => e.dataTransfer.setData('component/type', comp.type)}>
                  {comp.type}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default ComponentLibrary;
