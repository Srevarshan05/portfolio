"use client";

import { Reveal } from "@/components/motion";

import ElasticReel from "@/components/motion/ElasticReel";

const CERTS = [
  { src: "/certs-full/vit-spectrum.webp", thumb: "/certs-thumb/vit-spectrum.webp", alt: "1st Prize · Spectrum '25 certificate", title: "1st Prize · Spectrum '25", subtitle: "National hackathon, VIT Chennai. Certificate of achievement.", aspect: 1.414 },
  { src: "/certs-full/solvex-ai.webp", thumb: "/certs-thumb/solvex-ai.webp", alt: "1st Prize · Solve-X AI Challenge certificate", title: "1st Prize · Solve-X AI Challenge", subtitle: "Kalasalingam Academy, Euphoria '25.", aspect: 1.413 },
  { src: "/certs-full/anthropic-mcp-advanced.webp", thumb: "/certs-thumb/anthropic-mcp-advanced.webp", alt: "Model Context Protocol: Advanced Topics certificate", title: "Model Context Protocol: Advanced Topics", subtitle: "Anthropic. Certificate of completion.", aspect: 1.294 },
  { src: "/certs-full/anthropic-mcp-intro.webp", thumb: "/certs-thumb/anthropic-mcp-intro.webp", alt: "Introduction to Model Context Protocol certificate", title: "Introduction to Model Context Protocol", subtitle: "Anthropic. Certificate of completion.", aspect: 1.294 },
  { src: "/certs-full/microsoft-azure-intern.webp", thumb: "/certs-thumb/microsoft-azure-intern.webp", alt: "AI Azure Internship certificate", title: "AI Azure Internship", subtitle: "Microsoft × Edunet Foundation × AICTE. 4-week internship.", aspect: 1.414 },
  { src: "/certs-full/nvidia-jetson.webp", thumb: "/certs-thumb/nvidia-jetson.webp", alt: "Getting Started with AI on Jetson Nano certificate", title: "Getting Started with AI on Jetson Nano", subtitle: "NVIDIA. Certificate of competency.", aspect: 1.246 },
  { src: "/certs-full/oracle-oci-ai.webp", thumb: "/certs-thumb/oracle-oci-ai.webp", alt: "OCI 2025 AI Foundations Associate certificate", title: "OCI 2025 AI Foundations Associate", subtitle: "Oracle Certified Foundations Associate.", aspect: 1.301 },
  { src: "/certs-full/stanford-supervised-ml.webp", thumb: "/certs-thumb/stanford-supervised-ml.webp", alt: "Supervised Machine Learning certificate", title: "Supervised Machine Learning", subtitle: "DeepLearning.AI × Stanford Online. Regression and classification.", aspect: 1.294 },
  { src: "/certs-full/google-vertex-prompt.webp", thumb: "/certs-thumb/google-vertex-prompt.webp", alt: "Prompt Design in Vertex AI certificate", title: "Prompt Design in Vertex AI", subtitle: "Google Cloud skill badge, machine learning & AI.", aspect: 1.502 },
  { src: "/certs-full/ibm-ai.webp", thumb: "/certs-thumb/ibm-ai.webp", alt: "Getting Started with Artificial Intelligence certificate", title: "Getting Started with Artificial Intelligence", subtitle: "IBM SkillsBuild.", aspect: 1.294 },
  { src: "/certs-full/meta-mysql.webp", thumb: "/certs-thumb/meta-mysql.webp", alt: "Database Structures & Management with MySQL certificate", title: "Database Structures & Management with MySQL", subtitle: "Meta, via Coursera.", aspect: 1.294 },
  { src: "/certs-full/openai-genai-workshop.webp", thumb: "/certs-thumb/openai-genai-workshop.webp", alt: "Generative AI Mastery Workshop certificate", title: "Generative AI Mastery Workshop", subtitle: "OpenAI Academy × NxtWave GenAI Buildathon.", aspect: 1.414 },
  { src: "/certs-full/naf-uzhavu.webp", thumb: "/certs-thumb/naf-uzhavu.webp", alt: "8th Place · NAF's Uzhavu Hackathon certificate", title: "8th Place · NAF's Uzhavu Hackathon", subtitle: "Shaastra, IIT Madras × National Agro Foundation.", aspect: 1.416 },
  { src: "/certs-full/iit-goa-drone.webp", thumb: "/certs-thumb/iit-goa-drone.webp", alt: "Drone Systems & AI/ML for Drone Vision certificate", title: "Drone Systems & AI/ML for Drone Vision", subtitle: "Bootcamp at IIT Goa, funded by MeitY.", aspect: 1.413 },
  { src: "/certs-full/iitm-mechanica.webp", thumb: "/certs-thumb/iitm-mechanica.webp", alt: "3D Modelling Workshop · Mechanica 2024 certificate", title: "3D Modelling Workshop · Mechanica 2024", subtitle: "Mechanical Engineering Association, IIT Madras.", aspect: 1.416 },
  { src: "/certs-full/niftem-video.webp", thumb: "/certs-thumb/niftem-video.webp", alt: "2nd Prize · Video Making Competition certificate", title: "2nd Prize · Video Making Competition", subtitle: "NIFTEM Thanjavur, World Food Safety Day 2024.", aspect: 1.777 },
  { src: "/certs-full/nitt-currents-ml.webp", thumb: "/certs-thumb/nitt-currents-ml.webp", alt: "Machine Learning Workshop · Currents '24 certificate", title: "Machine Learning Workshop · Currents '24", subtitle: "NIT Tiruchirappalli.", aspect: 1.414 },
  { src: "/certs-full/vega-processor.webp", thumb: "/certs-thumb/vega-processor.webp", alt: "Vega Processor & Its Applications certificate", title: "Vega Processor & Its Applications", subtitle: "Hands-on workshop, SRM IST × C-DAC Trivandrum.", aspect: 1.414 },
  { src: "/certs-full/krce-ideal26.webp", thumb: "/certs-thumb/krce-ideal26.webp", alt: "KR IDEAI-26 Hackathon certificate", title: "KR IDEAI-26 Hackathon", subtitle: "K. Ramakrishnan College of Technology. Participation.", aspect: 1.414 },
  { src: "/certs-full/dindigul-fest.webp", thumb: "/certs-thumb/dindigul-fest.webp", alt: "Science, Technology & Startup Fest 2026 certificate", title: "Science, Technology & Startup Fest 2026", subtitle: "Dindigul District Administration. Participation.", aspect: 1.414 },
  { src: "/certs-full/t4teq-python.webp", thumb: "/certs-thumb/t4teq-python.webp", alt: "Python Internship certificate", title: "Python Internship", subtitle: "T4TEQ Software Solutions.", aspect: 0.708 },
];

export default function CertificationsSection() {
  return (
    <section id="certifications" className="ce-section" aria-labelledby="certifications-title">
      <div className="ce-head">
        <Reveal kind="fade" as="p" className="ce-kicker">{CERTS.length} certificates and counting</Reveal>
        <Reveal kind="fade" delay={0.06}>
          <h2 id="certifications-title" className="ce-title">Certifications</h2>
        </Reveal>
        <Reveal kind="fade" delay={0.12} as="p" className="ce-sub">
          Learning continuously. Building credibility.
        </Reveal>
        <Reveal kind="fade" delay={0.18} as="p" className="ce-hint">
          Hover to browse, click a certificate to open it.
        </Reveal>
      </div>

      <div className="ce-stage">
        <ElasticReel
          items={CERTS}
          barWidth={44}
          barHeight={0.5}
          gap={10}
          radius={12}
          magnify={2.4}
          lift={1.15}
          influence={200}
          openSize={0.72}
          elasticity={0.35}
          blur={0.5}
          dim={0.45}
          interval={4}
          height={560}
        />
      </div>

      {/* Plain list for screen readers and search engines */}
      <ul className="sr-only">
        {CERTS.map((c) => <li key={c.title}>{c.title}: {c.subtitle}</li>)}
      </ul>

      <style>{`
        .ce-section {
          position: relative;
          overflow: hidden;
          padding: 120px 0 110px;
          background: #0F1218;
          font-family: 'Geist', system-ui, sans-serif;
        }
        .ce-head { max-width: 760px; margin: 0 auto; padding: 0 20px; text-align: center; position: relative; z-index: 1; }
        .ce-kicker {
          display: inline-block; margin: 0 0 16px; padding: 6px 12px;
          background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(155, 227, 185, 0.3);
          font-family: 'Geist Mono', ui-monospace, monospace; font-size: 12px; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase; color: #9BE3B9;
        }
        .ce-title {
          margin: 0 0 14px; font-size: clamp(36px, 5vw, 64px); font-weight: 600;
          line-height: 1.05; letter-spacing: -0.04em; color: #FFFFFF; text-transform: none; text-wrap: balance;
        }
        .ce-sub { margin: 0 auto; max-width: 52ch; font-size: clamp(18px, 2vw, 22px); line-height: 1.5; color: #B7C4ED; }
        .ce-hint { margin: 14px 0 0; font-family: 'Geist Mono', ui-monospace, monospace; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #7D869C; }
        .ce-stage { position: relative; margin-top: 8px; padding: 0 16px; }
        @media (max-width: 767px) {
          .ce-section { padding: 88px 0 80px; }
        }
      `}</style>
    </section>
  );
}
