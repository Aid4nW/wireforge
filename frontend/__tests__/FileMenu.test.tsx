import { render, screen, fireEvent } from '@testing-library/react';
import App from '../pages/_app';
import Home from '../pages/index';

// Mock react-konva
jest.mock('react-konva', () => ({
  Stage: ({ children }) => <div>{children}</div>,
  Layer: ({ children }) => <div>{children}</div>,
  Rect: () => <div />,
  Circle: () => <div />,
  Line: () => <div />,
  Group: ({ children }) => <div>{children}</div>,
}));

// Mock the localStorage utility
const mockSave = jest.fn();
const mockLoad = jest.fn(() => ({ components: [], wires: [] }));
jest.mock('../utils/localStorage', () => ({
  saveDesignToLocalStorage: () => mockSave(),
  loadDesignFromLocalStorage: () => mockLoad(),
}));

describe('FileMenu', () => {
  const mockPrint = jest.fn();
  Object.defineProperty(window, 'print', { value: mockPrint, writable: true });

  beforeEach(() => {
    // Reset mocks before each test
    mockPrint.mockClear();
    mockSave.mockClear();
    mockLoad.mockClear();
  });

  it('renders the file menu', () => {
    render(<App Component={Home} pageProps={{}} />);
    expect(screen.getByText('File')).toBeInTheDocument();
  });

  it('toggles the file menu', () => {
    render(<App Component={Home} pageProps={{}} />);
    const fileMenuButton = screen.getByText('File');
    fireEvent.click(fileMenuButton);
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Load')).toBeInTheDocument();
  });

  it('calls the save function when "Save" is clicked', () => {
    render(<App Component={Home} pageProps={{}} />);
    const fileMenuButton = screen.getByText('File');
    fireEvent.click(fileMenuButton);

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);
    expect(mockSave).toHaveBeenCalled();
  });

  it('calls the load function when "Load" is clicked', () => {
    render(<App Component={Home} pageProps={{}} />);
    const fileMenuButton = screen.getByText('File');
    fireEvent.click(fileMenuButton);

    const loadButton = screen.getByText('Load');
    fireEvent.click(loadButton);
    expect(mockLoad).toHaveBeenCalled();
  });

  it('calls the print function when "Print" is clicked', () => {
    render(<App Component={Home} pageProps={{}} />);
    const fileMenuButton = screen.getByText('File');
    fireEvent.click(fileMenuButton);

    const printButton = screen.getByText('Print');
    fireEvent.click(printButton);
    expect(mockPrint).toHaveBeenCalled();
  });
});