"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "./animated-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, HeartPulse, Factory, Banknote, GraduationCap, Globe } from "lucide-react"; // Example domain icons

// Feel free to replace these with your actual domains and choose relevant icons
const domainData = [
  {
    name: "E-commerce & Retail",
    icon: <Store className="h-5 w-5 mr-2 text-accent" />,
    description: "Building online stores, payment integrations, inventory management.",
  },
  {
    name: "Healthcare Technology",
    icon: <HeartPulse className="h-5 w-5 mr-2 text-accent" />,
    description: "Developing patient portals, data management, and telehealth solutions.",
  },
  {
    name: "Manufacturing & Logistics",
    icon: <Factory className="h-5 w-5 mr-2 text-accent" />,
    description: "Optimizing supply chains, process automation, and system integrations.",
  },
  {
    name: "FinTech",
    icon: <Banknote className="h-5 w-5 mr-2 text-accent" />,
    description: "Creating financial dashboards, transaction systems, and security protocols.",
  },
  {
    name: "EdTech",
    icon: <GraduationCap className="h-5 w-5 mr-2 text-accent" />,
    description: "Developing learning platforms, content delivery systems, and assessment tools.",
  },
  {
    name: "SaaS Platforms",
    icon: <Globe className="h-5 w-5 mr-2 text-accent" />,
    description: "Designing scalable multi-tenant applications and subscription models.",
  },
  // Add more domains as needed
];

const DomainExpertiseSection: React.FC = () => {
  return (
    <AnimatedSection id="domain-expertise" className="scroll-mt-16" delay="delay-350"> {/* Adjust delay as needed */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-out bg-card border border-border/50 rounded-lg p-6 md:p-10">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-3xl md:text-4xl font-semibold text-primary text-center">
            Domain Expertise
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {domainData.map((domain, index) => (
              <AnimatedSection key={domain.name} delay={`delay-${index * 50}`}>
                <div className="flex flex-col p-4 border border-border/30 rounded-md bg-background h-full hover:border-accent/50 transition-colors duration-300 ease-out transform hover:-translate-y-1 hover:shadow-md">
                  <h3 className="flex items-center text-lg font-medium mb-2 text-foreground">
                     {domain.icon}
                    {domain.name}
                  </h3>
                  <p className="text-sm text-muted-foreground flex-grow">
                    {domain.description}
                  </p>
                   {/* Optional: Could add related tech/skills as badges here */}
                   {/* <div className="flex flex-wrap gap-1 mt-3">
                       <Badge variant="outline" className="text-xs">Related Skill</Badge>
                   </div> */}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
};

export default DomainExpertiseSection;
