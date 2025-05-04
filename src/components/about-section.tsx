
"use client";
import React from "react";
import Image from "next/image";
import AnimatedSection from "./animated-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutSection: React.FC = () => {
  return (
    <AnimatedSection id="about" className="scroll-mt-20 md:scroll-mt-24" delay="delay-100"> {/* Increased scroll margin */}
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-out bg-card border border-border/50 rounded-lg group transform hover:-translate-y-1">
        <div className="grid md:grid-cols-3 items-center">
          {/* Image Column */}
          <div className="md:col-span-1 relative h-64 md:h-full w-full overflow-hidden">
            <Image
              src="https://picsum.photos/seed/ba-portrait/600/800" // Changed seed
              alt="Portrait of Alex Chen" // Updated alt text
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 ease-out group-hover:scale-105 filter group-hover:brightness-105"
              data-ai-hint="professional business analyst portrait" // Updated hint
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent md:bg-gradient-to-r md:from-card md:via-card/30 md:to-transparent"></div>
          </div>
          {/* Content Column */}
          <div className="md:col-span-2 p-6 md:p-10 lg:p-12">
            <CardHeader className="p-0 mb-6"> {/* Increased bottom margin */}
              {/* Enhanced Title Styling */}
              <CardTitle className="text-4xl md:text-5xl font-bold text-primary mb-3 pb-2 border-b-2 border-accent/30 inline-block transition-colors duration-300 group-hover:border-accent/60">
                About Me
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4 text-base md:text-lg text-foreground leading-relaxed">
              <p>
                Hi, I'm Alex Chen, a results-oriented Business Analyst based in San Francisco. I excel at understanding complex business challenges and translating them into actionable requirements for technology teams. My passion lies in optimizing processes, leveraging data insights, and facilitating clear communication between stakeholders to drive successful project outcomes.
              </p>
              <p>
                My journey into business analysis began with a fascination for how systems and processes work. Since then, I've honed my skills in requirements elicitation, process modeling (BPMN), data analysis, and stakeholder management across various projects. I'm adept at using tools like JIRA, Confluence, and SQL to manage workflows and extract valuable insights.
              </p>
              <p>
                Outside of work, I enjoy analyzing market trends, volunteering for data literacy programs, and exploring the scenic trails around the Bay Area.
              </p>
            </CardContent>
          </div>
        </div>
      </Card>
    </AnimatedSection>
  );
};

export default AboutSection;
