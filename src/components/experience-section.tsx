
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
import { Briefcase, Calendar, TrendingUp, Settings, Target } from "lucide-react"; // Added Settings, Target icons

const experienceData = [
 {
    id: "exp1",
    company: "Strategic Solutions Inc.", // Example new company
    role: "Senior Business Analyst / Strategy Lead", // Updated role
    duration: "Jan 2022 - Present", // Adjusted duration
    description: [
      "Led cross-functional teams in defining strategic roadmaps for digital transformation initiatives, aligning technology investments with long-term business goals.",
      "Conducted market analysis and competitive intelligence to identify growth opportunities, contributing to the development of new service offerings.",
      "Developed compelling business cases and financial models for major projects, securing executive buy-in and funding.",
      "Supported GTM strategy by contributing to proposal development, solutioning for key pursuits, and creating sales enablement materials.",
      "Acted as a key liaison between product management, sales, and technical teams to ensure strategic alignment and effective execution.",
    ],
    icon: <Target className="h-5 w-5 mr-2 text-muted-foreground group-hover:text-accent transition-colors duration-300" />, // Target icon for Strategy
  },
  {
    id: "exp2",
    company: "Innovate Solutions Ltd.", // Changed company name
    role: "Functional Consultant / Business Analyst", // Updated role
    duration: "Mar 2019 - Dec 2021", // Adjusted duration
    description: [
      "Led requirements gathering and process design workshops for a large-scale CRM implementation (e.g., Salesforce/Dynamics), translating complex business needs into functional specifications.",
      "Configured CRM modules (Sales, Service Cloud) based on client requirements, ensuring optimal system utilization and user experience.",
      "Performed fit-gap analysis, identifying areas where standard functionality met needs versus where customization or workarounds were necessary.",
      "Developed and executed UAT plans, managed defect resolution, and provided post-go-live support, ensuring successful system adoption.",
      "Created detailed process maps (BPMN) and solution design documents, facilitating clear communication between business and technical teams.",
    ],
     icon: <Settings className="h-5 w-5 mr-2 text-muted-foreground group-hover:text-accent transition-colors duration-300" />, // Settings icon for Functional Consulting
  },
  {
     id: "exp3",
    company: "Data Insights Corp.", // Changed company name
    role: "Business Analyst", // Kept role
    duration: "Jul 2017 - Feb 2019", // Adjusted duration
    description: [
        "Elicited and meticulously documented functional and non-functional requirements for diverse client-facing web applications using user stories, use cases, and specification documents.",
        "Collaborated closely with UX/UI designers to ensure proposed solutions were both technically feasible and highly user-centric.",
        "Managed UAT coordination, including script development, tester support, and effective defect triaging, ensuring delivery of high-quality software.",
        "Established and maintained comprehensive project documentation in Confluence, significantly improving team knowledge sharing and onboarding efficiency.",
        "Provided critical support to project managers by assisting with scope management, change request analysis, and risk identification.",
    ],
     icon: <Briefcase className="h-5 w-5 mr-2 text-muted-foreground group-hover:text-accent transition-colors duration-300" />, // Briefcase icon for BA
  },
   {
     id: "exp4", // Added an earlier role
    company: "Retail Dynamics Inc.", // Changed company name
    role: "Junior Business Analyst / QA Analyst", // Updated role
    duration: "Jun 2016 - Jun 2017", // Adjusted duration
    description: [
        "Supported senior Business Analysts during requirements elicitation sessions, diligently taking notes and drafting initial documentation.",
        "Developed and executed rigorous test cases for new e-commerce platform features, identifying critical defects early in the development cycle.",
        "Effectively reported and tracked software bugs using JIRA, collaborating with developers to ensure timely and accurate resolutions.",
        "Generated foundational reports on website performance metrics and user behavior patterns, providing initial data points for optimization efforts.",
    ],
    icon: <Briefcase className="h-5 w-5 mr-2 text-muted-foreground group-hover:text-accent transition-colors duration-300" />, // Briefcase icon for BA
  },
];

const ExperienceSection: React.FC = () => {
  return (
    <AnimatedSection id="experience" className="scroll-mt-20 md:scroll-mt-24" delay="delay-350"> {/* Increased scroll margin */}
       <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-out bg-card border border-border/50 rounded-lg p-6 md:p-10">
         <CardHeader className="p-0 mb-8 text-center"> {/* Increased bottom margin and centered */}
          {/* Enhanced Title Styling */}
          <CardTitle className="text-4xl md:text-5xl font-bold text-primary mb-3 pb-2 border-b-2 border-accent/30 inline-block">
            Professional Journey & Impact
          </CardTitle>
          <p className="text-muted-foreground mt-2 text-lg">Driving business value through analysis, consulting, and strategy.</p> {/* Updated subtitle */}
        </CardHeader>
        <CardContent className="p-0">
            <Accordion type="single" collapsible className="w-full space-y-4"> {/* Increased spacing */}
                {experienceData.map((exp, index) => (
                 <AnimatedSection key={exp.id} delay={`delay-${index * 75}`}> {/* Adjusted delay step */}
                    <AccordionItem
                      value={exp.id}
                      className="border border-border/50 rounded-md overflow-hidden transition-all duration-300 hover:border-accent/70 hover:bg-muted/30"
                      >
                        <AccordionTrigger className="text-left hover:no-underline group py-4 px-4 md:px-6 hover:bg-muted/50 transition-colors duration-200">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full mr-4">
                                <div className="flex items-center mb-1 sm:mb-0">
                                    {exp.icon || <Briefcase className="h-5 w-5 mr-2 text-muted-foreground group-hover:text-accent transition-colors duration-300" />} {/* Use specific icon or default */}
                                    <span className="text-lg font-medium text-foreground group-hover:text-accent transition-colors duration-300">{exp.role}</span>
                                    <span className="text-muted-foreground mx-2 hidden sm:inline">@</span>
                                     <span className="text-lg text-muted-foreground sm:text-foreground ml-7 sm:ml-0">{exp.company}</span>
                                </div>

                                <div className="flex items-center text-sm text-muted-foreground ml-7 sm:ml-0 mt-1 sm:mt-0">
                                    <Calendar className="h-4 w-4 mr-1.5" />
                                    {exp.duration}
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 pt-0 px-6 md:px-8">
                            <ul className="list-none space-y-2.5 text-muted-foreground text-base leading-relaxed pt-2">
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
