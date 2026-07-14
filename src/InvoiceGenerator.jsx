import React, { useState, useMemo, useEffect } from "react";
import { Download, FileText } from "lucide-react";
import PartyForm from "./components/PartyForm";
import LineItemsEditor from "./components/LineItemsEditor";
import InvoiceMetadata, { STATUS_STYLES, CURRENCIES } from "./components/InvoiceMetadata";
import TaxAndDiscount from "./components/TaxAndDiscount";
import NotesSection from "./components/NotesSection";
import InvoicePreview from "./components/InvoicePreview";
import "./InvoiceGenerator.css";

let idCounter = 3;
const newItem = () => ({ id: idCounter++, description: "", qty: 1, rate: 0 });

const STORAGE_KEY = "invoiceGeneratorData";

const DEFAULT_DATA = {
  business: {
    name: "Aster & Finch Studio",
    email: "hello@asterfinch.com",
    address: "142 Kestrel Lane\nPortland, OR 97205",
  },
  client: {
    name: "Marlow Consulting",
    email: "accounts@marlowco.com",
    address: "88 Bramble Road\nSeattle, WA 98101",
  },
  meta: {
    number: "0001",
    issueDate: new Date().toISOString().slice(0, 10),
    dueDate: "",
    status: "draft",
    currency: "USD",
  },
  items: [
    { id: 1, description: "Brand identity design", qty: 1, rate: 2400 },
    { id: 2, description: "Website design — 5 pages", qty: 1, rate: 3200 },
  ],
  taxRate: 8,
  discountRate: 0,
  notes: "Payment due within 14 days. Thank you for the opportunity to work together.",
};

export default function InvoiceGenerator() {
  const [business, setBusiness] = useState(DEFAULT_DATA.business);
  const [client, setClient] = useState(DEFAULT_DATA.client);
  const [meta, setMeta] = useState(DEFAULT_DATA.meta);
  const [items, setItems] = useState(DEFAULT_DATA.items);
  const [taxRate, setTaxRate] = useState(DEFAULT_DATA.taxRate);
  const [discountRate, setDiscountRate] = useState(DEFAULT_DATA.discountRate);
  const [notes, setNotes] = useState(DEFAULT_DATA.notes);
  const [showSaveNotification, setShowSaveNotification] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        setBusiness(data.business || DEFAULT_DATA.business);
        setClient(data.client || DEFAULT_DATA.client);
        setMeta(data.meta || DEFAULT_DATA.meta);
        setItems(data.items || DEFAULT_DATA.items);
        setTaxRate(data.taxRate || DEFAULT_DATA.taxRate);
        setDiscountRate(data.discountRate || DEFAULT_DATA.discountRate);
        setNotes(data.notes || DEFAULT_DATA.notes);
      }
    } catch (error) {
      console.error("Failed to load from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      const data = {
        business,
        client,
        meta,
        items,
        taxRate,
        discountRate,
        notes,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  }, [business, client, meta, items, taxRate, discountRate, notes]);

  useEffect(() => {
    const link = document.createElement("style");
    link.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
    `;
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        handleDownload();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        setShowSaveNotification(true);
        setTimeout(() => setShowSaveNotification(false), 2000);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const symbol = CURRENCIES[meta.currency];
  const subtotal = useMemo(
    () => items.reduce((s, it) => s + it.qty * it.rate, 0),
    [items]
  );
  const discountAmount = subtotal * (discountRate / 100);
  const taxAmount = (subtotal - discountAmount) * (taxRate / 100);
  const total = subtotal - discountAmount + taxAmount;

  const fmt = (n) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const updateItem = (id, field, value) =>
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, [field]: value } : it))
    );
  const removeItem = (id) => setItems((prev) => prev.filter((it) => it.id !== id));
  const addItem = () => setItems((prev) => [...prev, newItem()]);

  const handleDownload = () => window.print();

  return (
    <div className="app-shell">
      <div className="topbar">
        <div className="wordmark">
          <FileText size={20} color="#3FA084" strokeWidth={2} />
          Ledgerline
          <span className="rule" />
        </div>
        <div className="topbar-right">
          {showSaveNotification && (
            <div className="save-notification">
              ✓ Invoice saved
            </div>
          )}
          <button className="download-btn" onClick={handleDownload} aria-label="Download invoice as PDF (Ctrl+P)">
            <Download size={15} /> Download PDF
          </button>
        </div>
      </div>

      <div className="layout">
        {/* FORM PANEL */}
        <div className="form-panel">
          <PartyForm label="From" party={business} onChange={setBusiness} />
          <PartyForm label="Bill to" party={client} onChange={setClient} />
          <InvoiceMetadata meta={meta} onChange={setMeta} />
          <LineItemsEditor
            items={items}
            onAdd={addItem}
            onUpdate={updateItem}
            onRemove={removeItem}
          />
          <TaxAndDiscount
            taxRate={taxRate}
            discountRate={discountRate}
            onTaxChange={setTaxRate}
            onDiscountChange={setDiscountRate}
          />
          <NotesSection notes={notes} onChange={setNotes} />
        </div>

        {/* PREVIEW PANEL */}
        <InvoicePreview
          business={business}
          client={client}
          meta={meta}
          items={items}
          subtotal={subtotal}
          discountAmount={discountAmount}
          taxAmount={taxAmount}
          total={total}
          symbol={symbol}
          fmt={fmt}
          STATUS_STYLES={STATUS_STYLES}
          taxRate={taxRate}
          discountRate={discountRate}
          notes={notes}
        />
      </div>
    </div>
  );
}
