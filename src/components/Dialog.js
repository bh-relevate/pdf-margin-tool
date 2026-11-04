import React, { useEffect, useRef } from 'react';
import Icon from './Icon';

// Dialog, Standard variant. The scrim is applied here, outside the dialog card,
// and focus handling is in code because Figma can't represent it.
function Dialog({ open, title, onClose, children, footer }) {
  const dialogRef = useRef(null);

  // Move focus in on open and restore it on close. If the element that had focus
  // can't take it back (the Process button is disabled while processing), go to
  // the drop zone, or to the Process button if a file is still loaded.
  useEffect(() => {
    if (!open) return undefined;
    const previous = document.activeElement;
    dialogRef.current.querySelector('.btn-primary').focus();
    return () => {
      const canRestore = previous && previous !== document.body && previous.isConnected && !previous.disabled;
      const target = canRestore
        ? previous
        : document.querySelector('.upload-area, .process-action .btn:not(:disabled)');
      if (target) target.focus();
    };
  }, [open]);

  if (!open) return null;

  // Keep Tab inside the dialog. Escape closes it.
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }
    if (e.key !== 'Tab') return;
    const focusable = dialogRef.current.querySelectorAll('button');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div className="dialog-scrim">
      <div
        ref={dialogRef}
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        onKeyDown={handleKeyDown}
      >
        <div className="dialog-header">
          <h2 id="dialog-title">{title}</h2>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close">
            <Icon name="close" />
          </button>
        </div>
        <div className="dialog-body">{children}</div>
        <div className="dialog-footer">{footer}</div>
      </div>
    </div>
  );
}

export default Dialog;
