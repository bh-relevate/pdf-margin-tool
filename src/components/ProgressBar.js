import React from 'react';

function ProgressBar({ show, progress, text }) {
  if (!show) return null;

  return (
    <div className="progress-section">
      <div
        className="progress-bar"
        role="progressbar"
        aria-label="PDF processing progress"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={Math.round(progress)}
      >
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="progress-text">{text}</p>
    </div>
  );
}

export default ProgressBar;
