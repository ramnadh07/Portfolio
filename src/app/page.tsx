
"use client";

import React from "react";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import SkillsSection from "@/components/skills-section";
import ExperienceSection from "@/components/experience-section";
import DomainExpertiseSection from "@/components/domain-expertise-section";
import ProjectsSection from "@/components/projects-section";
import EducationSection from "@/components/education-section";
import SocialImpactSection from "@/components/social-impact-section";
import FeedbackSection from "@/components/feedback-section"; // Import FeedbackSection
import AnalyticsDashboardSection from "@/components/analytics-dashboard-section"; // Import AnalyticsDashboardSection

export default function Home() {
  return (
    <div className="space-y-20 md:space-y-28 lg:space-y-36"> {/* Increased spacing between sections */}
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <DomainExpertiseSection />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
      <SocialImpactSection />
      <FeedbackSection /> {/* Add FeedbackSection */}
      <AnalyticsDashboardSection /> {/* Add AnalyticsDashboardSection */}
    </div>
  );
}
