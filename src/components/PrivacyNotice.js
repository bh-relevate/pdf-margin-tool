import React from 'react';
import Banner from './Banner';

function PrivacyNotice() {
  return (
    <Banner status="info">
      <strong>Privacy:</strong> All processing happens in your browser. Files are never uploaded to any server.
    </Banner>
  );
}

export default PrivacyNotice;
