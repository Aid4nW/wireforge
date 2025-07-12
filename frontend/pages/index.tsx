import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { loadDesignFromLocalStorage, saveDesignToLocalStorage } from '../utils/localStorage';
import { useBOMGenerator } from '../components/BOMGenerator';

const DynamicHarnessCanvas = dynamic(() => import('../components/HarnessCanvas'), {
  ssr: false,
});

export default function Home() {
  const [components, setComponents] = useState<any[]>([]); // Using any for now, will define types later
  const [wires, setWires] = useState<any[]>([]); // Using any for now, will define types later

  useEffect(() => {
    const loadedDesign = loadDesignFromLocalStorage();
    setComponents(loadedDesign.components);
    setWires(loadedDesign.wires);
  }, []);

  const { downloadBOM } = useBOMGenerator(components, wires);

  return (
    <>
      <h2>Current Project: Untitled Harness</h2>
      <div className="canvas-placeholder">
          <DynamicHarnessCanvas components={components} setComponents={setComponents} wires={wires} setWires={setWires} />
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
