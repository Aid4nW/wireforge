import React from 'react';
import { Line } from 'react-konva';

interface GridProps {
  width: number;
  height: number;
  gridSize: number;
}

const Grid: React.FC<GridProps> = ({ width, height, gridSize }) => {
  const lines = [];

  // Draw vertical lines
  for (let i = 0; i < width / gridSize; i++) {
    lines.push(
      <Line
        key={`v-${i}`}
        points={[Math.round(i * gridSize) + 0.5, 0, Math.round(i * gridSize) + 0.5, height]}
        stroke="#ccc"
        strokeWidth={1}
      />
    );
  }

  // Draw horizontal lines
  for (let j = 0; j < height / gridSize; j++) {
    lines.push(
      <Line
        key={`h-${j}`}
        points={[0, Math.round(j * gridSize), width, Math.round(j * gridSize)]}
        stroke="#ccc"
        strokeWidth={1}
      />
    );
  }

  return <>{lines}</>;
};

export default Grid;
