
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, MessageSquareQuote } from "lucide-react";
import AnimatedSection from "./animated-section";
import Link from "next/link";

const HeroSection: React.FC = () => {
  return (
    <AnimatedSection
      id="hero"
      className="min-h-[calc(85vh)] flex flex-col items-center justify-center text-center py-16 md:py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Background Boxes */}
      <div className="absolute inset-0 flex -z-20">
        {" "}
        {/* Lower z-index for boxes */}
        {/* Blue side (left 3 boxes), fading towards center */}
        <div className="w-1/6 h-full bg-accent/70"></div>
        <div className="w-1/6 h-full bg-accent/50"></div>
        <div className="w-1/6 h-full bg-accent/30"></div>
        {/* Lavender side (right 3 boxes), fading towards center */}
        <div className="w-1/6 h-full bg-chart-4/30"></div>{" "}
        {/* Using chart-4 for lavender */}
        <div className="w-1/6 h-full bg-chart-4/50"></div>
        <div className="w-1/6 h-full bg-chart-4/70"></div>
      </div>

      {/* Gradient overlay to ensure text readability over the boxes */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/30 via-background/70 to-background"></div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 text-foreground animate-fade-in drop-shadow-xl">
        Ramalingeswara Nadh
      </h1>
      <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-8 max-w-2xl lg:max-w-3xl animate-fade-in-up delay-100 drop-shadow-md">
        Business Analyst | Functional Consultant | Strategy & GTM Specialist
        driving growth through technology and market insights.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 items-center animate-fade-in-up delay-200">
        <Button
 size="lg"
 asChild
 className="bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 ease-out shadow-lg hover:shadow-xl transform hover:-translate-y-1 group"
        >
          <Link href="#experience">
            <>
              Explore My Experience
 <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">
                &#10140;
              </span>
            </>
          </Link>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="border-accent text-accent hover:bg-accent/10 hover:text-accent transition-all duration-300 ease-out group backdrop-blur-sm transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
          asChild
        >
          <Link href="#feedback" aria-label="Connect">
          <>
            Connect
 <MessageSquareQuote className="ml-2 h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-y-0.5"/>
          </>
 </Link>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="border-primary text-primary hover:bg-primary/10 hover:text-primary transition-all duration-300 ease-out group backdrop-blur-sm transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
          onClick={() => window.location.href = 'mailto:ramnadh2002@gmail.com'}
        >
 <Link href="mailto:ramnadh2002@gmail.com" aria-label="Contact Me">
          <span className="flex items-center justify-center">
            Contact Me
 <ArrowDown className="ml-2 h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-y-0.5"/>
          </span>
 </Link>
        </Button>
      </div>
    </AnimatedSection>
  );
};
export default HeroSection;
