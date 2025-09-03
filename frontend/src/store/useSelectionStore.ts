import { create } from 'zustand';
import { Component } from '@/components/HarnessCanvas'; // Import full Component interface

interface SelectionState {
  selectedComponent: Component | null;
  setSelectedComponent: (component: Component | null) => void;
  components: Component[]; // Add components array
  setComponents: (components: Component[]) => void; // Add setComponents action
  updateComponentProperties: (componentId: string, updates: Partial<Component>) => void; // Add updateComponentProperties action
}

export const useSelectionStore = create<SelectionState>((set) => ({
  selectedComponent: null,
  setSelectedComponent: (component) => set({ selectedComponent: component }),
  components: [], // Initialize components as an empty array
  setComponents: (components) => set({ components }), // Implement setComponents
  updateComponentProperties: (componentId, updates) =>
    set((state) => {
      const updatedComponents = state.components.map((comp) =>
        comp.id === componentId ? { ...comp, ...updates } : comp
      );
      // Also update the selected component if it's the one being updated
      const updatedSelectedComponent =
        state.selectedComponent && state.selectedComponent.id === componentId
          ? { ...state.selectedComponent, ...updates }
          : state.selectedComponent;

      return {
        components: updatedComponents,
        selectedComponent: updatedSelectedComponent,
      };
    }),
}));