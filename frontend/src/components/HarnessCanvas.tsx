"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Rect, Text, Group, Circle, Line } from 'react-konva';
import Konva from 'konva';
import Grid from './Grid';
import { useSelectionStore } from '@/store/useSelectionStore';

interface Port {
  id: string;
  x: number; // relative to component's origin
  y: number; // relative to component's origin
}

interface Component {
  id: string; // Add unique ID
  x: number;
  y: number;
  name: string;
  ports: Port[];
}

interface Wire {
  id: string;
  startComponentId: string;
  startPortId: string;
  endComponentId: string;
  endPortId: string;
}

const HarnessCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [stage, setStage] = useState({
    scale: 1,
    x: 0,
    y: 0,
  });
  const [components, setComponents] = useState<Component[]>([]);
  const [wires, setWires] = useState<Wire[]>([]);
  const [drawingWire, setDrawingWire] = useState<{
    startComponent: Component;
    startPort: Port;
    points: number[]; // [x1, y1, x2, y2] for the temporary line
  } | null>(null);
  const { selectedComponent, setSelectedComponent } = useSelectionStore();
  const [isStageDraggable, setIsStageDraggable] = useState(true);
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
    const name = e.dataTransfer.getData('text/plain');
    
    if (stageRef.current) {
        const stage = stageRef.current;
        stage.setPointersPositions(e.nativeEvent);
        const pos = stage.getPointerPosition();
        if (pos) {
            const newComponent: Component = {
                id: `comp-${Date.now()}`, // Generate unique ID
                x: (pos.x - stage.x()) / stage.scaleX(),
                y: (pos.y - stage.y()) / stage.scaleY(),
                name,
                ports: [
                    { id: 'left', x: 0, y: 25 }, // Assuming component is 100x50
                    { id: 'right', x: 100, y: 25 },
                ],
            };
            setComponents([
                ...components,
                newComponent,
            ]);
            setSelectedComponent(newComponent); // Select the newly dropped component
        }
    }
  };

  const getAbsolutePortPosition = (component: Component, port: Port) => {
    const stage = stageRef.current;
    if (!stage) return { x: 0, y: 0 };

    const componentAbsoluteX = component.x * stage.scaleX() + stage.x();
    const componentAbsoluteY = component.y * stage.scaleY() + stage.y();

    const portAbsoluteX = componentAbsoluteX + port.x * stage.scaleX();
    const portAbsoluteY = componentAbsoluteY + port.y * stage.scaleY();

    return { x: portAbsoluteX, y: portAbsoluteY };
  };

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
            setStage({
              ...stage,
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
          onMouseMove={(e) => {
            if (drawingWire && stageRef.current) {
              const pointerPosition = stageRef.current.getPointerPosition();
              if (pointerPosition) {
                setDrawingWire((prev) => {
                  if (!prev) return null;
                  const newPoints = [...prev.points];
                  newPoints[2] = pointerPosition.x;
                  newPoints[3] = pointerPosition.y;
                  return { ...prev, points: newPoints };
                });
              }
            }
          }}
          onClick={(e) => {
            // if we are clicking on an empty place, deselect all
            if (e.target === e.target.getStage()) {
              setSelectedComponent(null);
            }
          }}
        >
          <Layer>
            <Grid width={dimensions.width * 2} height={dimensions.height * 2} gridSize={gridSize} />
            {components.map((comp, i) => (
              <Group
                key={comp.id} // Use component ID as key
                x={comp.x}
                y={comp.y}
                draggable
                onDragStart={() => setIsStageDraggable(false)}
                onDragEnd={(e) => {
                  e.cancelBubble = true;
                  setIsStageDraggable(true);
                  const newComponents = [...components];
                  newComponents[i] = {
                    ...newComponents[i],
                    x: e.target.x(),
                    y: e.target.y(),
                  };
                  setComponents(newComponents);
                  setSelectedComponent(newComponents[i]); // Select the moved component
                }}
                onClick={() => {
                  setSelectedComponent(comp); // Select the clicked component
                }}
              >
                <Rect
                  width={100}
                  height={50}
                  fill="lightblue"
                  stroke={selectedComponent === comp ? 'red' : 'black'}
                  strokeWidth={selectedComponent === comp ? 2 : 1}
                />
                <Text
                  text={comp.name}
                  fontSize={16}
                  fontFamily="Calibri"
                  fill="black"
                  width={100}
                  height={50}
                  align="center"
                  verticalAlign="middle"
                />
                {comp.ports.map((port) => (
                  <Circle
                    key={port.id}
                    x={port.x}
                    y={port.y}
                    radius={5}
                    fill="green"
                    stroke="black"
                    strokeWidth={1}
                    onClick={(e) => {
                      e.cancelBubble = true; // Prevent click from propagating to component or stage
                      if (!drawingWire) {
                        // Start drawing a wire
                        const absolutePos = getAbsolutePortPosition(comp, port);
                        setDrawingWire({
                          startComponent: comp,
                          startPort: port,
                          points: [absolutePos.x, absolutePos.y, absolutePos.x, absolutePos.y],
                        });
                      } else {
                        // Finish drawing a wire
                        if (drawingWire.startComponent.id === comp.id && drawingWire.startPort.id === port.id) {
                          // Clicked the same port, cancel drawing
                          setDrawingWire(null);
                          return;
                        }

                        const newWire: Wire = {
                          id: `wire-${Date.now()}`,
                          startComponentId: drawingWire.startComponent.id,
                          startPortId: drawingWire.startPort.id,
                          endComponentId: comp.id,
                          endPortId: port.id,
                        };
                        setWires((prevWires) => [...prevWires, newWire]);
                        setDrawingWire(null); // Reset drawing state
                      }
                    }}
                  />
                ))}
              </Group>
            ))}
            {wires.map((wire) => {
              const startComponent = components.find(c => c.id === wire.startComponentId);
              const endComponent = components.find(c => c.id === wire.endComponentId);

              if (!startComponent || !endComponent) return null;

              const startPort = startComponent.ports.find(p => p.id === wire.startPortId);
              const endPort = endComponent.ports.find(p => p.id === wire.endPortId);

              if (!startPort || !endPort) return null;

              const startAbsPos = getAbsolutePortPosition(startComponent, startPort);
              const endAbsPos = getAbsolutePortPosition(endComponent, endPort);

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
    </div>
  );
};

export default HarnessCanvas;
