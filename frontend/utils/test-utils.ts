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