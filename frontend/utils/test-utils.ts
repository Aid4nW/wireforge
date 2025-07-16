import { Component, Pin } from '../components/HarnessCanvas'; // Assuming these types are exported or defined globally

export const simulateDrop = (
  componentType: string,
  x: number,
  y: number,
  setComponents: React.Dispatch<React.SetStateAction<Component[]>>
) => {
  let newPins: Pin[] = [];
  if (componentType === 'Connector A') {
    newPins = [{ id: 'p1', xOffset: 0, yOffset: 10 }, { id: 'p2', xOffset: 0, yOffset: 20 }];
  } else if (componentType === 'Sensor B') {
    newPins = [{ id: 'p1', xOffset: 0, yOffset: 10 }];
  }

  const newComponent: Component = {
    id: `comp-${Date.now()}`,
    type: componentType,
    x,
    y,
    pins: newPins,
  };
  setComponents((prevComponents) => [...prevComponents, newComponent]);
};