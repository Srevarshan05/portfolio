import type { Metadata } from "next";
import "./globals.css";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Sre Varshan",
  "jobTitle": "Applied AI & Generative AI Engineer",
  "url": "https://www.srevarshan.in",
  "sameAs": [
    "https://github.com/Srevarshan05",
    "https://www.linkedin.com/in/srevarshan",
    "https://www.youtube.com/@SreVarshanAI"
  ],
  "knowsAbout": [
    "Large Language Models (LLMs)",
    "Vision Language Models (VLMs)",
    "Optical Character Recognition (OCR)",
    "Edge AI",
    "AI Agents",
    "Retrieval-Augmented Generation (RAG)",
    "Intelligent Systems",
    "Full-Stack AI Engineering",
    "NVIDIA Jetson Edge Computing"
  ],
  "creator": [
    {
      "@type": "SoftwareApplication",
      "name": "TextLens",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Cross-platform",
      "description": "An open-source OCR framework focused on simplifying document intelligence and reusable OCR workflows for Python developers."
    }
  ],
  "hasPatent": [
    {
      "@type": "Patent",
      "name": "Banana Weevil Detection through Dual-Mode Acoustic Sensing and Edge AI"
    }
  ]
};

export const metadata: Metadata = {
  title: "Sre Varshan — Applied AI & GenAI Engineer | LLMs, Edge AI, OCR, AI Systems",
  description:
    "Official portfolio of Sre Varshan, an Applied AI & Generative AI Engineer, Software Developer, and AI Researcher specializing in Large Language Models (LLMs), Vision Language Models (VLMs), Edge AI, Optical Character Recognition (OCR), AI Agents, Retrieval-Augmented Generation (RAG), Intelligent Document Processing, Full-Stack AI Engineering, NVIDIA Jetson Edge Computing, and production-ready AI systems. Creator of TextLens, an open-source OCR framework focused on simplifying document intelligence and reusable OCR workflows for Python developers. Author of technical AI content and complete project demonstrations on YouTube. Published researcher with accepted Springer conference publications, book chapter author, patent holder for an innovative banana weevil early detection system using dual-mode acoustic sensing and Edge AI, multiple national hackathon winner, open-source contributor, and builder of scalable AI products that transform cutting-edge research into real-world applications.",
  keywords: [
    "Sre Varshan",
    "SreVarshan",
    "Sre Varshan AI",
    "Applied AI Engineer",
    "Generative AI Engineer",
    "GenAI Engineer",
    "Artificial Intelligence Engineer",
    "Software Developer",
    "Machine Learning Engineer",
    "LLM Engineer",
    "Vision Language Models",
    "VLM",
    "Large Language Models",
    "LLM",
    "Edge AI",
    "OCR",
    "Optical Character Recognition",
    "TextLens",
    "OCR Framework",
    "Python OCR",
    "Document AI",
    "Document Intelligence",
    "AI Agents",
    "Retrieval Augmented Generation",
    "RAG",
    "Prompt Engineering",
    "LangChain",
    "Hugging Face",
    "PyTorch",
    "FastAPI",
    "Docker",
    "AWS",
    "NVIDIA Jetson",
    "Embedded AI",
    "Intelligent Systems",
    "Full Stack AI",
    "Production AI",
    "Open Source AI",
    "AI Research",
    "Research Publications",
    "Springer Publication",
    "Patent Holder",
    "Banana Weevil Detection",
    "Acoustic AI",
    "Technical YouTuber",
    "AI Projects",
    "Python",
    "Developer Portfolio",
    "AI Portfolio",
    "AI Engineer India",
    "Sre Varshan Portfolio"
  ],
  authors: [{ name: "Sre Varshan" }],
  icons: {
    icon: [
      { url: "/Portfolio-favi.png" },
      { url: "/favicon.ico" }
    ],
    shortcut: "/Portfolio-favi.png",
    apple: "/Portfolio-favi.png",
  },
  openGraph: {
    title: "Sre Varshan — Applied AI & GenAI Engineer",
    description:
      "Applied AI Engineer building production-ready AI systems using LLMs, VLMs, OCR, Edge AI, AI Agents, and scalable AI infrastructure. Creator of TextLens, researcher, patent holder, open-source contributor, and technical educator.",
    type: "website",
    url: "https://www.srevarshan.in",
    images: [
      {
        url: "https://www.srevarshan.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sre Varshan — Applied AI & GenAI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sre Varshan — Applied AI & GenAI Engineer",
    description:
      "Building production-ready AI systems with LLMs, OCR, Edge AI, AI Agents, and Intelligent Systems. Creator of TextLens.",
  },
  other: {
    youtube: "https://www.youtube.com/@SreVarshanAI",
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
        <link rel="icon" type="image/png" href="/Portfolio-favi.png" />
        <meta name="youtube" content="https://www.youtube.com/@SreVarshanAI" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}

        {/* ============================================================
            CHATBASE.IO CHATBOT INJECTION POINT
            ============================================================ */}
        <div id="chatbase-container" aria-label="Ask me about Sre's work" role="complementary">
          {/* ← Paste your Chatbase embed script here */}
        </div>
      </body>
    </html>
  );
}

