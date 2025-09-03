"use client";

import React from 'react';
import { useSelectionStore } from '@/store/useSelectionStore';
import { Connector, Pin } from './HarnessCanvas';

const PropertiesPanel = () => {
  const { selectedComponent, updateComponentProperties } = useSelectionStore();

  const handleAddConnector = () => {
    if (selectedComponent) {
      const newConnector: Connector = {
        id: `conn-${Date.now()}`,
        name: `Connector ${selectedComponent.connectors.length + 1}`,
        pins: [],
      };
      updateComponentProperties(selectedComponent.id, {
        connectors: [...selectedComponent.connectors, newConnector],
      });
    }
  };

  const handleRemoveConnector = (connectorId: string) => {
    if (selectedComponent) {
      const updatedConnectors = selectedComponent.connectors.filter(
        (conn) => conn.id !== connectorId
      );
      updateComponentProperties(selectedComponent.id, { connectors: updatedConnectors });
    }
  };

  const handlePinoutChange = (connectorId: string, pinoutString: string) => {
    if (selectedComponent) {
      const currentConnector = selectedComponent.connectors.find(conn => conn.id === connectorId);
      if (!currentConnector) return;

      const oldPins = currentConnector.pins;
      const newPinNames = pinoutString.split(',').map(name => name.trim()).filter(name => name !== '');

      const updatedPins: Pin[] = newPinNames.map(newName => {
        const existingPin = oldPins.find(oldPin => oldPin.name === newName);
        if (existingPin) {
          return existingPin; // Preserve existing ID if name matches
        } else {
          return { id: `pin-${Date.now()}-${newName}`, name: newName }; // New pin, generate new ID
        }
      });

      const updatedConnectors = selectedComponent.connectors.map((conn) =>
        conn.id === connectorId ? { ...conn, pins: updatedPins } : conn
      );
      updateComponentProperties(selectedComponent.id, { connectors: updatedConnectors });
    }
  };

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
      <div className="space-y-4">
        <div className="border p-4 rounded-lg shadow-sm">
          <h3 className="text-md font-semibold mb-2">Component Details</h3>
          <div className="mb-2">
            <label htmlFor="componentName" className="block text-sm font-bold">
              Name:
            </label>
            <input
              type="text"
              id="componentName"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline mt-1"
              value={selectedComponent.name}
              onChange={(e) => updateComponentProperties(selectedComponent.id, { name: e.target.value })}
            />
          </div>
          <p className="text-sm"><strong>X:</strong> {selectedComponent.x.toFixed(2)}</p>
          <p className="text-sm"><strong>Y:</strong> {selectedComponent.y.toFixed(2)}</p>
        </div>

        {selectedComponent.connectors && selectedComponent.connectors.length > 0 && (
          <div className="mt-4">
            <h3 className="text-md font-semibold mb-2">Connectors</h3>
            <button
              onClick={handleAddConnector}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm mb-2"
            >
              Add Connector
            </button>
            {selectedComponent.connectors.map((connector) => (
              <div key={connector.id} className="border p-2 mb-2">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor={`connectorName-${connector.id}`} className="block text-sm font-bold mb-1">
                    Name:
                  </label>
                  <input
                    type="text"
                    id={`connectorName-${connector.id}`}
                    className="shadow appearance-none border rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline text-sm"
                    value={connector.name}
                    onChange={(e) => {
                      const updatedConnectors = selectedComponent.connectors.map(conn =>
                        conn.id === connector.id ? { ...conn, name: e.target.value } : conn
                      );
                      updateComponentProperties(selectedComponent.id, { connectors: updatedConnectors });
                    }}
                  />
                  <button
                    onClick={() => handleRemoveConnector(connector.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
                  >
                    Remove
                  </button>
                </div>
                <div className="ml-2">
                  <h4 className="text-sm font-semibold mb-1">Pins (comma-separated)</h4>
                  <textarea
                    value={connector.pins.map(p => p.name).join(',')}
                    onChange={(e) => handlePinoutChange(connector.id, e.target.value)}
                    className="border rounded px-2 py-1 w-full h-20"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPanel;