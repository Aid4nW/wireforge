import { create } from 'zustand';
import { Component, Wire } from '@/components/HarnessCanvas'; // Import full Component and Wire interfaces

interface DesignState {
  selectedComponent: Component | null;
  setSelectedComponent: (component: Component | null) => void;
  components: Component[];
  setComponents: (components: Component[]) => void;
  updateComponentProperties: (componentId: string, updates: Partial<Component>) => void;
  wires: Wire[];
  setWires: (wires: Wire[]) => void;
  saveDesignToLocalStorage: () => void;
  loadDesignFromLocalStorage: () => void;
}

export const useSelectionStore = create<DesignState>((set, get) => ({
  selectedComponent: null,
  setSelectedComponent: (component) => set({ selectedComponent: component }),
  components: [],
  setComponents: (components) => set({ components }),
  wires: [],
  setWires: (wires) => set({ wires }),
  updateComponentProperties: (componentId, updates) =>
    set((state) => {
      const updatedComponents = state.components.map((comp) =>
        comp.id === componentId ? { ...comp, ...updates } : comp
      );
      const updatedSelectedComponent =
        state.selectedComponent && state.selectedComponent.id === componentId
          ? { ...state.selectedComponent, ...updates }
          : state.selectedComponent;

      return {
        components: updatedComponents,
        selectedComponent: updatedSelectedComponent,
      };
    }),
  saveDesignToLocalStorage: () => {
    const { components, wires } = get();
    const design = {
      components,
      wires,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('wireforge-design', JSON.stringify(design));
  },
  loadDesignFromLocalStorage: () => {
    const savedDesign = localStorage.getItem('wireforge-design');
    if (savedDesign) {
      const { components, wires } = JSON.parse(savedDesign);
      set({ components, wires });
    }
  },
}));