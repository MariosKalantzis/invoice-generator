import React from "react";

export default function TaxAndDiscount({ taxRate, discountRate, onTaxChange, onDiscountChange }) {
  return (
    <div className="section">
      <div className="section-label">
        Tax &amp; discount <span className="rule" />
      </div>
      <div className="two-col">
        <label className="field">
          <span>Tax rate (%)</span>
          <input
            type="number"
            min="0"
            max="100"
            step="0.01"
            value={taxRate}
            onChange={(e) => onTaxChange(parseFloat(e.target.value) || 0)}
            aria-label="Tax rate percentage"
          />
        </label>
        <label className="field">
          <span>Discount (%)</span>
          <input
            type="number"
            min="0"
            max="100"
            step="0.01"
            value={discountRate}
            onChange={(e) => onDiscountChange(parseFloat(e.target.value) || 0)}
            aria-label="Discount percentage"
          />
        </label>
      </div>
    </div>
  );
}
