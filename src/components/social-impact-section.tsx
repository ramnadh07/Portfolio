
"use client";
import React, { useState } from "react";
import Image from "next/image";
import AnimatedSection from "./animated-section";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChartBig, Handshake, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const impactData = [
  {
    id: "impact-1",
    title: "Pro Bono Analysis for Local Food Bank",
    organization: "Community Harvest",
    role: "Volunteer Analyst",
    duration: "Summer 2023",
    description: "Analyzed donation patterns and distribution logistics to identify opportunities for improving efficiency, helping reach 15% more families. Conducted stakeholder interviews, mapped current state processes, and recommended data-driven changes to optimize inventory management and volunteer scheduling.",
    imageUrl: "https://picsum.photos/seed/impact-ba1/600/400",
    tags: ["Data Analysis", "Process Improvement", "Non-Profit", "Logistics", "Stakeholder Management"],
    icon: <BarChartBig className="inline-block h-4 w-4 mr-1.5" />,
    aiHint: "food bank logistics charts",
  },
  {
    id: "impact-2",
    title: "Mentoring Aspiring Analysts",
    organization: "Future Leaders Initiative",
    role: "Mentor",
    duration: "Ongoing (2022 - Present)",
    description: "Provide guidance and career advice to university students interested in business analysis. This includes resume reviews, mock interviews, sharing industry insights, and helping them develop a foundational understanding of BA roles and responsibilities.",
    imageUrl: "https://picsum.photos/seed/impact-ba2/600/400",
    tags: ["Mentorship", "Community", "Career Development", "Education", "Business Analysis"],
    icon: <Handshake className="inline-block h-4 w-4 mr-1.5" />,
    aiHint: "professional mentorship meeting students",
  },
  {
    id: "impact-3",
    title: "Workshop Facilitation: Intro to Agile",
    organization: "Tech For Good Network",
    role: "Volunteer Facilitator",
    duration: "Q1 2022",
    description: "Designed and facilitated an introductory workshop on Agile principles and Scrum practices for staff at several small non-profit organizations. The goal was to help them adopt more iterative and flexible approaches to their project management and operational tasks.",
    imageUrl: "https://picsum.photos/seed/impact-ba3/600/400",
    tags: ["Agile", "Workshop Facilitation", "Training", "Non-Profit Support", "Scrum"],
    icon: <Wrench className="inline-block h-4 w-4 mr-1.5" />,
    aiHint: "agile workshop presentation group",
  },
];

const SocialImpactSection: React.FC = () => {
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);

  const handleFlip = (itemId: string) => {
    setFlippedCardId(flippedCardId === itemId ? null : itemId);
  };

  return (
    <AnimatedSection id="social-impact" className="scroll-mt-20 md:scroll-mt-24" delay="delay-450">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-out bg-card border border-border/50 rounded-lg p-6 md:p-10">
        <CardHeader className="p-0 mb-8 text-center">
          <CardTitle className="text-4xl md:text-5xl font-bold text-primary mb-3 pb-2 border-b-2 border-accent/30 inline-block">
            Applying Skills for Good
          </CardTitle>
          <p className="text-muted-foreground mt-2 text-lg">Using analytical skills to support community initiatives.</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {impactData.map((item, index) => (
              <AnimatedSection key={item.id} delay={`delay-${index * 100}`}>
                <div
                  className="group w-full h-[480px] [perspective:1000px] cursor-pointer"
                  onClick={() => handleFlip(item.id)}
                >
                  <Card
                    className={cn(
                      "relative w-full h-full transition-all duration-700 ease-in-out [transform-style:preserve-3d]",
                      flippedCardId === item.id && "[transform:rotateY(180deg)]"
                    )}
                  >
                    {/* Front Face */}
                    <div className="absolute w-full h-full [backface-visibility:hidden] overflow-hidden rounded-lg shadow-md hover:shadow-xl border border-border/50 bg-background flex flex-col">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={item.imageUrl}
                          alt={`Image related to ${item.title}`}
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform duration-500 ease-out group-hover:scale-105"
                          data-ai-hint={item.aiHint}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
                        <CardTitle className="absolute bottom-4 left-4 text-lg font-semibold text-white drop-shadow-md z-10 transition-all duration-300 flex items-center p-2 bg-black/60 group-hover:bg-muted/70 group-hover:text-white rounded-lg backdrop-blur-sm">
                          {React.cloneElement(item.icon, { className: "inline-block h-4 w-4 mr-1.5" })}
                          {item.title}
                        </CardTitle>
                      </div>
                      <CardContent className="p-4 flex-grow flex flex-col"> {/* Use CardContent for text below image */}
                        <p className="text-sm font-medium text-muted-foreground">{item.organization} ({item.duration})</p>
                        <p className="text-sm text-foreground font-medium mt-1">{item.role}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-2 mt-auto border-t border-border/30 bg-muted/10">
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs cursor-default">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardFooter>
                    </div>

                    {/* Back Face */}
                    <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden rounded-lg shadow-xl border border-accent/70 bg-card flex flex-col">
                      <CardHeader className="pb-3 pt-4 px-4 border-b border-border/40">
                        <CardTitle className="text-xl font-medium text-accent flex items-center">
                          {React.cloneElement(item.icon, { className: "inline-block h-5 w-5 mr-2" })}
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow px-4 py-3 overflow-y-auto">
                        <ScrollArea className="h-full pr-3"> {/* Ensure ScrollArea takes full height of this content block */}
                          <CardDescription className="text-muted-foreground text-sm leading-relaxed">
                            {item.description}
                          </CardDescription>
                        </ScrollArea>
                      </CardContent>
                      {/* No specific button to flip back, clicking card flips */}
                    </div>
                  </Card>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
};

export default SocialImpactSection;
