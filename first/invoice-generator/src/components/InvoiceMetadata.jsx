import React from "react";

const STATUS_STYLES = {
    draft: { label: "DRAFT", color: "#8A6D1E", rotate: "-8deg" },
    sent: { label: "SENT", color: "#3E6E9E", rotate: "-6deg" },
    paid: { label: "PAID", color: "#2F6E5C", rotate: "-10deg" },
    overdue: { label: "OVERDUE", color: "#B3452F", rotate: "-7deg" },
};

const CURRENCIES = { USD: "$", EUR: "€", GBP: "£" };

export default function InvoiceMetadata({ meta, onChange }) {
    const handleChange = (field, value) => {
        onChange({ ...meta, [field]: value });
    };

    return (
        <div className="section">
            <div className="section-label">
                Invoice details <span className="rule" />
            </div>
            <div className="two-col">
                <label className="field">
                    <span>Invoice number</span>
                    <input
                        value={meta.number}
                        onChange={(e) => handleChange("number", e.target.value)}
                        required
                        aria-label="Invoice number"
                    />
                </label>
                <label className="field">
                    <span>Currency</span>
                    <select
                        value={meta.currency}
                        onChange={(e) => handleChange("currency", e.target.value)}
                        aria-label="Currency"
                    >
                        {Object.keys(CURRENCIES).map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div className="two-col">
                <label className="field">
                    <span>Issue date</span>
                    <input
                        type="date"
                        value={meta.issueDate}
                        onChange={(e) => handleChange("issueDate", e.target.value)}
                        required
                        aria-label="Issue date"
                    />
                </label>
                <label className="field">
                    <span>Due date</span>
                    <input
                        type="date"
                        value={meta.dueDate}
                        onChange={(e) => handleChange("dueDate", e.target.value)}
                        aria-label="Due date"
                    />
                </label>
            </div>
            <label className="field">
                <span>Status</span>
                <div className="status-select">
                    {Object.entries(STATUS_STYLES).map(([key, s]) => (
                        <button
                            key={key}
                            type="button"
                            className={`status-chip ${meta.status === key ? "active" : ""}`}
                            onClick={() => handleChange("status", key)}
                            aria-label={`Set status to ${s.label}`}
                            aria-pressed={meta.status === key}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>
            </label>
        </div>
    );
}

export { STATUS_STYLES, CURRENCIES };
