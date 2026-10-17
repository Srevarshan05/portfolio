import type { Metadata } from "next";
import "./globals.css";

const SITE = "https://www.srevarshan.in";

const CERTIFICATIONS = [
  ["Model Context Protocol: Advanced Topics", "Anthropic"],
  ["Introduction to Model Context Protocol", "Anthropic"],
  ["AI Azure Internship", "Microsoft × Edunet Foundation × AICTE"],
  ["Getting Started with AI on Jetson Nano", "NVIDIA"],
  ["OCI 2025 AI Foundations Associate", "Oracle"],
  ["Supervised Machine Learning: Regression and Classification", "DeepLearning.AI × Stanford Online"],
  ["Prompt Design in Vertex AI", "Google Cloud"],
  ["Getting Started with Artificial Intelligence", "IBM SkillsBuild"],
  ["Database Structures and Management with MySQL", "Meta"],
  ["Generative AI Mastery Workshop", "OpenAI Academy × NxtWave"],
  ["Drone Systems & AI/ML for Drone Vision", "IIT Goa"],
  ["Machine Learning Workshop · Currents '24", "NIT Tiruchirappalli"],
];

/* Structured data Google reads for the knowledge panel and rich results */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      "url": SITE,
      "name": "Sre Varshan",
      "alternateName": ["SreVarshan", "Sre Varshan Portfolio"],
      "description": "Portfolio of Sre Varshan, Applied AI & Generative AI Engineer.",
      "inLanguage": "en",
      "publisher": { "@id": `${SITE}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE}/#profile`,
      "url": SITE,
      "name": "Sre Varshan — Applied AI & GenAI Engineer",
      "isPartOf": { "@id": `${SITE}/#website` },
      "mainEntity": { "@id": `${SITE}/#person` },
      "primaryImageOfPage": `${SITE}/og-image.png`,
    },
    {
      "@type": "Person",
      "@id": `${SITE}/#person`,
      "name": "Sre Varshan",
      "alternateName": "SreVarshan",
      "jobTitle": "Applied AI & Generative AI Engineer",
      "description": "Applied AI & Generative AI Engineer building production AI systems with LLMs, VLMs, OCR, AI agents, RAG and Edge AI. Creator of TextLens, published researcher and patent holder.",
      "url": SITE,
      "image": `${SITE}/Profile.jpg`,
      "email": "mailto:srevarshan9600622@gmail.com",
      "nationality": { "@type": "Country", "name": "India" },
      "alumniOf": { "@type": "CollegeOrUniversity", "name": "SRM Institute of Science and Technology, Tiruchirappalli" },
      "sameAs": [
        "https://github.com/Srevarshan05",
        "https://www.linkedin.com/in/srevarshan05/",
        "https://www.youtube.com/@SreVarshanAI",
        "https://medium.com/@srevarshan9600622",
        "https://leetcode.com/u/srevarshan9600622/",
        "https://www.hackerrank.com/profile/srevarshan960061",
        "https://www.codechef.com/users/ss2535srmist",
        "https://www.hackerearth.com/@srevarshan9600622/",
      ],
      "knowsAbout": [
        "Large Language Models (LLMs)",
        "Vision Language Models (VLMs)",
        "Optical Character Recognition (OCR)",
        "Generative AI",
        "Edge AI",
        "AI Agents",
        "Model Context Protocol (MCP)",
        "Retrieval-Augmented Generation (RAG)",
        "Intelligent Document Processing",
        "Text-to-SQL",
        "Machine Learning",
        "IoT",
        "Full-Stack AI Engineering",
        "NVIDIA Jetson Edge Computing",
        "Python", "FastAPI", "PyTorch", "AWS", "Microsoft Azure",
      ],
      "award": [
        "1st Prize, Spectrum '25 National Hackathon, VIT Chennai",
        "1st Prize, Solve-X AI Challenge, Kalasalingam Academy",
        "Best Presentation, Physical AI & Robotics MCC",
        "Top 1,000, Amazon ML Challenge 2026",
        "Top 8 National, NAF's Uzhavu Hackathon, Shaastra IIT Madras",
        "2nd Prize, Video Making Competition, NIFTEM Thanjavur",
        "Best Innovation, IIC Regional Meet 2025",
      ],
      "hasCredential": CERTIFICATIONS.map(([name, by]) => ({
        "@type": "EducationalOccupationalCredential",
        "name": name,
        "credentialCategory": "certificate",
        "recognizedBy": { "@type": "Organization", "name": by },
      })),
      "owns": [
        {
          "@type": "SoftwareApplication",
          "name": "TextLens",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "Cross-platform",
          "description": "An open-source OCR framework focused on simplifying document intelligence and reusable OCR workflows for Python developers.",
        },
      ],
    },
    {
      "@type": "CreativeWork",
      "name": "Banana Weevil Detection through Dual-Mode Acoustic Sensing and Edge AI",
      "description": "Published Indian patent application No. 202541116228 A.",
      "creator": { "@id": `${SITE}/#person` },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Sre Varshan — Applied AI & GenAI Engineer | LLMs, Edge AI, OCR, AI Systems",
    template: "%s · Sre Varshan",
  },
  applicationName: "Sre Varshan",
  category: "technology",
  creator: "Sre Varshan",
  publisher: "Sre Varshan",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false, email: false, address: false },
  description:
    "Sre Varshan is an Applied AI & GenAI Engineer building production AI with LLMs, VLMs, OCR, AI agents, RAG and Edge AI. Creator of TextLens, researcher and patent holder.",
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
  authors: [{ name: "Sre Varshan", url: SITE }],
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
    type: "profile",
    firstName: "Sre",
    lastName: "Varshan",
    siteName: "Sre Varshan",
    locale: "en_IN",
    url: SITE,
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
    images: [`${SITE}/og-image.png`],
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Fonts — Geist (display + body) and Geist Mono (labels) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=Geist+Mono:wght@400;500;700&family=Silkscreen:wght@400;700&display=swap"
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

