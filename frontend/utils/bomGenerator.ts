import { Component, Wire } from './types';
import useHarnessSettingsStore from '../store/useHarnessSettingsStore';

export const generateBOMCsv = (components: Component[], wires: Wire[]): string => {
  const { globalServiceLoopLength, globalTwistPitch } = useHarnessSettingsStore.getState();

  let csvContent = "Component,Quantity\n";
  const componentCounts: { [key: string]: number } = {};

  components.forEach(comp => {
    componentCounts[comp.type] = (componentCounts[comp.type] || 0) + 1;
  });

  for (const type in componentCounts) {
    csvContent += `${type},${componentCounts[type]}\n`;
  }

  csvContent += "\nWire,Length (mm)\n";
  let totalWireLength = 0;

  wires.forEach(wire => {
    let effectiveLength = wire.length; // Start with base length

    // Apply service loop
    if (wire.serviceLoop) {
      const serviceLoopAdd = wire.serviceLoop.length === 'default' ? globalServiceLoopLength : wire.serviceLoop.length;
      effectiveLength += serviceLoopAdd;
    }

    // Apply concentric twist (placeholder: 5% increase for now)
    if (wire.twist) {
      const twistPitch = wire.twist.pitch === 'default' ? globalTwistPitch : wire.twist.pitch;
      // This is a simplified calculation. A real calculation would be more complex.
      // For now, we'll just add a percentage based on the existence of a twist.
      effectiveLength *= 1.05; // 5% increase for twisting
    }

    totalWireLength += effectiveLength;
    csvContent += `Wire ${wire.id},${effectiveLength.toFixed(2)}\n`;
  });

  csvContent += `\nTotal Harness Wire Length,${totalWireLength.toFixed(2)} mm\n`;

  return csvContent;
};

