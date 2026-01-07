import React from 'react';

function MarginSettings({ marginType, customValue, onMarginTypeChange, onCustomValueChange }) {
  return (
    <section className="settings-section">
      <h2>Margin Settings</h2>
      <div className="radio-group">
        <label className="radio-label">
          <input
            type="radio"
            name="margin-type"
            value="tpp-default"
            checked={marginType === 'tpp-default'}
            onChange={(e) => onMarginTypeChange(e.target.value)}
          />
          <span className="radio-custom"></span>
          <span className="radio-text">
            <strong>TPP/SPP Default (30%)</strong>
            <small>Recommended for standard submissions</small>
          </span>
        </label>

        <label className="radio-label">
          <input
            type="radio"
            name="margin-type"
            value="custom-pixels"
            checked={marginType === 'custom-pixels'}
            onChange={(e) => onMarginTypeChange(e.target.value)}
          />
          <span className="radio-custom"></span>
          <span className="radio-text">
            <strong>Custom Pixels</strong>
            <small>Enter specific pixel width</small>
          </span>
        </label>

        <label className="radio-label">
          <input
            type="radio"
            name="margin-type"
            value="custom-percentage"
            checked={marginType === 'custom-percentage'}
            onChange={(e) => onMarginTypeChange(e.target.value)}
          />
          <span className="radio-custom"></span>
          <span className="radio-text">
            <strong>Custom Percentage</strong>
            <small>Percentage of page width</small>
          </span>
        </label>
      </div>

      {(marginType === 'custom-pixels' || marginType === 'custom-percentage') && (
        <div className="custom-input-wrapper">
          <input
            type="number"
            id="custom-value"
            placeholder="Enter value"
            min="0"
            step="1"
            value={customValue}
            onChange={(e) => onCustomValueChange(e.target.value)}
          />
          <span id="custom-unit">{marginType === 'custom-pixels' ? 'px' : '%'}</span>
        </div>
      )}
    </section>
  );
}

export default MarginSettings;