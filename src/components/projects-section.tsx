
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "./animated-section";
import { FileText, BarChart3, ExternalLink } from "lucide-react"; // Using FileText, BarChart3 instead of GitHub

const projectsData = [
  {
    title: "CRM Implementation Analysis",
    description: "Analyzed existing sales processes, gathered requirements from stakeholders, and documented user stories for a new CRM system, leading to streamlined workflows.",
    imageUrl: "https://picsum.photos/seed/crm-analysis/600/400",
    tags: ["Requirements Analysis", "Process Mapping", "CRM", "Stakeholder Management", "User Stories"],
    liveUrl: "#", // Link to a case study or presentation if available
    // repoUrl removed
    aiHint: "business process flowchart crm",
  },
  {
    title: "E-commerce Checkout Optimization",
    description: "Identified friction points in the online checkout process through data analysis and user feedback. Proposed solutions that contributed to a 10% decrease in cart abandonment.",
    imageUrl: "https://picsum.photos/seed/checkout-opt/600/400",
    tags: ["Data Analysis", "Process Improvement", "E-commerce", "A/B Testing Concepts", "User Experience"],
    liveUrl: "#",
    // repoUrl removed
     aiHint: "website checkout conversion rate graph",
  },
  {
    title: "Reporting Dashboard Requirements",
    description: "Defined requirements and data sources for a new executive dashboard, enabling better visibility into key performance indicators (KPIs).",
    imageUrl: "https://picsum.photos/seed/dashboard-req/600/400",
    tags: ["Requirements Gathering", "Data Modeling (Conceptual)", "KPIs", "Reporting", "Stakeholder Interviews"],
    liveUrl: "#",
    // repoUrl removed
     aiHint: "business dashboard kpi charts",
  },
   {
    title: "Feature Prioritization Framework",
    description: "Developed a framework to objectively score and prioritize new feature requests based on business value, effort, and strategic alignment.",
    imageUrl: "https://picsum.photos/seed/feature-prio/600/400",
    tags: ["Business Strategy", "Prioritization", "Product Management Support", "Decision Making", "Framework Development"],
    liveUrl: "#",
    // repoUrl removed
     aiHint: "decision matrix chart strategy",
  },
];

const ProjectsSection: React.FC = () => {
  return (
    <AnimatedSection id="projects" className="scroll-mt-20 md:scroll-mt-24" delay="delay-400"> {/* Increased scroll margin */}
         <div className="text-center mb-10 md:mb-12">
             {/* Enhanced Title Styling */}
             <h2 className="text-4xl md:text-5xl font-bold text-primary mb-3 pb-2 border-b-2 border-accent/30 inline-block">
                Key Analysis Projects
             </h2>
             <p className="text-muted-foreground mt-2 text-lg">Examples of my analytical contributions.</p>
         </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> {/* Adjusted grid cols for better spacing */}
            {projectsData.map((project, index) => (
              <AnimatedSection key={project.title} delay={`delay-${index * 100}`}>
                <Card className="group flex flex-col h-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-out border border-border/50 transform hover:-translate-y-2 bg-background"> {/* Changed to bg-background */}
                   <div className="relative h-48 md:h-56 w-full overflow-hidden"> {/* Image container */}
                     <Image
                        src={project.imageUrl}
                        alt={`Visual representing ${project.title}`} // Updated alt text
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-500 ease-out group-hover:scale-105" // Image zoom on hover
                         data-ai-hint={project.aiHint}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                       <CardTitle className="absolute bottom-4 left-4 text-xl font-semibold text-white drop-shadow-md z-10 transition-colors duration-300 group-hover:text-accent-foreground/90">{project.title}</CardTitle>
                   </div>

                  <CardHeader className="pt-4 px-4">
                     <div className="flex flex-wrap gap-1.5 mt-1">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs cursor-default transition-colors duration-200 hover:bg-accent/20 hover:text-accent border border-transparent hover:border-accent/30">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow px-4 py-2">
                    <CardDescription className="text-muted-foreground text-sm leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="px-4 pb-4 pt-2 flex justify-end space-x-3 mt-auto bg-muted/20 border-t border-border/30">
                    {/* Replacing GitHub link with a documentation/report link if applicable */}
                    {/* {project.repoUrl && project.repoUrl !== "#" && (
                        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors group/btn">
                           <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                             <>
                               <FileText className="h-4 w-4 mr-1.5 transition-transform duration-200 group-hover/btn:scale-110" /> Documentation
                             </>
                           </Link>
                         </Button>
                    )} */}
                    {project.liveUrl && project.liveUrl !== "#" && (
                         <Button variant="outline" size="sm" asChild className="text-accent border-accent hover:bg-accent/10 hover:text-accent transition-colors group/btn">
                           <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                             <>
                               <ExternalLink className="h-4 w-4 mr-1.5 transition-transform duration-200 group-hover/btn:scale-110" /> View Case Study
                             </>
                           </Link>
                         </Button>
                    )}
                  </CardFooter>
                </Card>
              </AnimatedSection>
            ))}
          </div>
    </AnimatedSection>
  );
};

export default ProjectsSection;
