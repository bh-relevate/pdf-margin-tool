import React from 'react';
import Icon from './Icon';

const OPTIONS = [
  { value: 'tpp-default', label: 'TPP/SPP Default (30%)' },
  { value: 'custom-pixels', label: 'Custom pixels (375px recommended)' },
  { value: 'custom-percentage', label: 'Custom percentage' },
];

function MarginSettings({ marginType, customValue, marginError, onMarginTypeChange, onCustomValueChange }) {
  const isPercentage = marginType === 'custom-percentage';

  const step = (delta) => {
    const current = parseFloat(customValue);
    let next = (isNaN(current) ? 0 : current) + delta;
    next = Math.max(0, next);
    if (isPercentage) next = Math.min(100, next);
    onCustomValueChange(String(next));
  };

  return (
    <section className="settings-section">
      <fieldset className="radio-group">
        <legend className="field-label">Margin settings</legend>
        <div className="radio-list">
          {OPTIONS.map((option) => {
            const checked = marginType === option.value;
            return (
              <label key={option.value} className={`radio-item ${checked ? 'selected' : ''}`}>
                <input
                  className="sr-only"
                  type="radio"
                  name="margin-type"
                  value={option.value}
                  checked={checked}
                  onChange={(e) => onMarginTypeChange(e.target.value)}
                />
                <Icon
                  name={checked ? 'radio_button_checked' : 'radio_button_unchecked'}
                  className="radio-icon"
                />
                <span>{option.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {(marginType === 'custom-pixels' || isPercentage) && (
        <div>
          <label className="field-label" htmlFor="custom-value">
            {isPercentage ? 'Margin percentage' : 'Margin width'}
          </label>
          <div className={`number-input ${marginError ? 'error' : ''}`}>
            <input
              type="number"
              id="custom-value"
              placeholder="Value"
              min="0"
              max={isPercentage ? '100' : undefined}
              step="1"
              value={customValue}
              aria-invalid={Boolean(marginError)}
              aria-describedby={marginError ? 'custom-value-error' : undefined}
              onChange={(e) => onCustomValueChange(e.target.value)}
            />
            <span className="number-unit">{isPercentage ? '%' : 'px'}</span>
            {/* Pointer shortcut only: arrow keys already step the focused input */}
            <span className="number-stepper">
              <button type="button" className="step-up" tabIndex={-1} aria-label="Increase value" onClick={() => step(1)}>
                <Icon name="expand_more" size={16} />
              </button>
              <button type="button" tabIndex={-1} aria-label="Decrease value" onClick={() => step(-1)}>
                <Icon name="expand_more" size={16} />
              </button>
            </span>
          </div>
          {marginError && (
            <p className="field-error" id="custom-value-error">{marginError}</p>
          )}
        </div>
      )}
    </section>
  );
}

export default MarginSettings;
