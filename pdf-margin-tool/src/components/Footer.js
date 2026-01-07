import React from 'react';

function Footer() {
  const handleHelpClick = (e) => {
    e.preventDefault();
    alert('For help, please contact your UX team or visit the README documentation.');
  };

  const handleFeedbackClick = (e) => {
    e.preventDefault();
    alert('Please send feedback to your team lead or AI COE representative.');
  };

  return (
    <footer className="footer">
      <p>PDF Margin Tool v1.0 | Relevate Health AI Center of Excellence</p>
      <p className="footer-links">
        <a href="#help" onClick={handleHelpClick}>Help</a> • 
        <a href="#feedback" onClick={handleFeedbackClick}>Feedback</a>
      </p>
    </footer>
  );
}

export default Footer;