export const saveDesignToLocalStorage = (components: any[], wires: any[]) => {
  try {
    const serializedState = JSON.stringify({ components, wires });
    localStorage.setItem('harnessDesign', serializedState);
    console.log('Design saved to local storage.');
  } catch (error) {
    console.error('Error saving design to local storage:', error);
  }
};

export const loadDesignFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('harnessDesign');
    if (serializedState === null) {
      return { components: [], wires: [] };
    }
    const parsedState = JSON.parse(serializedState);
    const components = parsedState.components || [];
    const wires = parsedState.wires || [];
    console.log('Design loaded from local storage.');
    return { components, wires };
  } catch (error) {
    console.error('Error loading design from local storage:', error);
    return { components: [], wires: [] };
  }
};
