
"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AnimatedSection from "./animated-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, TrendingUp, Target, Compass, Lightbulb, Handshake } from "lucide-react";

const experienceData = [
 {
    id: "exp1",
    company: "Mindpsrint",
    role: "Senior Business Analyst / Strategy Lead",
    duration: "Apr 2024 - Present",
    startYear: "2024",
    keywords: ["Strategic Roadmaps", "Digital Transformation", "Market Analysis", "GTM Support", "Proposal Development", "Competitive Intelligence", "Product Strategy"],
    description: [
      "Led cross-functional teams in defining strategic roadmaps for digital transformation initiatives, aligning technology investments with long-term business goals.",
      "Conducted market analysis and competitive intelligence to identify growth opportunities, contributing to the development of new service offerings.",
      "Shaped product strategy and development by defining product vision and roadmaps in partnership with product management, leveraging market insights, and aligning technical execution with core business goals and user requirements.",
      "Supported GTM strategy by contributing to proposal development, solutioning for key pursuits, and creating sales enablement materials.",
      "Acted as a key liaison between product management, sales, and technical teams to ensure strategic alignment and effective execution.",
    ],
    icon: <Target className="h-5 w-5 mr-2 text-muted-foreground group-hover:text-accent transition-colors duration-300" />,
  },
  {
    id: "exp2",
    company: "Sonata Software Ltd.",
    role: "Business Analyst",
    duration: "May 2023 - Jun 2023",
    startYear: "2023",
    keywords: ["Business Analysis", "Healthcare Platform", "GTM Strategy", "Solution Design", "Roadmap Development", "AI Frameworks", "BPMN", "Fit-Gap Analysis", "Stakeholder Management"],
    description: [
      "Provided strategic business analysis for a next-gen healthcare platform modernization, focusing on GTM positioning and domain strategy.",
      "Collaborated with product owners and Subject Matter Experts (SMEs) to perform fit-gap analysis, identify solution gaps, and design future-ready transformation roadmaps.",
      "Contributed to the development of automation-led internal enhancements and client-facing AI frameworks, aiming for improved operational efficiency and scalability.",
      "Created detailed process maps (BPMN) and solution design documents, facilitating clear communication between business and technical teams.",
      "Elevated Sonata's positioning as a digital innovation partner through impactful solution storytelling and effective proposal delivery.",
    ],
     icon: <Compass className="h-5 w-5 mr-2 text-muted-foreground group-hover:text-accent transition-colors duration-300" />,
  },
  {
     id: "exp3",
    company: "Stellium Consulting India Pvt Ltd.",
    role: "CSR Consultant",
    duration: "Jan 2023 - Feb 2023",
    startYear: "2023",
    keywords: ["CSR Strategy", "Community Engagement", "Impact Reporting", "Stakeholder Management", "Brand Value", "Outreach Initiatives", "Corporate Social Responsibility"],
    description: [
        "Orchestrated the strategy for impact-driven community engagement programs, ensuring CSR initiatives were deeply aligned with Stellium's long-term brand value and business objectives.",
        "Developed compelling CSR narratives, comprehensive impact reports, and insightful case studies to significantly enhance brand visibility and build robust stakeholder trust.",
        "Collaborated with educational institutions and community leaders to design and deliver impactful scholarship programs and targeted outreach initiatives.",
        "Played a key role in reinforcing Stellium's brand purpose, strategically embedding CSR as an integral lever within the company's growth and identity roadmap.",
        "Facilitated partnerships with NGOs and managed stakeholder communications to ensure the effective implementation and sustainability of community projects.",
    ],
     icon: <Handshake className="h-5 w-5 mr-2 text-muted-foreground group-hover:text-accent transition-colors duration-300" />,
  },
];

const ExperienceSection: React.FC = () => {
  return (
    <AnimatedSection id="experience" className="scroll-mt-20 md:scroll-mt-24" delay="delay-350">
       <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-out bg-card border border-border/50 rounded-lg p-6 md:p-10">
         <CardHeader className="p-0 mb-8 text-center">
          <CardTitle className="text-4xl md:text-5xl font-bold text-primary mb-2">
            Professional Journey <span className="text-accent">& Impact</span>
          </CardTitle>
          <p className="text-muted-foreground mt-2 text-lg">Driving business value through analysis, consulting, and strategy.</p>
        </CardHeader>
        <CardContent className="p-0">
            <Accordion type="single" collapsible className="w-full space-y-4">
                {experienceData.map((exp, index) => (
                 <AnimatedSection key={exp.id} delay={`delay-${index * 75}`}>
                    <AccordionItem
                      value={exp.id}
                      className="border border-border/50 rounded-md overflow-hidden transition-all duration-300 hover:border-accent/70 hover:bg-muted/30"
                    >
                        <AccordionTrigger className="text-left hover:no-underline group py-4 px-4 md:px-6 hover:bg-muted/50 transition-colors duration-200 w-full">
                            <div className="flex items-center justify-between w-full gap-4">
                                {/* Left Tile: Start Year (Visible on md and up) */}
                                <div className="hidden md:flex flex-col items-center justify-center p-3 mr-2 bg-accent/10 text-accent-foreground rounded-lg shadow-sm w-20 h-20 flex-shrink-0">
                                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">YEAR</span>
                                  <span className="text-3xl font-bold text-accent">{exp.startYear}</span>
                                </div>

                                {/* Middle Content: Role, Company, Duration */}
                                <div className="flex-grow min-w-0"> {/* Added min-w-0 for flex shrink issue */}
                                    <div className="flex items-center mb-1">
                                        {exp.icon || <Briefcase className="h-5 w-5 mr-2 text-muted-foreground group-hover:text-accent transition-colors duration-300" />}
                                        <span className="text-lg font-medium text-foreground group-hover:text-accent transition-colors duration-300 truncate">{exp.role}</span>
                                    </div>
                                    <div className="pl-7"> {/* Indent company and duration under icon */}
                                      <span className="text-md text-muted-foreground block truncate">{exp.company}</span>
                                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                                          <Calendar className="h-4 w-4 mr-1.5 flex-shrink-0" />
                                          {exp.duration}
                                      </div>
                                    </div>
                                </div>

                                {/* Right Tiles: Keywords (Visible on lg and up) */}
                                <div className="hidden lg:flex flex-wrap gap-1.5 ml-2 items-center justify-end max-w-[220px] flex-shrink-0">
                                  {exp.keywords.slice(0, 4).map(keyword => ( 
                                    <Badge key={keyword} variant="secondary" className="text-xs px-2 py-0.5 cursor-default">
                                      {keyword}
                                    </Badge>
                                  ))}
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 pt-0 px-6 md:px-8">
                            <ul className="list-none space-y-2.5 text-muted-foreground text-base leading-relaxed pt-2 pl-2 md:pl-0"> {/* Adjusted padding */}
                                {exp.description.map((item, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <TrendingUp className="h-4 w-4 mr-2.5 mt-1 text-accent/80 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                 </AnimatedSection>
                ))}
            </Accordion>
        </CardContent>
       </Card>
    </AnimatedSection>
  );
};

export default ExperienceSection;

