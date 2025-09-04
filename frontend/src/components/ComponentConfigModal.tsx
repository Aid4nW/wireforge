"use client";

import React, { useState } from 'react';

interface ConnectorConfig {
  id: number; // Unique ID for key prop in React list rendering
  name: string;
  pinCount: number;
  startLetter: string;
}

interface ComponentConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, connectors: ConnectorConfig[]) => void;
  initialName?: string;
  initialConnectorsConfig?: ConnectorConfig[];
}

const ComponentConfigModal: React.FC<ComponentConfigModalProps> = ({
  isOpen, onClose, onSubmit, initialName, initialConnectorsConfig
}) => {
  const [name, setName] = useState(initialName || '');
  const [connectorsConfig, setConnectorsConfig] = useState<ConnectorConfig[]>(
    initialConnectorsConfig && initialConnectorsConfig.length > 0
      ? initialConnectorsConfig
      : [{ id: Date.now(), name: 'Connector 1', pinCount: 1, startLetter: 'A' }]
  );

  if (!isOpen) return null;

  const handleAddConnector = () => {
    setConnectorsConfig([...connectorsConfig, { id: Date.now(), name: `Connector ${connectorsConfig.length + 1}`, pinCount: 1, startLetter: 'A' }]);
  };

  const handleRemoveConnector = (id: number) => {
    setConnectorsConfig(connectorsConfig.filter(conn => conn.id !== id));
  };

  const handleConnectorChange = (id: number, field: keyof ConnectorConfig, value: string | number) => {
    setConnectorsConfig(connectorsConfig.map(conn =>
      conn.id === id ? { ...conn, [field]: value } : conn
    ));
  };

  const handleSubmit = () => {
    onSubmit(name, connectorsConfig);
    setName('');
    setConnectorsConfig([{ id: Date.now(), name: 'Connector 1', pinCount: 1, startLetter: 'A' }]); // Reset to initial state
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg w-96 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Configure Component</h2>
        <div className="mb-4">
          <label htmlFor="componentName" className="block text-sm font-bold mb-2">
            Component Name:
          </label>
          <input
            type="text"
            id="componentName"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <h3 className="text-lg font-semibold mb-3 dark:text-white">Connectors</h3>
        {connectorsConfig.map((connector, index) => (
          <div key={connector.id} className="mb-4 p-3 border rounded-lg bg-gray-50 dark:bg-gray-600">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium dark:text-white">Connector {index + 1}</h4>
              {connectorsConfig.length > 1 && (
                <button
                  onClick={() => handleRemoveConnector(connector.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="mb-2">
              <label htmlFor={`connectorName-${connector.id}`} className="block text-sm mb-1">
                Name:
              </label>
              <input
                type="text"
                id={`connectorName-${connector.id}`}
                className="shadow appearance-none border rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline text-sm"
                value={connector.name}
                onChange={(e) => handleConnectorChange(connector.id, 'name', e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor={`pinCount-${connector.id}`} className="block text-sm mb-1">
                Number of Pins:
              </label>
              <input
                type="number"
                id={`pinCount-${connector.id}`}
                className="shadow appearance-none border rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline text-sm"
                value={connector.pinCount}
                onChange={(e) => handleConnectorChange(connector.id, 'pinCount', parseInt(e.target.value) || 0)}
                min="0"
              />
            </div>
            <div className="mb-2">
              <label htmlFor={`startLetter-${connector.id}`} className="block text-sm mb-1">
                Starting Letter (A-Z):
              </label>
              <input
                type="text"
                id={`startLetter-${connector.id}`}
                className="shadow appearance-none border rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline text-sm uppercase"
                value={connector.startLetter}
                onChange={(e) => handleConnectorChange(connector.id, 'startLetter', e.target.value.charAt(0).toUpperCase())}
                maxLength={1}
              />
            </div>
          </div>
        ))}

        <button
          onClick={handleAddConnector}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded text-sm mb-4 w-full"
        >
          + Add Connector
        </button>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Component
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComponentConfigModal;