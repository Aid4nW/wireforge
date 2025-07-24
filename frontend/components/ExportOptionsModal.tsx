import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ExportOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (options: { selectedColumns: string[]; logo: string | null; components: Component[]; wires: Wire[] }) => void;
  availableColumns: string[];
  components: Component[];
  wires: Wire[];
}

const ExportOptionsModal: React.FC<ExportOptionsModalProps> = ({ isOpen, onClose, onExport, availableColumns, components, wires }) => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  useEffect(() => {
    setSelectedColumns(availableColumns); // Select all by default
    // Load saved logo from local storage
    const savedLogo = localStorage.getItem('wireforge-logo');
    if (savedLogo) {
      setLogoPreview(savedLogo);
    }
  }, [availableColumns]);

  const handleColumnChange = (column: string) => {
    setSelectedColumns(prev =>
      prev.includes(column) ? prev.filter(c => c !== column) : [...prev, column]
    );
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        localStorage.setItem('wireforge-logo', reader.result as string); // Save to local storage
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExportClick = () => {
    onExport({ selectedColumns, logo: logoPreview, components, wires });
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Export Options</h2>

        <div className="form-section">
          <h3>Select BOM Columns</h3>
          <div className="columns-grid">
            {availableColumns.map(column => (
              <label key={column}>
                <input
                  type="checkbox"
                  checked={selectedColumns.includes(column)}
                  onChange={() => handleColumnChange(column)}
                />
                {column}
              </label>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h3>Company Logo (for PDF)</h3>
          <input type="file" accept="image/*" onChange={handleLogoUpload} />
          {logoPreview && (
            <div className="logo-preview">
              <img src={logoPreview} alt="Company Logo Preview" />
              <button onClick={() => {
                setLogoFile(null);
                setLogoPreview(null);
                localStorage.removeItem('wireforge-logo');
              }}>Remove Logo</button>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button onClick={handleExportClick}>Export</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ExportOptionsModal;
