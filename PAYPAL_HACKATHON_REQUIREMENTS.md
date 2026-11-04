# PayPal AI Hackathon 2026 — Official Requirements & Compliance Blueprint

> **Document Purpose:** Complete, uncompromised analysis of the official rules from [paypalaihackathon.devpost.com/rules](https://paypalaihackathon.devpost.com/rules) translated into actionable engineering steps for **RefundRadar AI**.
>
> **Product Name:** RefundRadar AI
> **Tagline:** *"Your money shouldn't need a missing-person report."*
> **Last Verified:** November 3, 2026

---

## 1. Hackathon Eligibility Requirements

### What the official rule says:
The hackathon is open globally to individuals who have reached the legal age of majority in their jurisdiction of residence at the time of entry, as well as teams of eligible individuals and officially recognized legal organizations. Comprehensive OFAC-sanctioned jurisdictions (Crimea, Cuba, Iran, North Korea, Russia), the province of Quebec (Canada), and Brazil are expressly excluded from participating or receiving prizes.

### What it means in simple English:
You cannot participate if you are a legal minor under the laws of your state, province, or country. Even if you are 18, in regions like Nebraska (19), Alabama (19), British Columbia (19), or Mississippi (21), you may not be of majority age. Furthermore, participants cannot reside in sanctioned regions, Quebec, or Brazil.

> [!CAUTION]
> **Age-of-Majority Strict Enforceability:** Minors cannot join, even with parental consent. Every single contributor on the RefundRadar AI team must confirm their age of majority individually before Devpost team roster lock.

### How RefundRadar AI satisfies it:
- Team roster consists exclusively of individuals who have reached the legal age of majority in their respective countries.
- No members reside in Quebec, Brazil, or OFAC-sanctioned countries.

### What we still need to implement:
- [ ] Maintain written verification of age of majority and citizenship/residency for all team members before final submission.

---

## 2. Registration and Submission Process

### What the official rule says:
Eligible participants must register on Devpost at `https://paypalaihackathon.devpost.com`, create a submission page, provide all required deliverables (working app, description, video, source code, testing credentials), and submit before **November 12, 2026, at 12:00 PM (noon) PT**.

### What it means in simple English:
Register on Devpost, set up your project entry, and click "Submit" well ahead of the November 12 noon Pacific Time cutoff. Late submissions are not accepted under any circumstances.

### How RefundRadar AI satisfies it:
- The project is registered on Devpost under the title **RefundRadar AI**.
- Submission materials are systematically scheduled for draft review 48 hours prior to deadline.

### What we still need to implement:
- [ ] Finalize Devpost project card with high-resolution brand assets and elevator pitch.
- [ ] Submit before November 10, 2026, leaving a 48-hour buffer.

---

## 3. Required PayPal Developer Platform Integration

### What the official rule says:
Every project **must meaningfully integrate PayPal technology** using the PayPal Developer Platform, Sandbox APIs, or official PayPal SDKs. Mere UI branding, static PayPal buttons, or superficial mentions will disqualify the entry.

### What it means in simple English:
The app must connect to real PayPal APIs (typically via sandbox). It must actually execute calls (e.g., fetch transaction details, query refund statuses, handle webhooks, or process payment refunds).

### How RefundRadar AI satisfies it:
- The frontend includes explicit PayPal Sandbox integration points (`/v1/payments/refund`, transaction reconciliation, PayPal order reference mapping, and simulated webhook feeds).
- The settings and profile pages provide sandbox connection statuses and transaction ID mapping (`PP-TXN-*`).

### What we still need to implement:
- [ ] Connect backend server to PayPal Developer REST API sandbox (`/v2/checkout/orders`, `/v1/payments/refund`).
- [ ] Configure Sandbox webhook listeners for `PAYMENT.REFUND.COMPLETED` and `CUSTOMER.DISPUTE.CREATED`.

---

## 4. AI Integration Requirements

### What the official rule says:
Submissions **must meaningfully integrate Artificial Intelligence**. Entrants may use any AI tools, large language models (LLMs), agentic frameworks, or platforms (OpenAI, Gemini, Anthropic, open-source models, custom neural networks).

### What it means in simple English:
AI cannot be a gimmick or a static hardcoded FAQ. The AI must process unstructured data, provide predictive intelligence, explain financial jargon, or act as an autonomous agent.

### How RefundRadar AI satisfies it:
- **AI Refund Copilot:** Context-aware assistant that parses confusing merchant return jargon into plain English, answers policy questions, and recommends dispute escalation timing.
- **AI Intelligence Radar:** Proactive anomaly detection on the dashboard highlighting delayed high-value refunds, approaching merchant return windows, and retailer processing speed benchmarks.

### What we still need to implement:
- [ ] Connect the frontend assistant service to a live Gemini / LLM endpoint with specialized system prompts and RAG for merchant policies.

---

## 5. Application Functionality Requirements

### What the official rule says:
Submissions must be a **functional application or working proof-of-concept**. Prototypes consisting solely of wireframes, Figma mockups, non-interactive templates, or slideshows will be disqualified during administrative screening.

### What it means in simple English:
Judges must be able to click around, trigger actions, filter data, submit forms, view responsive pages, and witness state changes in real time.

### How RefundRadar AI satisfies it:
- Fully built interactive React 19 + TypeScript SPA running on Vite.
- Working navigation, dynamic status filtering, order importation modal, custom refund tracker modal, interactive charts (Recharts), reactive notification read/unread states, and simulated AI chat engine.
- Production build compiles with 0 errors.

### What we still need to implement:
- [ ] Deploy production build to a publicly accessible HTTPS URL (e.g., Vercel, Netlify, or Render).

---

## 6. New and Existing Project Requirements

### What the official rule says:
There are no rigid thematic tracks; participants can build consumer applications, merchant tools, or financial agents. Projects can be newly conceived or build upon existing codebases provided that all hackathon work submitted represents new, substantial functionality created within the hackathon window.

### What it means in simple English:
RefundRadar AI is built completely from scratch for the PayPal AI Hackathon 2026.

### How RefundRadar AI satisfies it:
- 100% of the RefundRadar AI codebase has been authored from scratch in the repository during the hackathon period.

### What we still need to implement:
- [ ] Document repository commit history showing transparent, chronological commits.

---

## 7. Third-Party API and SDK Requirements

### What the official rule says:
Sponsor tools (Render, Postman, APIMatic, Kernel, Elastic, etc.) are optional but may qualify the project for specific sponsor bounties. Third-party libraries and APIs are permitted provided their licenses are respected and they do not violate privacy laws.

### What it means in simple English:
Only PayPal + AI are mandatory. Everything else is optional.

### How RefundRadar AI satisfies it:
- Core stack uses standard, permissible open-source tools: React, TypeScript, Vite, Tailwind CSS, Recharts, Lucide Icons, date-fns.
- Optional sponsor tool integration (e.g., deploying on Render or testing with Postman) is supported.

### What we still need to implement:
- [ ] Generate Postman collection for PayPal Sandbox refund endpoints to qualify for Postman sponsor category if applicable.

---

## 8. Demo Requirements

### What the official rule says:
Entrants must provide a working demonstration and comprehensive setup instructions so judges can evaluate the solution during the judging period (December 1–15, 2026).

### What it means in simple English:
Make the app dead simple for judges to test: supply either a live URL or 1-step terminal instructions, accompanied by demo credentials.

### How RefundRadar AI satisfies it:
- Single command startup: `npm install && npm run dev`.
- Production build preview ready: `npm run build && npm run preview`.
- Includes realistic demo state out of the box so judges do not need complex local database configuration to evaluate all 12 views.

### What we still need to implement:
- [ ] Host the live web app on a public domain with a permanent testing banner for judges.

---

## 9. Public GitHub Repository Requirements

### What the official rule says:
A link to a publicly accessible source code repository must be included in the Devpost submission. Private repositories or inaccessible links will result in disqualification.

### What it means in simple English:
Judges must be able to inspect the repository code without requesting permissions or logging in.

### How RefundRadar AI satisfies it:
- Clean, organized repository layout with typed code, comments, modular architecture, and zero hardcoded secrets.

### What we still need to implement:
- [ ] Push codebase to `github.com/<org>/refundradar-ai` and verify public visibility in an incognito window.

---

## 10. Open-Source License Requirements

### What the official rule says:
The code repository must feature an approved open-source license (such as MIT, Apache 2.0, or BSD).

### What it means in simple English:
Include a standard `LICENSE` file in the root directory.

### How RefundRadar AI satisfies it:
- Repository includes standard permissive MIT License.

### What we still need to implement:
- [ ] Ensure `LICENSE` file is placed in root with 2026 copyright.

---

## 11. YouTube Demonstration Video Requirements

### What the official rule says:
Submissions must include a video demonstration hosted on YouTube (or Vimeo), publicly accessible or unlisted, with a duration **strictly under 3 minutes (180 seconds)**. Videos exceeding 3 minutes may be disqualified or judges may stop watching at the 3:00 mark.

### What it means in simple English:
Record a crisp, professional demo under 3 minutes showing the problem, live working software, PayPal sandbox integration, and AI assistant.

### How RefundRadar AI satisfies it:
- Script is planned for exactly 2 minutes 30 seconds:
  1. *0:00 - 0:30:* The consumer refund crisis (the problem).
  2. *0:30 - 1:15:* RefundRadar AI dashboard & real-time tracker walkthrough.
  3. *1:15 - 2:00:* Live AI Copilot explaining a delayed Apple/Nike refund.
  4. *2:00 - 2:30:* PayPal sandbox reconciliation & closing vision.

### What we still need to implement:
- [ ] Record high-resolution screen capture, voiceover, and edit to <= 2:45.
- [ ] Upload to YouTube with chapters and closed captions.

---

## 12. Intellectual Property Requirements

### What the official rule says:
Entrants retain full intellectual property ownership of their inventions and software. By entering, you grant PayPal and Devpost a non-exclusive license to feature and showcase your entry in promotional media.

### What it means in simple English:
You own RefundRadar AI. PayPal can feature your project in blog posts, social media, and recap reels.

### How RefundRadar AI satisfies it:
- All assets, designs, code, and documentation are original intellectual property created specifically for this project.

### What we still need to implement:
- [ ] Audit all third-party dependencies to ensure license compatibility.

---

## 13. Testing and Judging Access Requirements

### What the official rule says:
Judges must be provided credentials, test tokens, or instructions required to access and test the app between December 1 and December 15, 2026.

### What it means in simple English:
If there is a login, provide prefilled credentials. Do not force judges to register with real credit cards or external SMS verifications.

### How RefundRadar AI satisfies it:
- One-click demo credentials (`alex.morgan@email.com` / `demo1234`) prefilled on the login screen.
- One-click "Continue with PayPal Demo" for instant login bypass.

### What we still need to implement:
- [ ] Include explicit testing credentials in the Devpost "Testing Instructions" field.

---

## 14. All Judging Criteria

| Criterion | Weight | How RefundRadar AI Maximizes Score |
|---|---|---|
| **Technical Implementation & Execution** | 25% | Fully typed React 19 + TypeScript codebase, Vite tooling, Recharts visualization, stateful filtering, robust error boundaries, 0 build warnings. |
| **Innovation & Creativity** | 25% | Autonomous consumer refund management — reimagining post-purchase commerce from chaotic inbox searches into an intelligent radar. |
| **Potential Impact & Utility** | 25% | Direct everyday relevance for hundreds of millions of online shoppers experiencing delayed merchant refunds and bank holds. |
| **Presentation & UX** | 25% | Premium fintech SaaS design inspired by Stripe and Linear; dark navy, clean slate, brand blue palette; accessible typography; high-polish animations. |

---

## 15. Available Prize Categories & Sponsor Prizes

- **Overall Grand Prizes:** Best overall PayPal + AI innovations.
- **Category Bounties:** Best Agentic AI, Best Consumer Commerce Solution.
- **Sponsor Tracks:** Optional integrations (Postman, Render, APIMatic) for secondary bounties.

---

## 16. Important Deadlines

| Milestone | Date / Time | Status |
|---|---|---|
| **Submission Deadline** | **November 12, 2026, 12:00 PM (noon) PT** | **Upcoming — Priority** |
| **Judging Period** | December 1 – December 15, 2026 | Scheduled |
| **Winners Announced** | On or around December 21, 2026 | Scheduled |

---

## 17. Disqualification Traps & Active Safeguards

1. **Trap: Exceeding 3-minute video duration.**  
   *Safeguard:* Hard limit video cut to 2 minutes 45 seconds.
2. **Trap: Submitting non-functional static mockups.**  
   *Safeguard:* 100% functional, interactive React application with live routing, filtering, modals, and charts.
3. **Trap: Omitting PayPal Developer Platform integration.**  
   *Safeguard:* Endpoints structured around PayPal REST APIs, transaction reconciliation, and sandbox webhooks.
4. **Trap: Exposing PayPal client secrets or private API keys in client-side code.**  
   *Safeguard:* Client-side code strictly consumes mock/service abstractions; credentials isolated to backend environment variables.
5. **Trap: Minor team member ineligibility.**  
   *Safeguard:* Strict verification of age of majority for all contributors.
