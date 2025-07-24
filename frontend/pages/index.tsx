import React from 'react';
import HarnessCanvas from '../components/HarnessCanvas';

import { Component, Wire, Pin } from '../utils/types';

// Define props type
type HomeProps = {
  components: Component[];
  setComponents: React.Dispatch<React.SetStateAction<Component[]>>;
  wires: Wire[];
  setWires: React.Dispatch<React.SetStateAction<Wire[]>>;
};

export default function Home({ components, setComponents, wires, setWires }: HomeProps) {
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
    </>
  )
}

