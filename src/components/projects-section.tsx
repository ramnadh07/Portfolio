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
    <AnimatedSection id="projects" className="scroll-mt-16" delay="delay-400">
       <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-out bg-card border-0 rounded-lg p-6 md:p-10 !bg-transparent !border-0 !shadow-none">
         <CardHeader className="p-0 mb-8">
          <CardTitle className="text-3xl md:text-4xl font-semibold text-primary text-center">
            Featured Projects
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projectsData.map((project, index) => (
              <AnimatedSection key={project.title} delay={`delay-${index * 100}`}>
                <Card className="flex flex-col h-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-out border border-border/50 transform hover:-translate-y-2 bg-card">
                   <div className="relative h-48 md:h-56 w-full overflow-hidden">
                     <Image
                        src={project.imageUrl}
                        alt={`Screenshot of ${project.title}`}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-500 ease-out group-hover:scale-105"
                         data-ai-hint={project.aiHint}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                   </div>

                  <CardHeader className="pt-4 px-4">
                    <CardTitle className="text-xl font-semibold text-foreground mb-1">{project.title}</CardTitle>
                     <div className="flex flex-wrap gap-1.5 mt-1">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs cursor-default">
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
                  <CardFooter className="px-4 pb-4 pt-2 flex justify-end space-x-3 mt-auto">
                    {project.repoUrl && project.repoUrl !== "#" && (
                        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors">
                           <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-1.5" /> GitHub
                           </Link>
                         </Button>
                    )}
                    {project.liveUrl && project.liveUrl !== "#" && (
                         <Button variant="outline" size="sm" asChild className="text-accent border-accent hover:bg-accent/10 hover:text-accent transition-colors">
                           <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                             <ExternalLink className="h-4 w-4 mr-1.5" /> Live Demo
                           </Link>
                         </Button>
                    )}
                  </CardFooter>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
};

export default ProjectsSection;
