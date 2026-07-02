import React from "react";

export default function PartyForm({ label, party, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...party, [field]: value });
  };

  return (
    <div className="section">
      <div className="section-label">
        {label} <span className="rule" />
      </div>
      <label className="field">
        <span>{label === "From" ? "Business name" : "Client name"}</span>
        <input
          value={party.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
          aria-label={`${label} name`}
        />
      </label>
      <label className="field">
        <span>Email</span>
        <input
          type="email"
          value={party.email}
          onChange={(e) => handleChange("email", e.target.value)}
          aria-label={`${label} email`}
        />
      </label>
      <label className="field">
        <span>Address</span>
        <textarea
          value={party.address}
          onChange={(e) => handleChange("address", e.target.value)}
          aria-label={`${label} address`}
        />
      </label>
    </div>
  );
}
