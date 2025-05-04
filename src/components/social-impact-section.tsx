
"use client";
import React from "react";
import Image from "next/image";
import AnimatedSection from "./animated-section";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"; // Added CardFooter import
import { Badge } from "@/components/ui/badge";
import { Users, Leaf, HeartHandshake } from "lucide-react"; // Icons for social impact

// Replace with your actual social impact/CSR activities
const impactData = [
  {
    title: "Coding Bootcamp for Underprivileged Youth",
    organization: "Tech Forward Initiative",
    role: "Lead Mentor & Curriculum Developer",
    duration: "2022 - Present",
    description: "Mentored aspiring developers, designed course modules focusing on web fundamentals, and helped graduates secure internships.",
    imageUrl: "https://picsum.photos/seed/impact1/600/400",
    tags: ["Education", "Mentorship", "Community", "Technology"],
    icon: <Users className="h-5 w-5 mr-2 text-accent" />,
    aiHint: "people learning coding computers",
  },
  {
    title: "Environmental Cleanup Drive",
    organization: "Green Earth Volunteers",
    role: "Volunteer Coordinator",
    duration: "Annual Event (2021, 2022, 2023)",
    description: "Organized and led teams for local park and river cleanup events, promoting environmental awareness and community participation.",
    imageUrl: "https://picsum.photos/seed/impact2/600/400",
    tags: ["Environment", "Volunteering", "Community Organizing"],
    icon: <Leaf className="h-5 w-5 mr-2 text-accent" />,
    aiHint: "people cleaning park environment",
  },
  {
    title: "Pro Bono Web Development for Non-Profit",
    organization: "Helping Hands Charity",
    role: "Volunteer Web Developer",
    duration: "Q3 2021",
    description: "Developed and deployed a responsive website to improve the charity's online presence and streamline donation processes.",
    imageUrl: "https://picsum.photos/seed/impact3/600/400",
    tags: ["Web Development", "Non-Profit", "Pro Bono", "Accessibility"],
    icon: <HeartHandshake className="h-5 w-5 mr-2 text-accent" />,
    aiHint: "charity website non-profit",
  },
  // Add more activities
];

const SocialImpactSection: React.FC = () => {
  return (
    <AnimatedSection id="social-impact" className="scroll-mt-20 md:scroll-mt-24" delay="delay-450"> {/* Ensure consistent scroll margin */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-out bg-card border border-border/50 rounded-lg p-6 md:p-10"> {/* Kept bg-card for main container */}
        <CardHeader className="p-0 mb-8 text-center">
          {/* Enhanced Title Styling */}
          <CardTitle className="text-4xl md:text-5xl font-bold text-primary mb-3 pb-2 border-b-2 border-accent/30 inline-block">
            Beyond the Code: Social Impact
          </CardTitle>
          <p className="text-muted-foreground mt-2 text-lg">Contributing to causes I believe in.</p>
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
