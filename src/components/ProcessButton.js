import React from 'react';

function ProcessButton({ disabled, isProcessing, onClick }) {
  return (
    <div className="process-action">
      <button type="button" className="btn btn-primary" disabled={disabled} onClick={onClick}>
        {isProcessing ? 'Processing...' : 'Process PDF'}
      </button>
      {disabled && !isProcessing && (
        <p className="process-hint">Select a PDF to begin</p>
      )}
    </div>
  );
}

export default ProcessButton;
