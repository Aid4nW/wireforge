// REQ-FUNC-CAN-001: Visual Component Placement
// REQ-FUNC-CAN-002: Wire and Connection Drawing
// REQ-FUNC-LIB-001: Pre-populated Component Library (handling dropped components)
import React, { useState } from 'react';

interface Pin {
  id: string;
  xOffset: number;
  yOffset: number;
}

interface Component {
  id: string;
  type: string;
  x: number;
  y: number;
  pins: Pin[];
}

interface Wire {
  id: string;
  startComponentId: string;
  startPinId: string;
  endComponentId: string;
  endPinId: string;
}

interface HarnessCanvasProps {
  components: Component[];
  setComponents: React.Dispatch<React.SetStateAction<Component[]>>;
  wires: Wire[];
  setWires: React.Dispatch<React.SetStateAction<Wire[]>>;
}

const HarnessCanvas: React.FC<HarnessCanvasProps> = ({ components, setComponents, wires, setWires }) => {
  const [drawingWire, setDrawingWire] = useState(false);
  const [startPin, setStartPin] = useState<{ componentId: string, pinId: string, x: number, y: number } | null>(null);
  const [currentMousePos, setCurrentMousePos] = useState<{ x: number, y: number } | null>(null);
  const [isDraggingComponent, setIsDraggingComponent] = useState(false);
  const [draggedComponentId, setDraggedComponentId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number, y: number } | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const componentType = e.dataTransfer.getData('component/type');
    const canvasRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;

    // Define pins based on component type (simple example)
    let newPins: Pin[] = [];
    if (componentType === 'Connector A') {
      newPins = [{ id: 'p1', xOffset: 0, yOffset: 10 }, { id: 'p2', xOffset: 0, yOffset: 20 }];
    } else if (componentType === 'Sensor B') {
      newPins = [{ id: 'p1', xOffset: 0, yOffset: 10 }];
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

  const handlePinClick = (componentId: string, pin: Pin, componentX: number, componentY: number) => {
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
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvasRect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - canvasRect.left;
    const mouseY = e.clientY - canvasRect.top;

    if (drawingWire) {
      setCurrentMousePos({
        x: mouseX,
        y: mouseY,
      });
    } else if (isDraggingComponent && draggedComponentId && dragOffset) {
      setComponents((prevComponents) =>
        prevComponents.map((comp) =>
          comp.id === draggedComponentId
            ? { ...comp, x: mouseX - dragOffset.x, y: mouseY - dragOffset.y }
            : comp
        )
      );
    }
  };

  const handleMouseDownOnComponent = (e: React.MouseEvent<HTMLDivElement>, component: Component) => {
    // Only start dragging if not drawing a wire and not clicking on a pin
    if (!drawingWire && !(e.target as HTMLElement).classList.contains('pin')) {
      setIsDraggingComponent(true);
      setDraggedComponentId(component.id);
      const componentRect = (e.target as HTMLElement).getBoundingClientRect();
      setDragOffset({
        x: e.clientX - componentRect.left,
        y: e.clientY - componentRect.top,
      });
    }
  };

  const handleMouseUpOnCanvas = () => {
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
      style={{
        border: '1px solid black',
        width: '100%',
        height: '500px',
        position: 'relative',
        overflow: 'hidden',
        cursor: isDraggingComponent ? 'grabbing' : 'default',
      }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOnCanvas}
    >
      <h2>Harness Design Canvas</h2>
      {components.map((comp) => (
        <div
          key={comp.id}
          style={{
            position: 'absolute',
            left: comp.x,
            top: comp.y,
            border: '1px solid blue',
            padding: '5px',
            backgroundColor: 'lightblue',
            cursor: isDraggingComponent && draggedComponentId === comp.id ? 'grabbing' : 'grab',
          }}
          onMouseDown={(e) => handleMouseDownOnComponent(e, comp)}
        >
          {comp.type}
          {comp.pins.map((pin) => (
            <div
              key={comp.id + '-' + pin.id}
              className="pin" // Add a class to identify pins
              style={{
                position: 'absolute',
                left: pin.xOffset,
                top: pin.yOffset,
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'red',
                cursor: 'pointer',
              }}
              onClick={() => handlePinClick(comp.id, pin, comp.x, comp.y)}
            />
          ))}
        </div>
      ))}

      {/* Draw temporary wire */}
      {drawingWire && startPin && currentMousePos && (
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <line
            x1={startPin.x}
            y1={startPin.y}
            x2={currentMousePos.x}
            y2={currentMousePos.y}
            stroke="red"
            strokeWidth="2"
          />
        </svg>
      )}

      {/* Draw permanent wires */}
      {wires.map((wire) => {
        const startPos = getPinAbsolutePosition(wire.startComponentId, wire.startPinId);
        const endPos = getPinAbsolutePosition(wire.endComponentId, wire.endPinId);
        return (
          <svg key={wire.id} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <line
              x1={startPos.x}
              y1={startPos.y}
              x2={endPos.x}
              y2={endPos.y}
              stroke="green"
              strokeWidth="2"
            />
          </svg>
        );
      })}
    </div>
  );
};

export default HarnessCanvas;
