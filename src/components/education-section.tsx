
"use client";
import React from "react";
import AnimatedSection from "./animated-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Award, Calendar } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const educationDegreesData = [
  {
    degree: "Master of Business Administration",
    institution: "Xavier Institute of Management and Entrepreneurship",
    duration: "2022 - 2024",
    focus: "Specialized in Business Analytics",
    achievements: [
      "Dean's List for Academic Excellence.",
      "President, Data & Business Analytics Club.",
      "Formulated marketing & design thinking strategy for a large-scale restaurant/bar.",
    ],
  },
  {
    degree: "Bachelor of Business Administration",
    institution: "Gandhi Institute of Technology and Management (GITAM)",
    duration: "2019 - 2022",
    focus: "Specialized in Business Analytics",
    achievements: [
      "Active member of Management and Technical Clubs.",
      "Developed dashboards & visualizations for hotel/tourism consumer insights.",
      "Authored research reports on financial markets & telecommunications networks.",
    ],
  },
];

const certificationsData = [
  { name: "Data Analyst", issuingBody: "Google" },
  { name: "Cybersecurity Analyst", issuingBody: "IBM" },
  { name: "SAS Visual Business Analytics", issuingBody: "SAS" },
  { name: "AWS Fundamentals", issuingBody: "AWS" },
  { name: "Marketing Analytics", issuingBody: "University of Virginia" },
  { name: "Six Sigma Principles", issuingBody: "Kennesaw State University" },
  { name: "Agile Software Development", issuingBody: "University of Minnesota" },
  { name: "Business Analytics & Digital Media", issuingBody: "Indian School of Business" },
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
            <AnimatedSection animationClass="animate-fade-in-up" delay="delay-200" className="flex flex-col">
              <h3 className="flex items-center text-2xl font-semibold text-primary mb-4">
                <Award className="h-7 w-7 mr-2.5 text-accent" />
                Certifications
              </h3>
              <Card className="bg-background border border-border/30 rounded-md flex-grow flex flex-col overflow-hidden">
                <CardContent className={cn(
                  "p-0 overflow-hidden relative", 
                  certificationsData.length > 4 ? "h-[22rem]" : "flex-grow" 
                )}>
                  <ScrollArea className="absolute inset-0">
                    <div className="p-4 space-y-4">
                      {certificationsData.map((cert, index) => (
                        <AnimatedSection key={cert.name} delay={`delay-${index * 75 + 250}`}>
                          <Card className="bg-muted/40 border border-border/20 p-3 hover:shadow-md hover:border-accent/40 transform hover:-translate-y-0.5 transition-all duration-300 ease-out group">
                            <CardHeader className="p-0">
                              <CardTitle className="text-lg font-medium text-foreground group-hover:text-accent transition-colors">{cert.name}</CardTitle>
                              <p className="text-sm text-muted-foreground group-hover:text-accent/80 transition-colors font-medium mt-0.5">{cert.issuingBody}</p>
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

          {/* Performance is Reality Section (Full Width) */}
          <AnimatedSection animationClass="animate-fade-in-up" delay="delay-400">
             <Card className="bg-gradient-to-r from-background via-accent/5 to-background group border border-border/40 rounded-lg p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:via-accent/15">
                <CardHeader className="p-0 text-center mb-4">
                <CardTitle className="text-2xl md:text-3xl font-semibold text-primary group-hover:text-accent transition-colors">
                    Performance is Reality
                </CardTitle>
                </CardHeader>
                <CardContent className="p-0 text-center">
                <blockquote className="relative">
                    <p className="text-lg md:text-xl italic text-muted-foreground leading-relaxed max-w-3xl mx-auto group-hover:text-accent/90 transition-colors duration-300 group-hover:drop-shadow-[0_0_5px_hsl(var(--accent))]">
                    &ldquo;You learn by Doing and sometimes, it is wise to Pause and  look UP&rdquo;
                    </p>
                    <footer className="mt-3 text-sm text-foreground group-hover:text-accent/80 transition-colors duration-300">— Ramalingeswara Nadh</footer>
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

