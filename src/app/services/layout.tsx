import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Solutions & Services",
  description:
    "Work with Sre Varshan: custom AI agents, RAG and document intelligence, OCR pipelines, Edge AI on NVIDIA Jetson, and full-stack AI products, built end to end and shipped to production.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "AI Solutions & Services · Sre Varshan",
    description: "Custom AI agents, RAG, OCR and Edge AI systems, designed and shipped end to end by Sre Varshan.",
    url: "/services",
    type: "website",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
