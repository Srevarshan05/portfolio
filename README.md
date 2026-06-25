# Sre Varshan — AI/ML Engineer Portfolio

Welcome to my portfolio! This project is a premium, highly interactive developer portfolio built using Next.js, TypeScript, and the Tetris Design System. It features a bold neobrutalist aesthetic, custom viewport reveal transitions, interactive UI elements, and a fully automated AI email drafting interface.

---

## 🚀 Key Features

### 1. 📬 Gmail-Style Compose Interface
- Replaced standard form inputs with a custom **Gmail Compose Dialog** layout in the Contact section.
- Clean neobrutalist theme with a Gmail header logo, To/From recipient pills, and auto-resizing text fields.
- Centered layout that dynamically scales to fit mobile, tablet, and ultra-wide screens perfectly.
- A **Sent Toast** that offers a 1-click **"Undo" button**, restoring your draft instantly from historical reference cache.

### 2. 🤖 AI-Powered Drafting (Groq API Integration)
- A **"Draft with AI"** prompt tray powered by Groq's high-speed Llama-3.3-70B model.
- Automatically generates customized, professional emails (both Subject and Body) based on user prompts.
- **Visual Loading Skeletons**: Displays a multi-line shimmering loader block inside the input fields while the AI generates the draft.
- **Word-by-Word Autofill Animation**: Streams the generated text dynamically word-by-word (20ms interval), accompanied by a signature glowing blue outline and active text color transition.
- **Keyboard & Click Interruption**: Instantly completes typing if the user types or clicks anywhere on the inputs.

### 3. 📧 Serverless SMTP Delivery & Fallback
- **API Endpoint (`/api/contact`)**: Sends structured email data securely through a serverless backend using Nodemailer.
- **Mailto Fallback**: If backend transmission fails or environment variables (`EMAIL_USER`, `EMAIL_PASS`) are unconfigured, it gracefully falls back by opening a prefilled draft in your local mail client.

### 4. 🎨 Portfolio Sections
- **Hero**: Immersive header with neobrutalist buttons.
- **Dome Gallery**: A 3D-styled interactive gallery showcasing projects and designs.
- **About & Skills**: Layout detailing technical competencies and ML tools.
- **Experience & Projects**: Staggered timeline card blocks showcasing past internships, research, and coding achievements.
- **Connect**: A custom board illustration (`Connect.png`) containing interactive hotspot overlays for GitHub, LinkedIn, and Gmail with copy-to-clipboard functionality and trailing glowing cursors.

### 5. 📱 Modular Footer & QR Code Card
- Refactored footer into a clean 3-column responsive grid (Sitemap, Portfolio, Connect).
- Integrated a dynamic vCard QR Code (using `react-qr-code`) that lets users instantly scan and save contact details (email, phone, GitHub, LinkedIn).
- Added a "Back to Top" scrolling button and precise location information (`AI Engineer · Tiruchirappalli, India`).

### 6. 🔬 Rich Project Detail Modals & Workflows
- Enhanced the **NutriMinds AI** project detail page with granular technical specs (VLM OCR, Mistral 7B Unsloth training table, Open Food Facts database, and structured output descriptions).
- Integrated the **ACAS Dhristi** predictive governance project card, featuring Spatio-Temporal Stress Index mapping, priority tables, and an autonomous n8n agentic workflow.
- Programmed a modal workflow lightbox that dynamically swaps between **Banana Weevil Pest Detection**, **NutriMinds AI**, and **ACAS Dhristi** workflow diagrams depending on the active project card.

### 7. 💼 Enhanced Experience Section & Internship Reports
- Rebuilt card structures with larger, clearly visible company logos (EmedLogix and Microsoft Edunet) and bold typography.
- Implemented stateful detailed modals for both internships to showcase comprehensive job descriptions, key contributions (conversational database agents, Azure Entra ID SSO, IoT ESP32 gas sensor calibration), technical skills lists, and outcomes.
- Configured custom link routing (EmedLogix product page, LinkedIn demo video for AI Nose) and added a dedicated workflow lightbox diagram (`/AI_Nose_Workflow.png`) for Microsoft Edunet.

---

## 🛠️ Technology Stack
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: TailwindCSS & Vanilla CSS
- **Mailing API**: [Nodemailer](https://nodemailer.com/)
- **AI Backend**: [Groq Cloud API SDK](https://console.groq.com/)
- **Reveal Animations**: Intersection Observer API (`useScrollReveal` hook)

---

## ⚙️ Environment Configuration

To set up Nodemailer SMTP dispatch and AI email drafting, create a `.env.local` file in the `portfolio-app` root directory:

```env
# Serverless SMTP Credentials
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASS=your-gmail-app-password

# Groq Cloud API Key
GROQ_API_KEY=your-groq-api-key
```

---

## 🛠️ Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```

### 3. Build for production
```bash
npm run build
```
