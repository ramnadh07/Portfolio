
"use client";
import React from "react";
import AnimatedSection from "./animated-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Award, Calendar } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area"; // Import ScrollArea

const educationDegreesData = [
  {
    degree: "Master of Business Administration",
    institution: "Stanford Graduate School of Business",
    duration: "2018 - 2020",
    focus: "Specialized in Business Strategy and Digital Transformation",
    achievements: [
      "Graduated with Distinction",
      "Published research paper on Digital Innovation",
      "Led student consulting projects",
    ],
  },
  {
    degree: "Bachelor of Science in Economics",
    institution: "University of California, Berkeley",
    duration: "2012 - 2016",
    focus: "Major in Economics with a Minor in Statistics",
    achievements: [
      "First Class with Distinction",
      "Thesis: 'Impact of Pricing Strategies on Consumer Behavior'",
      "Member of the Economics and Data Analytics Club",
    ],
  },
];

const certificationsData = [
  {
    name: "Certified Business Analysis Professional (CBAP)",
    issuingBody: "IIBA (International Institute of Business Analysis)",
    year: "2022",
  },
  {
    name: "Digital Strategy and Innovation",
    issuingBody: "Harvard Business School Online",
    year: "2021",
  },
  {
    name: "Enterprise Architecture Professional",
    issuingBody: "The Open Group",
    year: "2020",
  },
  {
    name: "Certified Scrum Product Owner (CSPO)",
    issuingBody: "Scrum Alliance",
    year: "2019",
  },
  {
    name: "Advanced Agile Project Management",
    issuingBody: "Coursera Project Network",
    year: "2023",
  },
   {
    name: "Data Analytics for Business Leaders",
    issuingBody: "LinkedIn Learning",
    year: "2022",
  },
];

const EducationSection: React.FC = () => {
  return (
    <AnimatedSection id="education" className="scroll-mt-20 md:scroll-mt-24" delay="delay-400">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-out bg-card border border-border/50 rounded-lg p-6 md:p-10 overflow-hidden">
        <CardHeader className="p-0 mb-10 text-center">
          <CardTitle className="text-4xl md:text-5xl font-bold text-primary mb-2">
            Educational <span className="text-accent">Background</span>
          </CardTitle>
          <CardDescription className="text-muted-foreground text-lg">
            Academic qualifications and professional certifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {/* Grid for Degrees and Certifications */}
          <div className="grid md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-10 mb-12"> {/* Increased bottom margin */}
            {/* Left Column: Education Degrees */}
            <AnimatedSection animationClass="animate-fade-in-up" delay="delay-100" className="space-y-6">
              <h3 className="flex items-center text-2xl font-semibold text-primary mb-4">
                <GraduationCap className="h-7 w-7 mr-2.5 text-accent" />
                Formal Education
              </h3>
              {educationDegreesData.map((edu, index) => (
                <AnimatedSection key={edu.degree} delay={`delay-${index * 150 + 150}`}>
                  <Card className="bg-background border border-border/30 rounded-md p-4 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-out h-full flex flex-col group">
                    <CardHeader className="p-0 pb-3">
                      <CardTitle className="text-xl font-medium text-foreground group-hover:text-accent transition-colors">{edu.degree}</CardTitle>
                      <p className="text-sm text-muted-foreground group-hover:text-accent/80 transition-colors font-medium mt-0.5">{edu.institution}</p>
                      <p className="text-xs text-muted-foreground flex items-center mt-1.5">
                        <Calendar className="h-3.5 w-3.5 mr-1.5" /> {edu.duration}
                      </p>
                    </CardHeader>
                    <CardContent className="p-0 pt-3 flex-grow border-t border-border/20">
                      <p className="text-sm text-muted-foreground mb-2.5 font-medium">{edu.focus}</p>
                      <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground">
                        {edu.achievements.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </AnimatedSection>

            {/* Right Column: Certifications */}
            <AnimatedSection animationClass="animate-fade-in-up" delay="delay-200" className="flex flex-col"> {/* flex flex-col for height matching */}
              <h3 className="flex items-center text-2xl font-semibold text-primary mb-4">
                <Award className="h-7 w-7 mr-2.5 text-accent" />
                Certifications
              </h3>
              <Card className="bg-background border border-border/30 rounded-md flex-grow flex flex-col overflow-hidden">
                {/* The Card itself will grow to match the education column height due to grid.
                    CardContent will grow within the card, and ScrollArea will enable scrolling for its content. */}
                <CardContent className="p-0 flex-grow overflow-hidden relative">
                  <ScrollArea className="absolute inset-0"> {/* ScrollArea takes full space of its relative parent (CardContent) */}
                    <div className="p-4 space-y-4"> {/* Padding applied inside scrollable area */}
                      {certificationsData.map((cert, index) => (
                        <AnimatedSection key={cert.name} delay={`delay-${index * 75 + 250}`}>
                          <Card className="bg-muted/40 border border-border/20 p-3 hover:shadow-md hover:border-accent/40 transform hover:-translate-y-0.5 transition-all duration-300 ease-out group">
                            <CardHeader className="p-0">
                              <CardTitle className="text-lg font-medium text-foreground group-hover:text-accent transition-colors">{cert.name}</CardTitle>
                              <p className="text-sm text-muted-foreground group-hover:text-accent/80 transition-colors font-medium mt-0.5">{cert.issuingBody}</p>
                              <p className="text-xs text-muted-foreground mt-1">{cert.year}</p>
                            </CardHeader>
                          </Card>
                        </AnimatedSection>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>

          {/* Continuous Learning Section (Full Width) */}
          <AnimatedSection animationClass="animate-fade-in-up" delay="delay-400">
             <Card className="bg-gradient-to-r from-card via-accent/10 to-card border border-border/40 rounded-lg p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 ease-out group">
                <CardHeader className="p-0 text-center mb-4">
                <CardTitle className="text-2xl md:text-3xl font-semibold text-primary group-hover:text-accent transition-colors">
                    Commitment to Growth
                </CardTitle>
                </CardHeader>
                <CardContent className="p-0 text-center">
                <blockquote className="relative">
                    <p className="text-lg md:text-xl italic text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                    &ldquo;The pursuit of knowledge is a lifelong journey, lighting the path to continuous self-improvement and innovation.&rdquo;
                    </p>
                    <footer className="mt-3 text-sm text-foreground">- Ramalingeswara Nadh (A Guiding Principle)</footer>
                </blockquote>
                </CardContent>
            </Card>
          </AnimatedSection>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
};

export default EducationSection;

