# Ledgerline — Invoice Generator

A polished, single-page invoice generator built with **React** + **Vite**. Create professional invoices with real-time preview, save your work locally, and export print-ready PDFs—no backend required.

## ✨ Features

- **Live Preview** — Paper-style invoice updates as you type
- **Data Persistence** — Your work auto-saves to browser localStorage (survives page refreshes)
- **Editable Line Items** — Add/remove items with auto-calculated totals
- **Tax & Discounts** — Apply percentage-based tax or discounts
- **Status Stamps** — Draft / Sent / Paid / Overdue badges on each invoice
- **Multi-Currency** — USD, EUR, GBP support
- **PDF Export** — One-click PDF download via browser print dialog
- **Responsive** — Works on desktop and tablet
- **Accessible** — ARIA labels, keyboard navigation, semantic HTML

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

### Build for Production

```bash
npm run build
npm run preview
```

The optimized build outputs to the `dist/` folder, ready for deployment.

## 📂 Project Structure

```
├── index.html                 # HTML entry point
├── package.json               # Dependencies & scripts
├── vite.config.js             # Vite configuration
│
└── src/
    ├── main.jsx               # React entry point
    ├── index.css              # Global styles
    ├── InvoiceGenerator.css    # App styles
    ├── InvoiceGenerator.jsx    # Main app (state & logic)
    │
    └── components/            # Reusable React components
        ├── PartyForm.jsx      # Business/Client info form
        ├── InvoiceMetadata.jsx # Invoice number, date, status
        ├── LineItemsEditor.jsx # Line items table
        ├── TaxAndDiscount.jsx  # Tax & discount controls
        ├── NotesSection.jsx    # Invoice notes textarea
        └── InvoicePreview.jsx  # Paper-style invoice preview
```

## 🛠 Tech Stack

- **React 18** — Component framework
- **Vite 5** — Fast build tool & dev server
- **[lucide-react](https://lucide.dev/)** — Icon library
- **Google Fonts** — Fraunces, Inter, JetBrains Mono

## 💾 How It Works

### Auto-Save
Invoice data is automatically saved to the browser's `localStorage` under the key `invoiceGeneratorData`. When you reload the page, your draft invoice is restored.

### Calculations
- **Subtotal** = Sum of (Qty × Rate) for all line items
- **Discounted Subtotal** = Subtotal × (1 − Discount% ÷ 100)
- **Tax** = Discounted Subtotal × (Tax% ÷ 100)
- **Total** = Discounted Subtotal + Tax

### PDF Export
Click the "Download PDF" button (or use `Ctrl/Cmd+P`) to open the browser print dialog. Select "Save as PDF" to export.

## 🎨 Customization

**Colors** — Edit CSS variables in [InvoiceGenerator.css](src/InvoiceGenerator.css#L1-L17):
```css
:root {
  --teal: #3FA084;
  --red: #B3452F;
  /* ... etc */
}
```

**Default Invoice Data** — Modify `DEFAULT_DATA` in [InvoiceGenerator.jsx](src/InvoiceGenerator.jsx#L21-L43).

## ♿ Accessibility

- Semantic HTML with proper heading hierarchy
- ARIA labels on all interactive elements
- Keyboard-navigable form controls
- Proper color contrast ratios
- Form validation feedback

## 🚢 Deployment

Deploy to **Vercel**, **Netlify**, **GitHub Pages**, or any static host:

```bash
# Build the app
npm run build

# Upload the `dist/` folder to your hosting provider
```

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

## 📝 License

MIT
