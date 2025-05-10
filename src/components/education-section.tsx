
"use client";
import React from "react";
import AnimatedSection from "./animated-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Award, Calendar } from "lucide-react"; // Added Award icon
import { Badge } from "@/components/ui/badge"; // For potential future use, not in current design

// New data structure for degrees
const educationDegreesData = [
  {
    degree: "Master of Business Administration",
    institution: "Stanford Graduate School of Business", // Example, as per existing
    duration: "2018 - 2020", // Example duration
    focus: "Specialized in Business Strategy and Digital Transformation", // As per image inspiration
    achievements: [
      "Graduated with Distinction",
      "Published research paper on Digital Innovation",
      "Led student consulting projects",
    ],
  },
  {
    degree: "Bachelor of Science in Economics", // Changed from B.Tech to align with previous content
    institution: "University of California, Berkeley", // Example, as per existing
    duration: "2012 - 2016", // Example duration
    focus: "Major in Economics with a Minor in Statistics", // Adjusted focus
    achievements: [
      "First Class with Distinction", // Example achievement
      "Thesis: 'Impact of Pricing Strategies on Consumer Behavior'", // Example achievement
      "Member of the Economics and Data Analytics Club", // Example achievement
    ],
  },
];

// New data structure for certifications
const certificationsData = [
  {
    name: "Certified Business Analysis Professional (CBAP)",
    issuingBody: "IIBA (International Institute of Business Analysis)",
    year: "2022", // Updated year to be more recent
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
  // Adding an agile certification as it's common for BAs
  {
    name: "Certified Scrum Product Owner (CSPO)",
    issuingBody: "Scrum Alliance",
    year: "2019",
  },
];

// New data for continuous learning
const continuousLearningData = {
  title: "Continuous Learning",
  description:
    "Actively engage in professional development, attending webinars, workshops, and online courses to stay abreast of the latest industry trends, methodologies, and technologies in business analysis, strategy, and digital transformation.",
};


const EducationSection: React.FC = () => {
  return (
    <AnimatedSection id="education" className="scroll-mt-20 md:scroll-mt-24" delay="delay-400">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-out bg-card border border-border/50 rounded-lg p-6 md:p-10 overflow-hidden">
        <CardHeader className="p-0 mb-10 text-center"> {/* Increased bottom margin */}
          <CardTitle className="text-4xl md:text-5xl font-bold text-primary mb-2">
            Educational <span className="text-accent">Background</span>
          </CardTitle>
          <CardDescription className="text-muted-foreground text-lg">
            Academic qualifications and professional certifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-10">
            {/* Left Column: Education Degrees */}
            <AnimatedSection animationClass="animate-fade-in-up" delay="delay-100" className="space-y-6">
              <h3 className="flex items-center text-2xl font-semibold text-primary mb-4">
                <GraduationCap className="h-6 w-6 mr-2.5 text-accent" />
                Education
              </h3>
              {educationDegreesData.map((edu, index) => (
                <AnimatedSection key={edu.degree} delay={`delay-${index * 150 + 150}`}>
                  <Card className="bg-background border border-border/30 rounded-md p-4 hover:shadow-md transition-shadow duration-300 ease-out h-full flex flex-col">
                    <CardHeader className="p-0 pb-2">
                      <CardTitle className="text-xl font-medium text-foreground">{edu.degree}</CardTitle>
                      <p className="text-sm text-accent font-medium mt-0.5">{edu.institution}</p>
                      <p className="text-xs text-muted-foreground flex items-center mt-1">
                        <Calendar className="h-3.5 w-3.5 mr-1.5" /> {edu.duration}
                      </p>
                    </CardHeader>
                    <CardContent className="p-0 pt-2 flex-grow">
                      <p className="text-sm text-muted-foreground mb-2">{edu.focus}</p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {edu.achievements.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </AnimatedSection>

            {/* Right Column: Certifications & Continuous Learning */}
            <AnimatedSection animationClass="animate-fade-in-up" delay="delay-200" className="space-y-6">
              <h3 className="flex items-center text-2xl font-semibold text-primary mb-4">
                <Award className="h-6 w-6 mr-2.5 text-accent" />
                Certifications
              </h3>
              {certificationsData.map((cert, index) => (
                <AnimatedSection key={cert.name} delay={`delay-${index * 150 + 250}`}>
                  <Card className="bg-background border border-border/30 rounded-md p-4 hover:shadow-md transition-shadow duration-300 ease-out">
                    <CardHeader className="p-0">
                      <CardTitle className="text-lg font-medium text-foreground">{cert.name}</CardTitle>
                      <p className="text-sm text-accent font-medium mt-0.5">{cert.issuingBody}</p>
                      <p className="text-xs text-muted-foreground mt-1">{cert.year}</p>
                    </CardHeader>
                  </Card>
                </AnimatedSection>
              ))}

              {/* Continuous Learning Section */}
              <AnimatedSection delay={`delay-${(certificationsData.length * 150) + 250}`}>
                <Card className="bg-background border border-border/30 rounded-md p-4 hover:shadow-md transition-shadow duration-300 ease-out">
                  <CardHeader className="p-0 pb-2">
                    <CardTitle className="text-lg font-medium text-foreground">{continuousLearningData.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {continuousLearningData.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </AnimatedSection>
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
};

export default EducationSection;
