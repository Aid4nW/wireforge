import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import HarnessCanvas from '../components/HarnessCanvas';

// Mock Konva components to avoid actual canvas rendering in JSDOM
let mockGroupOnDragEnd: any;

jest.mock('react-konva', () => ({
  Stage: React.forwardRef(({ children, ...props }: any, ref) => {
    if (ref) {
      if (typeof ref === 'function') {
        ref({
          getPointerPosition: () => ({ x: 100, y: 150 }),
        });
      } else {
        ref.current = {
          getPointerPosition: () => ({ x: 100, y: 150 }),
        };
      }
    }
    return <div data-testid="konva-stage" {...props}>{children}</div>;
  }),
  Layer: ({ children }: any) => <div data-testid="konva-layer">{children}</div>,
  Group: ({ children, onDragEnd, ...props }: any) => {
    mockGroupOnDragEnd = onDragEnd;
    return <div data-testid="konva-group" {...props}>{children}</div>;
  },
  Rect: (props: any) => <div data-testid="konva-rect" data-props={JSON.stringify(props)} />,
  Text: (props: any) => <div data-testid="konva-text" data-props={JSON.stringify(props)}>{props.text}</div>,
  Circle: ({ children, onClick, onTap, ...props }: any) => {
    // Filter out Konva-specific props and custom props that shouldn't go to DOM
    const { _isPin, ...domProps } = props;
    return <div data-testid="konva-circle" onClick={onClick} onTouchEnd={onTap} {...domProps}>{children}</div>;
  },
  Line: (props: any) => <div data-testid="konva-line" data-props={JSON.stringify(props)} />,
  KonvaEventObject: jest.fn(),
}));

describe('HarnessCanvas', () => {
  const mockSetComponents = jest.fn();
  const mockSetWires = jest.fn();

  const defaultProps = {
    components: [],
    setComponents: mockSetComponents,
    wires: [],
    setWires: mockSetWires,
  };

  // Mock useRef and useEffect to control stageDimensions and stageRef
  let mockStageRef: { current: any };
  let mockContainerRef: { current: any };

  beforeEach(() => {
    // Reset mocks before each test
    mockSetComponents.mockClear();
    mockSetWires.mockClear();

    mockStageRef = {
      current: {
        getPointerPosition: jest.fn(() => ({ x: 100, y: 150 })),
      },
    };
    mockContainerRef = {
      current: {
        offsetWidth: 800,
        offsetHeight: 600,
        getBoundingClientRect: () => ({ left: 0, top: 0, width: 800, height: 600, x: 0, y: 0, right: 800, bottom: 600 }),
      },
    };

    // Mock useRef calls in the order they appear in HarnessCanvas
    jest.spyOn(React, 'useRef')
      .mockReturnValueOnce(mockContainerRef) // First call is for containerRef
      .mockReturnValueOnce(mockStageRef);    // Second call is for stageRef

    jest.spyOn(React, 'useEffect').mockImplementation((cb) => cb());
  });

  // REQ-NON-USA-001: Intuitive User Interface
  // REQ-NON-PER-001: Responsive Canvas
  it('renders without crashing', () => {
    render(<HarnessCanvas {...defaultProps} />);
    
    expect(screen.getByTestId('konva-stage')).toBeInTheDocument();
    expect(screen.getByTestId('konva-layer')).toBeInTheDocument();
  });

  // REQ-FUNC-CAN-001: Visual Component Placement
  it('adds a new component on drop', () => {
    const { container } = render(<HarnessCanvas {...defaultProps} />);
    const canvasWrapper = screen.getByTestId('harness-canvas-wrapper');

    if (!canvasWrapper) {
      throw new Error('Canvas wrapper not found');
    }

    const dataTransfer = {
      getData: jest.fn((type) => {
        if (type === 'component/type') return 'Connector A';
        return '';
      }),
    };

    const dropEvent = new MouseEvent('drop', {
      bubbles: true,
      cancelable: true,
      clientX: 100,
      clientY: 150,
    });
    Object.defineProperty(dropEvent, 'dataTransfer', {
      value: dataTransfer,
    });

    act(() => {
      fireEvent(canvasWrapper, dropEvent);
    });

    expect(mockSetComponents).toHaveBeenCalledTimes(1);
    expect(mockSetComponents).toHaveBeenCalledWith(expect.any(Function));

    // Manually call the function passed to setComponents to check its argument
    const updateFunction = mockSetComponents.mock.calls[0][0];
    const newComponents = updateFunction([]);

    expect(newComponents.length).toBe(1);
    expect(newComponents[0].type).toBe('Connector A');
    // Check if x and y are close to the drop coordinates (allowing for minor offsets)
    expect(newComponents[0].x).toBeCloseTo(100);
    expect(newComponents[0].y).toBeCloseTo(150);
  });

  // REQ-FUNC-CAN-001: Visual Component Placement
  it('drags an existing component', () => {
    const initialComponents = [
      {
        id: 'comp-1',
        type: 'Connector A',
        x: 50,
        y: 50,
        pins: [],
      },
    ];

    const { container } = render(<HarnessCanvas {...defaultProps} components={initialComponents} />);

    const componentGroup = screen.getByTestId('konva-group');

    // Simulate drag start
    fireEvent.dragStart(componentGroup);

    // Simulate drag end at a new position
    const newX = 200;
    const newY = 250;
    const mockKonvaNode = {
      x: jest.fn(() => newX),
      y: jest.fn(() => newY),
    };

    // Directly call the onDragEnd handler with a mocked KonvaEventObject
    act(() => {
      mockGroupOnDragEnd({ target: mockKonvaNode });
    });

    expect(mockSetComponents).toHaveBeenCalledTimes(1);
    expect(mockSetComponents).toHaveBeenCalledWith(expect.any(Function));

    const updateFunction = mockSetComponents.mock.calls[0][0];
    const updatedComponents = updateFunction(initialComponents);

    expect(updatedComponents.length).toBe(1);
    expect(updatedComponents[0].id).toBe('comp-1');
    expect(updatedComponents[0].x).toBe(newX);
    expect(updatedComponents[0].y).toBe(newY);
  });

  // REQ-FUNC-CAN-002: Wire and Connection Drawing
  it('creates a new wire between two pins', () => {
    const initialComponents = [
      {
        id: 'comp-1',
        type: 'Connector A',
        x: 50,
        y: 50,
        pins: [{ id: 'p1', xOffset: 0, yOffset: 10 }],
      },
      {
        id: 'comp-2',
        type: 'Sensor B',
        x: 200,
        y: 200,
        pins: [{ id: 'p1', xOffset: 0, yOffset: 10 }],
      },
    ];

    render(<HarnessCanvas {...defaultProps} components={initialComponents} />);

    // Find the pins
    const pin1 = screen.getAllByTestId('konva-circle')[0]; // First pin
    const pin2 = screen.getAllByTestId('konva-circle')[1]; // Second pin

    // Simulate click on the first pin
    act(() => {
      fireEvent.click(pin1);
    });

    // Simulate click on the second pin
    act(() => {
      fireEvent.click(pin2);
    });

    expect(mockSetWires).toHaveBeenCalledTimes(1);
    expect(mockSetWires).toHaveBeenCalledWith(expect.any(Function));

    const updateFunction = mockSetWires.mock.calls[0][0];
    const newWires = updateFunction([]);

    expect(newWires.length).toBe(1);
    expect(newWires[0].startComponentId).toBe('comp-1');
    expect(newWires[0].startPinId).toBe('p1');
    expect(newWires[0].endComponentId).toBe('comp-2');
    expect(newWires[0].endPinId).toBe('p1');
  });

  // REQ-FUNC-CAN-002: Wire and Connection Drawing
  it('cancels wire drawing when clicking the same pin twice', () => {
    const initialComponents = [
      {
        id: 'comp-1',
        type: 'Connector A',
        x: 50,
        y: 50,
        pins: [{ id: 'p1', xOffset: 0, yOffset: 10 }],
      },
    ];

    render(<HarnessCanvas {...defaultProps} components={initialComponents} />);

    const pin = screen.getAllByTestId('konva-circle')[0];

    // Simulate first click to start drawing
    act(() => {
      fireEvent.click(pin);
    });

    // Simulate second click on the same pin to cancel
    act(() => {
      fireEvent.click(pin);
    });

    expect(mockSetWires).not.toHaveBeenCalled();
  });

  // REQ-FUNC-CAN-002: Wire and Connection Drawing
  it('cancels wire drawing when clicking on empty canvas after selecting a pin', () => {
    const initialComponents = [
      {
        id: 'comp-1',
        type: 'Connector A',
        x: 50,
        y: 50,
        pins: [{ id: 'p1', xOffset: 0, yOffset: 10 }],
      },
    ];

    const { container } = render(<HarnessCanvas {...defaultProps} components={initialComponents} />);

    const pin = screen.getAllByTestId('konva-circle')[0];
    const canvasWrapper = screen.getByTestId('harness-canvas-wrapper');

    if (!canvasWrapper) {
      throw new Error('Canvas wrapper not found');
    }

    // Simulate click on the pin to start drawing
    act(() => {
      fireEvent.click(pin);
    });

    // Simulate click on the canvas (not a pin)
    act(() => {
      fireEvent.click(canvasWrapper, { clientX: 300, clientY: 300 });
    });

    expect(mockSetWires).not.toHaveBeenCalled();
  });
});