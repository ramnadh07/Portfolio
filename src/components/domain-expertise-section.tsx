
"use client";
import React from "react";
import AnimatedSection from "./animated-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, HeartPulse, FlaskConical, Store, Factory, Truck } from "lucide-react"; // Changed Seedling to Sprout

const domainData = [
  {
    name: "AgriTech",
    icon: <Sprout className="h-5 w-5 mr-2 text-accent" />, // Changed Seedling to Sprout
    description: "Optimizing agricultural value chains, implementing farm management systems, and leveraging data for sustainable practices.",
  },
  {
    name: "Healthcare",
    icon: <HeartPulse className="h-5 w-5 mr-2 text-accent" />,
    description: "Enhancing patient care pathways, integrating healthcare IT systems, and developing strategies for digital health solutions.",
  },
  {
    name: "Lifesciences",
    icon: <FlaskConical className="h-5 w-5 mr-2 text-accent" />,
    description: "Supporting R&D processes, ensuring regulatory compliance systems, and strategizing market access for pharmaceutical and biotech products.",
  },
  {
    name: "Ecommerce & Retail",
    icon: <Store className="h-5 w-5 mr-2 text-accent" />,
    description: "Designing customer-centric online experiences, optimizing retail operations, and developing omnichannel strategies.",
  },
  {
    name: "Manufacturing & Operations",
    icon: <Factory className="h-5 w-5 mr-2 text-accent" />,
    description: "Streamlining production processes, implementing advanced manufacturing solutions, and driving operational excellence through data-driven insights.",
  },
  {
    name: "Supply Chain & Logistics",
    icon: <Truck className="h-5 w-5 mr-2 text-accent" />,
    description: "Enhancing end-to-end supply chain visibility and traceability, optimizing processes for efficiency, and implementing technology solutions for transparent logistics networks.",
  },
];

const DomainExpertiseSection: React.FC = () => {
  return (
    <AnimatedSection id="domain-expertise" className="scroll-mt-20 md:scroll-mt-24" delay="delay-300">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-out bg-card border border-border/50 rounded-lg p-6 md:p-10">
        <CardHeader className="p-0 mb-8 text-center">
          <CardTitle className="text-4xl md:text-5xl font-bold text-primary mb-3 pb-2 border-b-2 border-accent/30 inline-block">
            Domain Expertise
          </CardTitle>
          <p className="text-muted-foreground mt-2 text-lg">Industry knowledge applied to technology challenges.</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {domainData.map((domain, index) => (
              <AnimatedSection key={domain.name} delay={`delay-${index * 75}`}>
                <Card className="flex flex-col p-4 border border-border/30 rounded-md bg-background h-full transition-all duration-300 ease-out transform hover:-translate-y-1 hover:shadow-md hover:border-accent/50 group">
                  <h3 className="flex items-center text-lg font-medium mb-2 text-foreground transition-colors duration-300 group-hover:text-accent">
                    {domain.icon}
                    {domain.name}
                  </h3>
                  <p className="text-sm text-muted-foreground flex-grow">
                    {domain.description}
                  </p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
};

export default DomainExpertiseSection;
