import { Component, Wire } from './types';

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

