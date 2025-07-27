import { act } from '@testing-library/react';
import useCustomComponentStore from '../store/useCustomComponentStore';

describe('useCustomComponentStore', () => {
  const localStorageMock = (() => {
    let store: { [key: string]: string } = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });

  beforeEach(() => {
    localStorageMock.clear();
    // Reset the store before each test to ensure isolation
    act(() => {
      useCustomComponentStore.setState({ customComponents: [] });
    });
  });

  it('should return the initial state', () => {
    const { customComponents } = useCustomComponentStore.getState();
    expect(customComponents).toEqual([]);
  });

  it('should add a component and update local storage', () => {
    const newComponent = {
      id: 'comp-1',
      type: 'TestComponent',
      x: 0,
      y: 0,
      pins: [{ id: 'p1', xOffset: 0, yOffset: 0 }],
    };

    act(() => {
      useCustomComponentStore.getState().addComponent(newComponent);
    });

    const { customComponents } = useCustomComponentStore.getState();
    expect(customComponents).toEqual([newComponent]);
    expect(localStorageMock.getItem('wireforge-custom-library')).toEqual(JSON.stringify([newComponent]));
  });

  it('should update a component and local storage', () => {
    const initialComponent = {
      id: 'comp-1',
      type: 'TestComponent',
      x: 0,
      y: 0,
      pins: [{ id: 'p1', xOffset: 0, yOffset: 0 }],
    };
    act(() => {
      useCustomComponentStore.getState().addComponent(initialComponent);
    });

    const updatedComponent = {
      ...initialComponent,
      type: 'UpdatedComponent',
      pins: [{ id: 'p1', xOffset: 0, yOffset: 0 }, { id: 'p2', xOffset: 0, yOffset: 0 }],
    };

    act(() => {
      useCustomComponentStore.getState().updateComponent(updatedComponent);
    });

    const { customComponents } = useCustomComponentStore.getState();
    expect(customComponents).toEqual([updatedComponent]);
    expect(localStorageMock.getItem('wireforge-custom-library')).toEqual(JSON.stringify([updatedComponent]));
  });

  it('should delete a component and local storage', () => {
    const componentToDelete = {
      id: 'comp-1',
      type: 'TestComponent',
      x: 0,
      y: 0,
      pins: [{ id: 'p1', xOffset: 0, yOffset: 0 }],
    };
    act(() => {
      useCustomComponentStore.getState().addComponent(componentToDelete);
    });

    act(() => {
      useCustomComponentStore.getState().deleteComponent(componentToDelete.id);
    });

    const { customComponents } = useCustomComponentStore.getState();
    expect(customComponents).toEqual([]);
    expect(localStorageMock.getItem('wireforge-custom-library')).toEqual('[]');
  });

  it('should load components from local storage', () => {
    const storedComponents = [
      {
        id: 'comp-stored-1',
        type: 'StoredComponent1',
        x: 0,
        y: 0,
        pins: [{ id: 'pA', xOffset: 0, yOffset: 0 }],
      },
      {
        id: 'comp-stored-2',
        type: 'StoredComponent2',
        x: 0,
        y: 0,
        pins: [{ id: 'pB', xOffset: 0, yOffset: 0 }],
      },
    ];
    localStorageMock.setItem('wireforge-custom-library', JSON.stringify(storedComponents));

    act(() => {
      useCustomComponentStore.getState().loadComponents();
    });

    const { customComponents } = useCustomComponentStore.getState();
    expect(customComponents).toEqual(storedComponents);
  });
});
