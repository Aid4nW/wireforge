// REQ-FUNC-BOM-001: Automatic Bill of Materials Generation
import React from 'react';

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

interface BOMGeneratorProps {
  components: Component[];
  wires: Wire[];
}

const BOMGenerator: React.FC<BOMGeneratorProps> = ({ components, wires }) => {
  const handleGenerateBOM = () => {
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

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) { // feature detection
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "bill_of_materials.csv");
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div style={{ marginTop: '20px', padding: '10px', borderTop: '1px solid lightgray' }}>
      <h3>Bill of Materials</h3>
      <button onClick={handleGenerateBOM}>Generate BOM (CSV)</button>
      <p>Components: {components.length}</p>
      <p>Wires: {wires.length}</p>
    </div>
  );
};

export default BOMGenerator;
