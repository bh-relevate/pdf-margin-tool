import React from 'react';
import Banner from './Banner';
import Dialog from './Dialog';

function SuccessModal({ show, data, onClose, onProcessAnother }) {
  return (
    <Dialog
      open={Boolean(show && data)}
      title="Processing complete"
      onClose={onClose}
      footer={
        <>
          <button type="button" className="btn btn-ghost" onClick={onClose}>Close</button>
          <button type="button" className="btn btn-primary" onClick={onProcessAnother}>Process another PDF</button>
        </>
      }
    >
      {data && (
        <>
          <Banner status="success">Your PDF has been processed and downloaded.</Banner>
          <dl className="dialog-details">
            <div><dt>Pages processed</dt><dd>{data.pages}</dd></div>
            <div><dt>Right margin added</dt><dd>{data.margin}px</dd></div>
            <div><dt>Original width</dt><dd>{Math.round(data.originalWidth)}px</dd></div>
            <div><dt>New width</dt><dd>{Math.round(data.newWidth)}px</dd></div>
            <div><dt>File name</dt><dd>{data.fileName}</dd></div>
          </dl>
        </>
      )}
    </Dialog>
  );
}

export default SuccessModal;
