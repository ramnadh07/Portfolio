"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "./animated-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Database, Palette, Server, Cloud } from "lucide-react"; // Example icons

const skillsData = [
  {
    category: "Frontend",
    icon: <Code className="h-5 w-5 mr-2 text-accent" />,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3", "JavaScript (ES6+)"],
  },
  {
    category: "Backend",
    icon: <Server className="h-5 w-5 mr-2 text-accent" />,
    skills: ["Node.js", "Express", "Python", "Flask/Django", "REST APIs", "GraphQL"],
  },
  {
    category: "Databases",
     icon: <Database className="h-5 w-5 mr-2 text-accent" />,
    skills: ["PostgreSQL", "MongoDB", "Firebase Firestore", "SQL", "NoSQL"],
  },
  {
    category: "UI/UX & Design",
     icon: <Palette className="h-5 w-5 mr-2 text-accent" />,
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Wireframing", "Responsive Design"],
  },
   {
    category: "DevOps & Cloud",
     icon: <Cloud className="h-5 w-5 mr-2 text-accent" />,
    skills: ["Docker", "CI/CD", "AWS", "Google Cloud", "Vercel", "Git"],
  },
  // Add more categories as needed
];

const SkillsSection: React.FC = () => {
  return (
    <AnimatedSection id="skills" className="scroll-mt-16" delay="delay-200">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-out bg-card border border-border/50 rounded-lg p-6 md:p-10">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-3xl md:text-4xl font-semibold text-primary text-center">
            Technical Skills
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillsData.map((categoryData, index) => (
              <AnimatedSection key={categoryData.category} delay={`delay-${index * 100}`}>
                <div className="p-4 border border-border/30 rounded-md bg-background h-full hover:border-accent/50 transition-colors duration-300 ease-out transform hover:-translate-y-1">
                  <h3 className="flex items-center text-xl font-medium mb-4 text-foreground">
                     {categoryData.icon}
                    {categoryData.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categoryData.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-sm px-3 py-1 transition-transform duration-200 ease-out hover:scale-105 hover:bg-secondary/90 cursor-default"
                      >
                        {skill}
                      </Badge>
                    ))}
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

export default SkillsSection;
