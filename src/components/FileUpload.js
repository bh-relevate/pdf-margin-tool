import React, { useRef } from 'react';

function FileUpload({ selectedFile, fileInfo, onFileSelect, onRemoveFile }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      onFileSelect(file);
    } else {
      alert('Please select a valid PDF file.');
    }
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
    if (file && file.type === 'application/pdf') {
      onFileSelect(file);
    } else {
      alert('Please drop a valid PDF file.');
    }
  };

  return (
    <section className="upload-section">
      {!selectedFile ? (
        <div className="file-input-wrapper">
          <div
            className={`upload-area ${isDragging ? 'drag-over' : ''}`}
            onClick={() => fileInputRef.current.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <svg className="upload-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="upload-text">
              <span className="upload-text-main">Drop PDF here or click to browse</span>
              <span className="upload-text-sub">Supports single or multi-page PDFs</span>
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
      ) : (
        <div className="file-info">
          <svg className="file-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
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
          <button className="remove-file" onClick={onRemoveFile} title="Remove file">×</button>
        </div>
      )}
    </section>
  );
}

export default FileUpload;