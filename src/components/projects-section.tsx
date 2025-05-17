
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "./animated-section";
import { Sprout, Layers3, Target, BriefcaseBusiness, ExternalLink, RotateCcw, Info } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const projectsData = [
  {
    id: "project-agritech",
    title: "Smart Farms & AgriTech Solutions",
    description: "This initiative involves designing and developing technology solutions for modern agriculture. It includes IoT integration for farm monitoring, data analytics for crop optimization, and supply chain improvements for better market access. The core focus is on leveraging cutting-edge tech to create more efficient, sustainable, and productive agricultural practices, ultimately benefiting farmers and the food ecosystem.",
    imageUrl: "https://picsum.photos/seed/agritech-future/600/400",
    tags: ["AgriTech", "IoT", "Data Analytics", "Supply Chain", "Solution Design", "Sustainable Farming"],
    liveUrl: "#",
    aiHint: "modern agriculture technology",
    icon: <Sprout className="inline-block h-4 w-4 mr-1.5 text-current" />,
  },
  {
    id: "project-platform",
    title: "Platform Engineering & Modernization",
    description: "This project focuses on re-architecting and modernizing existing enterprise platforms to enhance scalability, performance, and maintainability. It involves strategies for cloud migration, adoption of microservices architecture, and enablement of DevOps practices to accelerate development cycles and improve system reliability. The goal is to transform legacy systems into agile, future-proof platforms.",
    imageUrl: "https://picsum.photos/seed/platform-automation/600/400",
    tags: ["Platform Engineering", "Modernization", "Cloud Migration", "Microservices", "DevOps", "Scalability"],
    liveUrl: "#",
    aiHint: "futuristic automation abstract",
    icon: <Layers3 className="inline-block h-4 w-4 mr-1.5 text-current" />,
  },
  {
    id: "project-market-strategy",
    title: "Market Strategy Analysis",
    description: "This initiative involves conducting in-depth market research and comprehensive competitive analysis. The aim is to identify emerging market opportunities, define robust product positioning, and inform effective go-to-market strategies for new and existing products or services. It includes analyzing market trends, customer segments, and competitive landscapes to drive strategic decision-making.",
    imageUrl: "https://picsum.photos/seed/creative-strategy/600/400",
    tags: ["Market Research", "Competitive Analysis", "GTM Strategy", "Product Positioning", "Strategic Planning"],
    liveUrl: "#",
    aiHint: "innovative strategy team",
    icon: <Target className="inline-block h-4 w-4 mr-1.5 text-current" />,
  },
  {
    id: "project-gtm-pursuits",
    title: "GTM Pursuits",
    description: "This project focuses on supporting high-value sales pursuits and complex go-to-market initiatives. Key activities include deeply understanding client needs and pain points, architecting tailored solutions, developing compelling and persuasive proposals, and creating impactful presentations designed to win new business and foster strong client relationships.",
    imageUrl: "https://picsum.photos/seed/business-pursuits/600/400",
    tags: ["GTM Strategy", "Sales Pursuits", "Solutioning", "Proposal Development", "Client Engagement"],
    liveUrl: "#",
    aiHint: "professional business meeting",
    icon: <BriefcaseBusiness className="inline-block h-4 w-4 mr-1.5 text-current" />,
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
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-3 pb-2 border-b-2 border-accent/30 inline-block">
          Key Initiatives & Projects
        </h2>
        <p className="text-muted-foreground mt-2 text-lg">Demonstrating impact across analysis, consulting, and strategy.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsData.map((project, index) => (
          <AnimatedSection key={project.id} delay={`delay-${index * 100}`}>
            <div
              className="group w-full h-[450px] [perspective:1000px] cursor-pointer"
              onClick={() => handleFlip(project.id)}
            >
              <Card
                className={cn(
                  "relative w-full h-full transition-all duration-700 ease-in-out [transform-style:preserve-3d]",
                  flippedCardId === project.id && "[transform:rotateY(180deg)]"
                )}
              >
                {/* Front Face */}
                <div className="absolute w-full h-full [backface-visibility:hidden] overflow-hidden rounded-lg shadow-md hover:shadow-xl border border-border/50 bg-background flex flex-col">
                  <div className="relative h-48 md:h-56 w-full overflow-hidden">
                    <Image
                      src={project.imageUrl}
                      alt={`Visual representing ${project.title}`}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 ease-out group-hover:scale-105"
                      data-ai-hint={project.aiHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-60 group-hover:opacity-75 transition-opacity duration-300"></div>
                    <CardTitle className="absolute bottom-4 left-4 text-xl font-semibold text-white drop-shadow-md z-10 transition-all duration-300 flex items-center p-2 bg-black/60 group-hover:bg-muted/70 group-hover:text-white rounded-lg backdrop-blur-sm">
                      {React.cloneElement(project.icon, { className: "inline-block h-4 w-4 mr-1.5" })}
                      {project.title}
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
                    <p className="text-xs text-muted-foreground/80 flex items-center justify-center">
                      <Info className="h-3 w-3 mr-1.5" /> Click card for details
                    </p>
                  </CardContent>
                   <CardFooter className="px-4 pb-4 pt-2 mt-auto bg-muted/20 border-t border-border/30">
                     {/* Placeholder for any front footer content if needed, or remove if empty */}
                      <p className="text-xs text-muted-foreground text-center w-full">Hover for image effects</p>
                   </CardFooter>
                </div>

                {/* Back Face */}
                <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden rounded-lg shadow-xl border border-accent/70 bg-card flex flex-col">
                  <CardHeader className="pb-3 pt-4 px-4 border-b border-border/40">
                    <CardTitle className="text-xl font-medium text-accent flex items-center">
                       {React.cloneElement(project.icon, { className: "inline-block h-5 w-5 mr-2" })}
                       {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow px-4 py-3 overflow-y-auto">
                    <ScrollArea className="h-[200px] pr-3"> {/* Adjust height as needed */}
                      <CardDescription className="text-muted-foreground text-sm leading-relaxed">
                        {project.description}
                      </CardDescription>
                    </ScrollArea>
                  </CardContent>
                  <CardFooter className="px-4 pb-4 pt-3 flex justify-between items-center border-t border-border/40 bg-muted/30">
                    <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); handleFlip(project.id); }} className="text-accent border-accent hover:bg-accent/10 hover:text-accent transition-colors group/btn">
                      <RotateCcw className="h-4 w-4 mr-1.5 transition-transform duration-200 group-hover/btn:rotate-[-45deg]" /> View Image
                    </Button>
                    {project.liveUrl && project.liveUrl !== "#" && (
                         <Button variant="default" size="sm" asChild className="bg-accent text-accent-foreground hover:bg-accent/90 transition-colors group/btn">
                           <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                             <>
                               <ExternalLink className="h-4 w-4 mr-1.5 transition-transform duration-200 group-hover/btn:scale-110" /> View Live
                             </>
                           </Link>
                         </Button>
                    )}
                  </CardFooter>
                </div>
              </Card>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </AnimatedSection>
  );
};

export default ProjectsSection;
