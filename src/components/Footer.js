import React, { useState } from 'react';
import Banner from './Banner';

function Footer({ onHelp }) {
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <footer className="footer">
      {showFeedback && (
        <Banner status="warning">Please send feedback to your team lead or AI COE representative.</Banner>
      )}
      <p>PDF Margin Tool v2.1 | Relevate Health AI Center of Excellence</p>
      <p className="footer-links">
        <button type="button" className="link-button" onClick={onHelp}>Help</button>
        <span aria-hidden="true">•</span>
        <button type="button" className="link-button" onClick={() => setShowFeedback(true)}>Feedback</button>
      </p>
    </footer>
  );
}

export default Footer;
