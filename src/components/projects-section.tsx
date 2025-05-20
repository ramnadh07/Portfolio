
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "./animated-section";
import { Sprout, Layers3, Target, BriefcaseBusiness, ExternalLink } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const projectsData = [
  {
    id: "project-agritech",
    title: "Smart Farms & AgriTech Solutions",
    description: "This initiative involves designing and developing technology solutions for modern agriculture. It includes IoT integration for farm monitoring, data analytics for crop optimization, and supply chain improvements for better market access. The core focus is on leveraging cutting-edge tech to create more efficient, sustainable, and productive agricultural practices, ultimately benefiting farmers and the food ecosystem.",
    imageUrl: "/images/projects/smart_farm.png",
    tags: ["AgriTech", "IoT", "Data Analytics", "Supply Chain", "Solution Design", "Sustainable Farming"],
    liveUrl: "#",
    aiHint: "modern agriculture technology",
    icon: <Sprout className="inline-block h-5 w-5 mr-2 text-current" />,
  },
  {
    id: "project-platform",
    title: "Platform Engineering & Modernization",
    description: "This project focuses on re-architecting and modernizing existing enterprise platforms to enhance scalability, performance, and maintainability. It involves strategies for cloud migration, adoption of microservices architecture, and enablement of DevOps practices to accelerate development cycles and improve system reliability. The goal is to transform legacy systems into agile, future-proof platforms.",
    imageUrl: "/images/projects/plat_eng.png",
    tags: ["Platform Engineering", "Modernization", "Cloud Migration", "Microservices", "DevOps", "Scalability"],
    liveUrl: "#",
    aiHint: "futuristic automation abstract",
    icon: <Layers3 className="inline-block h-5 w-5 mr-2 text-current" />,
  },
  {
    id: "project-market-strategy",
    title: "Market Strategy Analysis",
    description: "An innovation hub driving a plethora of strategic opportunities, this stream of initiatives centers around identifying untapped market potential, analyzing emerging trends, and predicting business and technology trajectories. It encompasses opportunity mapping, scalability assessments, and strategic foresight to shape high-impact marketing strategies. From crafting product roadmaps and channeling business models to productizing services and building value-driven narratives.",
    imageUrl: "/images/projects/marketing_strategy.png",
    tags: ["Market Research", "Competitive Analysis", "GTM Strategy", "Product Positioning", "Strategic Planning"],
    liveUrl: null,
    aiHint: "innovative strategy team",
    icon: <Target className="inline-block h-5 w-5 mr-2 text-current" />,
  },
  {
    id: "project-gtm-pursuits",
    title: "GTM Pursuits",
    description: "This pursuit stream caters to high-impact sales enablement and strategic business expansion, playing a pivotal role in strengthening core competencies and unlocking new growth pathways. It involves deeply aligning with client contexts, architecting customized solution narratives, and crafting persuasive, high-value proposals and presentations. With a clear strategic vision, this initiative drives the development of scalable capabilities, broadens business opportunity pipelines, and enhances the organization’s scope to consistently achieve the next mile in value delivery.",
    imageUrl: "/images/projects/gtm.png",
    tags: ["GTM Strategy", "Sales Pursuits", "Solutioning", "Proposal Development", "Client Engagement"],
    liveUrl: "#",
    aiHint: "professional business meeting",
    icon: <BriefcaseBusiness className="inline-block h-5 w-5 mr-2 text-current" />,
  },
];

const ProjectsSection: React.FC = () => {
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);

  const handleFlip = (projectId: string) => {
    setFlippedCardId(flippedCardId === projectId ? null : projectId);
  };

  return (
    <AnimatedSection id="projects" className="scroll-mt-20 md:scroll-mt-24" delay="delay-400">
      <div className="text-center mb-10 md:mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-2">
          Key Initiatives <span className="text-accent">& Projects</span>
        </h2>
        <p className="text-muted-foreground mt-2 text-lg">Demonstrating impact across analysis, consulting, and strategy.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsData.map((project, index) => (
          <AnimatedSection key={project.id} delay={`delay-${index * 100}`}>
            <div // Perspective container
              className="group w-full [perspective:1000px] cursor-pointer"
              onClick={() => handleFlip(project.id)}
            >
              <div // Flipping element - this will have card styles and manage its own height based on front face
                className={cn(
                  "relative w-full transition-all duration-700 ease-in-out [transform-style:preserve-3d]",
                  "rounded-lg border bg-card text-card-foreground shadow-sm", // Card base styles
                  flippedCardId === project.id && "[transform:rotateY(180deg)]"
                )}
              >
                {/* Front Face - Determines the height of the card */}
                <div className="[backface-visibility:hidden] rounded-lg overflow-hidden flex flex-col"> {/* Added overflow-hidden & flex-col here */}
                  {/* Image Container */}
                  <div className="relative h-64 md:h-72 lg:h-80 w-full overflow-hidden">
                    <Image
                      src={project.imageUrl}
                      alt={`Visual representing ${project.title}`}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 ease-out group-hover:scale-105"
                      data-ai-hint={project.aiHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-60 group-hover:opacity-75 transition-opacity duration-300"></div>
                    {/* Title Overlay on Image */}
                    <CardTitle className="tracking-tight absolute bottom-4 left-4 text-xl font-semibold text-white drop-shadow-md z-10 transition-all duration-300 flex items-center p-2 bg-black/60 group-hover:bg-muted/70 group-hover:text-white rounded-lg backdrop-blur-sm">
                      {React.cloneElement(project.icon, { className: "inline-block h-4 w-4 mr-1.5" })}
                      {project.title}
                    </CardTitle>
                  </div>
                  {/* Keywords Box - Bordered, below image */}
                  <div className="border-t border-border/40 p-4 bg-card"> {/* Ensure bg-card or similar for consistency */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs cursor-default transition-colors duration-200 hover:bg-accent/20 hover:text-accent border border-transparent hover:border-accent/30">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Back Face - Absolute, covers the front face */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden rounded-lg shadow-xl border border-accent/70 bg-card flex flex-col">
                  <CardHeader className="pb-3 pt-4 px-4 border-b border-border/40">
                    <CardTitle className="text-xl font-medium text-accent flex items-center">
                       {React.cloneElement(project.icon, { className: "inline-block h-5 w-5 mr-2" })}
                       {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow px-4 py-3 overflow-hidden">
                    <ScrollArea className="h-full pr-3">
                      <CardDescription className="text-muted-foreground text-sm leading-relaxed">
                        {project.description}
                      </CardDescription>
                    </ScrollArea>
                  </CardContent>
                  {(project.liveUrl && project.liveUrl !== "#") && (
                       <div className="px-4 pb-4 pt-3 border-t border-border/40 bg-muted/30">
                         <Button variant="default" size="sm" asChild className="bg-accent text-accent-foreground hover:bg-accent/90 transition-colors group/btn w-full">
                           <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                             <ExternalLink className="h-4 w-4 mr-1.5 transition-transform duration-200 group-hover/btn:scale-110" /> View Live
                           </Link>
                         </Button>
                       </div>
                  )}
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </AnimatedSection>
  );
};

export default ProjectsSection;
