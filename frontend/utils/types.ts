
export interface Pin {
  id: string;
  xOffset: number;
  yOffset: number;
}

export interface Component {
  id: string;
  type: string;
  x: number;
  y: number;
  pins: Pin[];
  customProperties?: Record<string, string | number>;
}

export interface Wire {
  id: string;
  startComponentId: string;
  startPinId: string;
  endComponentId: string;
  endPinId: string;
  length: number; // Base length of the wire
  serviceLoop?: {
    length: number | 'default';
  };
  twist?: {
    type: 'concentric';
    pitch: number | 'default';
  };
  customProperties?: Record<string, string | number>;
}
