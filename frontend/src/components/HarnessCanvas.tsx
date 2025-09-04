"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Rect, Text, Group, Circle, Line } from 'react-konva';
import ComponentConfigModal from './ComponentConfigModal';
import PropertiesPanel from './PropertiesPanel';
import Konva from 'konva';
import Grid from './Grid';
import { useSelectionStore } from '@/store/useSelectionStore';

interface Port {
  id: string;
  x: number; // relative to component's origin
  y: number; // relative to component's origin
}

interface Pin {
  id: string;
  name: string; // e.g., "Pin 1", "Pin A"
}

interface Connector {
  id: string;
  name: string; // e.g., "Connector A", "Main Connector"
  pins: Pin[];
}

interface Component {
  id: string; // Add unique ID
  x: number;
  y: number;
  name: string;
  ports: Port[];
  connectors: Connector[]; // New: for detailed pinout
}

interface Wire {
  id: string;
  startComponentId: string;
  startConnectionPointId: string;
  endComponentId: string;
  endConnectionPointId: string;
}

interface ConnectorConfig {
  id: number; // Unique ID for key prop in React list rendering
  name: string;
  pinCount: number;
  startLetter: string;
}

const HarnessCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const componentGroupRefs = useRef(new Map<string, Konva.Group>());
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [stage, setStage] = useState({
    scale: 1,
    x: 0,
    y: 0,
  });
  const [wires, setWires] = useState<Wire[]>([]);
  const [drawingWire, setDrawingWire] = useState<{
    startComponent: Component;
    startConnectionPoint: Pin; // Changed from Port | Pin
    points: number[]; // [x1, y1, x2, y2] for the temporary line
  } | null>(null);
  const { selectedComponent, setSelectedComponent, components, setComponents, updateComponentProperties } = useSelectionStore();
  const [isStageDraggable, setIsStageDraggable] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState<{ x: number; y: number } | null>(null);
  const [editingComponentId, setEditingComponentId] = useState<string | null>(null);
  const [clickToConnectStartPin, setClickToConnectStartPin] = useState<Pin | null>(null);
  const gridSize = 20;

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (stageRef.current) {
    }
  }, [wires, stage.x, stage.y, stage.scale]); // Add stage dependencies

  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();

    const scaleBy = 1.1;
    const stage = e.target.getStage();
    if (!stage) {
      return;
    }
    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();

    if (!pointer) {
        return;
    }

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;

    setStage({
      scale: newScale,
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    

    if (stageRef.current) {
        const stage = stageRef.current;
        stage.setPointersPositions(e.nativeEvent);
        const pos = stage.getPointerPosition();
        if (pos) {
            setModalPosition(pos);
            setIsModalOpen(true);
        }
    }
  };

  const handleModalSubmit = (name: string, connectorsConfig: ConnectorConfig[]) => {
    if (modalPosition && stageRef.current) {
      const stage = stageRef.current;
      const pos = modalPosition;

      const connectors: Connector[] = [];

      connectorsConfig.forEach((config) => {
        const pins: Pin[] = [];
        const startCharCode = config.startLetter.toUpperCase().charCodeAt(0);
        for (let i = 0; i < config.pinCount; i++) {
          const pinName = `${String.fromCharCode(startCharCode)}${i + 1}`;
          pins.push({
            id: `pin-${Date.now()}-${config.name}-${pinName}`,
            name: pinName,
          });
        }
        connectors.push({
          id: `conn-${Date.now()}-${config.name}`,
          name: config.name,
          pins: pins,
        });
      });

      if (editingComponentId) {
        // Editing existing component
        const updatedComponents = components.map(comp =>
          comp.id === editingComponentId
            ? { ...comp, name, connectors }
            : comp
        );
        setComponents(updatedComponents);
        const newlyUpdatedComponent = updatedComponents.find(comp => comp.id === editingComponentId);
        setSelectedComponent(newlyUpdatedComponent || null);
      } else {
        // Creating new component
        const newComponent: Component = {
            id: `comp-${Date.now()}`, // Generate unique ID
            x: (pos.x - stage.x()) / stage.scaleX(),
            y: (pos.y - stage.y()) / stage.scaleY(),
            name,
            ports: [], // No default ports, pins will be connection points
            connectors: connectors,
        };
        setComponents([
            ...components,
            newComponent,
        ]);
        setSelectedComponent(newComponent); // Select the newly dropped component
      }
    }
    setIsModalOpen(false);
    setModalPosition(null);
    setEditingComponentId(null); // Reset editing state
  };

  const getAbsoluteConnectionPointPosition = (component: Component, connectionPoint: Pin) => {
    const stage = stageRef.current;
    if (!stage) return { x: 0, y: 0 };

    const { height: compHeight } = getComponentDimensions(component);
    let cpX = 0;
    let cpY = 0;

    let currentConnectorOffsetX = 0;
    for (const connector of component.connectors) {
      for (let i = 0; i < connector.pins.length; i++) {
        if (connector.pins[i].id === connectionPoint.id) {
          cpX = currentConnectorOffsetX + COMPONENT_PADDING / 2 + i * 25;
          cpY = compHeight - PIN_RADIUS;
          break;
        }
      }
      currentConnectorOffsetX += (connector.pins.length * 25) + COMPONENT_PADDING;
    }

    // Calculate the pin's position relative to the stage's origin, considering scale and translation
    const absoluteX = (component.x + cpX) * stage.scaleX() + stage.x();
    const absoluteY = (component.y + cpY) * stage.scaleY() + stage.y();

    return { x: absoluteX, y: absoluteY };
  };

  const PIN_RADIUS = 4;
  const COMPONENT_MIN_WIDTH = 20;
  const COMPONENT_HEIGHT = 50;
  const COMPONENT_PADDING = 20;

  const getComponentDimensions = (component: Component) => {
    const numPins = component.connectors.reduce((acc, conn) => acc + conn.pins.length, 0);
    const calculatedWidth = Math.max(COMPONENT_MIN_WIDTH, numPins * 25 + COMPONENT_PADDING);
    const calculatedHeight = COMPONENT_HEIGHT; // For now, fixed height
    return { width: calculatedWidth, height: calculatedHeight };
  };

  // Prepare initial values for the modal
  const initialModalName = editingComponentId
    ? components.find(comp => comp.id === editingComponentId)?.name
    : '';

  const initialModalConnectorsConfig = editingComponentId
    ? components.find(comp => comp.id === editingComponentId)?.connectors.map((conn, index) => ({
        id: index, // Use index as a stable ID for modal's internal use
        name: conn.name,
        pinCount: conn.pins.length,
        startLetter: conn.pins[0] ? conn.pins[0].name.charAt(0) : 'A', // Assuming pin names are like A1, B2
      }))
    : [];

  return (
    <div
      ref={containerRef}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="flex-grow relative overflow-hidden"
    >
      {dimensions.width > 0 && dimensions.height > 0 && (
        <Stage
          ref={stageRef}
          width={dimensions.width}
          height={dimensions.height}
          onWheel={handleWheel}
          scaleX={stage.scale}
          scaleY={stage.scale}
          x={stage.x}
          y={stage.y}
          draggable={isStageDraggable}
          onDragEnd={(e) => {
            e.cancelBubble = true;
            setIsStageDraggable(true);
          }}
          onMouseMove={(e) => {
            // Handle temporary wire drawing for both drag-and-drop and click-to-connect
            if (drawingWire || clickToConnectStartPin) { // Check both states
              const stage = e.target.getStage();
              if (!stage) return;
              const pointer = stage.getPointerPosition();
              if (!pointer) return;

              // If click-to-connect is active, create a temporary drawingWire
              if (clickToConnectStartPin && !drawingWire) {
                const startComponent = components.find(c => c.connectors.some(conn => conn.pins.some(p => p.id === clickToConnectStartPin.id)));
                if (!startComponent) return;
                const startAbsPos = getAbsoluteConnectionPointPosition(startComponent, clickToConnectStartPin);
                setDrawingWire({
                  startComponent: startComponent,
                  startConnectionPoint: clickToConnectStartPin,
                  points: [startAbsPos.x, startAbsPos.y, pointer.x, pointer.y],
                });
              } else if (drawingWire) { // Existing drawingWire (from drag-and-drop or click-to-connect)
                setDrawingWire(prev => {
                  if (!prev) return null;
                  const newPoints = [...prev.points];
                  newPoints[2] = pointer.x;
                  newPoints[3] = pointer.y;
                  return { ...prev, points: newPoints };
                });
              }
            }
          }}
          onMouseUp={(e) => {
            // If drawingWire is active and mouse is released on stage (not a pin), cancel
            // This handles cancellation for both drag-and-drop and click-to-connect
            if (drawingWire) {
              setDrawingWire(null);
              setClickToConnectStartPin(null); // Also reset click-to-connect state
              setIsStageDraggable(true); // Re-enable stage drag
            }
          }}
          onClick={(e) => {
            // if we are clicking on an empty place, deselect all
            if (e.target === e.target.getStage()) {
              setSelectedComponent(null);
              // If click-to-connect is active and clicked on empty space, cancel
              if (clickToConnectStartPin) {
                setClickToConnectStartPin(null);
                setDrawingWire(null); // Clear temporary wire
                setIsStageDraggable(true); // Re-enable stage drag
              }
            }
          }}
        >
          <Layer>
            <Grid width={dimensions.width * 2} height={dimensions.height * 2} gridSize={gridSize} />
            {components.map((comp) => {
              const dimensions = getComponentDimensions(comp);
              return (
                <Group
                  key={`${comp.id}-${comp.connectors.length}-${comp.connectors.reduce((p, c) => p + c.pins.length, 0)}`}
                  ref={(node) => {
                    if (node) {
                      componentGroupRefs.current.set(comp.id, node);
                    } else {
                      componentGroupRefs.current.delete(comp.id);
                    }
                  }}
                  x={comp.x}
                  y={comp.y}
                  draggable
                  onDragStart={() => setIsStageDraggable(false)}
                  onDragEnd={(e) => {
                    e.cancelBubble = true;
                    setIsStageDraggable(true);
                    updateComponentProperties(comp.id, { x: e.target.x(), y: e.target.y() });
                    setSelectedComponent({ ...comp, x: e.target.x(), y: e.target.y() });
                  }}
                  onClick={() => {
                    setSelectedComponent(comp);
                  }}
                >
                  <Rect
                    width={dimensions.width}
                    height={dimensions.height}
                    fill="lightblue"
                    stroke={selectedComponent === comp ? 'red' : 'black'}
                    strokeWidth={selectedComponent === comp ? 2 : 1}
                  />
                  <Text
                    text={comp.name}
                    fontSize={16}
                    fontFamily="Calibri"
                    fill="black"
                    width={dimensions.width}
                    height={dimensions.height}
                    align="center"
                    verticalAlign="middle"
                  />
                  {/* Render Pins */}
                  {(() => {
                    const numConnectors = comp.connectors.length;
                    if (numConnectors === 0) return null;

                    const totalPins = comp.connectors.reduce((acc, conn) => acc + conn.pins.length, 0);
                    if (totalPins === 0) return null;

                    // Calculate the available width for pins, considering padding between connectors
                    const availableWidth = dimensions.width - (numConnectors + 1) * COMPONENT_PADDING;
                    const pinSpacing = availableWidth / totalPins;

                    let currentX = COMPONENT_PADDING;

                    return comp.connectors.map((connector) => {
                      const connectorPins = connector.pins.map((pin) => {
                        const pinX = currentX;
                        const pinY = dimensions.height - PIN_RADIUS; // On the bottom edge
                        currentX += pinSpacing;

                        return (
                          <Circle
                            key={pin.id}
                            x={pinX}
                            y={pinY}
                            radius={PIN_RADIUS}
                            fill="purple"
                            stroke="black"
                            strokeWidth={1}
                            onMouseDown={(e) => {
                              e.cancelBubble = true; // Prevent stage drag
                              setIsStageDraggable(false); // Disable stage drag during wiring

                              if (clickToConnectStartPin) {
                                // If the clicked pin is the same as the start pin, cancel the operation
                                if (clickToConnectStartPin.id === pin.id) {
                                  setClickToConnectStartPin(null);
                                  setDrawingWire(null);
                                  setIsStageDraggable(true);
                                  return;
                                }

                                // This is the second click, attempt to complete a wire
                                const startPin = clickToConnectStartPin;
                                const endPin = pin;
                                const startComponent = components.find(c => c.connectors.some(conn => conn.pins.some(p => p.id === startPin.id)));
                                const endComponent = comp;

                                if (startComponent && endComponent && (startPin.id !== endPin.id || startComponent.id !== endComponent.id)) {
                                  const newWire: Wire = {
                                    id: `wire-${Date.now()}`,
                                    startComponentId: startComponent.id,
                                    startConnectionPointId: startPin.id,
                                    endComponentId: endComponent.id,
                                    endConnectionPointId: endPin.id,
                                  };
                                  setWires(prevWires => [...prevWires, newWire]);
                                }
                                setClickToConnectStartPin(null); // Reset click-to-connect state
                                setDrawingWire(null); // Clear temporary wire
                                setIsStageDraggable(true); // Re-enable stage drag
                              } else {
                                // This is the first click, or initiating a drag-and-drop wire
                                // Set the click-to-connect start pin
                                setClickToConnectStartPin(pin);

                                // Also start drawing a temporary wire for visual feedback
                                const startAbsPos = getAbsoluteConnectionPointPosition(comp, pin);
                                setDrawingWire({
                                  startComponent: comp,
                                  startConnectionPoint: pin,
                                  points: [startAbsPos.x, startAbsPos.y, startAbsPos.x, startAbsPos.y],
                                });
                              }
                            }}
                            onMouseUp={(e) => {
                              e.cancelBubble = true; // Prevent stage drag
                              // The drag-and-drop completion logic is handled here
                              // No change needed for drag-and-drop completion
                              setIsStageDraggable(true); // Re-enable stage drag
                              if (drawingWire && drawingWire.startComponent.id === comp.id && drawingWire.startConnectionPoint.id === pin.id) {
                                // This is a click on the same pin that started the drag, so cancel the drag
                                setDrawingWire(null);
                              }
                            }}
                          />
                        );
                      });
                      currentX += COMPONENT_PADDING;
                      return <React.Fragment key={connector.id}>{connectorPins}</React.Fragment>;
                    });
                  })()}
                </Group>
              );
            })}
            {wires.map((wire) => {
              const startComponent = components.find(c => c.id === wire.startComponentId);
              const endComponent = components.find(c => c.id === wire.endComponentId);

              if (!startComponent || !endComponent) return null;

              // Find the start pin
              let startPin: Pin | undefined;
              for (const connector of startComponent.connectors) {
                startPin = connector.pins.find(p => p.id === wire.startConnectionPointId);
                if (startPin) break;
              }

              // Find the end pin
              let endPin: Pin | undefined;
              for (const connector of endComponent.connectors) {
                endPin = connector.pins.find(p => p.id === wire.endConnectionPointId);
                if (endPin) break;
              }

              if (!startPin || !endPin) return null;

              const startAbsPos = getAbsoluteConnectionPointPosition(startComponent, startPin);
              const endAbsPos = getAbsoluteConnectionPointPosition(endComponent, endPin);

              return (
                <Line
                  key={wire.id}
                  points={[startAbsPos.x, startAbsPos.y, endAbsPos.x, endAbsPos.y]}
                  stroke="blue"
                  strokeWidth={2}
                />
              );
            })}
            {drawingWire && (
              <Line
                points={drawingWire.points}
                stroke="red"
                strokeWidth={1}
                dash={[10, 5]}
              />
            )}
          </Layer>
        </Stage>
      )}
      <ComponentConfigModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingComponentId(null); // Reset editing state on close
        }}
        onSubmit={handleModalSubmit}
        initialName={initialModalName}
        initialConnectorsConfig={initialModalConnectorsConfig}
      />
      <PropertiesPanel />
    </div>
  );
};

export default HarnessCanvas;