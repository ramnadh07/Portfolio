"use client";

import React from "react";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import SkillsSection from "@/components/skills-section";
import ExperienceSection from "@/components/experience-section";
import DomainExpertiseSection from "@/components/domain-expertise-section";
import ProjectsSection from "@/components/projects-section";

export default function Home() {
  return (
    <div className="space-y-16 md:space-y-24 lg:space-y-32"> {/* Keep existing spacing */}
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <DomainExpertiseSection />
      <ExperienceSection />
      <ProjectsSection />
    </div>
  );
}
