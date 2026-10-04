"use client";

import { useEffect, useState, useCallback } from "react";
import { MotionConfig } from "framer-motion";

import HeroSection        from "@/components/sections/Hero";
import ExperienceSection  from "@/components/sections/Experience";
import ProjectsSection    from "@/components/sections/Projects";
import CodingProfilesSection from "@/components/sections/CodingProfiles";
import ConsoleSection     from "@/components/sections/Console";
import AchievementsSection from "@/components/sections/Achievements";
import GallerySection      from "@/components/sections/Gallery";
import AboutSection        from "@/components/sections/About";
import SkillsSection       from "@/components/sections/Skills";
import ContactSection      from "@/components/sections/Contact";
import Footer              from "@/components/layout/Footer";

import TopNav            from "@/components/layout/TopNav";
import CommandPalette    from "@/components/layout/CommandPalette";
import ServicesModal     from "@/components/layout/ServicesModal";

export default function Home() {
  const [cmdOpen, setCmdOpen] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setCmdOpen((p) => !p);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">Skip to content</a>

      {/* ── Services popup modal (shown after 3s) ── */}
      <ServicesModal />

      {/* ── Fixed top navigation ── */}
      <TopNav onCommandPaletteOpen={() => setCmdOpen(true)} />

      <main id="main" tabIndex={-1}>
        {/* Sections alternate: light → dark → white → dark → light */}
        <HeroSection />
        <GallerySection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <CodingProfilesSection />
        <ConsoleSection />
        <AchievementsSection />
        <ContactSection />

        {/* ── Footer ── */}
        <Footer />
      </main>

      {/* ── Command Palette ── */}
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
    </MotionConfig>
  );
}
