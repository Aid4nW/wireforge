import { create } from 'zustand';

interface Component {
  x: number;
  y: number;
  name: string;
}

interface SelectionState {
  selectedComponent: Component | null;
  setSelectedComponent: (component: Component | null) => void;
}

export const useSelectionStore = create<SelectionState>((set) => ({
  selectedComponent: null,
  setSelectedComponent: (component) => set({ selectedComponent: component }),
}));
