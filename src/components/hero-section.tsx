
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, MessageSquareQuote } from "lucide-react"; // Added MessageSquareQuote
import AnimatedSection from "./animated-section";
import Link from "next/link";
// Removed Image import as it's no longer used for background

const HeroSection: React.FC = () => {
  return (
    <AnimatedSection
      id="hero"
      className="min-h-[calc(80vh)] flex flex-col items-center justify-center text-center py-16 md:py-24 lg:py-32 relative overflow-hidden" // Kept relative and overflow-hidden
    >
      {/* Removed Background Image */}

      {/* Removed background gradient overlay */}

      {/* Add four vertical boxes with fading blue background */}
      <div className="absolute inset-0 flex -z-10">
        <div className="w-1/4 h-full bg-accent/40 opacity-70"></div>
        <div className="w-1/4 h-full bg-accent/30 opacity-70"></div>
        <div className="w-1/4 h-full bg-accent/20 opacity-70"></div>
        <div className="w-1/4 h-full bg-accent/10 opacity-70"></div>
      </div>
       {/* Add subtle gradient from background to ensure text contrast at edges */}
       <div className="absolute inset-0 -z-[5] bg-gradient-to-b from-background/30 via-background/80 to-background"></div>


      {/* Increased drop shadow for better readability */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 text-foreground animate-fade-in drop-shadow-xl">
        Ramalingeswara Nadh {/* Updated Name */}
      </h1>
      {/* Increased drop shadow and max-width for better wrapping on smaller screens */}
      <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-8 max-w-2xl lg:max-w-3xl animate-fade-in-up delay-100 drop-shadow-md">
         {/* Updated Tagline */}
        Business Analyst | Functional Consultant | Strategy & GTM Specialist driving growth through technology and market insights.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 items-center animate-fade-in-up delay-200">
         {/* Adjusted button styles slightly for visual hierarchy - Wrap Link contents in Fragment */}
        <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 ease-out shadow-lg hover:shadow-xl transform hover:-translate-y-1 group">
          <Link href="#experience"> {/* Point to experience section */}
            <>
              Explore My Experience
              <span className="ml-2 transform transition-transform duration-300 group-hover:rotate-[-5deg]">&#10140;</span>
            </>
          </Link>
        </Button>
         {/* Share Feedback Button */}
         <Button variant="outline" size="lg" asChild className="bg-background/70 backdrop-blur-sm text-foreground hover:text-accent-foreground hover:bg-accent/80 hover:border-accent/80 transition-all duration-300 ease-out group border-border/70 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg">
          <Link href="#feedback" aria-label="Share Feedback">
            <>
              Share Feedback
              <MessageSquareQuote className="ml-2 h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-y-0.5" />
            </>
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild className="bg-background/70 backdrop-blur-sm text-foreground hover:text-accent-foreground hover:bg-accent/80 hover:border-accent/80 transition-all duration-300 ease-out group border-border/70 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg">
           <Link href="mailto:your.email@example.com" aria-label="Contact Me"> {/* Updated email */}
            <>
              Contact Me
              <ArrowDown className="ml-2 h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-y-0.5" />
            </>
           </Link>
        </Button>
      </div>
    </AnimatedSection>
  );
};

export default HeroSection;

