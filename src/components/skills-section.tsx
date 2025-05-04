
"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "./animated-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, BrainCircuit, DatabaseZap, Wrench, Users, MessageSquare } from "lucide-react"; // Relevant BA icons

const skillsData = [
  {
    category: "Business Analysis Core",
    icon: <ClipboardList className="h-5 w-5 mr-2 text-accent" />,
    skills: ["Requirements Elicitation", "Stakeholder Analysis", "Process Modeling (BPMN)", "Use Case Development", "User Stories", "Gap Analysis", "Business Case Development"],
  },
  {
    category: "Technical Skills",
    icon: <BrainCircuit className="h-5 w-5 mr-2 text-accent" />,
    skills: ["Data Analysis (SQL)", "System Analysis", "API Understanding", "Data Warehousing Concepts", "Reporting & Visualization (Tableau/Power BI Basics)", "Agile/Scrum Methodologies"],
  },
  {
    category: "Tools & Platforms",
     icon: <Wrench className="h-5 w-5 mr-2 text-accent" />,
    skills: ["JIRA", "Confluence", "Microsoft Visio", "Lucidchart", "SQL Server / PostgreSQL", "Excel (Advanced)", "Microsoft Office Suite"],
  },
  {
    category: "Domain Knowledge", // Kept Domain Expertise section separate, added a basic one here
     icon: <DatabaseZap className="h-5 w-5 mr-2 text-accent" />,
    skills: ["E-commerce", "FinTech", "Healthcare (Basic)", "SaaS"], // Link to Domain Expertise section for more detail
  },
   {
    category: "Soft Skills",
     icon: <Users className="h-5 w-5 mr-2 text-accent" />,
    skills: ["Communication", "Problem-Solving", "Critical Thinking", "Stakeholder Management", "Facilitation", "Presentation Skills", "Negotiation"],
  },
   {
    category: "Methodologies",
     icon: <MessageSquare className="h-5 w-5 mr-2 text-accent" />, // Using MessageSquare as a generic process icon
    skills: ["Agile", "Scrum", "Waterfall (Understanding)", "SDLC"],
  },
];

const SkillsSection: React.FC = () => {
  return (
    <AnimatedSection id="skills" className="scroll-mt-20 md:scroll-mt-24" delay="delay-200"> {/* Increased scroll margin */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-out bg-background border border-border/50 rounded-lg p-6 md:p-10"> {/* Changed to bg-background */}
        <CardHeader className="p-0 mb-8 text-center"> {/* Increased bottom margin and centered */}
          {/* Enhanced Title Styling */}
          <CardTitle className="text-4xl md:text-5xl font-bold text-primary mb-3 pb-2 border-b-2 border-accent/30 inline-block">
            Analytical Toolkit
          </CardTitle>
           <p className="text-muted-foreground mt-2 text-lg">My Business Analysis skills and competencies.</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Reduced gap slightly */}
            {skillsData.map((categoryData, index) => (
              <AnimatedSection key={categoryData.category} delay={`delay-${index * 75}`}>
                <Card className="p-4 border border-border/30 rounded-md bg-card h-full transition-all duration-300 ease-out transform hover:-translate-y-1 hover:shadow-md hover:border-accent/50 group"> {/* Inner cards remain bg-card */}
                  <h3 className="flex items-center text-xl font-medium mb-4 text-foreground transition-colors duration-300 group-hover:text-accent">
                     {categoryData.icon}
                    {categoryData.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categoryData.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-sm px-3 py-1 transition-all duration-200 ease-out hover:scale-105 hover:bg-accent/10 hover:text-accent cursor-default border border-transparent hover:border-accent/50" // Enhanced hover effect
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
};

export default SkillsSection;
