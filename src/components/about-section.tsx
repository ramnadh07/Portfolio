
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
              src="https://placehold.co/600x800.png"
              alt="Abstract futuristic and optimistic visual representing Ramalingeswara Nadh's profile"
              layout="fill"
              objectFit="cover"
              className="transition-all duration-700 ease-in-out group-hover:scale-110 filter group-hover:brightness-110 group-hover:saturate-150"
              data-ai-hint="abstract futuristic"
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
                Hi, I'm Ramalingeswara Nadh, a multifaceted professional based in Bangalore, blending skills in Business Analysis, Consulting, and Business Strategy. I thrive on dissecting complex challenges, translating them into actionable technology requirements, and shaping strategic initiatives that drive growth and operational efficiency. My passion is connecting the dots between business vision, market opportunity, and technical execution.
              </p>
              <p>
                My career spans traditional business analysis, deep-diving into process optimization and requirements elicitation, to consulting roles where I've strategized and enabled AI driven accelerators across organizational competencies. More recently, I've focused on business strategy, market analysis, competitive intelligence, and supporting Go-To-Market (GTM) efforts, including pursuits and proposal development. I leverage AI, data & analytics tools and frameworks to inform strategic decisions and ensure successful project and business outcomes.
              </p>
              <p>
                Beyond my core roles, I'm deeply interested in market dynamics, contribute to strategic planning discussions, and volunteer my analytical skills for social impact projects. Exploring the potential for positive impact & innovation keeps me inspired.
              </p>
            </CardContent>
          </div>
        </div>
      </Card>
    </AnimatedSection>
  );
};

export default AboutSection;
