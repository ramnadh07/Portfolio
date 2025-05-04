
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
import { Briefcase, Calendar, TrendingUp } from "lucide-react";

const experienceData = [
  {
    id: "exp1",
    company: "Innovate Solutions Ltd.", // Changed company name
    role: "Senior Business Analyst", // Updated role
    duration: "Mar 2020 - Present", // Adjusted duration
    description: [
      "Led requirements gathering workshops for a major CRM implementation, resulting in a 95% user adoption rate within 6 months.",
      "Developed detailed process maps (BPMN) identifying key bottlenecks, contributing to a 20% reduction in process cycle time for the sales team.",
      "Analyzed sales data using SQL to identify key trends, informing product roadmap decisions and contributing to a 15% increase in cross-selling revenue.",
      "Mentored junior BAs, establishing best practices for documentation (BRDs, User Stories) and stakeholder communication.",
      "Acted as the primary liaison between business stakeholders and the development team, ensuring alignment and clear communication throughout the SDLC.",
    ],
  },
  {
     id: "exp2",
    company: "Data Insights Corp.", // Changed company name
    role: "Business Analyst", // Updated role
    duration: "Jul 2017 - Feb 2020", // Adjusted duration
    description: [
        "Elicited and documented functional and non-functional requirements for multiple client-facing web applications using user stories and use cases.",
        "Collaborated with UX designers to translate business needs into intuitive user interface designs.",
        "Performed User Acceptance Testing (UAT) coordination and defect triaging, ensuring high-quality deliverables.",
        "Created and maintained project documentation in Confluence, improving knowledge sharing within the team.",
        "Supported project managers in scope management and change request analysis.",
    ],
  },
   {
     id: "exp3",
    company: "Retail Dynamics Inc.", // Changed company name
    role: "Junior Business Analyst / QA Analyst", // Updated role
    duration: "Jun 2016 - Jun 2017", // Adjusted duration
    description: [
        "Assisted senior BAs in requirements gathering sessions and documentation.",
        "Developed and executed test cases for e-commerce platform features.",
        "Reported and tracked bugs using JIRA, working closely with developers on resolutions.",
        "Generated basic reports on website performance and user behavior.",
    ],
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
          <p className="text-muted-foreground mt-2 text-lg">Highlights from my business analysis career.</p> {/* Updated subtitle */}
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
                                    <Briefcase className="h-5 w-5 mr-2 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
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
