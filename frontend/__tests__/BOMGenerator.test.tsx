import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useBOMGenerator } from '../components/BOMGenerator';
import '@testing-library/jest-dom';

describe('BOMGenerator', () => {
  // Mock global.Blob before any test runs that might use it
  const mockBlob = jest.fn();
  const originalBlob = global.Blob; // Store original Blob to restore later

  beforeAll(() => {
    global.Blob = mockBlob;
  });

  afterAll(() => {
    global.Blob = originalBlob; // Restore original Blob after all tests
  });

  beforeEach(() => {
    mockBlob.mockClear(); // Clear mock calls before each test
  });

  // REQ-NON-USA-001: Intuitive User Interface
  it('should generate a CSV with correct component and wire counts', async () => {
    const components = [
      { id: 'c1', type: 'Connector A', x: 0, y: 0, pins: [] },
      { id: 'c2', type: 'Sensor B', x: 0, y: 0, pins: [] },
      { id: 'c3', type: 'Connector A', x: 0, y: 0, pins: [] },
    ];
    const wires = [
      { id: 'w1', startComponentId: 'c1', startPinId: 'p1', endComponentId: 'c2', endPinId: 'p1' },
      { id: 'w2', startComponentId: 'c2', startPinId: 'p1', endComponentId: 'c3', endPinId: 'p1' },
    ];

    // Create a dummy component to use the hook
    const TestComponent = () => {
      const { downloadBOM } = useBOMGenerator(components, wires);
      return <button onClick={downloadBOM}>Generate BOM (CSV)</button>;
    };

    render(<TestComponent />);

    const generateButton = screen.getByText('Generate BOM (CSV)');
    await userEvent.click(generateButton); // Await the click event

    expect(mockBlob).toHaveBeenCalledWith(
      ["Component,Quantity\nConnector A,2\nSensor B,1\n\nWire,Quantity\nTotal Wires,2\n"],
      { type: 'text/csv;charset=utf-8;' }
    );
  });
});