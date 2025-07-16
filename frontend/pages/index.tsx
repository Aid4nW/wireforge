import React, { useState, useEffect } from 'react';

import { loadDesignFromLocalStorage, saveDesignToLocalStorage } from '../utils/localStorage';
import { useBOMGenerator } from '../components/BOMGenerator';

import HarnessCanvas from '../components/HarnessCanvas';
import { useLayoutEffect as reactUseLayoutEffect } from 'react';

// Define Wire type (replace with actual definition if available)
type Wire = {
  id: string;
  startComponentId: string;
  startPinId: string;
  endComponentId: string;
  endPinId: string;
  // Add other properties as needed
};

  

export default function Home() {
  const [components, setComponents] = useState<any[]>([]); // Using any for now, will define types later
  const [wires, setWires] = useState<Wire[]>([]);

  useLayoutEffect(() => {
    const { components: savedComponents, wires: savedWires } = loadDesignFromLocalStorage();
    setComponents(savedComponents);
    setWires(savedWires);
  }, []);

  const { downloadBOM } = useBOMGenerator(components, wires);

  return (
    <>
      <h2>Current Project: Untitled Harness</h2>
      <div className="canvas-placeholder">
          <HarnessCanvas
            components={components}
            setComponents={setComponents}
            wires={wires}
            setWires={setWires}
            data-testid="harness-canvas"
          />
      </div>
      <div className="controls">
          <button onClick={() => saveDesignToLocalStorage(components, wires)}>Save Project</button>
          <button onClick={() => {
            const loadedDesign = loadDesignFromLocalStorage();
            setComponents(loadedDesign.components);
            setWires(loadedDesign.wires);
          }}>Load Project</button>
          <button onClick={downloadBOM}>Export BOM</button>
          <button>Print Design</button>
      </div>
    </>
  )
}
function useLayoutEffect(effect: () => void | (() => void), deps: React.DependencyList) {
  return reactUseLayoutEffect(effect, deps);
}

