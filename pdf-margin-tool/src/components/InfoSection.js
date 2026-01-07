import React from 'react';

function InfoSection() {
  return (
    <section className="info-section">
      <h3>Quick Guide</h3>
      <ol>
        <li>Upload or drag-drop your PDF screenshot file</li>
        <li>Select margin setting (TPP/SPP Default recommended)</li>
        <li>Click "Process PDF" to add annotation space</li>
        <li>Download will start automatically when complete</li>
      </ol>
      <p className="security-note">
        🔒 <strong>Privacy:</strong> All processing happens in your browser. 
        Files are never uploaded to any server.
      </p>
    </section>
  );
}

export default InfoSection;