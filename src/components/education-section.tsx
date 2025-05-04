
"use client";
import React from "react";
import AnimatedSection from "./animated-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Calendar } from "lucide-react"; // Icons for education
import { cn } from "@/lib/utils"; // Import cn

// Replace with your actual education data - BA specific examples
const educationData = [
  {
    degree: "Master of Business Administration (MBA)",
    institution: "Stanford Graduate School of Business", // Example prestigious school
    duration: "2018 - 2020",
    details: [
      "Concentration in Strategy and Operations.",
      "Case Competition Winner - Solved complex market entry problem.",
      "Member of the Consulting Club and Data Analytics Group.",
    ],
  },
  {
    degree: "Bachelor of Science in Economics",
    institution: "University of California, Berkeley", // Example strong undergrad
    duration: "2012 - 2016",
    details: [
      "Minor in Statistics.",
      "Thesis: 'Impact of Pricing Strategies on Consumer Behavior'.",
      "Graduated with Honors (Cum Laude).",
      "Relevant Coursework: Econometrics, Micro/Macroeconomics, Data Analysis.",
    ],
  },
  {
    degree: "Certified Business Analysis Professional (CBAP)", // Example certification
    institution: "IIBA",
    duration: "Issued 2021",
    details: [
      "Demonstrated expertise in business analysis principles and practices.",
      "Covered core knowledge areas including Elicitation, Requirements Life Cycle Management, and Solution Evaluation.",
    ],
  },
];

const EducationSection: React.FC = () => {
  return (
    <AnimatedSection id="education" className="scroll-mt-20 md:scroll-mt-24" delay="delay-400"> {/* Ensure consistent scroll margin */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-out bg-card border border-border/50 rounded-lg p-6 md:p-10 overflow-hidden"> {/* Added overflow-hidden */}
        <CardHeader className="p-0 mb-8 text-center">
          {/* Enhanced Title Styling */}
          <CardTitle className="text-4xl md:text-5xl font-bold text-primary mb-3 pb-2 border-b-2 border-accent/30 inline-block">
            Academic & Professional Qualifications
          </CardTitle>
          <p className="text-muted-foreground mt-2 text-lg">My educational background and certifications.</p> {/* Updated subtitle */}
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-6">
            {educationData.map((edu, index) => (
              <AnimatedSection key={index} delay={`delay-${index * 100}`}>
                {/* Removed relative positioning and group class */}
                <div className="flex flex-col sm:flex-row items-start gap-4 p-4 border border-border/30 rounded-md bg-background hover:border-accent/50 hover:bg-muted/20 transition-all duration-300 ease-out overflow-hidden">

                   {/* Removed Image and gradient overlay */}

                   {/* Content - Removed z-index */}
                  <div className="flex-shrink-0 mt-1 text-accent">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div className="flex-grow"> {/* Removed z-index */}
                    <h3 className="text-xl font-semibold text-foreground mb-1">{edu.degree}</h3>
                    <p className="text-lg text-muted-foreground mb-1">{edu.institution}</p>
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4 mr-1.5" />
                      {edu.duration}
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground text-base">
                      {edu.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
};

export default EducationSection;
