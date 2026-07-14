import React from "react";

export default function InvoicePreview({
  business,
  client,
  meta,
  items,
  subtotal,
  discountAmount,
  taxAmount,
  total,
  symbol,
  fmt,
  STATUS_STYLES,
  taxRate,
  discountRate,
  notes,
}) {
  const stamp = STATUS_STYLES[meta.status];

  return (
    <div className="preview-wrap">
      <div className="paper">
        <div className="paper-head">
          <div>
            <div className="paper-title">Invoice</div>
            <div className="paper-number">No. {meta.number || "—"}</div>
          </div>
          <div className="stamp" style={{ color: stamp.color, transform: `rotate(${stamp.rotate})` }}>
            {stamp.label}
          </div>
        </div>

        <div className="parties">
          <div>
            <div className="party-label">From</div>
            <div className="party-name">{business.name || "Your business"}</div>
            <div className="party-detail">{business.email}</div>
            <div className="party-detail">{business.address}</div>
          </div>
          <div>
            <div className="party-label">Bill to</div>
            <div className="party-name">{client.name || "Client name"}</div>
            <div className="party-detail">{client.email}</div>
            <div className="party-detail">{client.address}</div>
          </div>
        </div>

        <div className="meta-row">
          <div className="meta-item">
            <div className="party-label">Issued</div>
            <div className="value">{meta.issueDate || "—"}</div>
          </div>
          <div className="meta-item">
            <div className="party-label">Due</div>
            <div className="value">{meta.dueDate || "—"}</div>
          </div>
        </div>

        <table className="items">
          <thead>
            <tr>
              <th>Description</th>
              <th className="num">Qty</th>
              <th className="num">Rate</th>
              <th className="num">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id}>
                <td>{it.description || "—"}</td>
                <td className="num">{it.qty}</td>
                <td className="num">
                  {symbol}
                  {fmt(it.rate)}
                </td>
                <td className="num">
                  {symbol}
                  {fmt(it.qty * it.rate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="totals">
          <div className="totals-row">
            <span>Subtotal</span>
            <span className="val">
              {symbol}
              {fmt(subtotal)}
            </span>
          </div>
          {discountRate > 0 && (
            <div className="totals-row">
              <span>Discount ({discountRate}%)</span>
              <span className="val">
                −{symbol}
                {fmt(discountAmount)}
              </span>
            </div>
          )}
          {taxRate > 0 && (
            <div className="totals-row">
              <span>Tax ({taxRate}%)</span>
              <span className="val">
                {symbol}
                {fmt(taxAmount)}
              </span>
            </div>
          )}
          <div className="totals-row grand">
            <span>Total due</span>
            <span className="val">
              {symbol}
              {fmt(total)}
            </span>
          </div>
        </div>

        {notes && (
          <div className="notes">
            <div className="party-label">Notes</div>
            {notes}
          </div>
        )}
      </div>
    </div>
  );
}
