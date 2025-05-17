
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "./animated-section";
import { Sprout, Layers3, Target, BriefcaseBusiness, ExternalLink } from "lucide-react";

const projectsData = [
  {
    title: "Smart Farms & AgriTech Solutions",
    description: "This initiative involves designing and developing technology solutions for modern agriculture. It includes IoT integration for farm monitoring, data analytics for crop optimization, and supply chain improvements for better market access.",
    imageUrl: "https://picsum.photos/seed/agritech-future/600/400", // Updated seed
    tags: ["AgriTech", "IoT", "Data Analytics", "Supply Chain", "Solution Design", "Sustainable Farming"],
    liveUrl: "#",
    aiHint: "modern agriculture technology", // Updated hint
    icon: <Sprout className="inline-block h-4 w-4 mr-1.5 text-accent-foreground/80" />,
  },
  {
    title: "Platform Engineering & Modernization",
    description: "Focuses on re-architecting and modernizing existing enterprise platforms to enhance scalability, performance, and maintainability. This includes cloud migration strategies, microservices adoption, and DevOps enablement.",
    imageUrl: "https://picsum.photos/seed/platform-automation/600/400", // Updated seed
    tags: ["Platform Engineering", "Modernization", "Cloud Migration", "Microservices", "DevOps", "Scalability"],
    liveUrl: "#",
    aiHint: "futuristic automation abstract", // Updated hint
    icon: <Layers3 className="inline-block h-4 w-4 mr-1.5 text-accent-foreground/80" />,
  },
  {
    title: "Market Strategy Analysis",
    description: "This project involves conducting in-depth market research and competitive analysis to identify new opportunities, define product positioning, and inform go-to-market strategies for new products or services.",
    imageUrl: "https://picsum.photos/seed/creative-strategy/600/400", // Updated seed
    tags: ["Market Research", "Competitive Analysis", "GTM Strategy", "Product Positioning", "Strategic Planning"],
    liveUrl: "#",
    aiHint: "innovative strategy team", // Updated hint
    icon: <Target className="inline-block h-4 w-4 mr-1.5 text-accent-foreground/80" />,
  },
  {
    title: "GTM Pursuits",
    description: "Supporting high-value sales pursuits and go-to-market initiatives. This includes understanding client needs, solution architecting, proposal development, and creating compelling presentations to win new business.",
    imageUrl: "https://picsum.photos/seed/business-pursuits/600/400", // Updated seed
    tags: ["GTM Strategy", "Sales Pursuits", "Solutioning", "Proposal Development", "Client Engagement"],
    liveUrl: "#",
    aiHint: "professional business meeting", // Updated hint
    icon: <BriefcaseBusiness className="inline-block h-4 w-4 mr-1.5 text-accent-foreground/80" />,
  },
];

const ProjectsSection: React.FC = () => {
  return (
    <AnimatedSection id="projects" className="scroll-mt-20 md:scroll-mt-24" delay="delay-400">
         <div className="text-center mb-10 md:mb-12">
             <h2 className="text-4xl md:text-5xl font-bold text-primary mb-3 pb-2 border-b-2 border-accent/30 inline-block">
                Key Initiatives & Projects
             </h2>
             <p className="text-muted-foreground mt-2 text-lg">Demonstrating impact across analysis, consulting, and strategy.</p>
         </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectsData.map((project, index) => (
              <AnimatedSection key={project.title} delay={`delay-${index * 100}`}>
                <Card className="group flex flex-col h-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-out border border-border/50 transform hover:-translate-y-2 bg-background">
                   <div className="relative h-48 md:h-56 w-full overflow-hidden">
                     <Image
                        src={project.imageUrl}
                        alt={`Visual representing ${project.title}`}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-500 ease-out group-hover:scale-105"
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

