import React from "react";
import { Plus, Trash2 } from "lucide-react";

export default function LineItemsEditor({ items, onAdd, onUpdate, onRemove }) {
  return (
    <div className="section">
      <div className="section-label">
        Line items <span className="rule" />
      </div>
      {items.map((it) => (
        <div className="item-row" key={it.id}>
          <input
            placeholder="Description"
            value={it.description}
            onChange={(e) => onUpdate(it.id, "description", e.target.value)}
            aria-label="Item description"
          />
          <input
            type="number"
            min="0"
            step="0.01"
            value={it.qty}
            onChange={(e) => onUpdate(it.id, "qty", parseFloat(e.target.value) || 0)}
            aria-label="Quantity"
          />
          <input
            type="number"
            min="0"
            step="0.01"
            value={it.rate}
            onChange={(e) => onUpdate(it.id, "rate", parseFloat(e.target.value) || 0)}
            aria-label="Rate"
          />
          <button
            className="remove-btn"
            onClick={() => onRemove(it.id)}
            aria-label="Remove line item"
            title="Remove this line item"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ))}
      <button className="add-item-btn" onClick={onAdd} aria-label="Add new line item">
        <Plus size={14} /> Add line item
      </button>
    </div>
  );
}
