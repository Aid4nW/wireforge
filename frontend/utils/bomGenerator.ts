interface Component {
  id: string;
  type: string;
  x: number;
  y: number;
  pins: any[]; // Simplified for now
}

interface Wire {
  id: string;
  startComponentId: string;
  startPinId: string;
  endComponentId: string;
  endPinId: string;
}

export const generateBOMCsv = (components: Component[], wires: Wire[]): string => {
  let csvContent = "Component,Quantity\n";
  const componentCounts: { [key: string]: number } = {};

  components.forEach(comp => {
    componentCounts[comp.type] = (componentCounts[comp.type] || 0) + 1;
  });

  for (const type in componentCounts) {
    csvContent += `${type},${componentCounts[type]}\n`;
  }

  csvContent += "\nWire,Quantity\n";
  csvContent += `Total Wires,${wires.length}\n`;

  return csvContent;
};

