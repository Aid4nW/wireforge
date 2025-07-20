import React from 'react';
import HarnessCanvas from '../components/HarnessCanvas';

interface Pin {
  id: string;
  xOffset: number;
  yOffset: number;
}

interface Component {
  id: string;
  type: string;
  x: number;
  y: number;
  pins: Pin[];
}

interface Wire {
  id: string;
  startComponentId: string;
  startPinId: string;
  endComponentId: string;
  endPinId: string;
}

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

