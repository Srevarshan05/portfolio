import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sre Varshan — AI/ML Engineer | Edge AI & Healthcare Tech",
  description:
    "Pre-final year AI/ML engineer building fast, local, and useful AI systems. Specializing in edge AI, healthcare automation, and agricultural tech. Government-patented banana weevil detection, Microsoft intern, EmedLogix AI product developer.",
  keywords: [
    "AI Engineer",
    "ML Engineer",
    "Edge AI",
    "Raspberry Pi AI",
    "Healthcare AI",
    "NLP",
    "Sre Varshan",
    "Portfolio",
    "Python",
    "LLM",
  ],
  authors: [{ name: "Sre Varshan" }],
  openGraph: {
    title: "Sre Varshan — AI/ML Engineer",
    description: "Building fast, local, and useful AI systems for real-world problems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts — Bangers (display) + Open Sans (body/UI) as per Tetris DS */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bangers&family=Open+Sans:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}

        {/* ============================================================
            CHATBASE.IO CHATBOT INJECTION POINT
            ──────────────────────────────────────────────────────────
            Label: "Ask me about Sre's work"
            Position: Fixed, bottom-right, z-index 9999
            Above the floating dock (bottom: 96px, right: 24px)
            
            HOW TO USE:
            1. Go to chatbase.io and create your chatbot
            2. Copy the embed <script> tag they provide
            3. Paste it inside the #chatbase-container div below
            4. Optionally customize position in globals.css → #chatbase-container
            
            EXAMPLE (replace with your actual bot ID):
            <script>
              window.chatbaseConfig = { chatbotId: "YOUR_BOT_ID" };
            </script>
            <script src="https://www.chatbase.co/embed.min.js" defer></script>
            ============================================================ */}
        <div id="chatbase-container" aria-label="Ask me about Sre's work" role="complementary">
          {/* ← Paste your Chatbase embed script here */}
        </div>
      </body>
    </html>
  );
}
