"use client";
import React from "react";
import Image from "next/image"; // Import Image
import AnimatedSection from "./animated-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Calendar } from "lucide-react"; // Icons for education
import { cn } from "@/lib/utils"; // Import cn

// Replace with your actual education data
const educationData = [
  {
    degree: "Master of Science in Computer Science",
    institution: "University of Advanced Technology",
    duration: "2019 - 2021",
    details: [
      "Specialized in Artificial Intelligence and Machine Learning.",
      "Thesis: 'Developing Efficient Algorithms for Large-Scale Data Analysis'.",
      "Achieved Dean's List for academic excellence.",
    ],
    imageUrl: "https://picsum.photos/seed/mastersarch/600/400", // New image URL
    aiHint: "elegant university architecture campus", // Updated hint
  },
  {
    degree: "Bachelor of Science in Software Engineering",
    institution: "State Technical College",
    duration: "2015 - 2019",
    details: [
      "Capstone Project: 'E-commerce Platform Development'.",
      "Active member of the Coding Club and Tech Society.",
      "Graduated with Honors.",
    ],
    imageUrl: "https://picsum.photos/seed/bachelorcampus/600/400", // New image URL
    aiHint: "optimistic enthusiastic college campus view students", // Updated hint
  },
  // Add more degrees or certifications
];

const EducationSection: React.FC = () => {
  return (
    <AnimatedSection id="education" className="scroll-mt-20 md:scroll-mt-24" delay="delay-400"> {/* Ensure consistent scroll margin */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-out bg-card border border-border/50 rounded-lg p-6 md:p-10 overflow-hidden"> {/* Added overflow-hidden */}
        <CardHeader className="p-0 mb-8 text-center">
          {/* Enhanced Title Styling */}
          <CardTitle className="text-4xl md:text-5xl font-bold text-primary mb-3 pb-2 border-b-2 border-accent/30 inline-block">
            Academic Background
          </CardTitle>
          <p className="text-muted-foreground mt-2 text-lg">My educational qualifications.</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-6">
            {educationData.map((edu, index) => (
              <AnimatedSection key={index} delay={`delay-${index * 100}`}>
                {/* Make the container relative and add group class */}
                <div className="relative flex flex-col sm:flex-row items-start gap-4 p-4 border border-border/30 rounded-md bg-background hover:border-accent/50 hover:bg-muted/20 transition-all duration-300 ease-out overflow-hidden group">
                   {/* Image positioned absolutely to the right, with fade */}
                   <div className="absolute top-0 right-0 h-full w-1/3 md:w-1/4 opacity-5 group-hover:opacity-15 transition-opacity duration-500 ease-out pointer-events-none -z-0"> {/* Lower z-index */}
                     <Image
                       src={edu.imageUrl}
                       alt={`Image related to ${edu.institution}`}
                       layout="fill"
                       objectFit="cover"
                       className="filter grayscale" // Keep grayscale for subtlety
                       data-ai-hint={edu.aiHint} // Use updated AI hint
                     />
                     {/* Right-to-left gradient overlay */}
                     <div className="absolute inset-0 bg-gradient-to-l from-background via-background/80 to-transparent"></div>
                   </div>

                   {/* Content */}
                  <div className="flex-shrink-0 mt-1 text-accent z-10"> {/* Ensure content is above image/gradient */}
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div className="flex-grow z-10"> {/* Ensure content is above image/gradient */}
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
