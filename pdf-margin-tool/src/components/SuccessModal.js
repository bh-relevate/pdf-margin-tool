import React from 'react';

function SuccessModal({ show, data, onClose, onProcessAnother }) {
  if (!show || !data) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header success">
          <svg className="modal-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2>Processing Complete!</h2>
        </div>
        <div className="modal-body">
          <p>Your PDF has been processed and downloaded successfully.</p>
          <div className="modal-details">
            <p><strong>Pages processed:</strong> {data.pages}</p>
            <p><strong>Right margin added:</strong> {data.margin}px</p>
            <p><strong>Original width:</strong> {Math.round(data.originalWidth)}px</p>
            <p><strong>New width:</strong> {Math.round(data.newWidth)}px</p>
            <p><strong>File name:</strong> {data.fileName}</p>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Close</button>
          <button className="btn-primary" onClick={onProcessAnother}>Process Another PDF</button>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;