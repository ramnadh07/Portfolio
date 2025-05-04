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
import { Briefcase, Calendar, TrendingUp } from "lucide-react"; // Added TrendingUp for impact

const experienceData = [
  {
    id: "exp1",
    company: "Tech Solutions Inc.",
    role: "Senior Frontend Developer",
    duration: "Jan 2021 - Present",
    description: [
      "Spearheaded the development of a cutting-edge customer portal using Next.js and TypeScript, driving a remarkable 30% uplift in user engagement.",
      "Elevated team performance by mentoring junior developers, instituting rigorous code reviews, and championing frontend best practices.",
      "Transformed complex UI/UX designs into seamless, accessible interfaces through effective collaboration with the design team.",
      "Achieved a significant 25% reduction in application load times by implementing strategic performance optimizations.",
    ],
  },
  {
     id: "exp2",
    company: "Web Innovators Co.",
    role: "Full-Stack Developer",
    duration: "Jun 2018 - Dec 2020",
    description: [
        "Successfully delivered robust full-stack web applications utilizing React, Node.js, and PostgreSQL, consistently exceeding client expectations.",
        "Architected and implemented scalable RESTful APIs, enhancing functionality for diverse client projects.",
        "Played a pivotal role in translating client requirements into high-quality, custom web solutions.",
        "Actively contributed to modernizing technology infrastructure by migrating legacy systems to contemporary stacks.",
    ],
  },
   {
     id: "exp3",
    company: "Design Hub Agency",
    role: "Junior Web Developer",
    duration: "Sep 2017 - May 2018",
    description: [
        "Provided key support to senior developers in building and rigorously testing dynamic websites with HTML, CSS, and JavaScript (jQuery).",
        "Rapidly acquired proficiency in essential development tools and methodologies, including Git version control and Agile practices.",
        "Ensured optimal website performance and user satisfaction through diligent maintenance and effective bug resolution.",
    ],
  },
  // Add more experiences
];

const ExperienceSection: React.FC = () => {
  return (
    <AnimatedSection id="experience" className="scroll-mt-16" delay="delay-350"> {/* Adjusted delay */}
       <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-out bg-card border border-border/50 rounded-lg p-6 md:p-10">
         <CardHeader className="p-0 mb-6">
          <CardTitle className="text-3xl md:text-4xl font-semibold text-primary text-center">
            Professional Journey & Impact
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
            <Accordion type="single" collapsible className="w-full space-y-2"> {/* Added space-y */}
                {experienceData.map((exp, index) => (
                 <AnimatedSection key={exp.id} delay={`delay-${index * 75}`}> {/* Adjusted delay step */}
                    <AccordionItem
                      value={exp.id}
                      className="border border-border/50 rounded-md overflow-hidden transition-all duration-300 hover:border-accent/70 hover:bg-muted/30" // Added hover effects and border radius
                      >
                        <AccordionTrigger className="text-left hover:no-underline group py-4 px-4 md:px-6 hover:bg-muted/50 transition-colors duration-200"> {/* Added padding and hover bg */}
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
                        <AccordionContent className="pb-4 pt-0 px-6 md:px-8"> {/* Added padding */}
                            <ul className="list-none space-y-2.5 text-muted-foreground text-base leading-relaxed pt-2"> {/* Adjusted spacing and added padding-top */}
                                {exp.description.map((item, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <TrendingUp className="h-4 w-4 mr-2.5 mt-1 text-accent/80 flex-shrink-0" /> {/* Adjusted spacing */}
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
