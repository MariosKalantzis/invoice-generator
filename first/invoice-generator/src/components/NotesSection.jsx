import React from "react";

export default function NotesSection({ notes, onChange }) {
  return (
    <div className="section">
      <div className="section-label">
        Notes <span className="rule" />
      </div>
      <label className="field">
        <textarea
          value={notes}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          aria-label="Invoice notes"
        />
      </label>
    </div>
  );
}
