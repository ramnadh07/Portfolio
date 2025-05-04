"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import AnimatedSection from "./animated-section";
import Link from "next/link";

const HeroSection: React.FC = () => {
  return (
    <AnimatedSection
      id="hero"
      className="min-h-[calc(80vh)] flex flex-col items-center justify-center text-center py-16 md:py-24 lg:py-32 relative overflow-hidden" // Added relative and overflow-hidden
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-background/90 to-secondary/10"></div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 text-foreground animate-fade-in drop-shadow-md">
        Your Name
      </h1>
      <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-8 max-w-3xl animate-fade-in-up delay-100">
        Creative Developer & Designer specializing in building elegant and performant web experiences.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 items-center animate-fade-in-up delay-200">
        <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 ease-out shadow-md hover:shadow-lg transform hover:-translate-y-1 group">
          <Link href="#projects">
            View My Work
            <span className="ml-2 transform transition-transform duration-300 group-hover:rotate-[-5deg]">&#10140;</span> {/* Example arrow */}
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild className="text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-300 ease-out group border-border/70 hover:bg-muted/50 transform hover:-translate-y-0.5">
           <Link href="mailto:your.email@example.com" aria-label="Contact Me"> {/* Changed href to mailto */}
            Contact Me
            <ArrowDown className="ml-2 h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-y-0.5" />
           </Link>
        </Button>
      </div>
      {/* Optional: Add more decorative elements */}
      {/* <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent"></div> */}
    </AnimatedSection>
  );
};

export default HeroSection;
