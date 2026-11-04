# RefundRadar AI

> **"Your money shouldn't need a missing-person report."**  
> An intelligent consumer fintech platform and autonomous refund tracking radar built for the **PayPal AI Hackathon 2026**.

[![PayPal Hackathon 2026](https://img.shields.io/badge/PayPal%20AI%20Hackathon-2026-003087?style=for-the-badge&logo=paypal&logoColor=white)](https://paypalaihackathon.devpost.com/)
[![React 19](https://img.shields.io/badge/React-19.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-AI%20Copilot-8E75C2?style=for-the-badge&logo=googlegemini&logoColor=white)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)

---

## 1. Problem Statement

Every year, everyday online shoppers return billions of dollars of merchandise across fragmented e-commerce retailers (Amazon, Apple, Nike, Best Buy, Target, etc.). 

The post-purchase experience is broken:
- **Chaotic Tracking:** Consumers must search through flooded email inboxes to find RMA numbers, shipping labels, and status updates.
- **Dense Return Policies:** Merchant terms and conditions are written in legal jargon with strict, hidden deadlines (14 to 30 days).
- **The "Pending Void":** After dropping off a package at UPS or FedEx, money disappears into a 5-to-14 day black hole between warehouse inspections, payment processor batches, and bank holds.
- **Unclaimed Money:** Billions of dollars in delayed or stalled refunds are forgotten every year because consumers lack an automated radar.

---

## 2. The Solution: RefundRadar AI

**RefundRadar AI** transforms consumer refund management from an opaque chore into a clear, explainable, and autonomous financial command center:

1. **Unified Refund Pipeline:** Track all claims in real-time across 7 standardized lifecycle stages (`Requested` $\rightarrow$ `Processing` $\rightarrow$ `Approved` $\rightarrow$ `Issued` $\rightarrow$ `Completed` $\rightarrow$ `Delayed` $\rightarrow$ `Action Required`).
2. **AI Refund Copilot (Google Gemini):** A context-aware financial assistant trained on retail return policies, bank settlement delays, and PayPal buyer protection dispute windows.
3. **PayPal Developer Sandbox Integration:** Deep integration with PayPal REST APIs (`/v1/oauth2/token`, `/v1/payments/refund`) and real-time webhook listeners for dispute and refund lifecycle events.
4. **Order Catalog with 1-Click Journey Creation:** Import purchases and initiate tracking with auto-populated merchant metadata and receipt line-items.
5. **Recovery Analytics & CSV Export:** Visual analytics on recovery velocity, retailer benchmarks, and downloadable audit spreadsheets.

---

## 3. Architecture & Tech Stack

```
refundradar-ai/
├── src/                          # Frontend Application (React 19 + TypeScript)
│   ├── components/
│   │   ├── analytics/            # Recharts financial trend visualizations
│   │   ├── assistant/            # AI Copilot chat UI & suggestion chips
│   │   ├── dashboard/            # KPI cards & recent activity feed
│   │   ├── layout/               # App shell, responsive drawer & topbar
│   │   ├── notifications/        # Real-time alert list & badge sync
│   │   ├── orders/               # Purchase catalog & modal receipt viewer
│   │   ├── refunds/              # Timeline audit & filter toolbar
│   │   └── ui/                   # Reusable accessible component library
│   ├── context/                  # Global reactive AppContext & useApp hook
│   ├── data/                     # Seeded realistic consumer datasets
│   ├── pages/                    # 12 routed views (Dashboard, Tracker, AI, etc.)
│   └── services/                 # API client abstraction with offline fallbacks
│
├── server/                       # Backend Application (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── data/                 # JSON file store & seed data
│   │   ├── routes/               # Express REST routes (/api/refunds, /orders, etc.)
│   │   ├── services/
│   │   │   ├── aiService.ts      # Google Gemini API + contextual RAG prompt
│   │   │   └── paypalService.ts  # PayPal Sandbox OAuth, sync & webhook listener
│   │   └── index.ts              # Server entry point on port 5000
│   └── package.json
│
├── PAYPAL_HACKATHON_REQUIREMENTS.md # Official rules & compliance breakdown
└── FRONTEND_IMPLEMENTATION.md    # Frontend architectural specification
```

### Technology Highlights:
- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Recharts, Lucide Icons, date-fns.
- **Backend:** Node.js, Express, TypeScript, `@google/generative-ai` SDK, CORS, Dotenv.
- **Payment Gateway:** PayPal Developer REST API Sandbox & Webhooks.

---

## 4. Quick Start & Setup

### Prerequisites:
- **Node.js** v18+ (tested on Node v20 and v22)
- **npm** (or pnpm/yarn)

### 1-Step Setup:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/h-240407/refundradar-ai.git
   cd refundradar-ai
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   cd server && npm install && cd ..
   ```

3. **Run the Backend (Terminal 1):**
   ```bash
   npm run server
   ```
   *Runs on `http://localhost:5000`*

4. **Run the Frontend (Terminal 2):**
   ```bash
   npm run dev
   ```
   *Runs on `http://localhost:5173`*

Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 5. Testing Credentials for Hackathon Judges

The application includes pre-configured demo credentials out of the box so judges do not need to register with credit cards or create external databases:

| Item | Demo Value |
|---|---|
| **Demo Email** | `alex.morgan@email.com` |
| **Demo Password** | `demo1234` |
| **Instant Bypass** | Click **"Continue with PayPal Demo"** on the login page |
| **PayPal Sandbox Client ID** | Pre-filled in System Settings (`demo-sb-client-id-...`) |
| **State Reset** | Click **"Reset Demo State & Cache"** in `/app/settings` |

---

## 6. PayPal Developer Sandbox Features

- **Sandbox Gateway Ping:** Test live PayPal API connectivity in `/app/settings` $\rightarrow$ PayPal Integration $\rightarrow$ "Test Ping".
- **Sandbox Transaction Sync:** Trigger real-time reconciliation via the Top Banner "Sync Sandbox" action or `POST /api/paypal/sync`.
- **Webhook Processing:** The backend includes a dedicated webhook receiver (`POST /api/paypal/webhook`) handling:
  - `PAYMENT.REFUND.COMPLETED` — Automatically moves matched claims to `completed` and issues deposit alerts.
  - `CUSTOMER.DISPUTE.CREATED` — Registers dispute records in the user's notification feed.
  - `PAYMENT.CAPTURE.REFUNDED` — Audits merchant payout captures.

---

## 7. AI Copilot (Google Gemini Integration)

The AI assistant ([/app/assistant](http://localhost:5173/app/assistant)) is powered by Google Gemini:
- **Merchant Policy Parsing:** Explains ambiguous merchant return jargon into clear bullet points.
- **Dynamic Context (RAG):** Gemini receives the user's live tracked claims and order details to deliver personalized status updates.
- **Fail-Safe Offline Mode:** If a `GEMINI_API_KEY` is not provided in `server/.env`, the system automatically activates a local intelligence engine with contextual pattern matching so demos never break.

To enable live Gemini API calls, simply add your key to `server/.env`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## 8. REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | System health, PayPal sandbox status, and claim counts |
| `GET` | `/api/refunds` | List all refunds with status/merchant/text search filters |
| `GET` | `/api/refunds/stats` | Dashboard KPI aggregate stats |
| `GET` | `/api/refunds/:id` | Detailed refund record with timeline audit events |
| `POST` | `/api/refunds` | Register a new refund journey |
| `PATCH` | `/api/refunds/:id/status` | Update refund lifecycle stage |
| `POST` | `/api/refunds/:id/notes` | Append personal notes to a claim's diary |
| `GET` | `/api/orders` | Catalog of consumer purchases and receipts |
| `POST` | `/api/orders` | Import a new purchase order |
| `GET` | `/api/notifications` | Real-time notifications and alerts |
| `PATCH` | `/api/notifications/:id/read` | Mark alert as read |
| `POST` | `/api/notifications/mark-all-read` | Mark all alerts read |
| `POST` | `/api/assistant/chat` | AI Copilot conversational endpoint |
| `GET` | `/api/paypal/status` | Current PayPal sandbox connection status |
| `POST` | `/api/paypal/sync` | Reconcile sandbox transactions |
| `POST` | `/api/paypal/webhook` | PayPal Developer webhook receiver |
| `POST` | `/api/reset` | Restore initial seed data |

---

## 9. Hackathon Rules & Compliance Summary

- [x] **Age of Majority:** All team members meet jurisdiction requirements.
- [x] **PayPal Integration:** Meaningful use of PayPal Sandbox APIs, transaction mappings, and webhooks.
- [x] **Meaningful AI:** Contextual Gemini AI engine with plain-English policy explanations and RAG.
- [x] **Working Application:** Fully interactive React 19 + Express full-stack application (0 build errors).
- [x] **Public Code Repository:** Publicly available on GitHub with MIT License.
- [x] **Judging Access:** Prefilled 1-click test credentials provided.

---

## 10. License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
