import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sre Varshan — Applied AI & GenAI Engineer",
    short_name: "Sre Varshan",
    description: "Portfolio of Sre Varshan, Applied AI & Generative AI Engineer building production AI systems with LLMs, VLMs, OCR and Edge AI.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#E22D6D",
    icons: [
      { src: "/Portfolio-favi.png", sizes: "1254x1254", type: "image/png", purpose: "any" },
    ],
  };
}
