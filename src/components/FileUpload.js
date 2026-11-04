import React, { useRef } from 'react';
import Icon from './Icon';

function FileUpload({ selectedFile, fileInfo, onFileSelect, onRemoveFile, onError }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleFile = (file) => {
    if (file.type === 'application/pdf') {
      onFileSelect(file);
    } else {
      onError(`"${file.name}" isn't a PDF. Choose a PDF file to continue.`);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // Reset so choosing the same file again still fires a change event
    e.target.value = '';
    if (file) handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <section className="upload-section">
      {!selectedFile ? (
        <div className="file-input-wrapper">
          <button
            type="button"
            className={`upload-area ${isDragging ? 'drag-over' : ''}`}
            onClick={() => fileInputRef.current.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Icon name="cloud_upload" size={48} className="upload-icon" />
            <span className="upload-text">
              <span className="upload-text-main">Drop PDF here or click to browse</span>
              <span className="upload-text-sub">Supports single or multi-page PDFs</span>
            </span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            aria-label="Choose a PDF file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
      ) : (
        <div className="file-info">
          <Icon name="description" size={40} className="file-icon" />
          <div className="file-details">
            {fileInfo ? (
              <>
                <p className="file-name">{fileInfo.name}</p>
                <p className="file-meta">{fileInfo.size} MB • {fileInfo.pages} page{fileInfo.pages > 1 ? 's' : ''}</p>
              </>
            ) : (
              <>
                <p className="file-name">{selectedFile.name}</p>
                <p className="file-meta">Loading PDF...</p>
              </>
            )}
          </div>
          <button type="button" className="icon-button" onClick={onRemoveFile} aria-label="Remove file">
            <Icon name="close" />
          </button>
        </div>
      )}
    </section>
  );
}

export default FileUpload;
