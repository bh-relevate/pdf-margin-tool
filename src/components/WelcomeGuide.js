import React from 'react';
import Dialog from './Dialog';
import PrivacyNotice from './PrivacyNotice';

const STORAGE_KEY = 'pdfMarginTool.guideSeen';

// Storage can be blocked or cleared. If so, the guide simply shows again next visit.
export function hasSeenGuide() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'true';
  } catch (e) {
    return false;
  }
}

export function markGuideSeen() {
  try {
    window.localStorage.setItem(STORAGE_KEY, 'true');
  } catch (e) {
    // Nothing to do: see above
  }
}

function WelcomeGuide({ open, onClose }) {
  return (
    <Dialog
      open={open}
      title="Quick guide"
      onClose={onClose}
      footer={<button type="button" className="btn btn-primary" onClick={onClose}>Get started</button>}
    >
      <ol className="guide-steps">
        <li>Upload or drag-drop your PDF screenshot file</li>
        <li>Select margin setting (TPP/SPP Default recommended)</li>
        <li>Click "Process PDF" to add annotation space</li>
        <li>Download will start automatically when complete</li>
      </ol>
      <PrivacyNotice />
      <p className="guide-help">Need more help? Contact your UX AI team.</p>
    </Dialog>
  );
}

export default WelcomeGuide;
