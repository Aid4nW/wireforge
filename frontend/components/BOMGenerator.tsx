import { generateBOMCsv } from '../utils/bomGenerator';
import { Component, Wire } from '../utils/types';

export const useBOMGenerator = (components: Component[], wires: Wire[]) => {
  const downloadBOM = () => {
    const csvContent = generateBOMCsv(components, wires);
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

  return { downloadBOM };
};