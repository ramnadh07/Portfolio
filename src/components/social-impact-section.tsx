
"use client";
import React, { useState } from "react";
import Image from "next/image";
import AnimatedSection from "./animated-section";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UsersRound, Leaf, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const impactData = [
  {
    id: "impact-community-training",
    title: "Community Training & Mentorship",
    description: "A collaborative community-driven ecosystem dedicated to fostering analytical talent and accelerating career readiness in the data space, bringing together mentorship, skill-building, and portfolio curation under one roof to gain hands-on exposure, & build problem-solving capabilities, aligning with real-world industry trends. Through consistent engagement, knowledge-sharing, and access to practical guidance, the community has enabled aspiring professionals with bright opportunities.",
    imageUrl: "/images/Social/workshop.png",
    tags: ["Mentorship", "Skill Development", "Career Coaching", "Analytics Training", "Community Empowerment"],
    icon: <UsersRound className="inline-block h-4 w-4 mr-1.5 text-current" />,
    aiHint: "community workshop learning",
  },
  {
    id: "impact-environmental-stewardship",
    title: "Environmental Stewardship",
    description: "A purpose-driven collective designed to promote environmental sustainability and community awareness. Enabled through grassroots coordination and volunteer-led engagement, this initiative brought together diverse groups for a shared mission: to champion ecological responsibility, including cleaning drives, plantation efforts, and awareness sessions focused on instilling sustainable values—particularly among children and youth-nurturing a culture of accountability, and laid the foundation for long-term, community-led ecological impact.",
    imageUrl: "/images/Social/env.png",
    tags: ["Environmental Activism", "Community Engagement", "Sustainability", "Youth Education", "Advocacy"],
    icon: <Leaf className="inline-block h-4 w-4 mr-1.5 text-current" />,
    aiHint: "environmental education children",
  },
  {
    id: "impact-startup-enablement",
    title: "Startup Enablement & Mentorship",
    description: "This ecosystem supported the early foundation of startup ventures by providing access to structured mentorship, resource curation, and real-world exposure. It served as a catalyst for students and early professionals—equipping them with the mindset, problem-solving orientation, and strategic thinking required to pursue impactful ideas. Through motivational engagements, collaborative ideation, and opportunity mapping, it helped shape future-ready individuals capable of navigating complex challenges and converting vision into scalable ventures.",
    imageUrl: "/images/Social/startup.png",
    tags: ["Startup Incubation", "Innovation", "Youth Mentorship", "Entrepreneurship", "Venture Building"],
    icon: <Rocket className="inline-block h-4 w-4 mr-1.5 text-current" />,
    aiHint: "students collaboration startup",
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
          <CardTitle className="text-4xl md:text-5xl font-bold text-primary mb-2">
            Applying Skills <span className="text-accent">for Good</span>
          </CardTitle>
          <p className="text-muted-foreground mt-2 text-lg">
            Leveraging professional skills to contribute to meaningful community projects and social causes.
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {impactData.map((item, index) => (
              <AnimatedSection key={item.id} delay={`delay-${index * 100}`}>
                <div
                  className="group w-full [perspective:1000px] cursor-pointer"
                  onClick={() => handleFlip(item.id)}
                >
                  <div
                    className={cn(
                      "relative w-full transition-all duration-700 ease-in-out [transform-style:preserve-3d]",
                      "rounded-lg border bg-card text-card-foreground shadow-sm",
                      "h-64 md:h-72 lg:h-80", // Consistent overall card height
                      flippedCardId === item.id && "[transform:rotateY(180deg)]"
                    )}
                  >
                    {/* Front Face */}
                    <div className={cn(
                      "absolute w-full h-full [backface-visibility:hidden] overflow-hidden rounded-lg",
                      "shadow-md hover:shadow-xl border border-border/50 bg-background flex flex-col"
                    )}>
                      {/* Image Container */}
                      <div className="relative h-44 md:h-48 lg:h-56 w-full overflow-hidden flex-shrink-0">
                        <Image
                          src={item.imageUrl}
                          alt={`Image related to ${item.title}`}
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform duration-500 ease-out group-hover:scale-105"
                          data-ai-hint={item.aiHint}
                        />
                        <CardTitle className="tracking-tight absolute bottom-4 left-4 text-xl font-semibold text-white drop-shadow-md z-10 transition-all duration-300 flex items-center p-2 bg-black/60 group-hover:bg-muted/70 group-hover:text-white rounded-lg backdrop-blur-sm">
                           {React.cloneElement(item.icon, { className: "inline-block h-4 w-4 mr-1.5" })}
                          {item.title}
                        </CardTitle>
                      </div>
                      {/* Tags Container */}
                      <div className="border-t border-border/40 px-4 pt-2 pb-4 bg-card flex-grow flex flex-col justify-center"> {/* Changed p-4 to px-4 pt-2 pb-4 */}
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs cursor-default transition-colors duration-200 hover:bg-accent/20 hover:text-accent border border-transparent hover:border-accent/30">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Back Face */}
                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden rounded-lg shadow-xl border border-accent/70 bg-card flex flex-col">
                      <CardHeader className="pb-3 pt-4 px-4 border-b border-border/40">
                        <CardTitle className="text-xl font-medium text-accent flex items-center">
                          {React.cloneElement(item.icon, { className: "inline-block h-5 w-5 mr-2" })}
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow p-4 overflow-hidden">
                        <ScrollArea className="h-full pr-3">
                          <CardDescription className="text-muted-foreground text-sm leading-relaxed">
                            {item.description}
                          </CardDescription>
                        </ScrollArea>
                      </CardContent>
                    </div>
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

export default SocialImpactSection;
