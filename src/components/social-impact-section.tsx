
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
    organization: "Community Development Initiatives",
    role: "Lead Mentor & Program Facilitator",
    duration: "Ongoing",
    description: "Orchestrated a comprehensive program focused on community training and mentorship. This initiative empowered individuals by fostering essential skills, guiding them in building professional portfolios, and assisting them in exploring and securing opportunities, particularly within the analytics field. The program aimed to expand their knowledge base and cultivate a strong interest in data-driven careers.",
    imageUrl: "https://picsum.photos/seed/community-dev/600/400",
    tags: ["Mentorship", "Skill Development", "Career Coaching", "Portfolio Building", "Analytics Training", "Community Empowerment"],
    icon: <UsersRound className="inline-block h-4 w-4 mr-1.5 text-current" />,
    aiHint: "community workshop learning",
  },
  {
    id: "impact-environmental-stewardship",
    title: "Environmental Stewardship",
    organization: "Green Earth Foundation",
    role: "Campaign Coordinator & Educator",
    duration: "Various Campaigns",
    description: "Actively participated in and coordinated environmental cleaning drives and awareness campaigns. Key activities included educating children on ecological values, engaging in thoughtful activities to promote social responsibility, organizing plantation drives to support nature, and advocating for sustainable practices for equitable growth and environmental preservation.",
    imageUrl: "https://picsum.photos/seed/eco-action/600/400",
    tags: ["Environmental Activism", "Community Engagement", "Youth Education", "Sustainability", "Plantation Drives", "Social Responsibility"],
    icon: <Leaf className="inline-block h-4 w-4 mr-1.5 text-current" />,
    aiHint: "environmental education children",
  },
  {
    id: "impact-startup-enablement",
    title: "Startup Enablement & Mentorship",
    organization: "Innovate Forward Hub",
    role: "Founding Member & Mentor",
    duration: "Strategic Engagements",
    description: "Contributed as a core member in establishing and venturing with startup foundations. This role involved motivating students by presenting innovative opportunities, broadening their career paths through dedicated mentorship, facilitating access to relevant resources, and driving their purpose by instilling an entrepreneurial mindset and problem-solving skills.",
    imageUrl: "https://picsum.photos/seed/startup-ideas/600/400",
    tags: ["Startup Incubation", "Innovation", "Youth Mentorship", "Entrepreneurship", "Venture Building", "Strategic Facilitation"],
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
                  className="group w-full [perspective:1000px] cursor-pointer"
                  onClick={() => handleFlip(item.id)}
                >
                  <div
                    className={cn(
                      "relative w-full transition-all duration-700 ease-in-out [transform-style:preserve-3d]",
                      "rounded-lg border bg-card text-card-foreground shadow-sm",
                      "h-64 md:h-72 lg:h-80", 
                      flippedCardId === item.id && "[transform:rotateY(180deg)]"
                    )}
                  >
                    {/* Front Face */}
                    <div className={cn(
                      "absolute w-full h-full [backface-visibility:hidden] overflow-hidden rounded-lg",
                      "shadow-md hover:shadow-xl border border-border/50 bg-card flex flex-col"
                    )}>
                      <div className="relative flex-grow w-full overflow-hidden"> {/* Changed h-3/5 to flex-grow */}
                        <Image
                          src={item.imageUrl}
                          alt={`Image related to ${item.title}`}
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform duration-500 ease-out group-hover:scale-105"
                          data-ai-hint={item.aiHint}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
                        <CardTitle className="tracking-tight absolute bottom-4 left-4 text-xl font-semibold text-white drop-shadow-md z-10 transition-all duration-300 flex items-center p-2 bg-black/60 group-hover:bg-muted/70 group-hover:text-white rounded-lg backdrop-blur-sm">
                           {React.cloneElement(item.icon, { className: "inline-block h-4 w-4 mr-1.5" })}
                          {item.title}
                        </CardTitle>
                      </div>
                      {/* Keywords Box */}
                      <div className="px-4 pb-4 pt-2 mt-auto border-t border-border/40 bg-card">
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs cursor-default">
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
