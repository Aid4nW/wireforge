// REQ-FUNC-CAN-001: Visual Component Placement
// REQ-FUNC-CAN-002: Wire and Connection Drawing
// REQ-FUNC-LIB-001: Pre-populated Component Library (handling dropped components)
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { saveDesignToLocalStorage } from '../utils/localStorage';

// Extend the Window interface to include harnessState for Cypress testing
declare global {
  interface Window {
    harnessState?: {
      components: Component[];
      wires: Wire[];
      selectedItemId: string | null;
      selectedItemType: 'component' | 'wire' | null;
      setSelectedItemId: React.Dispatch<React.SetStateAction<string | null>>;
      setSelectedItemType: React.Dispatch<React.SetStateAction<'component' | 'wire' | null>>;
      handlePinClick: (componentId: string, pin: Pin, componentX: number, componentY: number) => void;
    };
    triggerPinClick?: (componentId: string, pinId: string) => void;
    Cypress?: any;
  }
}

import { Pin, Component, Wire } from '../utils/types';

interface HarnessCanvasProps {
  components: Component[];
  setComponents: React.Dispatch<React.SetStateAction<Component[]>>;
  wires: Wire[];
  setWires: React.Dispatch<React.SetStateAction<Wire[]>>;
}

import { Stage, Layer, Rect, Text, Circle, Line, Group } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';

const HarnessCanvas: React.FC<HarnessCanvasProps> = ({ components, setComponents, wires, setWires }) => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedItemType, setSelectedItemType] = useState<'component' | 'wire' | null>(null);
  const [drawingWire, setDrawingWire] = useState(false);
  const [startPin, setStartPin] = useState<{ componentId: string, pinId: string, x: number, y: number } | null>(null);
  const [currentMousePos, setCurrentMousePos] = useState<{ x: number, y: number } | null>(null);
  const [isDraggingComponent, setIsDraggingComponent] = useState(false);
  const [draggedComponentId, setDraggedComponentId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number, y: number } | null>(null);
  const [stageDimensions, setStageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<any>(null);

  const handleDelete = useCallback(() => {
    if (selectedItemId && selectedItemType) {
      if (selectedItemType === 'component') {
        setComponents(prevComponents => {
          const remainingComponents = prevComponents.filter(comp => comp.id !== selectedItemId);
          // Also remove any wires connected to the deleted component
          setWires(prevWires => prevWires.filter(wire => 
            wire.startComponentId !== selectedItemId && wire.endComponentId !== selectedItemId
          ));
          return remainingComponents;
        });
      } else if (selectedItemType === 'wire') {
        setWires(prevWires => prevWires.filter(wire => wire.id !== selectedItemId));
      }
      setSelectedItemId(null);
      setSelectedItemType(null);
      if (window.Cypress) {
        window.harnessState.selectedItemId = null;
        window.harnessState.selectedItemType = null;
      }
    }
  }, [selectedItemId, selectedItemType, setComponents, setWires]);

  const handlePinClick = useCallback((componentId: string, pin: Pin, componentX: number, componentY: number) => {
    // Prevent pin click from triggering component drag
    if (isDraggingComponent) return;

    const pinAbsoluteX = componentX + pin.xOffset;
    const pinAbsoluteY = componentY + pin.yOffset;

    if (!drawingWire) {
      setDrawingWire(true);
      setStartPin({ componentId, pinId: pin.id, x: pinAbsoluteX, y: pinAbsoluteY });
    } else if (startPin && (startPin.componentId !== componentId || startPin.pinId !== pin.id)) {
      // Complete the wire
      const newWire: Wire = {
        id: `wire-${Date.now()}`,
        startComponentId: startPin.componentId,
        startPinId: startPin.pinId,
        endComponentId: componentId,
        endPinId: pin.id,
      };
      setWires((prevWires) => [...prevWires, newWire]);
      setDrawingWire(false);
      setStartPin(null);
      setCurrentMousePos(null);
    } else if (startPin && startPin.componentId === componentId && startPin.pinId === pin.id) {
      // Clicked the same pin again, cancel drawing
      setDrawingWire(false);
      setStartPin(null);
      setCurrentMousePos(null);
    }
  }, [drawingWire, isDraggingComponent, setWires, startPin]);

  // Expose state for Cypress testing
  useEffect(() => {
    if (window.Cypress) {
      window.harnessState = {
        components,
        wires,
        selectedItemId,
        selectedItemType,
        setSelectedItemId,
        setSelectedItemType,
        handlePinClick,
      };
    }
  }, [components, wires, selectedItemId, selectedItemType, handlePinClick]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        handleDelete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleDelete]);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setStageDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions(); // Set initial dimensions

    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const stage = stageRef.current;
    if (!stage) return;

    // Get the bounding rectangle of the container div
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    // Calculate the drop position relative to the container div
    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;

    const componentType = e.dataTransfer?.getData('component/type');
    if (!componentType) return;

    // Define pins based on component type (simple example)
    let newPins: Pin[] = [];
    if (componentType === 'Connector A') {
      newPins = [{ id: 'p1', xOffset: 0, yOffset: 10 }, { id: 'p2', xOffset: 0, yOffset: 20 }];
    } else if (componentType === 'ECU A') {
      newPins = [
        { id: 'p1', xOffset: 0, yOffset: 10 },
        { id: 'p2', xOffset: 0, yOffset: 20 },
        { id: 'p3', xOffset: 0, yOffset: 30 },
        { id: 'p4', xOffset: 0, yOffset: 40 },
      ];
    }

    const newComponent: Component = {
      id: `comp-${Date.now()}`,
      type: componentType,
      x,
      y,
      pins: newPins,
    };
    setComponents((prevComponents) => [...prevComponents, newComponent]);
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    const stage = stageRef.current;
    if (!stage) return;
    const pointerPosition = stage.getPointerPosition();
    if (!pointerPosition) return;

    const mouseX = pointerPosition.x;
    const mouseY = pointerPosition.y;

    if (drawingWire) {
      setCurrentMousePos({
        x: mouseX,
        y: mouseY,
      });
    } else if (isDraggingComponent && draggedComponentId && dragOffset) {
      // This logic is now handled by Konva's draggable property on the Group component
      // The onDragEnd event updates the component's position in state
    }
  };

  const handleMouseDownOnComponent = (e: KonvaEventObject<MouseEvent>, component: Component) => {
    // Only start dragging if not drawing a wire and not clicking on a pin
    if (!drawingWire && !(e.target as any)._isPin) {
      setIsDraggingComponent(true);
      setDraggedComponentId(component.id);
      // Konva handles the drag offset automatically when draggable is true
    }
  };

  const handleMouseUpOnCanvas = (e: KonvaEventObject<MouseEvent>) => {
    setIsDraggingComponent(false);
    setDraggedComponentId(null);
    setDragOffset(null);
  };

  const getPinAbsolutePosition = (componentId: string, pinId: string) => {
    const component = components.find(c => c.id === componentId);
    if (!component) return { x: 0, y: 0 };
    const pin = component.pins.find(p => p.id === pinId);
    if (!pin) return { x: 0, y: 0 };
    return { x: component.x + pin.xOffset, y: component.y + pin.yOffset };
  };

  return (
    <div
      ref={containerRef}
      className="canvas-placeholder"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      data-testid="harness-canvas-wrapper"
    >
      <Stage
        ref={stageRef}
        width={stageDimensions.width}
        height={stageDimensions.height}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOnCanvas}
      >
        <Layer>
          {components.map((comp) => (
            <Group
              key={comp.id}
              x={comp.x}
              y={comp.y}
              draggable
              data-testid={`konva-group-${comp.id}`}
              onClick={() => {
                setSelectedItemId(comp.id);
                setSelectedItemType('component');
              }}
              onDragStart={(e) => handleMouseDownOnComponent(e, comp)}
              onDragEnd={(e) => {
                setIsDraggingComponent(false);
                setDraggedComponentId(null);
                setDragOffset(null);
                const node = e.target;
                setComponents((prevComponents) =>
                  prevComponents.map((c) =>
                    c.id === comp.id
                      ? { ...c, x: node.x(), y: node.y() }
                      : c
                  )
                );
              }}
            >
              <Rect
                width={100} // Placeholder width
                height={50} // Placeholder height
                fill="lightblue"
                stroke={selectedItemId === comp.id && selectedItemType === 'component' ? 'red' : 'blue'}
                strokeWidth={selectedItemId === comp.id && selectedItemType === 'component' ? 3 : 1}
                data-testid={`konva-rect-${comp.id}`}
              />
              <Text text={comp.type} x={5} y={5} />
              {comp.pins.map((pin) => (
                <Circle
                  key={comp.id + '-' + pin.id}
                  x={pin.xOffset}
                  y={pin.yOffset}
                  radius={4}
                  fill="red"
                  stroke="black"
                  strokeWidth={1}
                  onClick={() => handlePinClick(comp.id, pin, comp.x, comp.y)}
                  onTap={() => handlePinClick(comp.id, pin, comp.x, comp.y)}
                  // Custom property to identify pins for drag logic
                  _isPin={true}
                  data-testid={`konva-circle-${comp.id}-${pin.id}`}
                />
              ))}
            </Group>
            ))}

          {/* Draw temporary wire */}
          {drawingWire && startPin && currentMousePos && (
            <Line
              points={[startPin.x, startPin.y, currentMousePos.x, currentMousePos.y]}
              stroke="red"
              strokeWidth={2}
            />
          )}

          {/* Draw permanent wires */}
          {wires.map((wire) => {
            const startPos = getPinAbsolutePosition(wire.startComponentId, wire.startPinId);
            const endPos = getPinAbsolutePosition(wire.endComponentId, wire.endPinId);
            return (
              <Line
                key={wire.id}
                points={[startPos.x, startPos.y, endPos.x, endPos.y]}
                stroke={selectedItemId === wire.id && selectedItemType === 'wire' ? 'red' : 'green'}
                strokeWidth={selectedItemId === wire.id && selectedItemType === 'wire' ? 4 : 2}
                data-testid="konva-line-perm"
                onClick={() => {
                  setSelectedItemId(wire.id);
                  setSelectedItemType('wire');
                }}
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default HarnessCanvas;