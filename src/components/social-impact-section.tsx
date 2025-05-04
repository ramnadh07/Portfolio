
"use client";
import React from "react";
import Image from "next/image";
import AnimatedSection from "./animated-section";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChartBig, Handshake, Wrench } from "lucide-react"; // More relevant icons for BA impact

// Replace with your actual social impact/CSR activities - BA specific examples
const impactData = [
  {
    title: "Pro Bono Analysis for Local Food Bank",
    organization: "Community Harvest",
    role: "Volunteer Analyst",
    duration: "Summer 2023",
    description: "Analyzed donation patterns and distribution logistics to identify opportunities for improving efficiency, helping reach 15% more families.",
    imageUrl: "https://picsum.photos/seed/impact-ba1/600/400",
    tags: ["Data Analysis", "Process Improvement", "Non-Profit", "Logistics"],
    icon: <BarChartBig className="h-5 w-5 mr-2 text-accent" />,
    aiHint: "food bank logistics charts",
  },
  {
    title: "Mentoring Aspiring Analysts",
    organization: "Future Leaders Initiative",
    role: "Mentor",
    duration: "Ongoing (2022 - Present)",
    description: "Provide guidance and career advice to university students interested in business analysis, helping them prepare for interviews and understand industry expectations.",
    imageUrl: "https://picsum.photos/seed/impact-ba2/600/400",
    tags: ["Mentorship", "Community", "Career Development", "Education"],
    icon: <Handshake className="h-5 w-5 mr-2 text-accent" />,
    aiHint: "professional mentorship meeting students",
  },
  {
    title: "Workshop Facilitation: Intro to Agile",
    organization: "Tech For Good Network",
    role: "Volunteer Facilitator",
    duration: "Q1 2022",
    description: "Facilitated an introductory workshop on Agile principles and practices for staff at several small non-profit organizations.",
    imageUrl: "https://picsum.photos/seed/impact-ba3/600/400",
    tags: ["Agile", "Workshop Facilitation", "Training", "Non-Profit Support"],
    icon: <Wrench className="h-5 w-5 mr-2 text-accent" />, // Using Wrench as a tool/methodology icon
    aiHint: "agile workshop presentation group",
  },
];

const SocialImpactSection: React.FC = () => {
  return (
    <AnimatedSection id="social-impact" className="scroll-mt-20 md:scroll-mt-24" delay="delay-450"> {/* Ensure consistent scroll margin */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-out bg-card border border-border/50 rounded-lg p-6 md:p-10"> {/* Kept bg-card for main container */}
        <CardHeader className="p-0 mb-8 text-center">
          {/* Enhanced Title Styling */}
          <CardTitle className="text-4xl md:text-5xl font-bold text-primary mb-3 pb-2 border-b-2 border-accent/30 inline-block">
            Applying Skills for Good
          </CardTitle>
          <p className="text-muted-foreground mt-2 text-lg">Using analytical skills to support community initiatives.</p> {/* Updated subtitle */}
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {impactData.map((item, index) => (
              <AnimatedSection key={item.title} delay={`delay-${index * 100}`}>
                <Card className="group flex flex-col h-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-out border border-border/50 transform hover:-translate-y-2 bg-background"> {/* Inner cards remain bg-background */}
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
                     <h3 className="absolute bottom-4 left-4 text-lg font-semibold text-white drop-shadow-md z-10 transition-colors duration-300 group-hover:text-accent-foreground/90 flex items-center">
                       {item.icon} {item.title}
                    </h3>
                  </div>
                  <CardHeader className="pt-4 px-4 pb-2">
                     {/* Title moved to image overlay */}
                     <p className="text-sm font-medium text-muted-foreground">{item.organization} ({item.duration})</p>
                     <p className="text-sm text-foreground font-medium mt-1">{item.role}</p>
                  </CardHeader>
                  <CardContent className="flex-grow px-4 py-2">
                    <CardDescription className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                   <CardFooter className="px-4 pb-4 pt-2 flex flex-wrap gap-1.5 mt-auto bg-muted/10 border-t border-border/30">
                     {item.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs cursor-default">
                          {tag}
                        </Badge>
                      ))}
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

export default SocialImpactSection;
