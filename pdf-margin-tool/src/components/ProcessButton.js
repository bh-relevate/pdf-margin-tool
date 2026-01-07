import React from 'react';

function ProcessButton({ disabled, isProcessing, onClick }) {
  return (
    <button
      className="process-btn"
      disabled={disabled}
      onClick={onClick}
    >
      <span id="process-btn-text">
        {isProcessing ? 'Processing...' : disabled ? 'Select a PDF to begin' : 'Process PDF'}
      </span>
      <svg
        className={`btn-icon ${isProcessing ? 'spinning' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </button>
  );
}

export default ProcessButton;