import React, { useState, useEffect } from 'react';
import useCustomComponentStore from '../store/useCustomComponentStore';
import { Component, Pin } from '../utils/types';

const MyLibrary = () => {
  const { customComponents, addComponent, updateComponent, deleteComponent, loadComponents } = useCustomComponentStore();
  const [newComponentName, setNewComponentName] = useState('');
  const [newComponentType, setNewComponentType] = useState('');
  const [newComponentPins, setNewComponentPins] = useState(''); // Comma-separated pin IDs
  const [editingComponentId, setEditingComponentId] = useState<string | null>(null);

  useEffect(() => {
    loadComponents();
  }, [loadComponents]);

  const handleAddComponent = () => {
    if (newComponentName && newComponentType) {
      const pinsArray: Pin[] = newComponentPins.split(',').map(pinId => ({
        id: pinId.trim(),
        xOffset: 0, // Default for now
        yOffset: 0, // Default for now
      }));

      if (editingComponentId) {
        const updatedComponent: Component = {
          id: editingComponentId,
          type: newComponentType,
          x: 0, // Not used for custom components in library
          y: 0, // Not used for custom components in library
          pins: pinsArray,
        };
        updateComponent(updatedComponent);
        setEditingComponentId(null);
      } else {
        const newComponent: Component = {
          id: `custom-comp-${Date.now()}`,
          type: newComponentType,
          x: 0, // Not used for custom components in library
          y: 0, // Not used for custom components in library
          pins: pinsArray,
        };
        addComponent(newComponent);
      }
      setNewComponentName('');
      setNewComponentType('');
      setNewComponentPins('');
    }
  };

  const handleEditComponent = (component: Component) => {
    setNewComponentName(component.type);
    setNewComponentType(component.type);
    setNewComponentPins(component.pins.map(p => p.id).join(','));
    setEditingComponentId(component.id);
  };

  const handleDeleteComponent = (id: string) => {
    if (window.confirm('Are you sure you want to delete this custom component?')) {
      deleteComponent(id);
    }
  };

  return (
    <div className="my-library-page">
      <h2>My Component Library</h2>

      <div className="add-component-form">
        <h3>{editingComponentId ? 'Edit Custom Component' : 'Add New Custom Component'}</h3>
        <input
          type="text"
          placeholder="Component Name"
          value={newComponentName}
          onChange={(e) => setNewComponentName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Component Type (e.g., Connector, ECU)"
          value={newComponentType}
          onChange={(e) => setNewComponentType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Pin IDs (comma-separated, e.g., p1,p2,p3)"
          value={newComponentPins}
          onChange={(e) => setNewComponentPins(e.target.value)}
        />
        <button onClick={handleAddComponent}>{editingComponentId ? 'Update Component' : 'Add Component'}</button>
        {editingComponentId && (
          <button onClick={() => {
            setEditingComponentId(null);
            setNewComponentName('');
            setNewComponentType('');
            setNewComponentPins('');
          }}>Cancel Edit</button>
        )}
      </div>

      <div className="component-list">
        <h3>Existing Custom Components</h3>
        {customComponents.length === 0 ? (
          <p>No custom components added yet.</p>
        ) : (
          <ul>
            {customComponents.map((comp) => (
              <li key={comp.id}>
                <div>
                  <strong>{comp.type}:</strong> {comp.id} ({comp.pins.length} pins)
                </div>
                <div>
                  <button onClick={() => handleEditComponent(comp)}>Edit</button>
                  <button onClick={() => handleDeleteComponent(comp.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyLibrary;
