
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "./animated-section";
import { FileText, BarChart3, ExternalLink, Settings, Target } from "lucide-react"; // Added Settings, Target icons

const projectsData = [
  {
    title: "CRM Implementation & Optimization",
    description: "Led functional design and configuration for a Salesforce CRM rollout, followed by optimizing workflows and reporting, boosting sales team productivity by 25%.",
    imageUrl: "https://picsum.photos/seed/crm-config/600/400",
    tags: ["Functional Consulting", "Salesforce", "CRM", "Process Improvement", "Configuration", "User Adoption"],
    liveUrl: "#", // Link to a case study or presentation
    aiHint: "salesforce dashboard crm configuration",
    icon: <Settings className="inline-block h-4 w-4 mr-1.5 text-accent-foreground/80" />,
  },
  {
    title: "Market Entry Strategy Analysis",
    description: "Conducted comprehensive market research and competitive analysis for a new SaaS product launch, informing the GTM strategy and pricing model.",
    imageUrl: "https://picsum.photos/seed/market-strategy/600/400",
    tags: ["Business Strategy", "Market Research", "Competitive Analysis", "GTM Strategy", "SaaS", "Data Analysis"],
    liveUrl: "#",
    aiHint: "market analysis chart strategy planning",
     icon: <Target className="inline-block h-4 w-4 mr-1.5 text-accent-foreground/80" />,
  },
  {
    title: "E-commerce Feature Prioritization",
    description: "Developed and implemented a data-driven framework for prioritizing new e-commerce features based on ROI, strategic alignment, and customer impact.",
    imageUrl: "https://picsum.photos/seed/feature-prio-ecom/600/400",
    tags: ["Business Analysis", "Prioritization Framework", "E-commerce", "ROI Analysis", "Product Roadmap", "Decision Making"],
    liveUrl: "#",
     aiHint: "decision matrix chart business value effort",
     icon: <FileText className="inline-block h-4 w-4 mr-1.5 text-accent-foreground/80" />,
  },
   {
    title: "Sales Pursuit Support - Tech Solutions",
    description: "Supported key sales pursuits by translating client needs into functional solution outlines, contributing to proposal content, and assisting with demo preparation.",
    imageUrl: "https://picsum.photos/seed/sales-pursuit/600/400",
    tags: ["Pursuits", "GTM Support", "Solutioning", "Proposal Writing", "Sales Enablement", "Client Needs Analysis"],
    liveUrl: "#",
     aiHint: "business proposal presentation team",
     icon: <BarChart3 className="inline-block h-4 w-4 mr-1.5 text-accent-foreground/80" />, // Using BarChart as proxy for pursuit/sales
  },
];

const ProjectsSection: React.FC = () => {
  return (
    <AnimatedSection id="projects" className="scroll-mt-20 md:scroll-mt-24" delay="delay-400"> {/* Increased scroll margin */}
         <div className="text-center mb-10 md:mb-12">
             {/* Enhanced Title Styling */}
             <h2 className="text-4xl md:text-5xl font-bold text-primary mb-3 pb-2 border-b-2 border-accent/30 inline-block">
                Key Initiatives & Projects
             </h2>
             <p className="text-muted-foreground mt-2 text-lg">Demonstrating impact across analysis, consulting, and strategy.</p>
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
                       <CardTitle className="absolute bottom-4 left-4 text-xl font-semibold text-white drop-shadow-md z-10 transition-colors duration-300 group-hover:text-accent-foreground/90 flex items-center">
                         {project.icon} {project.title}
                        </CardTitle>
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
                               <ExternalLink className="h-4 w-4 mr-1.5 transition-transform duration-200 group-hover/btn:scale-110" /> View Details
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
