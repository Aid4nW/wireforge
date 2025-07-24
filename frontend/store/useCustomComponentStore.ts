import { create } from 'zustand';
import { Component } from '../utils/types';

interface CustomComponentStore {
  customComponents: Component[];
  addComponent: (component: Component) => void;
  updateComponent: (component: Component) => void;
  deleteComponent: (id: string) => void;
  loadComponents: () => void; // To load from local storage
}

const useCustomComponentStore = create<CustomComponentStore>((set) => ({
  customComponents: [],
  addComponent: (component) =>
    set((state) => ({ customComponents: [...state.customComponents, component] })),
  updateComponent: (updatedComponent) =>
    set((state) => ({
      customComponents: state.customComponents.map((comp) =>
        comp.id === updatedComponent.id ? updatedComponent : comp
      ),
    })),
  deleteComponent: (id) =>
    set((state) => ({
      customComponents: state.customComponents.filter((comp) => comp.id !== id),
    })),
  loadComponents: () => {
    try {
      const storedComponents = localStorage.getItem('wireforge-custom-library');
      if (storedComponents) {
        set({ customComponents: JSON.parse(storedComponents) });
      }
    } catch (error) {
      console.error('Error loading custom components from local storage:', error);
    }
  },
}));

// Save to local storage whenever the store changes
useCustomComponentStore.subscribe((state) => {
  localStorage.setItem('wireforge-custom-library', JSON.stringify(state.customComponents));
});

export default useCustomComponentStore;
