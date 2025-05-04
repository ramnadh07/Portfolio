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
import { Briefcase, Calendar } from "lucide-react";

const experienceData = [
  {
    id: "exp1",
    company: "Tech Solutions Inc.",
    role: "Senior Frontend Developer",
    duration: "Jan 2021 - Present",
    description: [
        "Led the development of a new customer portal using Next.js and TypeScript, resulting in a 30% increase in user engagement.",
        "Mentored junior developers, conducted code reviews, and established frontend best practices.",
        "Collaborated with UI/UX designers to implement complex interfaces and ensure accessibility standards.",
        "Optimized application performance, reducing load times by 25%.",
    ],
  },
  {
     id: "exp2",
    company: "Web Innovators Co.",
    role: "Full-Stack Developer",
    duration: "Jun 2018 - Dec 2020",
    description: [
        "Developed and maintained full-stack web applications using React, Node.js, and PostgreSQL.",
        "Designed and implemented RESTful APIs for various client projects.",
        "Worked closely with clients to gather requirements and deliver custom solutions.",
        "Contributed to the migration of legacy systems to modern tech stacks.",
    ],
  },
   {
     id: "exp3",
    company: "Design Hub Agency",
    role: "Junior Web Developer",
    duration: "Sep 2017 - May 2018",
    description: [
        "Assisted senior developers in building and testing websites using HTML, CSS, and JavaScript (jQuery).",
        "Gained experience with version control (Git) and agile methodologies.",
        "Handled website maintenance and bug fixes for existing client sites.",
    ],
  },
  // Add more experiences
];

const ExperienceSection: React.FC = () => {
  return (
    <AnimatedSection id="experience" className="scroll-mt-16" delay="delay-300">
       <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-out bg-card border border-border/50 rounded-lg p-6 md:p-10">
         <CardHeader className="p-0 mb-6">
          <CardTitle className="text-3xl md:text-4xl font-semibold text-primary text-center">
            Work Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
            <Accordion type="single" collapsible className="w-full">
                {experienceData.map((exp, index) => (
                 <AnimatedSection key={exp.id} delay={`delay-${index * 100}`}>
                    <AccordionItem value={exp.id} className="border-b border-border/50 last:border-b-0">
                        <AccordionTrigger className="text-left hover:no-underline group py-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full mr-4">
                                <div className="flex items-center mb-1 sm:mb-0">
                                    <Briefcase className="h-5 w-5 mr-2 text-muted-foreground group-hover:text-accent transition-colors" />
                                    <span className="text-lg font-medium text-foreground group-hover:text-accent transition-colors">{exp.role}</span>
                                    <span className="text-muted-foreground mx-2 hidden sm:inline">@</span>
                                     <span className="text-lg text-muted-foreground sm:text-foreground ml-7 sm:ml-0">{exp.company}</span>
                                </div>

                                <div className="flex items-center text-sm text-muted-foreground ml-7 sm:ml-0">
                                    <Calendar className="h-4 w-4 mr-1.5" />
                                    {exp.duration}
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 pt-0 pl-7 pr-2">
                            <ul className="list-disc space-y-2 pl-5 text-muted-foreground text-base leading-relaxed">
                                {exp.description.map((item, idx) => (
                                    <li key={idx}>{item}</li>
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
