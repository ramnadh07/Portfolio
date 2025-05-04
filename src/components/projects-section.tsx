"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "./animated-section";
import { Github, ExternalLink } from "lucide-react";

const projectsData = [
  {
    title: "Project Alpha",
    description: "A modern e-commerce platform built with Next.js, Stripe, and Tailwind CSS. Features product browsing, cart management, and secure checkout.",
    imageUrl: "https://picsum.photos/seed/alpha/600/400",
    tags: ["Next.js", "React", "TypeScript", "Stripe", "Tailwind CSS"],
    liveUrl: "#", // Replace with actual live URL
    repoUrl: "#", // Replace with actual repo URL
    aiHint: "e-commerce website interface",
  },
  {
    title: "Project Beta",
    description: "A collaborative task management application using Firebase for real-time updates and authentication. Allows teams to organize tasks and projects.",
    imageUrl: "https://picsum.photos/seed/beta/600/400",
    tags: ["React", "Firebase", "Realtime Database", "Authentication", "Material UI"],
    liveUrl: "#",
    repoUrl: "#",
     aiHint: "task management dashboard",
  },
  {
    title: "Project Gamma",
    description: "A data visualization dashboard displaying complex datasets with interactive charts and graphs, built with D3.js and React.",
    imageUrl: "https://picsum.photos/seed/gamma/600/400",
    tags: ["React", "D3.js", "Data Visualization", "Node.js", "Express"],
    liveUrl: "#",
    repoUrl: "#",
     aiHint: "data dashboard charts",
  },
   {
    title: "Project Delta",
    description: "A personal blog platform with markdown support and static site generation for optimal performance, created using Astro and Tailwind CSS.",
    imageUrl: "https://picsum.photos/seed/delta/600/400",
    tags: ["Astro", "Markdown", "SSG", "Tailwind CSS", "Blog"],
    liveUrl: "#",
    repoUrl: "#",
     aiHint: "blog website article",
  },
  // Add more projects
];

const ProjectsSection: React.FC = () => {
  return (
    <AnimatedSection id="projects" className="scroll-mt-20 md:scroll-mt-24" delay="delay-400"> {/* Increased scroll margin */}
         <div className="text-center mb-10 md:mb-12">
             {/* Enhanced Title Styling */}
             <h2 className="text-4xl md:text-5xl font-bold text-primary mb-3 pb-2 border-b-2 border-accent/30 inline-block">
                Featured Projects
             </h2>
             <p className="text-muted-foreground mt-2 text-lg">A selection of my recent work.</p>
         </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> {/* Adjusted grid cols for better spacing */}
            {projectsData.map((project, index) => (
              <AnimatedSection key={project.title} delay={`delay-${index * 100}`}>
                <Card className="group flex flex-col h-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-out border border-border/50 transform hover:-translate-y-2 bg-background"> {/* Changed to bg-background */}
                   <div className="relative h-48 md:h-56 w-full overflow-hidden"> {/* Image container */}
                     <Image
                        src={project.imageUrl}
                        alt={`Screenshot of ${project.title}`}
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
                    {project.repoUrl && project.repoUrl !== "#" && (
                        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors group/btn">
                           <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-1.5 transition-transform duration-200 group-hover/btn:scale-110" /> GitHub
                           </Link>
                         </Button>
                    )}
                    {project.liveUrl && project.liveUrl !== "#" && (
                         <Button variant="outline" size="sm" asChild className="text-accent border-accent hover:bg-accent/10 hover:text-accent transition-colors group/btn">
                           <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                             <ExternalLink className="h-4 w-4 mr-1.5 transition-transform duration-200 group-hover/btn:scale-110" /> Live Demo
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
