
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
  serviceLoop?: {
    length: number;
  };
  twist?: {
    type: 'concentric';
    pitch: number;
  };
  customProperties?: Record<string, string | number>;
}
